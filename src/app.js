import path from "node:path";
import { fileURLToPath } from "node:url";
import express from "express";
import { config } from "../config/config.js";

// Obtener el directorio actual en ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename); // Esto es '.../Mis-Esencias/src'

const app = express();

// Configurar archivos estáticos correctamente
// Sube un nivel desde 'src' para encontrar 'public'
app.use(express.static(path.join(__dirname, "..", "public")));

app.get("/music", (req, res) => {
	const pathToHtml = path.join(__dirname, "..", "views", "music.html");
	console.log(`Intentando servir: ${pathToHtml}`); // Para depuración
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

app.get("/music/musicdeadf", (req, res) => {
	const pathToDeadf = path.join(__dirname, "..", "views", "music.deadf.html");
	res.sendFile(pathToDeadf, (err) => {
		if (err) {
			console.error("Error al enviar music.deadf.html:", err);
			if (!res.headersSent) {
				res.status(err.status || 500).send("Error al cargar la página.");
			}
		}
	});
});

// AÑADIDO: Redirección de la ruta raíz "/" a "/music"
app.get("/", (req, res) => {
	res.redirect("/music");
});

// Iniciar servidor
app.listen(config.PORT, () => {
	const message = `🎸🎧 SERVER is UP at http://${config.HOST}:${config.PORT} 📻`;
	console.log(message);
	console.log(
		`🔊 Entrá con Control + Click 👓 : http://${config.HOST}:${config.PORT}/`,
	);
});
