import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { Album } from "../models/album.js";
import { Cancion } from "../models/cancion.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename); // Ruta al directorio 'src/repositories'

const dataPath = path.join(__dirname, "..", "db", "lanzamientos.json");

const _readData = async () => {
	try {
		const rawData = await fs.readFile(dataPath, "utf-8");
		return JSON.parse(rawData);
	} catch (error) {
		if (error.code === "ENOENT") {
			console.error(
				`Error: El archivo de datos JSON no se encontró en ${dataPath}`,
			);
			return [];
		}
	}
};

export const findAll = async () => {
	const jsonData = await _readData();
	const albums = jsonData.map((albumData) => {
		const temas = (albumData.temas || []).map(
			(temaData) =>
				new Cancion(
					temaData.id,
					temaData.nombre,
					temaData.ruta,
					temaData.participes,
					temaData.descripcion,
					temaData.anio,
					temaData.spotifyUrl,
				),
		);
		return new Album(
			albumData.id,
			albumData.nombre,
			albumData.participes,
			albumData.descripcion,
			albumData.portada,
			albumData.anio,
			temas,
		);
	});

	// INVERTIR EL ORDEN DEL ARRAY DE ÁLBUMES ANTES DE DEVOLVERLO
	return albums.reverse();
};

export const findById = async (id) => {
	const jsonData = await _readData();
	const albumData = jsonData.find((album) => album.id === id);
	if (!albumData) {
		return null;
	}
	const temas = (albumData.temas || []).map(
		(temaData) =>
			new Cancion(
				temaData.id,
				temaData.nombre,
				temaData.ruta,
				temaData.participes,
				temaData.descripcion,
				temaData.anio,
				temaData.spotifyUrl,
			),
	);
	return new Album(
		albumData.id,
		albumData.nombre,
		albumData.participes,
		albumData.descripcion,
		albumData.portada,
		albumData.anio,
		temas,
	);
};
