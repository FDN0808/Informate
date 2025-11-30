const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notificationController');
const authMiddleware = require('../middleware/authMiddleware');

// Wajib Login
router.use(authMiddleware);

// GET /api/notifications/reminders
router.get('/reminders', notificationController.getUpcomingReminders);

module.exports = router;