const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const eventRoutes = require('./routes/eventRoutes'); 
const authRoutes = require('./routes/authRoutes');
const path = require('path');
const bookmarkRoutes = require('./routes/bookmarkRoutes');
const notificationRoutes = require('./routes/notificationRoutes');
// 1. Baca konfigurasi dari file .env
dotenv.config();
require('./config/database');
// 2. Inisialisasi aplikasi Express
const app = express();

// 3. Pasang Middleware (Satpam/Perantara)
app.use(cors()); // Agar API bisa diakses dari HP/Emulator (Wajib untuk React Native)
app.use(express.json()); // Agar backend bisa membaca data JSON dari request body
app.use('/api/events', eventRoutes);
app.use('/api/auth', authRoutes);     // <--- Endpoint Login/Register
app.use('/api/bookmarks', bookmarkRoutes);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/api/notifications', notificationRoutes);
// 4. Route Percobaan (Hanya untuk cek server nyala/tidak)
app.get('/', (req, res) => {
    res.json({
        message: 'Server Backend EventMate Berjalan!',
        status: 'Ready'
    });
});

// 5. Jalankan Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server berjalan di port ${PORT}`);
    console.log(`Akses di: http://localhost:${PORT}`);
});