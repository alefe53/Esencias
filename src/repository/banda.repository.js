// src/repositories/bandaRepository.js
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

// Asegúrate de que la ruta a tu modelo Banda sea correcta
// Si está en src/models/Banda.js (con B mayúscula en el nombre de archivo):
import { Banda } from "../models/banda.js";
// Si está en src/model/banda.js (con b minúscula en el nombre de archivo y carpeta model singular):
// import { Banda } from '../model/banda.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename); // Debe ser src/repositories

// Ruta al archivo JSON de bandas (asumiendo que está en src/db/bandas.json)
const dataPath = path.join(__dirname, "..", "db", "bandas.json");

/**
 * Lee y parsea los datos de bandas desde el archivo JSON.
 * @private
 * @returns {Promise<Array<Object>>}
 */
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
		} else {
			console.error("Error al leer o parsear 'bandas.json':", error);
			throw error;
		}
	}
};

/**
 * Obtiene todas las bandas, convirtiéndolas en instancias de la clase Modelo Banda.
 * @returns {Promise<Array<Banda>>}
 */
export const findAllBandas = async () => {
	const jsonData = await _readData();

	const bandas = jsonData.map((bandaData) => {
		// El constructor de Banda espera: id, nombre, integrantes, descripcion, imagen, lanzamientos
		return new Banda(
			bandaData.id,
			bandaData.nombre,
			bandaData.integrantes, // Esto es un string en tu JSON, si necesitas un array, debes procesarlo
			bandaData.descripcion,
			bandaData.imagen, // Esta es la imagen principal de la banda
			bandaData.lanzamientos || [], // Asegura que sea un array
		);
	});

	return bandas.reverse(); // Para mostrar las más recientes (o últimas añadidas al JSON) primero
};

// Podrías añadir findBandaById si necesitas una página de detalle por banda
// export const findBandaById = async (id) => { /* ... */ }
