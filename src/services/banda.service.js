// src/services/banda.service.js

// 1. Combina las importaciones del repositorio en una sola sentencia
import {
	findAllBandas,
	findBandaById,
} from "../repository/banda.repository.js";

/**
 * Función auxiliar interna del servicio para obtener el año más reciente de un tema para una banda.
 * REESCRITA con bucles for...of.
 * @param {object} banda - El objeto banda.
 * @returns {number} - El año más reciente o 0 si no se encuentra.
 */
const getLatestThemeYearFromBanda = (banda) => {
	let latestYear = 0;
	if (banda.lanzamientos && Array.isArray(banda.lanzamientos)) {
		// Bucle externo reescrito con for...of
		for (const lanzamiento of banda.lanzamientos) {
			if (lanzamiento.temas && Array.isArray(lanzamiento.temas)) {
				// Bucle interno reescrito con for...of
				for (const tema of lanzamiento.temas) {
					if (tema.anio) {
						const year = Number.parseInt(tema.anio, 10);
						if (!Number.isNaN(year) && year > latestYear) {
							latestYear = year;
						}
					}
				}
			}
		}
	}
	return latestYear;
};

class BandaService {
	/**
	 * Obtiene todas las bandas y las ordena por el año más reciente de sus temas, en orden descendente.
	 * @returns {Promise<Array<object>>} Una promesa que resuelve a un array de objetos banda, ordenados.
	 * @throws {Error} Si ocurre un error durante la obtención o procesamiento de los datos.
	 */
	async getBandasOrdenadasPorUltimoLanzamiento() {
		try {
			const bandas = await findAllBandas();
			if (!bandas || bandas.length === 0) {
				return [];
			}
			// Usamos la función auxiliar (ahora con for...of) dentro del sort
			const bandasOrdenadas = bandas.slice().sort((bandaA, bandaB) => {
				const latestYearA = getLatestThemeYearFromBanda(bandaA);
				const latestYearB = getLatestThemeYearFromBanda(bandaB);
				return latestYearB - latestYearA; // Descendente
			});
			return bandasOrdenadas;
		} catch (error) {
			console.error(
				"Error en BandaService al obtener bandas ordenadas:",
				error,
			);
			throw new Error("Ocurrió un error al procesar los datos de las bandas.");
		}
	}

	/**
	 * Obtiene los detalles de una banda específica por su ID,
	 * con sus lanzamientos ordenados por año (más reciente primero).
	 * @param {string} bandaId - El ID de la banda a buscar.
	 * @returns {Promise<object>} Una promesa que resuelve al objeto de la banda con lanzamientos ordenados.
	 * @throws {Error} Si la banda no se encuentra (con statusCode 404) o si ocurre otro error.
	 */
	async getBandaDetailsWithSortedLanzamientos(bandaId) {
		if (!bandaId) {
			console.error("BandaService: Se intentó buscar una banda sin ID.");
			// Considera lanzar un error con statusCode 400 (Bad Request) aquí
			const error = new Error(
				"Se requiere un ID de banda para buscar detalles.",
			);
			error.statusCode = 400;
			throw error;
		}

		try {
			const banda = await findBandaById(bandaId);

			if (!banda) {
				const error = new Error(`Banda con ID ${bandaId} no encontrada.`);
				error.statusCode = 404; // Not Found
				throw error;
			}

			// Ordenar lanzamientos si existen
			if (banda.lanzamientos && Array.isArray(banda.lanzamientos)) {
				// .slice() crea una copia para no mutar el array original si viniera de caché, etc.
				banda.lanzamientos = banda.lanzamientos
					.slice()
					.sort((lanzamientoA, lanzamientoB) => {
						// Manejo robusto de 'anio' por si falta o no es número
						const anioA = Number.parseInt(lanzamientoA?.anio, 10) || 0;
						const anioB = Number.parseInt(lanzamientoB?.anio, 10) || 0;
						// Orden descendente (más reciente primero)
						return anioB - anioA;
					});
			}

			return banda;
		} catch (error) {
			// Loguear solo si es un error inesperado (no el 404 o 400 que ya controlamos)
			if (!error.statusCode) {
				console.error(
					`Error en BandaService al obtener detalles para banda ID ${bandaId}:`,
					error.message, // Loguear solo el mensaje puede ser suficiente
					// error, // Descomentar para loguear el stack trace completo si es necesario
				);
				// Lanzar un error genérico para no exponer detalles internos
				throw new Error(
					`Ocurrió un error interno al procesar los datos de la banda con ID ${bandaId}.`,
				);
			}
			// Re-lanzar el error si ya tiene statusCode (404, 400, etc.)
			throw error;
		}
	}

	// Más métodos del servicio aquí ---
}

export default new BandaService();
