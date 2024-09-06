const { getConnection } = require("../database");

// Crear ubicación
const createUbicacion = async (req, res) => {
    const { direccion, ciudad, estado, pais, coordenadas } = req.body;

    try {
        const connection = await getConnection();
        const result = await connection.query(
            "INSERT INTO Ubicaciones (direccion, ciudad, estado, pais, coordenadas) VALUES (?, ?, ?, ?, POINT(?, ?))",
            [direccion, ciudad, estado, pais, ...coordenadas]
        );

        res.status(201).json({ message: "Ubicación creada correctamente", ubicacion_id: result.insertId });
    } catch (error) {
        console.error("Error creando ubicación:", error);
        res.status(500).json({ error: "Error creando ubicación" });
    }
};

// Obtener ubicaciones
const getAllUbicaciones = async (req, res) => {
    try {
        const connection = await getConnection();
        const ubicaciones = await connection.query("SELECT * FROM Ubicaciones");

        res.json(ubicaciones);
    } catch (error) {
        console.error("Error obteniendo ubicaciones:", error);
        res.status(500).json({ error: "Error obteniendo ubicaciones" });
    }
};

// Eliminar ubicación
const deleteUbicacion = async (req, res) => {
    const { id } = req.params;

    try {
        const connection = await getConnection();
        await connection.query("DELETE FROM Ubicaciones WHERE ubicacion_id = ?", [id]);

        res.json({ message: "Ubicación eliminada correctamente" });
    } catch (error) {
        console.error("Error eliminando ubicación:", error);
        res.status(500).json({ error: "Error eliminando ubicación" });
    }
};

module.exports = {
    createUbicacion,
    getAllUbicaciones,
    deleteUbicacion
};
