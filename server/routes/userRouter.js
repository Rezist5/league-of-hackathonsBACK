const express = require('express');
const multer = require('multer');
const UserController = require('../controllers/UserController');
const authMiddleware = require('../middleware/authMiddleware'); // Если есть middleware для проверки токенов

const router = express.Router();

const upload = multer({ dest: 'static/avatars/' });

router.post('/register', UserController.registration);

router.post('/login', UserController.login);

router.post('/upload-avatar', authMiddleware, upload.single('avatar'), UserController.uploadAvatar);

router.get('/check', authMiddleware, UserController.check);

router.post('/logout', authMiddleware, UserController.logout);

module.exports = router;
