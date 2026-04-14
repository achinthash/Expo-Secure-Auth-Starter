import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Text, TouchableOpacity, View } from "react-native";

import Entypo from "@expo/vector-icons/Entypo";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Link } from "expo-router";
import { useColorScheme } from "nativewind";

import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import React, { useCallback, useMemo, useRef } from "react";
import { StyleSheet } from "react-native";

import ThemeToggle from "@/app/components/ThemeToggle";
export default function settings() {
  const { colorScheme, toggleColorScheme } = useColorScheme();

  const isDark = colorScheme === "dark";

  // 1. Ref specifically for BottomSheetModal
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const snapPoints = useMemo(() => ["25%", "50%"], []);

  // 2. Open the modal
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  return (
    <View className="p-4   flex-col bg-zinc-100 dark:bg-zinc-950 h-full ">
      <BottomSheetModal
        backgroundStyle={{
          backgroundColor: isDark ? "#09090b" : "#ffffff", // zinc-950 / white
        }}
        handleIndicatorStyle={{
          backgroundColor: isDark ? "#3f3f46" : "#d4d4d8", // zinc-700 / zinc-300
        }}
        ref={bottomSheetModalRef}
        index={1}
        snapPoints={snapPoints}
        enablePanDownToClose
        backdropComponent={({ style }) => (
          <View style={[style, { backgroundColor: "rgba(0,0,0,0)" }]} />
        )}
      >
        <BottomSheetView>
          <ThemeToggle />
        </BottomSheetView>
      </BottomSheetModal>

      <Link href={"/(tabs)/settings/account"} asChild>
        <TouchableOpacity className="flex-row items-center justify-between p-4 mb-3 border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 rounded-2xl shadow-sm">
          <View className="flex-row items-center gap-4">
            <View className="bg-zinc-200 dark:bg-zinc-800 p-2 rounded-xl">
              <MaterialIcons
                name="account-circle"
                size={24}
                color={colorScheme === "dark" ? "#fff" : "#111"}
              />
            </View>
            <Text className="text-lg font-medium text-zinc-900 dark:text-zinc-100">
              Account
            </Text>
          </View>
          <MaterialIcons name="chevron-right" size={24} color="#999" />
        </TouchableOpacity>
      </Link>

      <TouchableOpacity
        onPress={handlePresentModalPress}
        className="flex-row items-center justify-between p-4 mb-3 border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 rounded-2xl shadow-sm"
      >
        <View className="flex-row items-center gap-4">
          <View className="bg-zinc-200 dark:bg-zinc-800 p-2 rounded-xl">
            <MaterialIcons
              name="dark-mode"
              size={24}
              color={colorScheme === "dark" ? "#fff" : "#111"}
            />
          </View>
          <Text className="text-lg font-medium text-zinc-900 dark:text-zinc-100">
            Theme
          </Text>
        </View>
        <MaterialIcons name="chevron-right" size={24} color="#999" />
      </TouchableOpacity>

      <Link href={"/(tabs)/settings/passcode"} asChild>
        <TouchableOpacity className="flex-row items-center justify-between p-4 mb-3 border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 rounded-2xl shadow-sm">
          <View className="flex-row items-center gap-4">
            <View className="bg-zinc-200 dark:bg-zinc-800 p-2 rounded-xl">
              <Entypo
                name="lock"
                size={24}
                color={colorScheme === "dark" ? "#fff" : "#111"}
              />
            </View>
            <Text className="text-lg font-medium text-zinc-900 dark:text-zinc-100">
              Passcode
            </Text>
          </View>
          <MaterialIcons name="chevron-right" size={24} color="#999" />
        </TouchableOpacity>
      </Link>

      <TouchableOpacity className="flex-row items-center justify-between p-4 mb-3 border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 rounded-2xl shadow-sm">
        <View className="flex-row items-center gap-4">
          <View className="bg-zinc-200 dark:bg-zinc-800 p-2 rounded-xl">
            <Ionicons
              name="notifications"
              size={24}
              color={colorScheme === "dark" ? "#fff" : "#111"}
            />
          </View>
          <Text className="text-lg font-medium text-zinc-900 dark:text-zinc-100">
            Notification
          </Text>
        </View>
        <MaterialIcons name="chevron-right" size={24} color="#999" />
      </TouchableOpacity>

      <TouchableOpacity className="flex-row items-center justify-between p-4 mb-3 border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 rounded-2xl shadow-sm">
        <View className="flex-row items-center gap-4">
          <View className="bg-zinc-200 dark:bg-zinc-800 p-2 rounded-xl">
            <MaterialIcons
              name="privacy-tip"
              size={24}
              color={colorScheme === "dark" ? "#fff" : "#111"}
            />
          </View>
          <Text className="text-lg font-medium text-zinc-900 dark:text-zinc-100">
            Privacy Policy
          </Text>
        </View>
        <MaterialIcons name="chevron-right" size={24} color="#999" />
      </TouchableOpacity>

      <TouchableOpacity className="flex-row items-center justify-between p-4 mb-3 border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 rounded-2xl shadow-sm">
        <View className="flex-row items-center gap-4">
          <View className="bg-zinc-200 dark:bg-zinc-800 p-2 rounded-xl">
            <FontAwesome6
              name="servicestack"
              size={24}
              color={colorScheme === "dark" ? "#fff" : "#111"}
            />
          </View>
          <Text className="text-lg font-medium text-zinc-900 dark:text-zinc-100">
            Services
          </Text>
        </View>
        <MaterialIcons name="chevron-right" size={24} color="#999" />
      </TouchableOpacity>

      <TouchableOpacity className="flex-row items-center justify-between p-4 mb-3 border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 rounded-2xl shadow-sm text-black">
        <View className="flex-row items-center gap-4">
          <View className="bg-zinc-200 dark:bg-zinc-800 p-2 rounded-xl">
            <MaterialIcons
              name="contact-support"
              size={24}
              color={colorScheme === "dark" ? "#fff" : "#111"}
            />
          </View>
          <Text className="text-lg font-medium text-zinc-900 dark:text-zinc-100">
            Supports
          </Text>
        </View>
        <MaterialIcons name="chevron-right" size={24} color="#999" />
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  contentContainer: {
    padding: 16,
    alignItems: "center",
  },
});
