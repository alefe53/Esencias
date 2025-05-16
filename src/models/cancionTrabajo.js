// src/models/cancionTrabajo.js
export class CancionTrabajo {
	constructor(
		id,
		nombre,
		participes,
		descripcion,
		imagen,
		spotify_link,
		youtube_link,
		anio,
	) {
		this.id = id;
		this.nombre = nombre || "Canción sin nombre";
		this.participes = participes || "N/A"; // Puede ser un string o un array
		this.descripcion = descripcion || "";
		this.imagen = imagen || "/images/default.jpg";
		this.spotify_link = spotify_link || "";
		this.youtube_link = youtube_link || "";
		this.anio = anio || new Date().getFullYear();
	}
}
