// Importa la función necesaria del repositorio de bandas
// Asegúrate de que la ruta a tu bandaRepository.js sea correcta.
// Si bandaRepository.js está en src/repositories/
import { findAllBandas } from "../repository/banda.repository.js";

/**
 * Controlador para obtener y mostrar la página de "Música con ADF" (lista de bandas).
 * Es una función asíncrona porque la obtención de datos del repositorio (que lee un archivo) es asíncrona.
 */
export const getMusicConAdfPage = async (req, res) => {
	try {
		// 1. Obtener los datos de todas las bandas usando la función del repositorio.
		const bandas = await findAllBandas();

		// 2. Renderizar la plantilla EJS 'musicconadf.ejs'.
		//    Express buscará este archivo en tu carpeta de vistas (src/views/).
		//    Le pasamos un objeto con las variables que la plantilla necesitará.
		res.render("musicconadf", {
			// Nombre del archivo EJS (sin la extensión .ejs)
			pageTitle: "Bandas en las que participé", // Título para la página
			bandas: bandas, // El array de objetos Banda obtenido del repositorio
		});
	} catch (error) {
		// 3. Manejo de errores básico.
		//    Si ocurre un error al obtener los datos o al renderizar,
		//    se registra en la consola del servidor y se envía una respuesta de error al cliente.
		console.error(
			"Error en el controlador al obtener la página de bandas:",
			error,
		);
		res
			.status(500)
			.send("Error interno del servidor al cargar la página de bandas.");
	}
};

// Si necesitas más funciones en este controlador para otras rutas relacionadas con "Música con ADF",
// puedes añadirlas aquí. Por ejemplo:
// export const getDetalleBandaPage = async (req, res) => { /* ... */ };
