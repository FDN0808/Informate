import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useThemeMode } from "@/hooks/useTheme";
import { Colors } from "@/constants/colors";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

export default function ProfileScreen() {
  const { theme } = useThemeMode();

  return (
    <View
      style={[styles.container, { backgroundColor: Colors[theme].background }]}
    >
      {/* Header */}
      <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
        <Ionicons name="arrow-back" size={26} color={Colors[theme].text} />
      </TouchableOpacity>

      <View style={styles.header}>
        <Ionicons name="person-circle-outline" size={100} color="#2563eb" />
        <Text style={[styles.name, { color: Colors[theme].text }]}>Admin</Text>
        <Text style={[styles.email, { color: Colors[theme].secondaryText }]}>
          admin@informate.id
        </Text>
      </View>

      {/* Info Section */}
      <View
        style={[
          styles.card,
          {
            backgroundColor: Colors[theme].card,
            borderColor: Colors[theme].border,
          },
        ]}
      >
        <Text style={[styles.cardTitle, { color: Colors[theme].text }]}>
          Informasi Akun
        </Text>

        <Text style={[styles.item, { color: Colors[theme].secondaryText }]}>
          • Role: Administrator
        </Text>
        <Text style={[styles.item, { color: Colors[theme].secondaryText }]}>
          • Akses: Full Access
        </Text>
        <Text style={[styles.item, { color: Colors[theme].secondaryText }]}>
          • Sistem: Informate Management
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  backBtn: { marginBottom: 20 },
  header: { alignItems: "center", marginBottom: 25 },
  name: { fontSize: 24, fontWeight: "700", marginTop: 10 },
  email: { fontSize: 14, marginBottom: 20 },
  card: {
    padding: 20,
    borderWidth: 1,
    borderRadius: 16,
  },
  cardTitle: { fontSize: 18, fontWeight: "700", marginBottom: 10 },
  item: { fontSize: 14, marginTop: 4 },
});
