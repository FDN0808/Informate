import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useThemeMode } from "@/hooks/useTheme";
import { Colors } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";

export default function AdminTopbar() {
  const { theme, toggleTheme } = useThemeMode();
  const c = Colors[theme];

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: c.card, borderBottomColor: c.border },
      ]}
    >
      <Text style={[styles.title, { color: c.text }]}>Admin Dashboard</Text>

      <TouchableOpacity onPress={toggleTheme}>
        <Ionicons
          name={theme === "dark" ? "sunny-outline" : "moon-outline"}
          size={24}
          color={c.text}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 60,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
  },
});
