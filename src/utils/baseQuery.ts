import {fetchBaseQuery, FetchArgs} from '@reduxjs/toolkit/query/react';
import {jwtDecode} from 'jwt-decode';
import {Mutex} from 'async-mutex';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getUser, setUser} from './userUtils';
import {reset} from './../../App';
import {SPLASH_SCREEN} from '../../src/constants/Textkeys';
import {
  onLoad,
  onSuccess,
  onError,
  noLoaderHide,
  noLoaderShow,
} from '../store/slice/loaderslice';

const mutex = new Mutex();

const rawBaseQuery = fetchBaseQuery({
  baseUrl: 'https://stanpay-api-dev.kiplglobal.com:8300/', //process.env.REACT_APP_BASE_URL,
  prepareHeaders: async headers => {
    const user = await getUser();

    if (user?.access_token) {
      headers.set('Authorization', `Bearer ${user.access_token}`);
    }

    headers.set('Content-Type', 'application/json');
    return headers;
  },
  timeout: 10000,
});

function isTokenExpired(exp: number): boolean {
  return exp < Date.now() / 1000;
}

async function handleLogout() {
  await AsyncStorage.clear();
  reset({
    index: 0,
    routes: [{name: SPLASH_SCREEN}],
  });
}

export const baseQuery = async (
  args: string | FetchArgs,
  api: any,
  extraOptions: any,
) => {
  const dispatch = api.dispatch;
  const skipLoader = api.getState()?.loader?.noLoader;

  if (!skipLoader) {
    dispatch(onLoad());
  }

  let user = await getUser();

  try {
    if (user?.access_token) {
      const {exp}: {exp: number} = jwtDecode(user.access_token);
      if (isTokenExpired(exp)) {
        if (!mutex.isLocked()) {
          const release = await mutex.acquire();
          try {
            const refreshResult = await rawBaseQuery(
              {
                url: 'auth/refresh-token',
                method: 'GET',
                headers: {
                  Authorization: `Bearer ${user.refresh_token}`,
                },
              },
              api,
              extraOptions,
            );

            if (refreshResult.data) {
              await setUser(refreshResult.data);
              user = await getUser();

              if (typeof args !== 'string') {
                args.headers = {
                  ...args.headers,
                  Authorization: `Bearer ${user.access_token}`,
                };
              }
            } else {
              await handleLogout();
              dispatch(onError());
              return {error: {status: 401, data: 'Unauthorized'}};
            }
          } finally {
            release();
          }
        } else {
          await mutex.waitForUnlock();
          user = await getUser();
        }
      }
    }

    const result = await rawBaseQuery(args, api, extraOptions);

    if (result.error?.status === 401) {
      await handleLogout();
      dispatch(onError());
    } else {
      dispatch(onSuccess());
    }

    return result;
  } catch (error) {
    dispatch(onError());
    throw error;
  } finally {
    if (!skipLoader) {
      dispatch(noLoaderShow());
    }
  }
};
