// src/repositories/albumRepository.js

import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// CORRECCIÓN DE RUTAS DE IMPORTACIÓN:
// Asumiendo que tus modelos están en 'src/models/' (plural)
// y los archivos se llaman 'Album.js' (PascalCase) y 'cancion.js' (minúsculas).
import { Album } from '../models/Album.js';   
import { Cancion } from '../models/cancion.js'; 

// --- Configuración de la Ruta al Archivo JSON ---
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename); // Ruta al directorio 'src/repositories'

// Asumiendo que tu carpeta 'db' con 'lanzamientos.json' está en 'src/db/'
const dataPath = path.join(__dirname, '..', 'db', 'lanzamientos.json'); 

// --- Funciones del Repositorio ---

const _readData = async () => {
    try {
        const rawData = await fs.readFile(dataPath, 'utf-8');
        return JSON.parse(rawData);
    } catch (error) {
        if (error.code === 'ENOENT') {
            console.error(`Error: El archivo de datos JSON no se encontró en ${dataPath}`);
            return []; 
        } else {
            console.error("Error al leer o parsear el archivo de lanzamientos JSON:", error);
            throw error; 
        }
    }
};

export const findAll = async () => {
    const jsonData = await _readData(); 
    const albums = jsonData.map(albumData => {
        const temas = (albumData.temas || []).map(temaData => 
            new Cancion(
                temaData.id,
                temaData.nombre,
                temaData.ruta,
                temaData.participes,
                temaData.descripcion,
                temaData.anio
                // Asegúrate que los parámetros coincidan con el constructor de tu clase Cancion
            )
        );
        // Asegúrate que los parámetros aquí coincidan con el constructor de tu clase Album
        // y con las propiedades que usas en tu plantilla EJS (ej. album.portada)
        return new Album(
            albumData.id,
            albumData.nombre,
            albumData.participes,
            albumData.descripcion,
            albumData.portada, 
            albumData.anio,
            temas
        );
    });

    // INVERTIR EL ORDEN DEL ARRAY DE ÁLBUMES ANTES DE DEVOLVERLO
    return albums.reverse(); 
};

export const findById = async (id) => {
    const jsonData = await _readData();
    const albumData = jsonData.find(album => album.id === id);
    if (!albumData) {
        return null;
    }
    const temas = (albumData.temas || []).map(temaData => 
        new Cancion(
            temaData.id, temaData.nombre, temaData.ruta, temaData.participes, 
            temaData.descripcion, temaData.anio
        )
    );
    // Asegúrate que los parámetros aquí coincidan con el constructor de tu clase Album
    return new Album(
        albumData.id, albumData.nombre, albumData.participes, albumData.descripcion,
        albumData.portada, albumData.anio, temas
    );
};
