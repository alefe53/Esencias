import bandaService from "../services/banda.service.js";

/**
 * Controlador para obtener y mostrar la página de detalle de una banda específica.
 * Delega la obtención y procesamiento (ordenamiento de lanzamientos) al bandaService.
 */
export const getBandaDetailPage = async (req, res) => {
	try {
		// Obtener el ID de la banda desde los parámetros de la URL.
		const { bandaId } = req.params; // Usando destructuring para más limpieza

		// Validación básica de la entrada (puede permanecer en el controlador).
		if (!bandaId) {
			return res.status(400).send("No se proporcionó un ID de banda.");
		}

		// Llamar al método del servicio para obtener los detalles de la banda
		const banda =
			await bandaService.getBandaDetailsWithSortedLanzamientos(bandaId);

		// Renderizar la plantilla EJS 'musicconadfband.ejs'.
		res.render("musicconadfband", {
			pageTitle: banda.nombre || "Detalle de Banda", // Título de la página
			banda: banda, // Pasa el objeto banda (con lanzamientos ordenados)
		});
	} catch (error) {
		console.error(
			`Error en controlador al obtener detalle de banda ID ${req.params.bandaId}:`,
			error.message,
		);
		const statusCode = error.statusCode || 500;
		res
			.status(statusCode)
			.send(
				error.message ||
					"Error interno del servidor al cargar el detalle de la banda.",
			);
	}
};
