import { View, Text } from "react-native";

export default function App() {
  return (
    <View className="flex-1 items-center justify-center bg-zinc-950 px-6">
      <Text className="text-3xl font-bold text-emerald-400">
        Expo Go + Tailwind
      </Text>
      <Text className="mt-2 text-zinc-400 text-center">
        NativeWind v4 is ready to use.
      </Text>
    </View>
  );
}