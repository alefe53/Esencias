import express from "express";
import { config } from "../config/config.js";

import musicRoutes from "./routes/music.router.js";

const app = express();

// Configurar el motor de plantillas EJS
app.set("view engine", "ejs");

// Especificar la ubicación de tus archivos de plantillas (views)
app.set("views", config.paths.VIEWS);

// Configurar archivos estáticos correctamente
app.use(express.static(config.paths.PUBLIC));

// --- MONTAR ROUTERS ---
app.use("/music", musicRoutes);

// --- RUTAS GENERALES DE LA APLICACIÓN ---
app.get("/", (req, res) => {
	res.redirect("/music");
});

// Iniciar servidor
app.listen(config.server.PORT, config.server.HOST, () => {
	const message = `🎸🎧 SERVER is UP at http://${config.server.HOST}:${config.server.PORT} 📻`;
	console.log(message);
	console.log(
		`🔊 Entrá con Control + Click 👓 : http://${config.server.HOST}:${config.server.PORT}/music`,
	);
});
