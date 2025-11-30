const mysql = require('mysql2');
const dotenv = require('dotenv');

// Membaca variabel dari file .env
dotenv.config();

// Membuat pool koneksi (lebih efisien daripada koneksi biasa)
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Cek koneksi saat pertama kali jalan
pool.getConnection((err, connection) => {
    if (err) {
        console.error('❌ Gagal terkoneksi ke Database MySQL:', err.code);
        console.error('   Pastikan XAMPP (MySQL) sudah dinyalakan!');
    } else {
        console.log('✅ Berhasil terkoneksi ke Database MySQL');
        connection.release();
    }
});

// Export agar bisa dipakai di file lain
module.exports = pool.promise();