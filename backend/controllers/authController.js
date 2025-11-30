const db = require('../config/database');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const { validationResult } = require('express-validator');
dotenv.config();

// 1. REGISTRASI USER BARU
exports.register = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        // Jika ada error (misal email salah), langsung stop dan kirim error ke user
        return res.status(400).json({
            success: false,
            message: 'Validasi gagal',
            errors: errors.array()
        });
    }
    try {
        // Sesuaikan input dengan kolom di tabel 'users'
        // Role di SQL teman Anda adalah: 'student' atau 'organizer'
        const { nama, email, password, role } = req.body;

        // Validasi dasar
        if (!nama || !email || !password) {
            return res.status(400).json({ message: 'Nama, Email, dan Password wajib diisi!' });
        }

        // Cek apakah email sudah terdaftar
        const [existingUser] = await db.query('SELECT email FROM users WHERE email = ?', [email]);
        if (existingUser.length > 0) {
            return res.status(400).json({ message: 'Email sudah terdaftar!' });
        }

        // Enkripsi Password (Hashing)
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Default role jika tidak diisi adalah 'student'
        const userRole = role === 'organizer' ? 'organizer' : 'student';

        // Masukkan ke Database
        const query = `INSERT INTO users (nama, email, password, role) VALUES (?, ?, ?, ?)`;
        await db.query(query, [nama, email, hashedPassword, userRole]);

        res.status(201).json({
            success: true,
            message: 'Registrasi berhasil! Silakan login.'
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Gagal registrasi',
            error: error.message
        });
    }
};

// 2. LOGIN USER
exports.login = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const { email, password } = req.body;

        // Cek user berdasarkan email
        const [users] = await db.query('SELECT * FROM users WHERE email = ?', [email]);

        if (users.length === 0) {
            return res.status(401).json({ message: 'Email atau Password salah!' });
        }

        const user = users[0];

        // Bandingkan password input dengan password hash di DB
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ message: 'Email atau Password salah!' }); // Password salah
        }

        // Jika benar, buat Token JWT
        const token = jwt.sign(
            { id: user.user_id, role: user.role }, // Payload (data yang disimpan di token)
            process.env.JWT_SECRET,                // Kunci rahasia dari .env
            { expiresIn: '1d' }                    // Token kadaluarsa dalam 1 hari
        );

        res.status(200).json({
            success: true,
            message: 'Login berhasil',
            token: token,
            user: {
                id: user.user_id,
                nama: user.nama,
                role: user.role
            }
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Gagal login',
            error: error.message
        });
    }
};