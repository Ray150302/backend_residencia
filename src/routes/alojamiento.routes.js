const express = require("express");
const { createAlojamiento, updateAlojamiento, deleteAlojamiento, getAllAlojamientos } = require("../controllers/alojamiento.controller");
const verifyToken = require("../middleware/auth");

const router = express.Router();

// Rutas de alojamientos
router.post("/", verifyToken, createAlojamiento);
router.put("/:id", verifyToken, updateAlojamiento);
router.delete("/:id", verifyToken, deleteAlojamiento);
router.get("/", getAllAlojamientos);

module.exports = router;
