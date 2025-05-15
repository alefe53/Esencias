export class Cancion {
	constructor(
		id,
		nombre,
		ruta,
		participes,
		descripcion,
		anio,
		portada,
		spotifyUrl,
	) {
		this.id = id;
		this.nombre = nombre;
		this.ruta = ruta;
		this.participes = participes;
		this.descripcion = descripcion;
		this.anio = anio;
		this.portada = portada;
		this.spotifyUrl = spotifyUrl;
	}
}
