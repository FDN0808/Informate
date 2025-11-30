const db = require('../config/database');

// 1. TOGGLE BOOKMARK (Simpan / Hapus)
exports.toggleBookmark = async (req, res) => {
    try {
        const { event_id } = req.body;
        const user_id = req.user.id; // Diambil dari token

        if (!event_id) {
            return res.status(400).json({ message: 'Event ID wajib dikirim' });
        }

        // Cek apakah sudah di-bookmark sebelumnya?
        const checkQuery = `SELECT * FROM bookmarks WHERE user_id = ? AND event_id = ?`;
        const [existing] = await db.query(checkQuery, [user_id, event_id]);

        if (existing.length > 0) {
            // JIKA SUDAH ADA -> HAPUS (UN-BOOKMARK)
            await db.query(`DELETE FROM bookmarks WHERE user_id = ? AND event_id = ?`, [user_id, event_id]);
            return res.status(200).json({ 
                success: true, 
                message: 'Bookmark dihapus', 
                is_bookmarked: false 
            });
        } else {
            // JIKA BELUM ADA -> SIMPAN (BOOKMARK)
            await db.query(`INSERT INTO bookmarks (user_id, event_id) VALUES (?, ?)`, [user_id, event_id]);
            return res.status(200).json({ 
                success: true, 
                message: 'Event berhasil disimpan', 
                is_bookmarked: true 
            });
        }

    } catch (error) {
        res.status(500).json({ success: false, message: 'Gagal memproses bookmark', error: error.message });
    }
};

// 2. LIHAT DAFTAR BOOKMARK SAYA
exports.getMyBookmarks = async (req, res) => {
    try {
        const user_id = req.user.id;

        // Join tabel bookmarks dengan events agar dapat detail acaranya langsung
        const query = `
            SELECT 
                b.bookmark_id,
                b.created_at AS bookmarked_at,
                e.* FROM bookmarks b
            JOIN events e ON b.event_id = e.event_id
            WHERE b.user_id = ?
            ORDER BY b.created_at DESC
        `;

        const [rows] = await db.query(query, [user_id]);

        res.status(200).json({
            success: true,
            data: rows
        });

    } catch (error) {
        res.status(500).json({ success: false, message: 'Gagal mengambil bookmark', error: error.message });
    }
};