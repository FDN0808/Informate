import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import api from "../../src/api";
import { router } from "expo-router";

export default function CreateEvent() {
  const [nama, setNama] = useState("");
  const [tanggal, setTanggal] = useState("");
  const [lokasi, setLokasi] = useState("");

  const handleCreate = async () => {
    try {
      await api.post("/event", {
        nama_acara: nama,
        tanggal_mulai: tanggal,
        lokasi,
      });

      router.replace("/admin");
    } catch (e) {
      console.log("CREATE ERROR:", e);
    }
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 22, marginBottom: 20 }}>Tambah Event</Text>

      <TextInput
        placeholder="Nama Acara"
        style={input}
        value={nama}
        onChangeText={setNama}
      />

      <TextInput
        placeholder="Tanggal Mulai"
        style={input}
        value={tanggal}
        onChangeText={setTanggal}
      />

      <TextInput
        placeholder="Lokasi"
        style={input}
        value={lokasi}
        onChangeText={setLokasi}
      />

      <TouchableOpacity style={button} onPress={handleCreate}>
        <Text style={{ color: "#fff", textAlign: "center" }}>Simpan</Text>
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
  backgroundColor: "blue",
  padding: 14,
  borderRadius: 10,
};
