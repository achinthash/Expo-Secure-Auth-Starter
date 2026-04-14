import { Stack } from "expo-router";

import { useColorScheme } from "nativewind";

export default function TabsLayout() {
  const { colorScheme } = useColorScheme();
  return (
    <Stack
      screenOptions={{
        headerTitleAlign: "center",
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: "Settings",
          headerStyle: {
            backgroundColor: colorScheme === "dark" ? "#000000" : "#ffffff",
          },
          headerTintColor: colorScheme === "dark" ? "#ffffff" : "#000000",
          headerTitleStyle: {
            fontSize: 26,
            fontWeight: "bold",
          },
        }}
      />

      <Stack.Screen
        name="account"
        options={{
          title: "Account",
          headerTitleStyle: {
            fontSize: 20,
            fontWeight: "bold",
          },
        }}
      />

      <Stack.Screen
        name="passcode"
        options={{
          title: "Passcode",
          headerTitleStyle: {
            fontSize: 20,
            fontWeight: "bold",
          },
        }}
      />
    </Stack>
  );
}
