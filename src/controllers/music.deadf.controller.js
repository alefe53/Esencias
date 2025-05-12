import albumService from "../services/album.service.js";

/**
 * Función del controlador para obtener y mostrar la página de lanzamientos.
 * Delega la obtención de datos al AlbumService.
 */
export const getLanzamientosPage = async (req, res) => {
	try {
		// Llama al servicio para obtener todos los lanzamientos.
		const lanzamientos = await albumService.getAllLanzamientos();

		// Renderiza la plantilla EJS, pasando los datos obtenidos.
		res.render("musicdeadf", {
			pageTitle: "Mis Lanzamientos",
			lanzamientos: lanzamientos, // Pasa el array de álbumes/lanzamientos a la plantilla
		});
	} catch (error) {
		console.error(
			"Error en el controlador al obtener y renderizar lanzamientos:",
			error.message,
		);
		// Envía una respuesta de error al cliente.
		res
			.status(500)
			.send(
				error.message ||
					"Error interno del servidor al cargar la página de lanzamientos.",
			);
	}
};
