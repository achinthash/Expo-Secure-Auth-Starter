import { useAuth } from "@/context/AuthContext";
import { deletePin } from "@/utills/secureStorage";
import { router } from "expo-router";
import React, { useState } from "react";
import { Alert, Pressable, Text, View } from "react-native";

import MaterialIcons from "@expo/vector-icons/MaterialIcons";

import ChangePasscode from "@/app/components/Passcode/ChangePasscode";
import Createpasscode from "@/app/components/Passcode/Createpasscode";
import VerifyPasscode from "@/app/components/Passcode/VerifyPasscode";
import { useColorScheme } from "nativewind";
export default function passcode() {
  const { colorScheme, toggleColorScheme } = useColorScheme();

  const isDark = colorScheme === "dark";
  const { hasPin, isUnlocked, setIsUnlocked, isLoading, refreshPin } =
    useAuth();

  const [verified, setVerified] = useState(false);
  const [mode, setMode] = useState("idle");

  // remove passcode
  const handleTurnOff = async () => {
    Alert.alert(
      "Turn Off Passcode",
      "Are you sure you want to disable the passcode?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Turn Off",
          style: "destructive",
          onPress: async () => {
            await deletePin();
            setIsUnlocked(true);
            refreshPin();

            router.replace("/(tabs)/settings");
          },
        },
      ],
    );
  };

  // verify pin
  if (hasPin && !verified) {
    return <VerifyPasscode onVerify={() => setVerified(true)} />;
  }

  // create passcode
  if (mode === "create") {
    return (
      <Createpasscode
        onDone={() => {
          (setMode("idle"), setVerified(true));
        }}
      />
    );
  }

  // change passcode
  if (mode === "change") {
    return (
      <ChangePasscode
        onDone={() => {
          setMode("idle");
        }}
      />
    );
  }

  //  if dont have pin
  if (!hasPin) {
    return (
      <View className="p-4 justify-center items-center w-full h-full bg-zinc-100 dark:bg-zinc-950">
        <View className="w-full bg-white dark:bg-zinc-900 p-6 rounded-2xl">
          <Text className="text-3xl font-bold text-center text-gray-900 dark:text-white">
            Set Your Passcode
          </Text>

          <Text className="text-center text-gray-500 dark:text-gray-400 mt-2 mb-10">
            Create a 6-digit PIN to secure your account
          </Text>

          <View className="items-center mb-10">
            <MaterialIcons
              name="password"
              size={38}
              color={isDark ? "#e4e4e7" : "#111827"}
            />
          </View>

          <Pressable
            onPress={() => setMode("create")}
            className="bg-zinc-900 dark:bg-white py-4 rounded-2xl"
          >
            <Text className="text-white dark:text-black text-center font-semibold text-base">
              Enable Passcode
            </Text>
          </Pressable>

          <Text className="text-center text-gray-400 dark:text-gray-500 mt-6 text-sm">
            You will use this PIN to unlock the app
          </Text>
        </View>
      </View>
    );
  }

  // if have pin
  return (
    <View className="flex-1 bg-zinc-100 dark:bg-zinc-950 p-4 justify-center items-center">
      <View className="w-full max-w-md">
        {/* Header */}
        <View className="items-center mb-16">
          <View className="bg-gray-200 dark:bg-zinc-800 p-4 rounded-full mb-6">
            <MaterialIcons
              name="lock"
              size={28}
              color={isDark ? "#e4e4e7" : "#333"}
            />
          </View>

          <Text className="text-2xl font-bold text-gray-900 dark:text-white">
            Passcode
          </Text>

          <Text className="text-gray-500 dark:text-gray-400 text-center mt-1">
            Manage your app security settings
          </Text>
        </View>

        {/* Card */}
        <View className="bg-white dark:bg-zinc-900 rounded-2xl overflow-hidden border border-gray-100 dark:border-zinc-800">
          {/* Change Passcode */}
          <Pressable
            onPress={() => setMode("change")}
            className="flex-row justify-between p-4 border-b border-gray-100 dark:border-zinc-800"
          >
            <Text className="text-lg font-medium text-gray-900 dark:text-white">
              Change Passcode
            </Text>

            <MaterialIcons
              name="chevron-right"
              size={22}
              color={isDark ? "#a1a1aa" : "#999"}
            />
          </Pressable>

          {/* Auto Lock */}
          <Pressable className="flex-row justify-between p-4 border-b border-gray-100 dark:border-zinc-800">
            <Text className="text-lg font-medium text-gray-900 dark:text-white">
              Auto-Lock
            </Text>

            <Text className="text-gray-400 dark:text-gray-500 text-sm">
              Immediately
            </Text>
          </Pressable>

          {/* Turn Off */}
          <Pressable onPress={handleTurnOff} className="p-4">
            <Text className="text-lg text-red-500 font-semibold">
              Turn Passcode Off
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}
