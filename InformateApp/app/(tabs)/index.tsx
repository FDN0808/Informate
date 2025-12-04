import { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import api from "../../src/api";
import { EventItem } from "../../types/event";

export default function HomeScreen() {
  const [events, setEvents] = useState<EventItem[]>([]);

  const loadEvents = async () => {
    try {
      const res = await api.get("/events"); // FIX di sini
      if (res.data?.data) {
        setEvents(res.data.data);
      } else {
        setEvents([]); // backend 204 → empty array
      }
    } catch (err: any) {
      console.log(err.response?.data || err.message);
    }
  };

  useEffect(() => {
    loadEvents();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Upcoming Events</Text>

      <FlatList
        data={events}
        keyExtractor={(item) => item.event_id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            {/* <Image source={{ uri: item.banner_image }} style={styles.banner} /> */}

            <Text style={styles.name}>{item.nama_acara}</Text>
            <Text style={styles.date}>{item.tanggal_mulai}</Text>
            <Text style={styles.location}>{item.lokasi}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 16,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    elevation: 3,
  },
  banner: {
    width: "100%",
    height: 160,
    borderRadius: 12,
    marginBottom: 12,
  },
  name: { fontSize: 18, fontWeight: "bold" },
  date: { color: "#555" },
  location: { color: "#777" },
});
