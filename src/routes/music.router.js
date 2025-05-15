import path from "node:path";
import { fileURLToPath } from "node:url";
// src/routes/music.routes.js
import express from "express";

// Importar los controladores necesarios
import { getBandaDetailPage } from "../controllers/music.conadf.banda.controller.js";
import { getMusicConAdfPage } from "../controllers/music.conadf.controller.js";
import { getLanzamientosPage } from "../controllers/music.deadf.controller.js";

// Obtener el directorio actual en ES modules (necesario para path.join si vas a servir archivos desde aquí)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Crear una instancia del router de Express
const router = express.Router();

// --- RUTAS ESPECÍFICAS DE MÚSICA ---
// Estas rutas ahora estarán prefijadas con '/music' automáticamente cuando se usen en app.js

// Ruta para /music (anteriormente en app.js)
router.get("/", (req, res) => {
	// Asumiendo que tus vistas están en src/views y __dirname en este archivo es src/routes
	// Necesitamos ajustar la ruta para que apunte correctamente a src/views
	const pathToHtml = path.join(__dirname, "..", "views", "music.html");
	console.log(`Intentando servir desde music.routes.js: ${pathToHtml}`);
	res.sendFile(pathToHtml, (err) => {
		if (err) {
			console.error("Error al enviar music.html desde music.routes.js:", err);
			if (!res.headersSent) {
				res
					.status(err.status || 500)
					.send("Error al cargar la página de inicio de música.");
			}
		}
	});
});

router.get("/musicdeadf", getLanzamientosPage);

router.get("/musicconadf", getMusicConAdfPage);

router.get("/con-adf/banda/:bandaId", getBandaDetailPage);

// Exportar el router para que pueda ser utilizado en app.js
export default router;
