import path from "node:path";
import { fileURLToPath } from "node:url";
import express from "express";
import { config } from "../config/config.js";

import { getBandaDetailPage } from "./controllers/music.conadf.banda.controller.js";
import { getMusicConAdfPage } from "./controllers/music.conadf.controller.js";
import { getLanzamientosPage } from "./controllers/music.deadf.controller.js";

// Obtener el directorio actual en ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// 1. Configurar el motor de plantillas EJS (DEBE IR ANTES DE LAS RUTAS QUE LO USAN)
app.set("view engine", "ejs");
// 2. Especificar la ubicación de tus archivos de plantillas (views)
app.set("views", path.join(__dirname, "views"));

// 3. Configurar archivos estáticos correctamente
app.use(express.static(path.join(__dirname, "..", "public")));

// --- RUTAS ---
app.get("/music/musicdeadf", getLanzamientosPage);

app.get("/music/musicconadf", getMusicConAdfPage);

app.get("/music/con-adf/banda/:bandaId", getBandaDetailPage);

app.get("/music", (req, res) => {
	const pathToHtml = path.join(__dirname, "views", "music.html");
	console.log(`Intentando servir: ${pathToHtml}`);
	res.sendFile(pathToHtml, (err) => {
		if (err) {
			console.error("Error al enviar music.html:", err);
			if (!res.headersSent) {
				res
					.status(err.status || 500)
					.send("Error al cargar la página de inicio.");
			}
		}
	});
});

// Redirección de la ruta raíz "/" a "/music"
app.get("/", (req, res) => {
	res.redirect("/music");
});

// Iniciar servidor
app.listen(config.PORT, () => {
	const message = `🎸🎧 SERVER is UP at http://${config.HOST}:${config.PORT} 📻`;
	console.log(message);
	console.log(
		`🔊 Entrá con Control + Click 👓 : http://${config.HOST}:${config.PORT}/music`,
	);
});
