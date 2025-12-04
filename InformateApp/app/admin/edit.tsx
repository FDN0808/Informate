import { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import api from "../../src/api";

export default function EditEvent() {
  const { id } = useLocalSearchParams();

  const [nama, setNama] = useState("");
  const [tanggal, setTanggal] = useState("");
  const [lokasi, setLokasi] = useState("");

  const loadDetail = async () => {
    try {
      const res = await api.get(`/event/${id}`);
      const event = res.data.data;

      setNama(event.nama_acara);
      setTanggal(event.tanggal_mulai);
      setLokasi(event.lokasi);
    } catch (e) {
      console.log("DETAIL ERROR:", e);
    }
  };

  const handleSave = async () => {
    try {
      await api.put(`/event/${id}`, {
        nama_acara: nama,
        tanggal_mulai: tanggal,
        lokasi,
      });

      router.replace("/admin");
    } catch (e) {
      console.log("UPDATE ERROR:", e);
    }
  };

  useEffect(() => {
    loadDetail();
  }, []);

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 22, marginBottom: 20 }}>Edit Event #{id}</Text>

      <TextInput
        style={input}
        value={nama}
        onChangeText={setNama}
        placeholder="Nama Acara"
      />

      <TextInput
        style={input}
        value={tanggal}
        onChangeText={setTanggal}
        placeholder="Tanggal Mulai"
      />

      <TextInput
        style={input}
        value={lokasi}
        onChangeText={setLokasi}
        placeholder="Lokasi"
      />

      <TouchableOpacity style={button} onPress={handleSave}>
        <Text style={{ color: "white", textAlign: "center" }}>Simpan</Text>
      </TouchableOpacity>
    </View>
  );
}

const input = {
  borderWidth: 1,
  borderColor: "#ccc",
  padding: 10,
  borderRadius: 10,
  marginBottom: 15,
};

const button = {
  backgroundColor: "green",
  padding: 14,
  borderRadius: 10,
};
