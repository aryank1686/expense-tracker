import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Home() {
  return (
    <SafeAreaView className="flex-1 bg-white items-center justify-center">
      <Text className="text-xl font-semibold">Home Screen</Text>
    </SafeAreaView>
  );
}
