import { AuthProvider, useAuth } from "@/context/AuthContext";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";

import { Stack } from "expo-router";
import { ActivityIndicator, View } from "react-native";

import "@/global.css";
import { useColorScheme } from "nativewind";
import EnterPasscode from "./components/Passcode/EnterPasscode";

import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { useEffect } from "react";

function AppContent() {
  const { hasPin, isUnlocked, isLoading } = useAuth();

  const { colorScheme, setColorScheme } = useColorScheme();

  useEffect(() => {
    const loadTheme = async () => {
      const savedTheme = await AsyncStorage.getItem("theme");

      if (savedTheme === "light" || savedTheme === "dark") {
        setColorScheme(savedTheme);
      }
    };

    loadTheme();
  }, [setColorScheme]);

  if (isLoading)
    return <ActivityIndicator className="flex-1 justify-center items-center" />;

  if (hasPin && !isUnlocked) {
    return (
      <View style={{ flex: 1 }}>
        <EnterPasscode />
      </View>
    );
  }

  return (
    <BottomSheetModalProvider>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
        </Stack>
      </ThemeProvider>
    </BottomSheetModalProvider>
  );
}

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </GestureHandlerRootView>
  );
}
