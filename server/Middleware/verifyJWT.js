const jwt = require('jsonwebtoken');
require('dotenv').config();
const verifyJWT = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) return res.sendStatus(401);
    const token = authHeader.split(' ')[1];
    jwt.verify(
        token,
        process.env.JWT_SECRET,
        (err, decoded) => {
            if (err) {
                // Kiểm tra lỗi nếu là do token hết hạn
                if (err.name === "TokenExpiredError") {
                    return res.status(401).json({ message: "Token đã hết hạn. Vui lòng đăng nhập lại!" });
                }
                return res.sendStatus(403); // Forbidden
            }
            next();
        }
    )
}

module.exports = verifyJWT;