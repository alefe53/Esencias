// src/app.js
import path from "node:path";
import { fileURLToPath } from "node:url";
import express from "express";
import { config } from "../config/config.js";

// Importar el router de música
import musicRoutes from "./routes/music.router.js"; // Nueva importación

// Obtener el directorio actual en ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// 1. Configurar el motor de plantillas EJS (DEBE IR ANTES DE LAS RUTAS QUE LO USAN)
app.set("view engine", "ejs");
// 2. Especificar la ubicación de tus archivos de plantillas (views)
// __dirname aquí es src/
app.set("views", path.join(__dirname, "views"));

// 3. Configurar archivos estáticos correctamente
// __dirname aquí es src/, por lo que subimos un nivel a la raíz del proyecto para encontrar 'public'
app.use(express.static(path.join(__dirname, "..", "public")));

// --- MONTAR ROUTERS ---
// Todas las rutas definidas en music.routes.js ahora estarán bajo el prefijo /music
app.use("/music", musicRoutes);

// --- RUTAS GENERALES DE LA APLICACIÓN ---

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
