const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

// 🔹 Por ahora simulamos una base de usuarios
const USERS = [
    { id: 1, username: "admin", password: "1234" }
];

const SECRET_KEY = "clave_super_secreta";

router.post('/login', (req, res) => {
    const { username, password } = req.body;

    const user = USERS.find(u =>
        u.username === username && u.password === password
    );

    if (!user) {
        return res.status(401).json({ message: "Usuario o contraseña incorrectos" });
    }

    const token = jwt.sign(
        { id: user.id, username: user.username },
        SECRET_KEY,
        { expiresIn: "1h" }
    );

    res.json({
        message: "Login exitoso",
        token
    });
});

module.exports = router;
