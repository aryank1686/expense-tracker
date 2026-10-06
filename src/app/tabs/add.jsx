import { formatDate, useTransactionStore } from "@/store/useTransactionStore";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useState } from "react";
import {
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Sortable from "react-native-sortables";

export default function Add() {
  const [amount, setAmount] = useState("");
  const [item, setItem] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  const addTransaction = useTransactionStore((state) => state.addTransaction);

  const handleSave = () => {
    addTransaction({
      amount,
      item,
      category: category.trim() || "Others",
      date: formatDate(date),
    });
    setAmount("");
    setItem("");
    setCategory("");
    setDate(new Date());
  };

  const cantSave = !(Number(amount) > 0) || item.trim() === "";

  const categories = [
    "Food and dining",
    "Shopping",
    "Travelling",
    "Entertainment",
    "Medical",
    "Personal Care",
    "Education",
    "Bills and Utilities",
    "Investments",
    "Rent",
    "Taxes",
    "Insurance",
    "Gifts and Donations",
    "Sent Money Home",
  ];

  return (
    <SafeAreaView className="flex-1 bg-white px-6" edges={["top"]}>
      <View className="flex-row justify-between items-center mt-4 mb-10">
        <Text className="text-2xl font-semibold text-slate-900">
          Add transaction
        </Text>
        <TouchableOpacity
          className={`w-16 h-10 items-center justify-center rounded-full shadow-lg ${
            cantSave ? "bg-orange-200" : "bg-orange-500"
          }`}
          disabled={cantSave}
          onPress={handleSave}
        >
          <Ionicons name="save" size={22} color="white" />
        </TouchableOpacity>
      </View>

      <View className="flex-row items-center border-b border-slate-200 pb-2 mb-6">
        <Text className="text-4xl font-light text-slate-400 mr-2">₹</Text>
        <TextInput
          className="flex-1 text-4xl font-semibold text-slate-900"
          placeholder="0"
          placeholderTextColor="#cbd5e1"
          value={amount}
          onChangeText={setAmount}
          keyboardType="numeric"
        />
        <TouchableOpacity
          onPress={() => setShowPicker(true)}
          className="flex-row items-center bg-slate-100 px-3 py-1.5 rounded-full ml-2"
        >
          <Ionicons name="calendar-outline" size={14} color="#475569" />
          <Text className="text-sm font-medium text-slate-600 ml-1.5">
            {formatDate(date)}
          </Text>
        </TouchableOpacity>
      </View>

      {showPicker && (
        <DateTimePicker
          value={date}
          mode="date"
          maximumDate={new Date()}
          onValueChange={(_event, selectedDate) => {
            setDate(selectedDate);
            setShowPicker(false);
          }}
          onDismiss={() => setShowPicker(false)}
        />
      )}

      <TextInput
        className="border-b border-slate-200 py-3 text-base text-slate-900 mb-6"
        placeholder="Item"
        placeholderTextColor="#94a3b8"
        value={item}
        onChangeText={setItem}
      />

      {category ? (
        <View className="flex-row items-center self-start gap-2 bg-slate-300 px-3 py-1.5 rounded-full mb-6">
          <Text className="text-base font-medium text-slate-900">
            {category}
          </Text>
          <Pressable onPress={() => setCategory("")} hitSlop={8}>
            <Text className="text-base text-slate-900">×</Text>
          </Pressable>
        </View>
      ) : (
        <Text className="text-base text-[#94a3b8] mb-6">Category</Text>
      )}
      <Sortable.Flex gap={8} flexWrap="wrap">
        {categories.map((c) => (
          <TouchableOpacity
            className="bg-slate-100 px-3 py-1.5 rounded-full"
            onPress={() => setCategory(c)}
            key={c}
          >
            <Text className="text-sm font-medium text-slate-600">{c}</Text>
          </TouchableOpacity>
        ))}
      </Sortable.Flex>

      {/* className="text-base text-slate-900 mb-2"
        placeholder="Category"
        placeholderTextColor=""
        value={category}
        onChangeText={setCategory} */}
    </SafeAreaView>
  );
}
