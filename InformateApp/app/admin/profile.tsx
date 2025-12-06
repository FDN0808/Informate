import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { useThemeMode } from "@/hooks/useTheme";
import { Colors } from "@/constants/colors";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

export default function ProfileScreen() {
  const { theme } = useThemeMode();

  // Simpan email di variabel agar bisa dikirim ke halaman reset
  const userEmail = "admin@informate.id";

  return (
    <View style={[styles.container, { backgroundColor: Colors[theme].background }]}>

      {/* Header (Back Button) */}
      <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
        <Ionicons name="arrow-back" size={26} color={Colors[theme].text} />
      </TouchableOpacity>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Profile Info Header */}
        <View style={styles.header}>
          <Ionicons name="person-circle-outline" size={100} color="#2563eb" />
          <Text style={[styles.name, { color: Colors[theme].text }]}>Admin</Text>
          <Text style={[styles.email, { color: Colors[theme].secondaryText }]}>
            {userEmail}
          </Text>
        </View>

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

        {/* ==================================================== */}
        {/* SECTION KEAMANAN */}
        {/* ==================================================== */}
        <View
          style={[
            styles.card,
            {
              backgroundColor: Colors[theme].card,
              borderColor: Colors[theme].border,
              marginTop: 20, // Jarak dari kartu atas
            },
          ]}
        >
          <Text style={[styles.cardTitle, { color: Colors[theme].text }]}>
            Keamanan
          </Text>

          <TouchableOpacity
            style={styles.actionRow}
            onPress={() =>
              // Mengarah ke file di folder auth, sambil membawa email user
              router.push({
                pathname: "/auth/resetPassword",
                params: { email: userEmail }
              })
            }
          >
            <View style={styles.actionLeft}>
              <View style={[styles.iconBox, { backgroundColor: "#e0f2fe" }]}>
                <Ionicons name="lock-closed" size={20} color="#0284c7" />
              </View>
              <Text style={[styles.actionText, { color: Colors[theme].text }]}>
                Ganti Password
              </Text>
            </View>

            <Ionicons name="chevron-forward" size={20} color={Colors[theme].secondaryText} />
          </TouchableOpacity>
        </View>

        {/* Spacer bawah agar tidak mentok */}
        <View style={{ height: 40 }} />

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  backBtn: { marginBottom: 10 },
  header: { alignItems: "center", marginBottom: 25 },
  name: { fontSize: 24, fontWeight: "700", marginTop: 10 },
  email: { fontSize: 14, marginBottom: 20 },

  card: {
    padding: 20,
    borderWidth: 1,
    borderRadius: 16,
  },
  cardTitle: { fontSize: 18, fontWeight: "700", marginBottom: 15 }, // Margin bottom ditambah dikit
  item: { fontSize: 14, marginTop: 4, lineHeight: 22 },

  actionRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 8,
  },
  actionLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconBox: {
    width: 36,
    height: 36,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  actionText: {
    fontSize: 15,
    fontWeight: "500",
  },
});