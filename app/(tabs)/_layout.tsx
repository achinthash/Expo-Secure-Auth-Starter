import { Tabs } from "expo-router";

import Entypo from "@expo/vector-icons/Entypo";
import Ionicons from "@expo/vector-icons/Ionicons";

import { useColorScheme } from "nativewind";
export default function TabsLayout() {
  const { colorScheme } = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarLabelStyle: {
          fontSize: 12,
        },
        headerStyle: {
          backgroundColor: colorScheme === "dark" ? "#000000" : "#ffffff",
        },
        headerTintColor: colorScheme === "dark" ? "#ffffff" : "#000000",
        headerShown: true,
        tabBarActiveTintColor: "teal",
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          headerShown: true,
          headerTitleAlign: "center",
          headerTitleStyle: {
            fontSize: 26,
            fontWeight: "bold",
          },
          tabBarActiveTintColor: colorScheme === "dark" ? "#ffffff" : "#000000",
          tabBarInactiveTintColor:
            colorScheme === "dark" ? "#888888" : "#999999",

          tabBarStyle: {
            backgroundColor: colorScheme === "dark" ? "#000000" : "#ffffff",
          },

          tabBarIcon: ({ color }) => (
            <Entypo name="home" size={24} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          headerShown: false,
          headerTitleStyle: {
            fontSize: 26,
            fontWeight: "bold",
          },
          tabBarActiveTintColor: colorScheme === "dark" ? "#ffffff" : "#000000",
          tabBarInactiveTintColor:
            colorScheme === "dark" ? "#888888" : "#999999",

          tabBarStyle: {
            backgroundColor: colorScheme === "dark" ? "#000000" : "#ffffff",
          },
          // popToTopOnBlur: true,
          tabBarIcon: ({ color }) => (
            <Ionicons name="settings" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

// screenOptions={{ tabBarActiveTintColor: "teal" }}

// <Tabs.Protected guard={true}>
//          <Tabs.Screen
//           name="firstScreen"
//           options={{
//             tabBarLabel: "Home",
//             title: "hii",
//             // href: null,
//             tabBarBadge: 1,
//             tabBarBadgeStyle: {
//               backgroundColor: "green",
//               alignItems: "center",
//               justifyContent: "center",
//               fontSize: 12,
//               borderRadius: 35,
//             },
//             tabBarIcon: ({ color, size }) => (
//               <Feather name="calendar" size={size} color={color} />
//             ),
//           }}
//         />
//       </Tabs.Protected>

//       <Tabs.Screen
//         name="second"
//         options={{
//           title: "second",
//           headerShown: false,
//           popToTopOnBlur: true,
//         }}
//       />
