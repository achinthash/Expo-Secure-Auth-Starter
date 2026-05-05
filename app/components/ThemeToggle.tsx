import AsyncStorage from "@react-native-async-storage/async-storage";
import { useColorScheme } from "nativewind";
import React, { useEffect } from "react";
import { Switch, Text, View } from "react-native";

type Theme = "light" | "dark";

export default function ThemeToggle() {
  const { colorScheme, setColorScheme } = useColorScheme();

  const isDark = colorScheme === "dark";

  useEffect(() => {
    const loadTheme = async () => {
      const savedTheme = await AsyncStorage.getItem("theme");

      if (savedTheme === "light" || savedTheme === "dark") {
        setColorScheme(savedTheme);
      }
    };

    loadTheme();
  }, [setColorScheme]);

  const handleToggle = async (value: boolean) => {
    const newTheme: Theme = value ? "dark" : "light";

    setColorScheme(newTheme);
    await AsyncStorage.setItem("theme", newTheme);
  };

  return (
    <View className="bg-white dark:bg-zinc-900 mx-4  rounded-2xl p-5 shadow-sm">
      {/* Title */}
      <Text className="text-xl text-center font-semibold text-gray-900 dark:text-white mb-8">
        Appearance
      </Text>

      {/* Toggle Row */}
      <View className="flex-row items-center justify-between">
        <View>
          <Text className="text-base font-medium text-gray-900 dark:text-white">
            Dark Mode
          </Text>
          <Text className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Enable dark theme for low light
          </Text>
        </View>

        <Switch value={isDark} onValueChange={handleToggle} />
      </View>
    </View>
  );
}
