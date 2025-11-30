const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

module.exports = (req, res, next) => {
    // 1. Ambil token dari Header
    // Format header biasanya: "Bearer <token_panjang_disini>"
    const authHeader = req.header('Authorization');

    if (!authHeader) {
        return res.status(401).json({ message: 'Akses ditolak! Token tidak ditemukan.' });
    }

    // 2. Bersihkan prefix "Bearer " (jika ada) untuk ambil token aslinya saja
    const token = authHeader.replace('Bearer ', '');

    try {
        // 3. Verifikasi Token dengan kunci rahasia kita
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // 4. Jika valid, simpan data user (ID & Role) ke dalam request
        // Agar bisa dipakai di Controller nanti
        req.user = decoded;

        // 5. Lanjut ke fungsi berikutnya (Controller)
        next();

    } catch (error) {
        res.status(401).json({ message: 'Token tidak valid atau sudah kadaluarsa.' });
    }
};