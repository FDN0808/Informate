import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/colors";
import { useThemeMode } from "@/hooks/useTheme";

export default function AdminDashboard() {
  const { theme, toggleTheme } = useThemeMode();
  const isDark = theme === "dark";

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: Colors[theme].background }]}
    >
      {/* TOPBAR */}
      <View style={styles.topbar}>
        <Text style={[styles.topbarTitle, { color: Colors[theme].text }]}>
          Admin Dashboard
        </Text>

        <TouchableOpacity onPress={toggleTheme}>
          <Ionicons
            name={isDark ? "sunny-outline" : "moon-outline"}
            size={26}
            color={Colors[theme].text}
          />
        </TouchableOpacity>
      </View>

      {/* ANALYTICS SECTION */}
      <View style={styles.analyticsRow}>
        <View
          style={[
            styles.analyticsCard,
            {
              backgroundColor: Colors[theme].card,
              borderColor: Colors[theme].border,
            },
          ]}
        >
          <Ionicons name="people-outline" size={30} color="#2563eb" />
          <Text style={[styles.analyticsNumber, { color: Colors[theme].text }]}>
            1,241
          </Text>
          <Text
            style={[
              styles.analyticsLabel,
              { color: Colors[theme].secondaryText },
            ]}
          >
            Total Users
          </Text>
        </View>

        <View
          style={[
            styles.analyticsCard,
            {
              backgroundColor: Colors[theme].card,
              borderColor: Colors[theme].border,
            },
          ]}
        >
          <Ionicons name="calendar-outline" size={30} color="#10b981" />
          <Text style={[styles.analyticsNumber, { color: Colors[theme].text }]}>
            34
          </Text>
          <Text
            style={[
              styles.analyticsLabel,
              { color: Colors[theme].secondaryText },
            ]}
          >
            Total Events
          </Text>
        </View>

        <View
          style={[
            styles.analyticsCard,
            {
              backgroundColor: Colors[theme].card,
              borderColor: Colors[theme].border,
            },
          ]}
        >
          <Ionicons name="shield-checkmark-outline" size={30} color="#f59e0b" />
          <Text style={[styles.analyticsNumber, { color: Colors[theme].text }]}>
            7
          </Text>
          <Text
            style={[
              styles.analyticsLabel,
              { color: Colors[theme].secondaryText },
            ]}
          >
            Admins
          </Text>
        </View>
      </View>

      {/* UPCOMING EVENTS */}
      <Text style={[styles.sectionTitle, { color: Colors[theme].text }]}>
        Upcoming Events
      </Text>

      {["Tech Expo 2025", "Creative Workshop", "Business Seminar"].map(
        (item, idx) => (
          <TouchableOpacity
            key={idx}
            style={[
              styles.card,
              {
                backgroundColor: Colors[theme].card,
                borderColor: Colors[theme].border,
              },
            ]}
          >
            <Text style={[styles.cardTitle, { color: Colors[theme].text }]}>
              {item}
            </Text>
            <Text
              style={[styles.cardDate, { color: Colors[theme].secondaryText }]}
            >
              {12 + idx} January 2025
            </Text>
          </TouchableOpacity>
        )
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },

  topbar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 25,
  },

  topbarTitle: {
    fontSize: 26,
    fontWeight: "800",
  },

  analyticsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 30,
  },

  analyticsCard: {
    width: "30%",
    paddingVertical: 18,
    borderRadius: 18,
    borderWidth: 1,
    alignItems: "center",
  },

  analyticsNumber: {
    fontSize: 24,
    fontWeight: "800",
    marginTop: 6,
  },

  analyticsLabel: {
    fontSize: 12,
    marginTop: 4,
  },

  sectionTitle: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 12,
  },

  card: {
    padding: 18,
    borderRadius: 16,
    borderWidth: 1,
    marginBottom: 14,
  },

  cardTitle: {
    fontSize: 18,
    fontWeight: "700",
  },

  cardDate: {
    marginTop: 6,
    fontSize: 14,
  },
});
