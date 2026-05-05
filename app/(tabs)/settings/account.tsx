import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import React from "react";
import { Text, View } from "react-native";

export default function Account() {
  return (
    <View className="flex p-4 bg-zinc-100 dark:bg-zinc-950 items-center justify-center w-full h-full">
      <View className="bg-zinc-200 dark:bg-zinc-800 p-2 rounded-xl">
        <MaterialIcons name="account-circle" size={24} color="#888" />
      </View>
      <View className=" mt-12 ">
        <Text className="text-3xl font-bold text-center text-zinc-900 dark:text-zinc-100 ">
          Account Page
        </Text>
      </View>
    </View>
  );
}
