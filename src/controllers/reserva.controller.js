const { getConnection } = require("../database");

// Crear reserva
const createReserva = async (req, res) => {
    const { usuario_id, alojamiento_id, fecha_entrada, fecha_salida, estado } = req.body;

    try {
        const connection = await getConnection();
        const result = await connection.query(
            "INSERT INTO Reservas (usuario_id, alojamiento_id, fecha_entrada, fecha_salida, estado) VALUES (?, ?, ?, ?, ?)",
            [usuario_id, alojamiento_id, fecha_entrada, fecha_salida, estado]
        );

        res.status(201).json({ message: "Reserva creada correctamente", reserva_id: result.insertId });
    } catch (error) {
        console.error("Error creando reserva:", error);
        res.status(500).json({ error: "Error creando reserva" });
    }
};

// Obtener reservas
const getAllReservas = async (req, res) => {
    try {
        const connection = await getConnection();
        const reservas = await connection.query("SELECT * FROM Reservas");

        res.json(reservas);
    } catch (error) {
        console.error("Error obteniendo reservas:", error);
        res.status(500).json({ error: "Error obteniendo reservas" });
    }
};

// Eliminar reserva
const deleteReserva = async (req, res) => {
    const { id } = req.params;

    try {
        const connection = await getConnection();
        await connection.query("DELETE FROM Reservas WHERE reserva_id = ?", [id]);

        res.json({ message: "Reserva eliminada correctamente" });
    } catch (error) {
        console.error("Error eliminando reserva:", error);
        res.status(500).json({ error: "Error eliminando reserva" });
    }
};

module.exports = {
    createReserva,
    getAllReservas,
    deleteReserva
};
