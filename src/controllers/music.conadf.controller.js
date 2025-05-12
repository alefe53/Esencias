import { findAllBandas } from "../repository/banda.repository.js"; // Corregida la ruta a 'repositories'

/**
 * Controlador para obtener y mostrar la página de "Música con ADF" (lista de bandas).
 * Es una función asíncrona porque la obtención de datos del repositorio (que lee un archivo) es asíncrona.
 */
export const getMusicConAdfPage = async (req, res) => {
	try {
		// 1. Obtener los datos de todas las bandas usando la función del repositorio.
		const bandas = await findAllBandas(); // Usamos let para poder reasignar después de ordenar

		// 2. Función auxiliar para obtener el año más reciente de un tema para una banda
		const getLatestThemeYear = (banda) => {
			let latestYear = 0; // Usamos 0 como año base muy antiguo
			if (banda.lanzamientos && Array.isArray(banda.lanzamientos)) {
				banda.lanzamientos.forEach((lanzamiento) => {
					if (lanzamiento.temas && Array.isArray(lanzamiento.temas)) {
						lanzamiento.temas.forEach((tema) => {
							if (tema.anio) {
								const year = Number.parseInt(tema.anio, 10);
								if (!isNaN(year) && year > latestYear) {
									latestYear = year;
								}
							}
						});
					}
				});
			}
			return latestYear;
		};

		// 3. Ordenar el array de bandas
		bandas.sort((bandaA, bandaB) => {
			const latestYearA = getLatestThemeYear(bandaA);
			const latestYearB = getLatestThemeYear(bandaB);

			return latestYearB - latestYearA;
		});

		// 4. Renderizar la plantilla EJS 'musicconadf.ejs'.
		res.render("musicconadf", {
			pageTitle: "Bandas en las que participé", // Título para la página
			bandas: bandas, // El array de objetos Banda (ya ordenado)
		});
	} catch (error) {
		// 5. Manejo de errores básico.
		console.error(
			"Error en el controlador al obtener la página de bandas:",
			error,
		);
		res
			.status(500)
			.send("Error interno del servidor al cargar la página de bandas.");
	}
};
