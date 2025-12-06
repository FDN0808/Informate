const crypto = require('crypto');
const bcrypt = require('bcryptjs'); 
const db = require('../config/database'); 

// A. LOGIKA MINTA TOKEN (FORGOT)
exports.forgotPassword = (req, res) => {
    const { email } = req.body;

    // 1. Cek Email
    db.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
        if (err) return res.status(500).send({ message: 'Error server' });
        if (results.length === 0) return res.status(404).send({ message: 'Email tidak terdaftar' });

        // 2. Buat Token & Expiry (1 Jam)
        const token = crypto.randomBytes(20).toString('hex');
        const expires = Date.now() + 3600000;

        // 3. Simpan ke DB
        db.query('UPDATE users SET reset_token = ?, reset_expires = ? WHERE email = ?',
            [token, expires, email], (err, result) => {
                if (err) return res.status(500).send({ message: 'Gagal update token' });

                // 4. KIRIM EMAIL (MOCKUP: LOG KE TERMINAL)
                console.log("==================================");
                console.log(`[EMAIL MOCKUP] To: ${email}`);
                console.log(`[TOKEN RESET]  : ${token}`);
                console.log("==================================");

                res.send({ message: 'Token terkirim ke terminal backend' });
            });
    });
};

// B. LOGIKA SIMPAN PASSWORD BARU (RESET)
exports.resetPassword = async (req, res) => {
    const { token, password } = req.body;

    // 1. Cek Token Valid & Belum Expired
    db.query('SELECT * FROM users WHERE reset_token = ? AND reset_expires > ?',
        [token, Date.now()], async (err, results) => {
            if (err) return res.status(500).send({ message: 'Error server' });
            if (results.length === 0) return res.status(400).send({ message: 'Token tidak valid atau kadaluarsa' });

            const user = results[0];

            // 2. Hash Password Baru
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            // 3. Update Password & Hapus Token
            db.query('UPDATE users SET password = ?, reset_token = NULL, reset_expires = NULL WHERE id = ?',
                [hashedPassword, user.id], (err, result) => {
                    if (err) return res.status(500).send({ message: 'Gagal update password' });

                    res.send({ message: 'Password berhasil diubah' });
                });
        });
};