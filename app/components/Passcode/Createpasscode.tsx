import { useAuth } from "@/context/AuthContext";

import Entypo from "@expo/vector-icons/Entypo";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

import { setPin } from "@/utills/secureStorage";
import Octicons from "@expo/vector-icons/Octicons";
import { useColorScheme } from "nativewind";
export default function Createpasscode({ onDone }: any) {
  const PIN_LENGTH = 6;

  const { setHasPin } = useAuth();

  const [step, setStep] = useState("create");

  const [mypin, setMyPin] = useState("");
  const [confirmPin, setConfirmPin] = useState("");
  const [error, setError] = useState("");
  const currentPin = step === "create" ? mypin : confirmPin;

  const { colorScheme } = useColorScheme();

  const isDark = colorScheme === "dark";

  const save = async () => {
    await setPin(mypin);
    // await refreshPin();
    await setHasPin(true);

    onDone();
  };

  const pressDigit = async (digit: string) => {
    const newPin = currentPin + digit;

    if (newPin.length > PIN_LENGTH) return;

    if (step === "create") {
      setMyPin(newPin);

      if (newPin.length === PIN_LENGTH) {
        setTimeout(() => setStep("confirm"), 300);
      }
    } else {
      setConfirmPin(newPin);

      if (newPin.length === PIN_LENGTH) {
        // check pin and confirm pin are matching
        if (mypin === newPin) {
          await save();
        } else {
          setConfirmPin("");
          setError("Passcode don't match. Please try again.");

          setTimeout(() => setError(""), 2000);
        }
      }
    }
  };

  const deleteDigit = () => {
    if (step === "create") {
      setMyPin((prev) => prev.slice(0, -1));
    } else {
      setConfirmPin((prev) => prev.slice(0, -1));
    }
  };

  const digits = [
    ["1", "2", "3"],
    ["4", "5", "6"],
    ["7", "8", "9"],
    ["", "0", "del"],
  ];

  return (
    <View className="flex p-4 items-center justify-center w-full h-full">
      <View className=" bg-zinc-100 dark:bg-zinc-950 rounded-full items-center justify-center p-6 mb-16  ">
        <Entypo name="lock" size={24} color="black" />
      </View>
      <View className=" ">
        <Text className="text-3xl font-bold text-center text-zinc-900 dark:text-zinc-100">
          {step === "create" ? "Create a Passcode" : "Re-enter your passcode"}
        </Text>

        <Text className="text-center text-zinc-500 dark:text-zinc-400 mt-2 text-base mb-10">
          {step === "create"
            ? "Please enter any 6 digits that you will use to unlock You app."
            : "If you forget your passcode, you'll need to log out or uninstall the App. All details will be lost."}
        </Text>
      </View>

      <View className="flex flex-row mb-4 gap-2   ">
        {[...Array(PIN_LENGTH)].map((_, i) => {
          const isActive = i === currentPin.length;
          const isFilled = i < currentPin.length;

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
