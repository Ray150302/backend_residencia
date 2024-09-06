const jwt = require("jsonwebtoken");

// Middleware de autenticación
const verifyToken = (req, res, next) => {
    const token = req.headers["authorization"];

    if (!token) {
        return res.status(403).json({ message: "Token no proporcionado." });
    }

    try {
        const decoded = jwt.verify(token, process.env.jwt_secret);
        req.user = decoded;
        next();
    } catch (error) {
        console.error("Error verificando el token:", error);
        res.status(401).json({ message: "Token inválido o expirado." });
    }
};

module.exports = verifyToken;
