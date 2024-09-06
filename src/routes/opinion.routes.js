const express = require("express");
const { createOpinion, deleteOpinion, getAllOpinions } = require("../controllers/opinion.controller");
const verifyToken = require("../middleware/auth");

const router = express.Router();

// Rutas de opiniones
router.post("/", verifyToken, createOpinion);
router.delete("/:id", verifyToken, deleteOpinion);
router.get("/", getAllOpinions);

module.exports = router;
