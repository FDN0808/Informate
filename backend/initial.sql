CREATE DATABASE IF NOT EXISTS informate_db;
USE informate_db;

-- Reset Tabel (urutan penghapusan penting)
DROP TABLE IF EXISTS event_registrations;
DROP TABLE IF EXISTS events;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
  user_id INT AUTO_INCREMENT PRIMARY KEY,
  nama VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL, 
  role ENUM('student', 'organizer') NOT NULL DEFAULT 'student',
  avatar VARCHAR(255) DEFAULT 'default_avatar.png', -- Menyimpan path/nama file. Contoh: 'uploads/avatars/user1.jpg'
  
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE events (
  event_id INT AUTO_INCREMENT PRIMARY KEY,
  nama_acara VARCHAR(255) NOT NULL,
  deskripsi TEXT,
  
  tanggal_mulai DATETIME NOT NULL,
  tanggal_selesai DATETIME DEFAULT NULL, 
  
  lokasi VARCHAR(150),
  
  banner_image VARCHAR(255) DEFAULT 'default_event.jpg',
  kategori VARCHAR(50) DEFAULT 'Umum', 
  
  harga_tiket DECIMAL(12, 0) DEFAULT 0,

  kuota_maksimal INT DEFAULT 30, 
  
  contact_person VARCHAR(100) NOT NUll,

  creator_id INT, 
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  FOREIGN KEY (creator_id) REFERENCES users(user_id) ON DELETE SET NULL
);

CREATE TABLE event_registrations (
  registration_id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  event_id INT NOT NULL,
  registered_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  is_reminder_set TINYINT(1) DEFAULT 0,
  
  FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
  FOREIGN KEY (event_id) REFERENCES events(event_id) ON DELETE CASCADE,
  UNIQUE KEY (user_id, event_id)
);
