const { getConnection } = require("../database");

// Crear alojamiento
const createAlojamiento = async (req, res) => {
    const { nombre, descripcion, precio_noche, capacidad, ubicacion_id, admin_id } = req.body;

    try {
        const connection = await getConnection();
        const result = await connection.query(
            "INSERT INTO Alojamientos (nombre, descripcion, precio_noche, capacidad, ubicacion_id, admin_id) VALUES (?, ?, ?, ?, ?, ?)",
            [nombre, descripcion, precio_noche, capacidad, ubicacion_id, admin_id]
        );

        res.status(201).json({ message: "Alojamiento creado correctamente", alojamiento_id: result.insertId });
    } catch (error) {
        console.error("Error creando alojamiento:", error);
        res.status(500).json({ error: "Error creando alojamiento" });
    }
};

// Obtener alojamientos
const getAllAlojamientos = async (req, res) => {
    try {
        const connection = await getConnection();
        const alojamientos = await connection.query("SELECT * FROM Alojamientos");

        res.json(alojamientos);
    } catch (error) {
        console.error("Error obteniendo alojamientos:", error);
        res.status(500).json({ error: "Error obteniendo alojamientos" });
    }
};

// Actualizar alojamiento
const updateAlojamiento = async (req, res) => {
    const { id } = req.params;
    const { nombre, descripcion, precio_noche, capacidad, ubicacion_id, admin_id } = req.body;

    try {
        const connection = await getConnection();
        await connection.query(
            "UPDATE Alojamientos SET nombre = ?, descripcion = ?, precio_noche = ?, capacidad = ?, ubicacion_id = ?, admin_id = ? WHERE alojamiento_id = ?",
            [nombre, descripcion, precio_noche, capacidad, ubicacion_id, admin_id, id]
        );

        res.json({ message: "Alojamiento actualizado correctamente" });
    } catch (error) {
        console.error("Error actualizando alojamiento:", error);
        res.status(500).json({ error: "Error actualizando alojamiento" });
    }
};

// Eliminar alojamiento
const deleteAlojamiento = async (req, res) => {
    const { id } = req.params;

    try {
        const connection = await getConnection();
        await connection.query("DELETE FROM Alojamientos WHERE alojamiento_id = ?", [id]);

        res.json({ message: "Alojamiento eliminado correctamente" });
    } catch (error) {
        console.error("Error eliminando alojamiento:", error);
        res.status(500).json({ error: "Error eliminando alojamiento" });
    }
};

module.exports = {
    createAlojamiento,
    getAllAlojamientos,
    updateAlojamiento,
    deleteAlojamiento
};
