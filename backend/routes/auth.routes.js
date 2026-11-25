const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const { authenticate, requireRole } = require('../middlewares/auth.middleware');

router.post('/login', authController.login);
router.get('/me', authenticate, authController.me);
router.post('/change-password', authenticate, authController.changePassword);

module.exports = router;
