import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Pressable, Text, View, useColorScheme } from "react-native";


export default function Home() {
  const scheme = useColorScheme();

  return (
    <View className="flex-1 bg-zinc-100 dark:bg-zinc-950 px-5 pt-16">
      <View className="mb-8">
        <Text className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">
          Welcome 👋
        </Text>
        <Text className="text-zinc-500 dark:text-zinc-400 mt-1">
          Your secure app is ready to use
        </Text>
      </View>

      <View className="bg-white dark:bg-zinc-900 rounded-2xl p-6 mb-6 border border-zinc-200 dark:border-zinc-800">
        <View className="flex-row items-center mb-4">
          <View className="bg-zinc-200 dark:bg-zinc-800 p-3 rounded-full mr-3">
            <MaterialIcons
              name="lock"
              size={22}
              color={scheme === "dark" ? "#fff" : "#111"}
            />
          </View>

          <Text className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
            Security Status
          </Text>
        </View>

        <Text className="text-zinc-600 dark:text-zinc-400">
          Your app is protected with a passcode. Keep your data safe and secure.
        </Text>
      </View>

      <View className="gap-4">
        <Pressable className="bg-white dark:bg-zinc-900 py-4 rounded-2xl border border-zinc-200 dark:border-zinc-800">
          <Text className="text-center text-zinc-700 dark:text-zinc-300 font-medium">
            Learn More
          </Text>
        </Pressable>
      </View>

      <View className="absolute bottom-6 left-0 right-0 items-center">
        <Text className="text-zinc-400 text-sm">Simple PIN Auth App</Text>
      </View>
    </View>
  );
}
