// src/controllers/music.trabajos.controller.js
import trabajosService from "../services/trabajos.service.js";

/**
 * Controlador para obtener y mostrar la página de listado de trabajos.
 */
export const getTrabajosPage = async (req, res) => {
	try {
		const trabajosOrdenados =
			await trabajosService.getTrabajosOrdenadosPorReciente(); // Método de servicio corregido

		res.render("trabajosMusic", {
			// Nombre de tu vista EJS para la lista
			pageTitle: "Mis Trabajos de Ingeniería de Sonido",
			trabajos: trabajosOrdenados, // Variable 'trabajos' para la vista
			currentPath: "/music/trabajos", // Para la navegación activa, si la usas
		});
	} catch (error) {
		console.error(
			"Error en el controlador al obtener la página de Trabajos:",
			error.message,
		);
		// Considera tener una página de error genérica
		res.status(error.statusCode || 500).render("errorPage", {
			// Suponiendo errorPage.ejs
			pageTitle: "Error",
			errorMessage: error.message || "Error interno al cargar los trabajos.",
			errorCode: error.statusCode || 500,
		});
	}
};

/**
 * Controlador para obtener y mostrar la página de detalle de un trabajo específico.
 * (Este lo añadí en la respuesta anterior y lo mantengo aquí)
 */
export const getTrabajoDetailPage = async (req, res) => {
	try {
		const trabajoId = req.params.trabajoId;
		const trabajo = await trabajosService.getTrabajoDetails(trabajoId);

		res.render("trabajosMusic", {
			pageTitle: trabajo.titulo || "Trabajos Musicales en los que trabajé",
			trabajo: trabajo,
		});
	} catch (error) {
		console.error(
			`Error en el controlador al obtener detalle del trabajo ID ${req.params.trabajoId}:`,
			error.message,
		);
		res.status(error.statusCode || 500).render("errorPage", {
			pageTitle: "Error",
			errorMessage:
				error.message || "Error interno al cargar el detalle del trabajo.",
			errorCode: error.statusCode || 500,
		});
	}
};
