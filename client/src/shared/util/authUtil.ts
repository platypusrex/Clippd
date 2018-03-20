import { AsyncStorage } from 'react-native';

export const tokenKey = '@ecommerce:token';
const userIdKey = '@ecommerce:userId';

export async function storeAuthToken (token: string) {
  try {
    await AsyncStorage.removeItem(tokenKey);
    await AsyncStorage.setItem(tokenKey, token);
  } catch (err) {
    return err
  }
}

export async function storeUserId (userId: string) {
  try {
    await AsyncStorage.removeItem(userIdKey);
    await AsyncStorage.setItem(userIdKey, userId);
  } catch (err) {
    return err;
  }
}

export async function getAuthToken () {
  const token = await AsyncStorage.getItem(tokenKey);

  if (!token) {
    return null;
  }

  return token;
}

export async function getUserId () {
  const userId = await AsyncStorage.getItem(userIdKey);

  if (!userId) {
    return null;
  }

  return userId;
}