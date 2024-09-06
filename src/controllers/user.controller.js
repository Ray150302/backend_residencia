const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { getConnection } = require("../database");

// Registrar usuario
const registerUser = async (req, res) => {
    const { nombre, email, contraseña, tipo_usuario } = req.body;

    try {
        const connection = await getConnection();
        const hashedPassword = await bcrypt.hash(contraseña, 10);
        const result = await connection.query(
            "INSERT INTO Usuarios (nombre, email, contraseña, tipo_usuario) VALUES (?, ?, ?, ?)",
            [nombre, email, hashedPassword, tipo_usuario]
        );

        res.status(201).json({ message: "Usuario registrado correctamente", usuario_id: result.insertId });
    } catch (error) {
        console.error("Error registrando usuario:", error);
        res.status(500).json({ error: "Error registrando usuario" });
    }
};

// Login de usuario
const loginUser = async (req, res) => {
    const { email, contraseña } = req.body;

    try {
        const connection = await getConnection();
        const users = await connection.query("SELECT * FROM Usuarios WHERE email = ?", [email]);

        if (users.length === 0) {
            return res.status(404).json({ error: "Usuario no encontrado" });
        }

        const user = users[0];
        const isValidPassword = await bcrypt.compare(contraseña, user.contraseña);

        if (!isValidPassword) {
            return res.status(401).json({ error: "Contraseña incorrecta" });
        }

        const token = jwt.sign({ id: user.usuario_id, tipo_usuario: user.tipo_usuario }, process.env.jwt_secret, { expiresIn: "1h" });
        res.json({ message: "Inicio de sesión exitoso", token });
    } catch (error) {
        console.error("Error en el inicio de sesión:", error);
        res.status(500).json({ error: "Error en el inicio de sesión" });
    }
};

module.exports = {
    registerUser,
    loginUser
};
