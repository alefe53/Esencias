// src/models/albumTrabajo.js
import { CancionTrabajo } from "./cancionTrabajo.js";

export class AlbumTrabajo {
	constructor(id, nombre, descripcion, artistas, portada, cancionesData = []) {
		this.id = id;
		this.nombre = nombre || "Álbum sin nombre";
		this.descripcion = descripcion || "";
		this.artistas = artistas || "Artista Desconocido"; // El artista principal del álbum
		this.portada = portada || "/images/default.jpg";
		this.canciones = cancionesData.map(
			(cData) =>
				new CancionTrabajo(
					cData.id,
					cData.nombre,
					cData.participes,
					cData.descripcion,
					cData.imagen,
					cData.spotify_link,
					cData.youtube_link,
					cData.anio,
				),
		);
	}
}
