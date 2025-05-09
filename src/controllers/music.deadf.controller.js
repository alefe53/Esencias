// Importa la función (o funciones) que necesitas del repositorio.
// Usamos 'as' para darle un alias más descriptivo si es necesario.
import { findAll as findAllLanzamientos } from "../repository/album.repository.js";
// Asegúrate de que la ruta '../repositories/albumRepository.js' sea correcta
// desde 'src/controllers/' hasta 'src/repositories/'.

/**
 * Función del controlador para obtener y mostrar la página de lanzamientos.
 * Ahora es una función asíncrona porque `findAllLanzamientos` lo es (debido a la lectura de archivos).
 */
export const getLanzamientosPage = async (req, res) => {
	try {
		// 1. Llama a la función del repositorio para obtener todos los lanzamientos.
		//    Esto leerá el JSON, lo parseará y devolverá un array de instancias de Album (según tu repo).
		const lanzamientos = await findAllLanzamientos();

		// 2. Renderiza la plantilla EJS, pasando los datos obtenidos.
		//    Asegúrate de que el primer argumento ('musicdeadf') coincida con el nombre
		//    de tu archivo .ejs en la carpeta 'src/views/' (sin la extensión .ejs).
		res.render("musicdeadf", {
			pageTitle: "Mis Lanzamientos",
			lanzamientos: lanzamientos, // Pasa el array de álbumes (instancias de Album) a la plantilla
		});
	} catch (error) {
		// 3. Manejo de errores básico.
		//    Si algo sale mal al leer/parsear el JSON o en el repositorio,
		//    se capturará aquí.
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
