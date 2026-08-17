import * as SecureStore from 'expo-secure-store';

// Save Token
async function saveToken(key: string, value: any) {
  await SecureStore.setItemAsync(key, value);
}

// Retrieve Token
async function getToken(key: string) {
  return await SecureStore.getItemAsync(key);
}

// Remove Token (Logout)
async function deleteToken(key: string) {
  await SecureStore.deleteItemAsync(key);
}


export {
    deleteToken, getToken, saveToken
};
