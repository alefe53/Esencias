// src/repositories/bandaRepository.js
import fs from "node:fs/promises";
import path from "node:path";

import { config } from "../../config/config.js";

import { Banda } from "../models/banda.js";

const dataPath = path.join(config.paths.DB, "bandas.json");

const _readData = async () => {
	try {
		const rawData = await fs.readFile(dataPath, "utf-8");
		return JSON.parse(rawData);
	} catch (error) {
		if (error.code === "ENOENT") {
			console.error(
				`Error: El archivo de datos 'bandas.json' no se encontró en ${dataPath}`,
			);
			return [];
		}
		console.error(`Error al leer o parsear ${dataPath}:`, error);
		throw error;
	}
};

export const findAllBandas = async () => {
	const jsonData = await _readData();

	if (!Array.isArray(jsonData)) {
		console.error("Error: Los datos leídos de bandas.json no son un array.");
		return [];
	}

	const bandas = jsonData.map((bandaData) => {
		return new Banda(
			bandaData.id,
			bandaData.nombre,
			bandaData.integrantes,
			bandaData.descripcion,
			bandaData.imagen,
			bandaData.conMusica,
			bandaData.lanzamientos || [],
			bandaData.imagenesextra,
			bandaData.linksinstagram,
			bandaData.linksextras,
			bandaData.youtubeVideoId,
		);
	});

	return bandas.reverse();
};

export const findBandaById = async (id) => {
	const jsonData = await _readData();

	if (!Array.isArray(jsonData)) {
		console.error("Error: Los datos leídos de bandas.json no son un array.");
		return null;
	}
	const bandaData = jsonData.find((banda) => banda.id === id);

	if (!bandaData) {
		return null;
	}

	return new Banda(
		bandaData.id,
		bandaData.nombre,
		bandaData.integrantes,
		bandaData.descripcion,
		bandaData.imagen,
		bandaData.conMusica,
		bandaData.lanzamientos || [],
		bandaData.imagenesextra,
		bandaData.linksinstagram,
		bandaData.linksextras,
		bandaData.youtubeVideoId,
	);
};
