// src/models/trabajoIngenieria.js
import { AlbumTrabajo } from "./albumTrabajo.js";
import { LinkExterno } from "./linkExterno.js";

export class TrabajoIngenieria {
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
		this.anio = anio || "Fecha Desconocida";
		this.imagen_principal = imagen_principal || "/images/default_proyecto.png";

		this.album =
			albumData && Object.keys(albumData).length > 0
				? new AlbumTrabajo(
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
					(linkData) => new LinkExterno(linkData.nombre, linkData.url),
				)
			: [];
		this.etiquetas = Array.isArray(etiquetas) ? etiquetas : [];
	}

	getAnioFormateado() {
		if (this.anio && typeof this.anio === "string" && this.anio.includes("-")) {
			return this.anio.split("-")[0];
		}
		return this.anio;
	}

	getEtiquetasPrincipales(cantidad = 3) {
		return this.etiquetas.slice(0, cantidad);
	}
}
