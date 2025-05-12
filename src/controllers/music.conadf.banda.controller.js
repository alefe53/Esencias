import { findBandaById } from "../repository/banda.repository.js";

/**
 * Controlador para obtener y mostrar la página de detalle de una banda específica.
 * Es una función asíncrona porque la obtención de datos del repositorio (que lee un archivo) es asíncrona.
 */
export const getBandaDetailPage = async (req, res) => {
	try {
		// 1. Obtener el ID de la banda desde los parámetros de la URL.
		const bandaId = req.params.bandaId;

		if (!bandaId) {
			return res.status(400).send("No se proporcionó un ID de banda.");
		}

		// 2. Buscar la banda por su ID usando la función del repositorio.
		const banda = await findBandaById(bandaId);

		// 3. Verificar si la banda fue encontrada.
		if (!banda) {
			return res.status(404).send("Banda no encontrada.");
		}

		// 4. ORDENAR LOS LANZAMIENTOS DE LA BANDA POR AÑO (MÁS RECIENTE PRIMERO)
		if (banda.lanzamientos && Array.isArray(banda.lanzamientos)) {
			banda.lanzamientos.sort((lanzamientoA, lanzamientoB) => {
				const anioA = lanzamientoA.anio
					? Number.parseInt(lanzamientoA.anio, 10)
					: 0;
				const anioB = lanzamientoB.anio
					? Number.parseInt(lanzamientoB.anio, 10)
					: 0;

				// Orden descendente (más reciente primero)
				return anioB - anioA;
			});
		}

		// 5. Renderizar la plantilla EJS 'musicconadfband.ejs'.
		res.render("musicconadfband", {
			// Nombre del archivo EJS (sin la extensión .ejs)
			pageTitle: banda.nombre || "Detalle de Banda", // Usa el nombre de la banda como título de la página
			banda: banda, // Pasa el objeto completo de la banda (con lanzamientos ordenados) a la plantilla
		});
	} catch (error) {
		// 6. Manejo de errores general.
		console.error(
			`Error en el controlador al obtener el detalle de la banda con ID ${req.params.bandaId}:`,
			error,
		);
		res
			.status(500)
			.send("Error interno del servidor al cargar el detalle de la banda.");
	}
};
