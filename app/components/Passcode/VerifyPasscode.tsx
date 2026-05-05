import React, { useState } from "react";
import { Text, TouchableOpacity, Vibration, View } from "react-native";

import Ionicons from "@expo/vector-icons/Ionicons";
import Octicons from "@expo/vector-icons/Octicons";

import { getPin } from "@/utills/secureStorage";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useColorScheme } from "nativewind";
export default function VerifyPasscode({ onVerify }: any) {
  const { colorScheme } = useColorScheme();

  const isDark = colorScheme === "dark";

  const PIN_LENGTH = 6;
  const digits = [
    ["1", "2", "3"],
    ["4", "5", "6"],
    ["7", "8", "9"],
    ["", "0", "del"],
  ];
  const [mypin, setMyPin] = useState("");
  const [error, setError] = useState("");

  const verifyEnteredPin = async (pinToVerify: string) => {
    const savedPin = await getPin();
    if (pinToVerify === savedPin) {
      // call verify method
      onVerify();
    } else {
      // vibarate for invalid
      Vibration.vibrate([0, 50, 100, 150]);
      setMyPin("");
      // error messages
      setError("Passcode don't match. Please try again.");
      setTimeout(() => setError(""), 2000);
    }
  };

  const pressDigit = async (digit: string) => {
    const newPin = mypin + digit;

    if (newPin.length > PIN_LENGTH) return;

    setMyPin(newPin);

    if (newPin.length === PIN_LENGTH) {
      verifyEnteredPin(newPin);
    }
  };

  const deleteDigit = () => {
    setMyPin((prev) => prev.slice(0, -1));
  };

  return (
    <View className="flex-1 bg-zinc-100 dark:bg-zinc-950 px-6 justify-center">
      <View className="items-center mb-8">
        <View className="bg-zinc-200 dark:bg-zinc-800 p-4 rounded-full mb-10">
          <MaterialIcons name="lock" size={28} color="#888" />
        </View>

        <Text className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
          Enter your passcode
        </Text>
        <Text className="text-zinc-500 dark:text-zinc-400  text-center mt-1">
          Please enter your current passcode to manage this settings.
        </Text>
      </View>

      <View className="flex flex-row mb-4 gap-2   ">
        {[...Array(PIN_LENGTH)].map((_, i) => {
          const isActive = i === mypin.length;
          const isFilled = i < mypin.length;
          return (
            <View
              key={i}
              className={`p-4 border rounded-lg 
            ${
              isActive
                ? "border-blue-500"
                : "border-zinc-300 dark:border-zinc-700"
            }`}
            >
              <Octicons
                name="dot-fill"
                size={14}
                color={
                  isFilled
                    ? isDark
                      ? "#fff"
                      : "#111"
                    : isDark
                      ? "#444"
                      : "#ddd"
                }
              />
            </View>
          );
        })}
      </View>

      <View className="flex items-center justify-center p-1 mb-16">
        <Text className="text-base text-red-500 font-semibold">{error}</Text>
      </View>

      <View className="">
        {digits.map((row, rowIndex) => (
          <View key={rowIndex} className="flex flex-row mb-1 ">
            {row.map((key, colIndex) => {
              if (key === "") {
                return (
                  <View
                    key={colIndex}
                    className="w-[90px] h-[60px] mx-1 my-1"
                  />
                );
              }
              return (
                <TouchableOpacity
                  onPress={() => {
                    if (key === "del") {
                      deleteDigit();
                    } else {
                      pressDigit(key);
                    }
                  }}
                  key={colIndex}
                  className="
                w-[90px] h-[55px] mx-1 
                rounded-xl items-center justify-center
                bg-zinc-200 dark:bg-zinc-800
                active:bg-zinc-300 dark:active:bg-zinc-700
              "
                >
                  {key === "del" ? (
                    <Ionicons
                      name="backspace"
                      size={24}
                      color={isDark ? "#fff" : "#111"}
                    />
                  ) : (
                    <Text className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
                      {key}
                    </Text>
                  )}
                </TouchableOpacity>
              );
            })}
          </View>
        ))}
      </View>
    </View>
  );
}
