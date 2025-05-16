import { TrabajosMusic } from "../models/trabajosMusic.js"; // Importar el modelo si es necesario para type hints o instanceof
// src/services/trabajos.service.js
import {
	findAllTrabajos,
	findTrabajoById,
} from "../repository/trabajos.repository.js";

/**
 * Función auxiliar interna para obtener el año más reciente de las canciones de un trabajo.
 * Se basa en el campo 'anio' de cada canción dentro del álbum del trabajo.
 * O usa el año del proyecto si no hay canciones con año.
 * @param {TrabajosMusic} trabajo - El objeto trabajo.
 * @returns {number} - El año más reciente o 0 si no se encuentra.
 */
const getLatestYearForSorting = (trabajo) => {
	let latestYear = 0;
	if (trabajo?.album && Array.isArray(trabajo.album.canciones)) {
		for (const cancion of trabajo.album.canciones) {
			if (cancion.anio) {
				const year = Number.parseInt(String(cancion.anio), 10);
				if (!Number.isNaN(year) && year > latestYear) {
					latestYear = year;
				}
			}
		}
	}

	// Fallback al año del proyecto si no se encontraron años en las canciones
	// o si no hay álbum/canciones
	if (latestYear === 0 && trabajo && trabajo.anio) {
		// Asumimos que trabajo.anio puede ser YYYY o YYYY-MM-DD
		const projectAnioStr = String(trabajo.anio).substring(0, 4);
		const projectYear = Number.parseInt(projectAnioStr, 10);
		if (!Number.isNaN(projectYear) && projectYear > latestYear) {
			// Comparar con latestYear por si acaso
			latestYear = projectYear;
		}
	}
	return latestYear;
};

class TrabajoService {
	/**
	 * Obtiene todos los trabajos y los ordena por el año más reciente
	 * (de sus canciones o del proyecto mismo), en orden descendente.
	 * @returns {Promise<Array<TrabajosMusic>>} Una promesa que resuelve a un array de trabajos ordenados.
	 */
	async getTrabajosOrdenadosPorReciente() {
		try {
			const trabajos = await findAllTrabajos();
			if (!Array.isArray(trabajos) || trabajos.length === 0) {
				return [];
			}

			const trabajosOrdenados = trabajos.slice().sort((trabajoA, trabajoB) => {
				const latestYearA = getLatestYearForSorting(trabajoA);
				const latestYearB = getLatestYearForSorting(trabajoB);
				return latestYearB - latestYearA; // Descendente
			});
			return trabajosOrdenados;
		} catch (error) {
			console.error(
				"Error en TrabajoService al obtener trabajos ordenados:",
				error.message, // Loguear mensaje es usualmente suficiente aquí
				// error, // Descomentar para stack trace completo durante desarrollo
			);
			// No relanzar errores genéricos que expongan detalles internos al cliente.
			// El controlador debería manejar esto y enviar una respuesta de error genérica.
			throw new Error(
				"Ocurrió un error al procesar los datos de los trabajos.",
			);
		}
	}

	/**
	 * Obtiene los detalles de un trabajo por su ID.
	 * Si el trabajo tiene un álbum con canciones, estas se ordenan por año descendente.
	 * @param {string} trabajoId
	 * @returns {Promise<TrabajosMusic|null>}
	 */
	async getTrabajoDetails(trabajoId) {
		if (!trabajoId) {
			const error = new Error(
				"Se requiere un ID de trabajo para buscar detalles.",
			);
			error.statusCode = 400; // Bad Request
			throw error;
		}

		try {
			const trabajo = await findTrabajoById(trabajoId);

			if (!trabajo) {
				const error = new Error(`Trabajo con ID '${trabajoId}' no encontrado.`);
				error.statusCode = 404; // Not Found
				throw error;
			}

			// Ordenar canciones del álbum si existen
			if (trabajo.album && Array.isArray(trabajo.album.canciones)) {
				trabajo.album.canciones = trabajo.album.canciones
					.slice()
					.sort((cancionA, cancionB) => {
						const anioA = Number.parseInt(String(cancionA?.anio), 10) || 0;
						const anioB = Number.parseInt(String(cancionB?.anio), 10) || 0;
						return anioB - anioA; // Descendente
					});
			}
			return trabajo;
		} catch (error) {
			if (error.statusCode) {
				// Si es un error que ya hemos preparado (400, 404)
				throw error;
			}
			// Para errores inesperados del repositorio u otros
			console.error(
				`Error en TrabajoService al obtener detalles para trabajo ID ${trabajoId}:`,
				error.message,
			);
			throw new Error(
				`Ocurrió un error interno al procesar los datos del trabajo con ID ${trabajoId}.`,
			);
		}
	}
}

export default new TrabajoService(); // Nombre de clase corregido
