const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { check } = require('express-validator');

// Endpoint: /api/auth/register
router.post('/register', [
    // --- ATURAN VALIDASI ---
    check('nama', 'Nama tidak boleh kosong').not().isEmpty(),
    check('email', 'Format email tidak valid').isEmail(), // Cek harus format a@b.com
    check('password', 'Password minimal 6 karakter').isLength({ min: 6 }) // Cek panjang
], authController.register);

// Endpoint: /api/auth/login
router.post('/login', [
    check('email', 'Email tidak valid').isEmail(),
    check('password', 'Password wajib diisi').exists()
], authController.login);

module.exports = router;