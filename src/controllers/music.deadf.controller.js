import { findAll as findAllLanzamientos } from "../repository/album.repository.js";

/**
 * Función del controlador para obtener y mostrar la página de lanzamientos.
 * Ahora es una función asíncrona porque `findAllLanzamientos` lo es (debido a la lectura de archivos).
 */
export const getLanzamientosPage = async (req, res) => {
	try {
		// 1. Llama a la función del repositorio para obtener todos los lanzamientos.
		const lanzamientos = await findAllLanzamientos();

		// 2. Renderiza la plantilla EJS, pasando los datos obtenidos.
		res.render("musicdeadf", {
			pageTitle: "Mis Lanzamientos",
			lanzamientos: lanzamientos, // Pasa el array de álbumes (instancias de Album) a la plantilla
		});
	} catch (error) {
		// 3. Manejo de errores básico.
		console.error(
			"Error en el controlador al obtener y renderizar lanzamientos:",
			error,
		);
		// Envía una respuesta de error al cliente.
		res
			.status(500)
			.send("Error interno del servidor al cargar la página de lanzamientos.");
	}
};
