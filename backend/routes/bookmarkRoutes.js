const express = require('express');
const router = express.Router();
const bookmarkController = require('../controllers/bookmarkController');
const authMiddleware = require('../middleware/authMiddleware');

// Semua fitur bookmark WAJIB Login
router.use(authMiddleware);

// POST /api/bookmarks (Untuk Add/Remove)
router.post('/', bookmarkController.toggleBookmark);

// GET /api/bookmarks (Untuk lihat daftar simpanan)
router.get('/', bookmarkController.getMyBookmarks);

module.exports = router;