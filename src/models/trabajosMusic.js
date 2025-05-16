// src/models/trabajosMusic.js
import { AlbumTrabajo } from "./albumTrabajo.js"; // Asegúrate que este archivo y clase existan
import { LinkExterno } from "./linkExterno.js"; // Asegúrate que este archivo y clase existan

export class TrabajosMusic {
	constructor(
		id,
		banda,
		artistas,
		descripcion,
		anio,
		imagen_principal,
		albumData,
		imagenes_extra = [],
		links_externosData = [],
		etiquetas = [],
	) {
		this.id = id;
		this.banda = banda || "Artista/Banda Desconocida";
		this.artistas = artistas || "";
		this.descripcion = descripcion || "Descripción no disponible.";
		this.anio = anio || new Date().getFullYear().toString(); // Default a string del año actual
		this.imagen_principal = imagen_principal || "/images/default_proyecto.png";

		this.album =
			albumData && Object.keys(albumData).length > 0
				? new AlbumTrabajo(
						// Asumiendo que AlbumTrabajo está definido y se importa correctamente
						albumData.id,
						albumData.nombre,
						albumData.descripcion,
						albumData.artistas,
						albumData.portada,
						albumData.canciones,
					)
				: null;

		this.imagenes_extra = Array.isArray(imagenes_extra) ? imagenes_extra : [];
		this.links_externos = Array.isArray(links_externosData)
			? links_externosData.map(
					(linkData) => new LinkExterno(linkData.nombre, linkData.url), // Asumiendo LinkExterno definido
				)
			: [];
		this.etiquetas = Array.isArray(etiquetas) ? etiquetas : [];
	}

	getAnioFormateado() {
		if (this.anio && typeof this.anio === "string" && this.anio.includes("-")) {
			return this.anio.split("-")[0];
		}
		return String(this.anio); // Asegurar que sea string
	}

	getEtiquetasPrincipales(cantidad = 3) {
		return this.etiquetas.slice(0, cantidad);
	}
}
