import { useAuth } from "@/context/AuthContext";
import { getPin } from "@/utills/secureStorage";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  Vibration,
  View,
} from "react-native";

import Entypo from "@expo/vector-icons/Entypo";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Ionicons from "@expo/vector-icons/Ionicons";

import * as LocalAuthentication from "expo-local-authentication";

import { useColorScheme } from "nativewind";

export default function EnterPasscode() {
  const PIN_LENGTH = 6;
  const { setIsUnlocked } = useAuth();
  const [pin, setPin] = useState("");
  const [fingerPrintEnrolled, setFingerPrintEnrolled] = useState<
    boolean | null
  >(null);

  const { colorScheme, toggleColorScheme } = useColorScheme();

  const isDark = colorScheme === "dark";

  const checkBioMetric = async () => {
    const hasHardware = await LocalAuthentication.hasHardwareAsync();
    const isEnrolled = await LocalAuthentication.isEnrolledAsync();

    if (hasHardware && isEnrolled) {
      setFingerPrintEnrolled(true);

      // check authuntication
      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: "Unlock with Face or Fingerprint",
      });

      if (result.success) {
        setIsUnlocked(true);
      } else {
        Vibration.vibrate([0, 100]);
      }
    }
  };

  useEffect(() => {
    checkBioMetric();
  }, []);

  // verify enterd pin with stored pin
  const verifyPin = async (pinToVerify: string) => {
    const savedPin = await getPin();
    if (pinToVerify === savedPin) {
      setIsUnlocked(true);
    } else {
      Vibration.vibrate([0, 50, 100, 150]);
      setPin("");
    }
  };

  // digit press and set the pin
  function pressDigit(digit: string) {
    const nextPin = pin + digit;

    if (nextPin.length > PIN_LENGTH) return;

    setPin(nextPin);

    // after 6 didit enter call verify pin function
    if (nextPin.length === PIN_LENGTH) {
      verifyPin(nextPin);
    }
  }

  // delete enterd last pin digit
  function handleDelete() {
    setPin((prev) => prev.slice(0, -1));
  }

  const keys = [
    ["1", "2", "3"],
    ["4", "5", "6"],
    ["7", "8", "9"],
    ["fingerprint", "0", "del"],
  ];

  return (
    <View className="flex p-4 items-center justify-center w-full h-full bg-zinc-100 dark:bg-zinc-950">
      <View className=" bg-gray-300 rounded-full items-center justify-center p-6 mb-16  ">
        <Entypo name="lock" size={24} color="black" />
      </View>

      <View className="mb-12 flex items-center">
        <Text className="text-3xl  font-bold mb-1 text-zinc-900 dark:text-zinc-100">
          Enter your PIN
        </Text>
        <Text className="text-md  text-zinc-500 dark:text-zinc-400">
          Use PIN / FingerPrint
        </Text>
      </View>

      <View className="flex flex-row mb-12 gap-4  ">
        {[...Array(PIN_LENGTH)].map((_, i) => (
          <View
            key={i}
            style={[pin.length > i && styles.dotActive]}
            className="p-0"
          >
            {pin.length > i ? (
              <FontAwesome
                name="asterisk"
                size={12}
                color={isDark ? "#A78BFA" : "#7C3AED"}
              />
            ) : (
              <FontAwesome
                name="circle"
                size={14}
                color={isDark ? "#52525B" : "#D4D4D8"}
              />
            )}
          </View>
        ))}
      </View>

      {keys.map((row, rowIndex) => (
        <View key={rowIndex} className="flex flex-row mb-1">
          {row.map((key, colIndex) => {
            if (key === "fingerprint" && !fingerPrintEnrolled) {
              return (
                <View key={colIndex} className="w-[65px]  h-[65px] mx-4 my-1" />
              );
            }

            return (
              <TouchableOpacity
                key={colIndex}
                className="w-[65px] h-[65px]  rounded-full items-center justify-center mx-4 my-1 bg-zinc-200 dark:bg-zinc-800
                active:bg-zinc-300 dark:active:bg-zinc-700"
                onPress={() => {
                  if (key === "del") handleDelete();
                  else if (key === "fingerprint") {
                    checkBioMetric();
                  } else {
                    pressDigit(key);
                  }
                }}
              >
                {key === "del" ? (
                  <Ionicons
                    name="backspace"
                    size={24}
                    color={isDark ? "#fff" : "#111"}
                  />
                ) : key === "fingerprint" ? (
                  <FontAwesome5
                    name="fingerprint"
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
  );
}

const styles = StyleSheet.create({
  dotActive: { borderColor: "#7B61FF" },
});
