// src/repository/trabajos.repository.js
import fs from "node:fs/promises";
import path from "node:path";
import { config } from "../../config/config.js";
import { TrabajosMusic } from "../models/trabajosMusic.js"; // Nombre de clase corregido

const dataPath = path.join(config.paths.DB, "trabajosmusic.json");

const _readData = async () => {
	try {
		const rawData = await fs.readFile(dataPath, "utf-8");
		return JSON.parse(rawData);
	} catch (error) {
		if (error.code === "ENOENT") {
			console.error(
				`Error: El archivo de datos 'trabajosmusic.json' no se encontró en ${dataPath}`,
			);
			// Es crucial lanzar un error aquí o que la capa superior lo maneje apropiadamente.
			// Retornar [] puede ocultar problemas.
			throw new Error(`Archivo de datos no encontrado: ${dataPath}`);
		}
		console.error(`Error al leer o parsear ${dataPath}:`, error);
		throw error;
	}
};

export const findAllTrabajos = async () => {
	const jsonData = await _readData();
	if (!Array.isArray(jsonData)) {
		// Esto no debería suceder si _readData lanza error en ENOENT y otros.
		console.error(
			"Error: Los datos leídos de trabajosmusic.json no son un array válido.",
		);
		return []; // O lanzar un error
	}

	return jsonData.map(
		(trabajoData) =>
			new TrabajosMusic(
				// Usar el nombre de clase correcto
				trabajoData.id,
				trabajoData.banda,
				trabajoData.artistas,
				trabajoData.descripcion,
				trabajoData.anio,
				trabajoData.imagen_principal,
				trabajoData.album,
				trabajoData.imagenes_extra,
				trabajoData.links_externos,
				trabajoData.etiquetas,
			),
	);
};

export const findTrabajoById = async (id) => {
	const jsonData = await _readData();
	if (!Array.isArray(jsonData)) {
		console.error(
			"Error: Los datos leídos de trabajosmusic.json no son un array válido.",
		);
		return null; // O lanzar un error
	}
	const trabajoData = jsonData.find((trabajo) => trabajo.id === id);

	if (!trabajoData) {
		return null;
	}

	return new TrabajosMusic(
		// Usar el nombre de clase correcto
		trabajoData.id,
		trabajoData.banda,
		trabajoData.artistas,
		trabajoData.descripcion,
		trabajoData.anio,
		trabajoData.imagen_principal,
		trabajoData.album,
		trabajoData.imagenes_extra,
		trabajoData.links_externos,
		trabajoData.etiquetas,
	);
};
