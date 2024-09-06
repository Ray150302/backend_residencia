const express = require("express");
const { createUbicacion, deleteUbicacion, getAllUbicaciones } = require("../controllers/ubicacion.controller");

const router = express.Router();

// Rutas de ubicaciones
router.post("/", createUbicacion);
router.delete("/:id", deleteUbicacion);
router.get("/", getAllUbicaciones);

module.exports = router;
