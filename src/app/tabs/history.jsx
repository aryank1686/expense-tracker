import { useTransactionStore } from "@/store/useTransactionStore";
import { FlatList, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function History() {
  const transactions = useTransactionStore((state) => state.transactions);
  return (
    <SafeAreaView className="flex-1 bg-white px-6" edges={["top"]}>
      <Text className="text-2xl font-semibold text-slate-900 mt-4 mb-6">
        All transactions
      </Text>
      <FlatList
        data={transactions}
        keyExtractor={(_, index) => index.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerClassName="pb-28"
        renderItem={({ item }) => (
          <View className="bg-slate-100 rounded-2xl p-3 mb-3">
            <View className="flex-row justify-between items-center">
              <Text className="text-xl font-semibold text-slate-900">
                {item.item}
              </Text>
              <Text className="text-xl font-bold text-slate-900">
                {`- ₹${item.amount}`}
              </Text>
            </View>
            <View className="flex-row justify-between items-center mt-3">
              <View className="bg-indigo-100 px-2.5 py-0.5 rounded-full">
                <Text className="text-xs font-medium text-indigo-600">
                  {item.category}
                </Text>
              </View>
              <Text className="text-xs text-slate-400">{item.date}</Text>
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
}
