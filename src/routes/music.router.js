// Mis-Esencias/src/routes/music.router.js
import path from "node:path";
import express from "express";

import { config } from "../../config/config.js";

import { getBandaDetailPage } from "../controllers/music.conadf.banda.controller.js";
import { getMusicConAdfPage } from "../controllers/music.conadf.controller.js";
import { getLanzamientosPage } from "../controllers/music.deadf.controller.js";

const router = express.Router();

router.get("/", (req, res) => {
	const pathToHtml = path.join(config.paths.VIEWS, "music.html");
	console.log(
		`Intentando servir desde music.routes.js usando config: ${pathToHtml}`,
	);
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

export default router;
