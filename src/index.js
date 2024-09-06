const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const dotenv = require("dotenv");
const userRoutes = require("./routes/user.routes");
const alojamientoRoutes = require("./routes/alojamiento.routes");
const reservaRoutes = require("./routes/reserva.routes");
const ubicacionRoutes = require("./routes/ubicacion.routes");
const opinionRoutes = require("./routes/opinion.routes");

dotenv.config();

// Configuración inicial
const app = express();
app.set("port", process.env.PORT || 4000);

// Middlewares
app.use(cors({
    origin: ["http://127.0.0.1:5501"]
}));
app.use(morgan("dev"));
app.use(express.json());

// Rutas
app.use("/api/users", userRoutes);
app.use("/api/alojamientos", alojamientoRoutes);
app.use("/api/reservas", reservaRoutes);
app.use("/api/ubicaciones", ubicacionRoutes);
app.use("/api/opiniones", opinionRoutes);

// Inicio del servidor
app.listen(app.get("port"), () => {
    console.log(`Servidor escuchando en el puerto ${app.get("port")}`);
});
