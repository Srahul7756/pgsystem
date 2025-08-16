import axios, { AxiosError } from 'axios';
import { onError, onLoad, onSuccess } from '../store/slices/loaderslice';
import store from '../store';
import { clearError, showError } from '@store/slices/errorslice';
import { reset } from './../../App';
import jwt_decode, { jwtDecode } from 'jwt-decode';
import { isEmptyOrNull } from '../theme/utils';
import { getUser, setUser } from './userUtils';

const BASE_URL = 'http://192.168.180.190:5010/api/'


// Common message handler
const commonMessageHandler = (title, message, isSuccess, isInfo, isFailed) => {
  const isFailedStatus = isFailed || (!isSuccess && !isInfo);
  store.dispatch(
    showError({
      title,
      message,
      success: isSuccess,
      warning: isInfo,
      failure: isFailedStatus,
      singleButtonText: 'Ok',
      onPressTryAgain: () => store.dispatch(clearError()),
    })
  );
};

// Token expiry check
const isTokenExpired = (exp: number) => exp < Date.now() / 1000;

// Refresh token logic
const handleRefresh = async () => {

  const tokens = await getUser()

  try {
    const response = await axios.get(`${BASE_URL}auth/refresh-token`, {
      headers: { Authorization: `Bearer ${tokens?.refresh_token}` },
    });
    const accessToken = response.data?.access_token;
    await setUser(response.data)
    console.log('New access token obtained:', accessToken);
    return accessToken;
  } catch (error) {
    console.log('Token refresh failed:', error);
    store.dispatch(onSuccess());
    store.dispatch(clearError());
    reset({ index: 0, routes: [{ name: 'Login' }] });
    return null;
  }
};

// Axios instance
const baseAPI = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
baseAPI.interceptors.request.use(
  async config => {
    const noLoader = store.getState().loaderReducer.noLoader;
    !noLoader && store.dispatch(onLoad());

    // 🔓 Skip adding token for login endpoint
    if (config.url?.includes('auth/login')) {
      console.log('Skipping token for login API');
      return config;
    }
      const tokens = await getUser()

    try {
      if (!isEmptyOrNull(tokens?.access_token)) {
        const { exp }: { exp: number } = jwtDecode(tokens?.access_token);
        const isExpired = isTokenExpired(exp);

        if (isExpired) {
          const newToken = await handleRefresh();
          config.headers.Authorization = 'Bearer ' + newToken;
        } else {
          config.headers.Authorization = 'Bearer ' + tokens?.access_token;
        }
      } else {
        config.headers.Authorization = '';
      }
    } catch (err) {
      console.log('Error setting Authorization header:', err);
      config.headers.Authorization = '';
    }

    return config;
  },
  error => {
    console.log('Request error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor
baseAPI.interceptors.response.use(
  response => {
    if (response.data?.message_type) {
      const message = response.data?.msg;
      const title = response.data?.title || 'Success';
      const type = response.data.message_type?.toLowerCase();
      const isSuccess = type === 'success';
      const isFailed = type === 'error';
      const isInfo = type === 'info';
      commonMessageHandler(title, message, isSuccess, isInfo, isFailed);
    }

    store.dispatch(onSuccess());
    return response;
  },
  async error => {
    store.dispatch(onError());
    console.log('Response error:', error);

    if (axios.isAxiosError(error)) {
      const originalRequest = error.config;
      const message = error.response?.data?.msg || error.message;
      const title = error.response?.data?.title || 'Error';
      const type = error.response?.data?.message_type?.toLowerCase() || '';
      const isSuccess = type === 'success';
      const isFailed = type === 'error';
      const isInfo = type === 'info';

      if (error.response?.status === 401 && !originalRequest._retry && !message) {
        originalRequest._retry = true;
        const accessToken = await handleRefresh();

        if (accessToken) {
          axios.defaults.headers.common['Authorization'] = 'Bearer ' + accessToken;
          return baseAPI(originalRequest);
        }
      } else {
        if (type !== '') {
          commonMessageHandler(title, message, isSuccess, isInfo, isFailed);
        }
      }
    } else {
      console.log('Non-Axios error:', error);
    }

    return Promise.reject(error);
  }
);

export default baseAPI;
