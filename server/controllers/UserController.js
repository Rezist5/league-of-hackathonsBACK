const ApiError = require('../error/ApiError');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const path = require('path');
const { BlacklistedToken } = require('../models/models');

const generateJwt = (id, email, role) => {
    return jwt.sign(
        { id, email, role },
        process.env.SECRET_KEY,
        { expiresIn: '24h' }
    );
};

class UserController {
    async registration(req, res, next) {
        const { email, password, fullname, role } = req.body;
        if (!email || !password || !fullname || !['participant', 'mentor'].includes(role)) {
            return next(ApiError.badRequest('Некорректные данные для регистрации'));
        }
        const candidate = await User.findOne({ where: { email } });
        if (candidate) {
            return next(ApiError.badRequest('Пользователь с таким email уже существует'));
        }
        const hashPassword = await bcrypt.hash(password, 5);
        const user = await User.create({ email, fullname, password: hashPassword, role });
        const token = generateJwt(user.id, user.email, user.role);
        return res.json({ token });
    }

    async login(req, res, next) {
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return next(ApiError.internal('Пользователь не найден'));
        }
        const comparePassword = bcrypt.compareSync(password, user.password);
        if (!comparePassword) {
            return next(ApiError.internal('Указан неверный пароль'));
        }
        const token = generateJwt(user.id, user.email, user.role);
        return res.json({ token });
    }

    async uploadAvatar(req, res, next) {
        try {
            if (!req.file) {
                return next(ApiError.badRequest('Файл не найден'));
            }
    
            const { filename } = req.file;
            const user = req.user; 
    
            const avatarPath = path.join(__dirname, '..', 'static/avatars', filename);
            user.avatar = avatarPath;
            await user.save();
    
            return res.json({ message: 'Аватар успешно загружен', avatarPath });
        } catch (error) {
            next(error);
        }
    }

    async check(req, res, next) {
        try {
            const token = req.headers.authorization.split(' ')[1];
            return res.json({ token });
        } catch (error) {
            return res.status(401).json({ message: 'Ошибка аутентификации: ' + error.message });
        }
    }

    async logout(req, res, next) {
        try {
            const token = req.headers.authorization.split(' ')[1];
            await BlacklistedToken.create({ token });
            return res.json({ message: 'Вы успешно вышли из системы' });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new UserController();
