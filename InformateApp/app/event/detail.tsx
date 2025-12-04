import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { View, Text } from "react-native";
import api from "../../src/api";
import { EventItem } from "../../types/event";

export default function EventDetail() {
  const { id } = useLocalSearchParams();
  const [event, setEvent] = useState<EventItem | null>(null);

  const loadDetail = async () => {
    try {
      const res = await api.get(`/event/${id}`);
      setEvent(res.data.data);
    } catch (e) {
      console.log("Error load detail:", e);
    }
  };

  useEffect(() => {
    loadDetail();
  }, []);

  if (!event)
    return (
      <View style={{ padding: 20 }}>
        <Text>Loading...</Text>
      </View>
    );

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 28, fontWeight: "bold" }}>
        {event.nama_acara}
      </Text>

      <Text style={{ marginTop: 10 }}>{event.deskripsi}</Text>
      <Text style={{ marginTop: 10 }}>Mulai: {event.tanggal_mulai}</Text>
      <Text>Selesai: {event.tanggal_selesai}</Text>
      <Text>Lokasi: {event.lokasi}</Text>
    </View>
  );
}
