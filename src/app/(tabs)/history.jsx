import { useTransactionStore } from "@/store/useTransactionStore";
import { useState } from "react";
import { FlatList, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function History() {
  const transactions = useTransactionStore((state) => state.transactions);
  const [selected, setSelected] = useState([]);
  const selectMode = selected.length > 0;

  const toggle = (id) =>
    setSelected((selected) =>
      selected.includes(id)
        ? selected.filter((selectedId) => selectedId !== id)
        : [...selected, id],
    );

  const deleteSelected = () => {
    useTransactionStore.setState((state) => ({
      transactions: state.transactions.filter(
        (transaction) => !selected.includes(transaction.id),
      ),
    }));
    setSelected([]);
  };

  return (
    <SafeAreaView className="flex-1 bg-white px-6" edges={["top"]}>
      <View className="flex-row justify-between items-center mt-4 mb-6">
        <View>
          <Text className="text-2xl font-semibold text-slate-900">
            All transactions
          </Text>
          {selectMode && (
            <Text className="text-sm font-medium text-slate-400 mt-0.5">
              {selected.length} selected
            </Text>
          )}
        </View>

        {selectMode && (
          <Pressable
            onPress={deleteSelected}
            className="bg-red-100 px-3 py-1.5 rounded-full"
          >
            <Text className="text-sm font-semibold text-red-600">Delete</Text>
          </Pressable>
        )}
      </View>
      <FlatList
        data={transactions}
        extraData={selected}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerClassName="pb-28"
        renderItem={({ item }) => {
          const isSelected = selected.includes(item.id);
          return (
            <Pressable
              onLongPress={() => !selectMode && toggle(item.id)}
              onPress={() => selectMode && toggle(item.id)}
              className={`rounded-2xl p-3 mb-3 ${
                isSelected ? "bg-slate-300" : "bg-slate-100"
              }`}
            >
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
            </Pressable>
          );
        }}
      />
    </SafeAreaView>
  );
}
