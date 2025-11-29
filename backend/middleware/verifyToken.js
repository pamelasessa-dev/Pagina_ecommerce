const jwt = require('jsonwebtoken');

const SECRET_KEY = "clave_super_secreta";

// Middleware para verificar el token JWT
const verifyToken = (req, res, next) => {
    // 1. Obtener el token del header Authorization
    const token = req.headers.authorization?.split(' ')[1]; // Formato: "Bearer <token>"

    // 2. Verificar que el token existe
    if (!token) {
        return res.status(403).json({ 
            message: "Token no proporcionado. Acceso denegado." 
        });
    }

    // 3. Verificar y decodificar el token
    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        req.user = decoded; // Guardar datos del usuario en la petición
        next(); // Continuar con la siguiente función/ruta
    } catch (error) {
        // Token inválido o expirado
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ 
                message: "Token expirado. Por favor, inicia sesión nuevamente." 
            });
        }
        return res.status(401).json({ 
            message: "Token inválido. Acceso denegado." 
        });
    }
};

module.exports = verifyToken;
