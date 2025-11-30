USE informate_db;

INSERT INTO users (nama, email, password, role, avatar) VALUES
('BEM Kampus', 'bem@kampus.ac.id', 'admin123', 'organizer', 'admin_logo.png'),
('Andi Mahasiswa', 'andi@kampus.ac.id', 'user123', 'student', 'andi_face.jpg'),
('Siti Peserta', 'siti@kampus.ac.id', 'user456', 'student', 'default_avatar.png');

INSERT INTO events (nama_acara, deskripsi, tanggal_mulai, tanggal_selesai, lokasi, banner_image, kategori, kuota_maksimal, creator_id) VALUES
('Musik Kampus 2025', 'Konser musik tahunan.', '2025-11-20 19:00:00', '2025-11-20 23:00:00', 'Aula Teknik', 'poster_musik.jpg', 'Umum', 200, 1),
('Seminar Tech', 'Membahas AI masa kini.', '2025-11-25 09:00:00', '2025-11-25 12:00:00', 'Zoom', 'poster_ai.jpg', 'Akademik', 50, 1);

-- Andi & Siti daftar ke acara Musik
INSERT INTO event_registrations (user_id, event_id, is_reminder_set) VALUES
(2, 1, 1), -- Andi aktifkan reminder
(3, 1, 0); -- Siti tidak