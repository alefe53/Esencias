import { Cancion } from "../models/cancion.js"; // Ajusta la ruta si es necesario

import { Album } from "../models/Album.js";

// Datos de ejemplo de tus lanzamientos (el "vector")
// Más adelante, esto podría venir de una base de datos
const lanzamientosData = [
	new Album(
		"001", //id
		"Aleatorio Tiempo Ruleta Argentina", //nombre
		'Alejandro D. Fenos, Stefano Vittaca, Gabriel Ordoñez, Milton, Milton Zini, Damián "Chompi" Giménez, Christian Heinz, Ingrid Fainstein Oliveri, Juma Nalda, Martin Mochi, El Piojo, Joe Ablop, Ivan Silberstein', //participes
		"Album compilacion de múltiples canciones propias del pasado", //descripcion
		"/images/atra.jpg", //portada
		"2020", //anio
		[
			new Cancion(
				"atra01", //id
				"El Jinete", //nombre
				"/musicadf/eljinete.mp3", //ruta
				'Martin Mochi, Milton Zini, Ingrid Fainstein Oliveri, Alejandro D. Fenos, Juma Nalda, Stefano Vitacca, Damián "Chompi" Giménez', //participes
				"Descripcion: Uno de mis primeros temas solitas subidos pensados, recuerdo grabaciones en el ex local de Ivan, letras con el Moncho en la casa, y debates con Stefa. Ni hablar de la incorporación de Juma en la bata...", //descripcion
				"2020", //anio
                "/images/atra.jpg" //portada
			),
			new Cancion(
				"atra02", //id
				"Perdido en el Tiempo", //nombre
				"/musicadf/perdidoeneltiempo.mp3", //ruta
				'Alejandro D. Fenos, Gabriel Ordoñez, Stefano Vitacca, Damián "Chompi" Giménez', //participes
				"Descripcion: Uno de mis primeros temas solitas subidos pensados, recuerdo grabaciones en el ex local de Ivan, letras con el Moncho en la casa, y debates con Stefa. Ni hablar de la incorporación de Juma en la bata...", //descripcion
				"2020", //anio
                "/images/atra.jpg" //portada
			),
		], //temas
	),
	new Album(
		"002", //id
		"Empiojado", //nombre
		"Alejandro D. Fenos, Piojo, Vasco Baraian, Francisco Gamas, Joe Ablop", //participes
		"Single compuesto con el Piojo", //descripcion
		"/images/empiojado.jpg", //portada
		"2025", //anio
		[
			new Cancion(
				"emp001", //id
				"Empiojado", //nombre
				"/musicadf/empiojado.mp3", //ruta
				"ADF, Piojo, Vasco Baraian, Francisco Gamas, Joe Ablop", //participes
				"Descripcion: Llegaba el año 2019...", //descripcion
				"2025", //anio
                "/images/empiojado.jpg" //portada
			),
		], //temas
	),
	// ... puedes añadir más objetos Album aquí
];

// Función del controlador para mostrar la página de lanzamientos
export const getLanzamientosPage = (req, res) => {
	// Aquí podrías tener lógica para obtener los datos, filtrarlos, etc.
	// Por ahora, usamos los datos hardcodeados.

	// CORRECCIÓN AQUÍ: Quitar la extensión .ejs del nombre de la plantilla
	res.render("musicdeadf", {
		// 'music.deadf' se referirá a 'src/views/music.deadf.ejs'
		pageTitle: "Mis Lanzamientos",
		lanzamientos: lanzamientosData, // Pasamos el array de álbumes a la plantilla
	});
};
