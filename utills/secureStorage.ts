import * as SecureStore from "expo-secure-store";

const PIN_KEY = "user_pin";

//  Save PIN safely
export const setPin = async (pin: string): Promise<boolean> => {
  try {
    await SecureStore.setItemAsync(PIN_KEY, pin);
    return true;
  } catch (e) {
    console.log("setPin error:", e);
    return false;
  }
};

//  Read PIN safely
export const getPin = async (): Promise<string | null> => {
  try {
    const value = await SecureStore.getItemAsync(PIN_KEY);
    return value ?? null; // normalize undefined → null
  } catch (e) {
    console.log("getPin error:", e);
    return null; //  critical: never throw
  }
};

//  Delete PIN safely
export const deletePin = async (): Promise<boolean> => {
  try {
    await SecureStore.deleteItemAsync(PIN_KEY);
    return true;
  } catch (e) {
    console.log("deletePin error:", e);
    return false;
  }
};
