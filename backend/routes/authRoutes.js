const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
// 1. IMPORT CONTROLLER BARU (Tambahkan baris ini)
const resetController = require('../controllers/resetController'); 
const { check } = require('express-validator');

// Endpoint: /api/auth/register
router.post('/register', [
    check('nama', 'Nama tidak boleh kosong').not().isEmpty(),
    check('email', 'Format email tidak valid').isEmail(),
    check('password', 'Password minimal 6 karakter').isLength({ min: 6 })
], authController.register);

// Endpoint: /api/auth/login
router.post('/login', [
    check('email', 'Email tidak valid').isEmail(),
    check('password', 'Password wajib diisi').exists()
], authController.login);

// Endpoint: /api/auth/forgot-password
// Menerima input: email
router.post('/forgot-password', [
    // Kita validasi biar backend gak error kalau email kosong/salah format
    check('email', 'Format email tidak valid').isEmail()
], resetController.forgotPassword);

// Endpoint: /api/auth/reset-password
// Menerima input: token, password
router.post('/reset-password', [
    check('token', 'Token wajib disertakan').not().isEmpty(),
    check('password', 'Password baru minimal 6 karakter').isLength({ min: 6 })
], resetController.resetPassword);

module.exports = router;