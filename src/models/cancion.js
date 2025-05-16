export class Cancion {
	constructor(
		id,
		nombre,
		ruta,
		participes,
		descripcion,
		anio,
		portada,
		youtubeId,
		spotifyUrl,
	) {
		this.id = id;
		this.nombre = nombre;
		this.ruta = ruta;
		this.participes = participes;
		this.descripcion = descripcion;
		this.anio = anio;
		this.portada = portada;
		this.youtubeId = youtubeId;
		this.spotifyUrl = spotifyUrl;
	}
}
