const multer = require('multer');
const path = require('path');

// Konfigurasi penyimpanan
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // Simpan di folder 'uploads'
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        // Format nama file: timestamp-namaasli.jpg
        // Contoh: 1732960000-poster.jpg
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

// Filter agar hanya menerima gambar (jpg, jpeg, png)
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg') {
        cb(null, true);
    } else {
        cb(new Error('Format file tidak didukung! Hanya boleh JPG/PNG.'), false);
    }
};

const upload = multer({ 
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5 // Batas ukuran file 5MB
    },
    fileFilter: fileFilter
});

module.exports = upload;