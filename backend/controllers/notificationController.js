const db = require('../config/database');

// AMBIL DAFTAR PENGINGAT (REMINDER)
exports.getUpcomingReminders = async (req, res) => {
    try {
        const userId = req.user.id; // Dari token

        // Query: Ambil event yang di-bookmark user DAN tanggalnya masih di masa depan
        // Kita juga bisa hitung selisih waktu untuk mempermudah frontend
        const query = `
            SELECT 
                e.event_id, 
                e.nama_acara, 
                e.tanggal_mulai, 
                e.lokasi,
                e.banner_image,
                TIMESTAMPDIFF(HOUR, NOW(), e.tanggal_mulai) as jam_menuju_event
            FROM bookmarks b
            JOIN events e ON b.event_id = e.event_id
            WHERE b.user_id = ? 
            AND e.tanggal_mulai > NOW() 
            ORDER BY e.tanggal_mulai ASC
        `;

        const [rows] = await db.query(query, [userId]);

        res.status(200).json({
            success: true,
            message: 'Daftar pengingat event yang akan datang',
            data: rows
        });

    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error', error: error.message });
    }
};