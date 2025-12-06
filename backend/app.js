const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const eventRoutes = require('./routes/eventRoutes'); 
const authRoutes = require('./routes/authRoutes');
const path = require('path');
const bookmarkRoutes = require('./routes/bookmarkRoutes');
const notificationRoutes = require('./routes/notificationRoutes');

// 1. Load environment variables
dotenv.config();
require('./config/database');

// 2. Initialize Express
const app = express();

// 3. CORS Configuration (PENTING untuk React Native!)
const corsOptions = {
  origin: '*', // Izinkan semua origin (untuk development)
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'ngrok-skip-browser-warning'],
  credentials: true,
  optionsSuccessStatus: 200
};

// Pasang CORS middleware (ini sudah handle preflight OPTIONS otomatis)
app.use(cors(corsOptions));

// 4. Body Parser Middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// 5. Static Files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// 6. Request Logger (untuk debugging)
app.use((req, res, next) => {
  console.log(`📨 ${req.method} ${req.path}`);
  next();
});

// 7. Health Check Route (sebelum API routes)
app.get('/', (req, res) => {
  res.json({
    message: 'Server Backend EventMate Berjalan!',
    status: 'Ready',
    timestamp: new Date().toISOString()
  });
});

// Test route untuk cek koneksi
app.get('/api/test', (req, res) => {
  res.json({
    success: true,
    message: 'API connection successful!',
    headers: req.headers
  });
});

// 8. API Routes
app.use('/api/events', eventRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/bookmarks', bookmarkRoutes);
app.use('/api/notifications', notificationRoutes);

// 9. 404 Handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
    path: req.path
  });
});

// 10. Error Handler
app.use((err, req, res, next) => {
  console.error('❌ Server Error:', err);
  res.status(500).json({
    success: false,
    message: 'Internal Server Error',
    error: err.message
  });
});

// 11. Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log('=================================');
  console.log(`✅ Server berjalan di port ${PORT}`);
  console.log(`📍 Local: http://localhost:${PORT}`);
  console.log(`📍 Network: http://0.0.0.0:${PORT}`);
  console.log('=================================');
});