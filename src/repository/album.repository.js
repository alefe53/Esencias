// src/repositories/album.repository.js
import fs from "node:fs/promises";
import path from "node:path";

import { config } from "../../config/config.js";

import { Album } from "../models/album.js";
import { Cancion } from "../models/cancion.js";

const dataPath = path.join(config.paths.DB, "lanzamientos.json");

const _readData = async () => {
	try {
		const rawData = await fs.readFile(dataPath, "utf-8");
		return JSON.parse(rawData);
	} catch (error) {
		if (error.code === "ENOENT") {
			console.error(
				`Error: El archivo de datos 'lanzamientos.json' no se encontró en ${dataPath}`,
			);
			return [];
		}
		console.error(`Error al leer o parsear ${dataPath}:`, error);
		throw error;
	}
};

export const findAll = async () => {
	const jsonData = await _readData();

	if (!Array.isArray(jsonData)) {
		console.error(
			"Error: Los datos leídos de lanzamientos.json no son un array.",
		);
		return [];
	}

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
					temaData.portada,
					temaData.youtubeId,
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
			albumData.youtubeId,
			temas,
		);
	});

	return albums.reverse();
};

export const findById = async (id) => {
	const jsonData = await _readData();

	if (!Array.isArray(jsonData)) {
		console.error(
			"Error: Los datos leídos de lanzamientos.json no son un array.",
		);
		return null;
	}
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
				temaData.portada,
				temaData.youtubeId,
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
		albumData.youtubeId,
		temas,
	);
};
