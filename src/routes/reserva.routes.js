const express = require("express");
const { createReserva, deleteReserva, getAllReservas } = require("../controllers/reserva.controller");
const verifyToken = require("../middleware/auth");

const router = express.Router();

// Rutas de reservas
router.post("/", verifyToken, createReserva);
router.delete("/:id", verifyToken, deleteReserva);
router.get("/", verifyToken, getAllReservas);

module.exports = router;
