import Ionicons from "@expo/vector-icons/Ionicons";
import { Tabs } from "expo-router";
import { Pressable } from "react-native";

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="add"
        options={{
          title: "Add Transaction",
          tabBarLabel: () => null,
          tabBarButton: ({ onPress }) => (
            <Pressable
              onPress={onPress}
              className="absolute -top-6 h-16 w-16 self-center items-center justify-center rounded-full bg-orange-500"
            >
              <Ionicons name="add" size={30} color="white" />
            </Pressable>
          ),
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          title: "History",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="time" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
