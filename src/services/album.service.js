import { findAll as findAllAlbums } from "../repository/album.repository.js";

class AlbumService {
	/**
	 * Obtiene todos los lanzamientos (álbumes).
	 * @returns {Promise<Array<object>>} Una promesa que resuelve a un array de objetos de álbumes/lanzamientos.
	 * @throws {Error} Si ocurre un error durante la obtención de los datos desde el repositorio.
	 */
	async getAllLanzamientos() {
		try {
			const lanzamientos = await findAllAlbums();

			// En este momento, no hay lógica de negocio adicional aquí,
			// pero este es el lugar donde se añadiría si fuera necesario (ej. filtrado, ordenamiento por defecto, etc.)

			return lanzamientos;
		} catch (error) {
			console.error(
				"Error en AlbumService al obtener todos los lanzamientos:",
				error,
			);
			throw new Error(
				"Ocurrió un error al obtener los datos de los lanzamientos.",
			);
		}
	}
}

export default new AlbumService();
