const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).json({ message: 'Токен отсутствует в заголовке Authorization' });
        }

        const token = authHeader.split(' ')[1];

        if (!token) {
            return res.status(401).json({ message: 'Токен отсутствует' });
        }

        const decoded = jwt.verify(token, process.env.SECRET_KEY);

        req.userData = decoded;

        next(); 
    } catch (error) {
        return res.status(401).json({ message: 'Ошибка аутентификации: ' + error.message });
    }
};
