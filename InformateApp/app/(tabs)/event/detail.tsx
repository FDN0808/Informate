import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Image, // <--- Pastikan import Image
  Dimensions
} from "react-native";
import api from "../../../src/api";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

export default function EventDetail() {
  const { id } = useLocalSearchParams();
  const [event, setEvent] = useState<any>(null);

  const loadDetail = async () => {
    try {
      setEvent(null); // Reset dulu agar loading muncul saat ganti event
      const res = await api.get(/events/${id}); // Pastikan endpoint jamak '/events'
      setEvent(res.data.data);
    } catch (e) {
      console.log("Error load detail:", e);
    }
  };

  // === PERBAIKAN NAVIGASI ===
  // Tambahkan [id] agar fungsi jalan setiap kali ID berubah
  useEffect(() => {
    if (id) loadDetail();
  }, [id]); 

  if (!event)
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#4f46e5" />
      </View>
    );

  return (
    <View style={{ flex: 1 }}>
      <LinearGradient
        colors={["#e0f2fe", "#eef2ff", "#f5f3ff"]}
        style={StyleSheet.absoluteFillObject}
      />

      <ScrollView contentContainerStyle={styles.container}>
        
        {/* === TAMPILKAN GAMBAR === */}
        {event.image_url ? (
          <Image 
            source={{ uri: event.image_url }} 
            style={styles.bannerImage} 
            resizeMode="cover"
          />
        ) : (
          <View style={[styles.bannerImage, styles.placeholderBanner]}>
            <Ionicons name="image-outline" size={50} color="#9ca3af" />
            <Text style={{color: "#9ca3af"}}>Tidak ada gambar</Text>
          </View>
        )}

        <View style={styles.headerCard}>
          <Text style={styles.title}>{event.nama_acara}</Text>
          <Text style={styles.subtitle}>Detail informasi lengkap acara</Text>
        </View>

        <View style={styles.glassCard}>
          <Text style={styles.cardTitle}>Deskripsi</Text>
          <Text style={styles.content}>{event.deskripsi}</Text>
        </View>

        <View style={styles.glassCard}>
          <Text style={styles.cardTitle}>Waktu & Lokasi</Text>
          <View style={styles.row}>
            <Ionicons name="calendar-outline" size={20} color="#4338ca" />
            <Text style={styles.content}>
               {new Date(event.tanggal_mulai).toLocaleString()}
            </Text>
          </View>
          <View style={[styles.row, { marginTop: 8 }]}>
            <Ionicons name="location-outline" size={20} color="#4338ca" />
            <Text style={styles.content}>{event.lokasi}</Text>
          </View>
        </View>

        <View style={styles.glassCard}>
          <Text style={styles.cardTitle}>Info Lainnya</Text>
          <View style={styles.row}>
            <Ionicons name="pricetag-outline" size={20} color="#4338ca" />
            <Text style={styles.content}>Kategori: {event.kategori}</Text>
          </View>
          <View style={[styles.row, {marginTop: 8}]}>
            <Ionicons name="cash-outline" size={20} color="#4338ca" />
            <Text style={styles.content}>
               Harga: {event.harga_tiket == 0 ? "GRATIS" : Rp ${event.harga_tiket}}
            </Text>
          </View>
           <View style={[styles.row, {marginTop: 8}]}>
            <Ionicons name="people-outline" size={20} color="#4338ca" />
            <Text style={styles.content}>Kuota: {event.kuota_maksimal} Peserta</Text>
          </View>
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, paddingBottom: 60 },
  
  // Style Gambar
  bannerImage: {
    width: "100%",
    height: 220,
    borderRadius: 22,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.6)",
    backgroundColor: '#ddd'
  },
  placeholderBanner: {
    justifyContent: "center",
    alignItems: "center",
  },

  headerCard: {
    marginBottom: 20,
    padding: 24,
    borderRadius: 22,
    backgroundColor: "rgba(255,255,255,0.6)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.8)",
  },
  title: { fontSize: 26, fontWeight: "900", color: "#1e1b4b" },
  subtitle: { marginTop: 4, fontSize: 14, color: "#6b7280" },
  glassCard: {
    marginBottom: 18,
    padding: 18,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.4)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.6)",
  },
  cardTitle: { fontSize: 18, fontWeight: "800", color: "#312e81", marginBottom: 12 },
  content: { fontSize: 15, color: "#1f2937", lineHeight: 22, flex: 1 },
  row: { flexDirection: "row", alignItems: "center", gap: 10 },
});