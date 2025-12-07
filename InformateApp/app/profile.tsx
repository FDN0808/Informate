// app/profile.tsx
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  StatusBar,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useThemeMode } from "@/hooks/useTheme";
import { Colors } from "@/constants/colors";

export default function ProfileScreen() {
  const router = useRouter();
  const { theme, toggleTheme } = useThemeMode();
  const c = Colors[theme];

  // contoh dummy user (nanti bisa dihubungkan ke backend)
  const user = {
    name: "Nama Pengguna",
    email: "user@mail.com",
    avatar: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
  };

  return (
    <View style={[styles.container, { backgroundColor: c.background }]}>
      <StatusBar
        barStyle={theme === "dark" ? "light-content" : "dark-content"}
      />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={22} color={c.text} />
        </TouchableOpacity>

        <Text style={[styles.headerTitle, { color: c.text }]}>Profile</Text>

        <TouchableOpacity onPress={toggleTheme}>
          <Ionicons
            name={theme === "dark" ? "sunny-outline" : "moon-outline"}
            size={22}
            color={c.text}
          />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
        {/* User info */}
        <View style={styles.profileSection}>
          <Image source={{ uri: user.avatar }} style={styles.avatar} />
          <Text style={[styles.name, { color: c.text }]}>{user.name}</Text>
          <Text style={[styles.email, { color: c.secondaryText }]}>
            {user.email}
          </Text>
        </View>

        {/* Menu section */}
        <View style={styles.menuWrapper}>
          <MenuItem
            icon="bookmark-outline"
            label="My Bookmarks"
            color={c.text}
            onPress={() => router.push("/bookmark")}
          />
          <MenuItem
            icon="color-palette-outline"
            label="Switch Theme"
            color={c.text}
            onPress={toggleTheme}
          />
        </View>

        {/* Logout */}
        <TouchableOpacity style={styles.logoutBtn}>
          <Ionicons name="log-out-outline" size={20} color="#ef4444" />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

/* COMPONENT: Menu Item */
const MenuItem = ({ icon, label, color, onPress }: any) => (
  <TouchableOpacity style={styles.menuItem} onPress={onPress}>
    <Ionicons name={icon} size={20} color={color} />
    <Text style={[styles.menuLabel, { color }]}>{label}</Text>
    <Ionicons
      name="chevron-forward"
      size={20}
      color={color}
      style={{ opacity: 0.5 }}
    />
  </TouchableOpacity>
);

/* STYLES */
const styles = StyleSheet.create({
  container: { flex: 1 },

  header: {
    paddingHorizontal: 16,
    paddingTop: 48,
    paddingBottom: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  backBtn: {
    padding: 8,
    borderRadius: 8,
  },

  headerTitle: {
    fontSize: 20,
    fontWeight: "700",
  },

  profileSection: {
    alignItems: "center",
    marginTop: 10,
    paddingBottom: 20,
  },

  avatar: {
    width: 110,
    height: 110,
    borderRadius: 55,
    marginBottom: 14,
  },

  name: {
    fontSize: 22,
    fontWeight: "800",
  },

  email: {
    fontSize: 14,
    marginTop: 2,
  },

  menuWrapper: {
    marginTop: 20,
    paddingHorizontal: 16,
  },

  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderColor: "rgba(0,0,0,0.07)",
  },

  menuLabel: {
    fontSize: 16,
    fontWeight: "600",
    flex: 1,
    marginLeft: 12,
  },

  logoutBtn: {
    marginTop: 30,
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    gap: 6,
  },

  logoutText: {
    fontSize: 15,
    fontWeight: "700",
    color: "#ef4444",
  },
});
