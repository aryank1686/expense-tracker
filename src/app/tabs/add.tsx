import { useTransactionStore } from "@/store/useTransactionStore";
import { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Add() {
  const [amount, setAmount] = useState("");
  const [item, setItem] = useState("");
  const [category, setCategory] = useState("");
  const addTransaction = useTransactionStore((state) => state.addTransaction);

  const handleSave = () => {
    addTransaction({ amount, item, category });
    setAmount("");
    setItem("");
    setCategory("");
  };

  return (
    <SafeAreaView className="flex-1 bg-white px-6" edges={["top"]}>
      <Text className="text-2xl font-semibold text-slate-900 mt-4 mb-10">
        Add transaction
      </Text>

      <View className="flex-row items-center border-b border-slate-200 pb-2 mb-8">
        <Text className="text-4xl font-light text-slate-400 mr-2">₹</Text>
        <TextInput
          className="flex-1 text-4xl font-semibold text-slate-900"
          placeholder="0"
          placeholderTextColor="#cbd5e1"
          value={amount}
          onChangeText={setAmount}
          keyboardType="numeric"
        />
      </View>

      <TextInput
        className="border-b border-slate-200 py-3 text-base text-slate-900 mb-6"
        placeholder="Item"
        placeholderTextColor="#94a3b8"
        value={item}
        onChangeText={setItem}
      />
      <TextInput
        className="border-b border-slate-200 py-3 text-base text-slate-900"
        placeholder="Category"
        placeholderTextColor="#94a3b8"
        value={category}
        onChangeText={setCategory}
      />

      <TouchableOpacity
        className="bg-orange-500 rounded-xl items-center mt-8 p-4 w-28"
        onPress={handleSave}
      >
        <Text className="color-white font-semibold">Save</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
