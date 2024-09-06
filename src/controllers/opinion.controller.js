const { getConnection } = require("../database");

// Crear opinión
const createOpinion = async (req, res) => {
    const { usuario_id, alojamiento_id, calificacion, comentario } = req.body;

    try {
        const connection = await getConnection();
        const result = await connection.query(
            "INSERT INTO Opiniones (usuario_id, alojamiento_id, calificacion, comentario) VALUES (?, ?, ?, ?)",
            [usuario_id, alojamiento_id, calificacion, comentario]
        );

        res.status(201).json({ message: "Opinión creada correctamente", opinion_id: result.insertId });
    } catch (error) {
        console.error("Error creando opinión:", error);
        res.status(500).json({ error: "Error creando opinión" });
    }
};

// Obtener opiniones
const getAllOpinions = async (req, res) => {
    try {
        const connection = await getConnection();
        const opiniones = await connection.query("SELECT * FROM Opiniones");

        res.json(opiniones);
    } catch (error) {
        console.error("Error obteniendo opiniones:", error);
        res.status(500).json({ error: "Error obteniendo opiniones" });
    }
};

// Eliminar opinión
const deleteOpinion = async (req, res) => {
    const { id } = req.params;

    try {
        const connection = await getConnection();
        await connection.query("DELETE FROM Opiniones WHERE opinion_id = ?", [id]);

        res.json({ message: "Opinión eliminada correctamente" });
    } catch (error) {
        console.error("Error eliminando opinión:", error);
        res.status(500).json({ error: "Error eliminando opinión" });
    }
};

module.exports = {
    createOpinion,
    getAllOpinions,
    deleteOpinion
};
