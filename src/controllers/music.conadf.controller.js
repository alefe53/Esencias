import bandaService from "../services/banda.service.js";

/**
 * Controlador para obtener y mostrar la página de "Música con ADF" (lista de bandas).
 * Delega la lógica de obtención y ordenamiento de datos al BandaService.
 */
export const getMusicConAdfPage = async (req, res) => {
	try {
		// Obtener los datos de todas las bandas, ya procesadas y ordenadas, desde el servicio.
		const bandasOrdenadas =
			await bandaService.getBandasOrdenadasPorUltimoLanzamiento();

		// Renderizar la plantilla EJS 'musicconadf.ejs'.
		res.render("musicconadf", {
			pageTitle: "Bandas en las que participé", // Título para la página
			bandas: bandasOrdenadas, // El array de objetos Banda (ya ordenado por el servicio)
		});
	} catch (error) {
		console.error(
			"Error en el controlador al obtener la página de bandas:",
			error.message,
		);
		res
			.status(500)
			.send(
				error.message ||
					"Error interno del servidor al cargar la página de bandas.",
			);
	}
};
