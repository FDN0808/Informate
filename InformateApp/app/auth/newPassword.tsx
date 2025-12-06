import { useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Alert,
    ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

// import api from "../../src/api"; // <--- Biarkan dikomentar dulu malam ini

// ==========================================
// Backend
// ==========================================
const submitNewPasswordAPI = async (password: string, token: string) => {
    // --- MOCKUP (Pakai ini dulu ntar dihapus) ---
    console.log(`[DEBUG] Mengirim ke Backend -> Password: ${password} | Token: ${token}`);

    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // Simulasi Sukses
            // Kita cek apakah user sudah mengisi token di inputan
            if (token && token.trim() !== "") {
                resolve({ data: { message: "Password updated successfully" } });
            } else {
                // Simulasi Error kalau lupa isi token
                reject(new Error("Token wajib diisi!"));
            }
        }, 2000);
    });

    //  (tinggal di-uncomment) 
    /*
    return api.post('/auth/reset-password', { 
        password: password,
        token: token 
    });
    */
};

export default function NewPassword() {
    const [token, setToken] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    // State untuk UI
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleSave = async () => {
        // Validasi Frontend
        if (!password || !confirmPassword) {
            Alert.alert("Error", "Mohon isi password dan konfirmasi password.");
            return;
        }

        if (password !== confirmPassword) {
            Alert.alert("Tidak Cocok", "Password baru dan konfirmasi tidak sama.");
            return;
        }

        if (password.length < 6) {
            Alert.alert("Terlalu Pendek", "Password minimal harus 6 karakter.");
            return;
        }

        // Validasi Token Frontend
        if (!token) {
            Alert.alert("Token Kosong", "Mohon paste token reset yang Anda dapatkan.");
            return;
        }

        setIsLoading(true);

        try {
            // 2. PANGGIL API DENGAN PARAMETER TOKEN
            // Perhatikan: sekarang kita kirim (password, token)
            await submitNewPasswordAPI(password, token);

            // 3. Jika Sukses
            Alert.alert(
                "Berhasil! 🎉",
                "Password Anda telah diperbarui. Silakan login kembali.",
                [
                    {
                        text: "Ke Halaman Login",
                        onPress: () => router.replace("/"), // Kembali ke root/login
                    },
                ]
            );

        } catch (error: any) {
            // 4. Jika Gagal
            console.error(error);
            const msg = error.message || "Gagal memperbarui password.";
            Alert.alert("Gagal", msg);

        } finally {
            setIsLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Ionicons name="shield-checkmark-outline" size={60} color="#007BFF" />
                <Text style={styles.title}>Password Baru</Text>
                <Text style={styles.subtitle}>
                    Buat password yang kuat dan mudah diingat.
                </Text>
            </View>

            {/* INPUT TOKEN MANUAL (PENTING BUAT BESOK) */}
            <View style={styles.inputContainer}>
                <Ionicons name="key-outline" size={20} color="#666" style={styles.icon} />
                <TextInput
                    style={styles.input}
                    placeholder="Paste Token Reset Disini"
                    value={token}
                    onChangeText={setToken} // State token diupdate disini
                    autoCapitalize="none"
                />
            </View>

            {/* Input Password Baru */}
            <View style={styles.inputContainer}>
                <Ionicons name="lock-closed-outline" size={20} color="#666" style={styles.icon} />
                <TextInput
                    style={styles.input}
                    placeholder="Password Baru"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={!showPassword}
                    editable={!isLoading}
                />
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                    <Ionicons
                        name={showPassword ? "eye-off-outline" : "eye-outline"}
                        size={20}
                        color="#999"
                    />
                </TouchableOpacity>
            </View>

            {/* Input Konfirmasi Password */}
            <View style={styles.inputContainer}>
                <Ionicons name="lock-closed-outline" size={20} color="#666" style={styles.icon} />
                <TextInput
                    style={styles.input}
                    placeholder="Ulangi Password Baru"
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    secureTextEntry={!showPassword}
                    editable={!isLoading}
                />
            </View>

            {/* Tombol Simpan */}
            <TouchableOpacity
                style={[styles.button, isLoading && styles.buttonDisabled]}
                onPress={handleSave}
                disabled={isLoading}
            >
                {isLoading ? (
                    <ActivityIndicator color="#fff" />
                ) : (
                    <Text style={styles.buttonText}>Simpan Password</Text>
                )}
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: "#fff",
        justifyContent: "center",
    },
    header: {
        alignItems: 'center',
        marginBottom: 30,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#333",
        marginTop: 15,
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 14,
        color: "#666",
        textAlign: "center",
    },
    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#E8E8E8",
        borderRadius: 12,
        paddingHorizontal: 15,
        marginBottom: 15,
        height: 55,
        backgroundColor: "#FAFAFA",
    },
    icon: {
        marginRight: 10,
    },
    input: {
        flex: 1,
        height: "100%",
        fontSize: 16,
    },
    button: {
        backgroundColor: "#007BFF",
        height: 55,
        borderRadius: 12,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 10,
        shadowColor: "#007BFF",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 4,
    },
    buttonDisabled: {
        backgroundColor: "#A5C9FF",
        shadowOpacity: 0,
        elevation: 0,
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
});