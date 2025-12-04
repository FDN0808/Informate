import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { Colors } from "@/constants/theme";

export default function ExploreScreen() {
  const theme = useColorScheme();
  const isDark = theme === "dark";

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: Colors[theme].background }]}
    >
      {/* Search Bar */}
      <TextInput
        placeholder="Search events..."
        placeholderTextColor={Colors[theme].secondaryText}
        style={[
          styles.searchBar,
          {
            backgroundColor: Colors[theme].card,
            color: Colors[theme].text,
          },
        ]}
      />

      {/* Categories */}
      <View style={styles.categoryContainer}>
        {["Music", "Tech", "Art", "Sport"].map((cat) => (
          <TouchableOpacity
            key={cat}
            style={[styles.category, { backgroundColor: Colors[theme].tint }]}
          >
            <Text style={{ color: "#fff", fontWeight: "600" }}>{cat}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={[styles.sectionTitle, { color: Colors[theme].text }]}>
        Recommended
      </Text>

      <View style={[styles.recoCard, isDark && styles.recoCardDark]}>
        <Text style={[styles.recoTitle, { color: Colors[theme].text }]}>
          Mini Concert Night
        </Text>
        <Text style={[styles.recoDate, { color: Colors[theme].secondaryText }]}>
          Live @ Jakarta
        </Text>
      </View>

      <View style={[styles.recoCard, isDark && styles.recoCardDark]}>
        <Text style={[styles.recoTitle, { color: Colors[theme].text }]}>
          Startup Pitch Day
        </Text>
        <Text style={[styles.recoDate, { color: Colors[theme].secondaryText }]}>
          25 Feb 2025
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },

  searchBar: {
    borderRadius: 14,
    padding: 14,
    fontSize: 16,
    marginBottom: 20,
  },

  categoryContainer: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 20,
  },

  category: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
  },

  sectionTitle: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 10,
  },

  recoCard: {
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 16,
    marginBottom: 15,
    elevation: 3,
  },

  recoCardDark: {
    backgroundColor: "#1e1e1e",
  },

  recoTitle: {
    fontSize: 18,
    fontWeight: "700",
  },

  recoDate: {
    marginTop: 6,
    fontSize: 14,
    opacity: 0.7,
  },
});
