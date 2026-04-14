import * as SecureStore from "expo-secure-store";

const PIN_KEY = "user_pin";

export const setPin = async (pin: string) => {
  await SecureStore.setItemAsync(PIN_KEY, pin);
};

export const getPin = async () => {
  return await SecureStore.getItemAsync(PIN_KEY);
};

export const deletePin = async () => {
  await SecureStore.deleteItemAsync(PIN_KEY);
};
