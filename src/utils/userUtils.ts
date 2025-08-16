import AsyncStorage from '@react-native-async-storage/async-storage';

const USER_KEY = 'app_user';

export const getUser = async () => {
  const userData = await AsyncStorage.getItem(USER_KEY);
  return userData ? JSON.parse(userData) : null;
};

export const setUser = async (user: any) => {
  await AsyncStorage.setItem(USER_KEY, JSON.stringify(user));
};

export const clearUser = async () => {
  await AsyncStorage.removeItem(USER_KEY);
};

export const clearLocalStorage = async () => {
  try {
    const keys = await AsyncStorage.getAllKeys();
    await AsyncStorage.multiRemove(keys);
  } catch (error) {
    return error;
  }
};
