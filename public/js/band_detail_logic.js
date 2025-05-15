// public/js/band_detail_logic.js

/**
 * Inicializa la funcionalidad del modal para imágenes individuales que se pueden ampliar.
 */
function initializeImageZoomModal() {
    const imageModal = document.getElementById("imageModal");
    const modalImgContent = document.getElementById("modalImageContent");
    const modalCaptionText = document.getElementById("imageModalCaption");
    const imageModalCloseBtn = imageModal
        ? imageModal.querySelector(".image-modal-close")
        : null;
    const zoomableImages = document.querySelectorAll(".zoomable-image");

    let openImageTimeout;
    let closeImageTimeout;

    if (
        zoomableImages.length > 0 &&
        imageModal &&
        modalImgContent &&
        modalCaptionText &&
        imageModalCloseBtn
    ) {
        zoomableImages.forEach((img) => {
            img.style.cursor = "zoom-in";
            img.onclick = function () {
                clearTimeout(openImageTimeout);
                clearTimeout(closeImageTimeout);
                openImageTimeout = setTimeout(() => {
                    imageModal.style.display = "block";
                    modalImgContent.src = this.src;
                    modalCaptionText.innerHTML = this.alt;
                }, 50); // Ajusta el tiempo si es necesario
            };
        });

        imageModalCloseBtn.onclick = () => {
            clearTimeout(openImageTimeout);
            clearTimeout(closeImageTimeout);
            closeImageTimeout = setTimeout(() => {
                imageModal.style.display = "none";
            }, 50); // Ajusta el tiempo si es necesario
        };

        imageModal.onclick = (event) => {
            if (event.target === imageModal) {
                clearTimeout(openImageTimeout);
                clearTimeout(closeImageTimeout);
                closeImageTimeout = setTimeout(() => {
                    imageModal.style.display = "none";
                }, 50); // Ajusta el tiempo si es necesario
            }
        };
        // console.log("Modal de imagen individual inicializado.");
    } else {
        console.log(
            "Elementos del modal de imagen individual no encontrados. Funcionalidad no activa.",
        );
    }
}

/**
 * Inicializa la funcionalidad de la galería de imágenes extra (lightbox).
 */
function initializeExtraImageGallery() {
    const galleryLightbox = document.getElementById("galleryLightbox");
    const openGalleryBtn = document.getElementById("openGalleryBtn");
    const galleryLightboxCloseBtn = galleryLightbox
        ? galleryLightbox.querySelector(".gallery-lightbox-close")
        : null;
    const galleryLightboxImage = document.getElementById("galleryLightboxImage");
    const galleryThumbnailsContainer = galleryLightbox
        ? galleryLightbox.querySelector(".gallery-thumbnails")
        : null;
    const prevBtn = galleryLightbox
        ? galleryLightbox.querySelector(".gallery-prev")
        : null;
    const nextBtn = galleryLightbox
        ? galleryLightbox.querySelector(".gallery-next")
        : null;

    let currentGallerySlideIndex = 0;
    let imagenesExtraSrcs = [];

    if (
        galleryLightbox &&
        openGalleryBtn &&
        galleryLightboxCloseBtn &&
        galleryLightboxImage &&
        galleryThumbnailsContainer &&
        prevBtn &&
        nextBtn
    ) {
        const thumbnailElements = galleryThumbnailsContainer.querySelectorAll(
            ".gallery-thumbnail-item",
        );
        if (thumbnailElements.length > 0) {
            imagenesExtraSrcs = Array.from(thumbnailElements)
                .map((thumb) => thumb.getAttribute("data-src"))
                .filter((src) => src); // Asegura que solo se añadan URLs válidas
        }

        function showGallerySlide(index) {
            if (!imagenesExtraSrcs || imagenesExtraSrcs.length === 0) {
                if (prevBtn) prevBtn.style.display = "none";
                if (nextBtn) nextBtn.style.display = "none";
                return;
            }
            if (prevBtn) prevBtn.style.display = "block";
            if (nextBtn) nextBtn.style.display = "block";

            currentGallerySlideIndex =
                (index + imagenesExtraSrcs.length) % imagenesExtraSrcs.length;
            galleryLightboxImage.src = imagenesExtraSrcs[currentGallerySlideIndex];

            thumbnailElements.forEach((thumb, i) => {
                thumb.classList.remove("active-thumbnail");
                if (i === currentGallerySlideIndex) {
                    thumb.classList.add("active-thumbnail");
                    thumb.scrollIntoView({
                        behavior: "smooth",
                        block: "nearest",
                        inline: "center",
                    });
                }
            });
        }

        if (imagenesExtraSrcs.length > 0) {
            openGalleryBtn.style.display = "inline-block";
            openGalleryBtn.onclick = () => {
                galleryLightbox.style.display = "flex";
                showGallerySlide(0);
            };
        } else {
            openGalleryBtn.style.display = "none";
        }

        galleryLightboxCloseBtn.onclick = () => {
            galleryLightbox.style.display = "none";
        };

        galleryLightbox.onclick = (event) => {
            if (event.target === galleryLightbox) {
                galleryLightbox.style.display = "none";
            }
        };

        prevBtn.onclick = (e) => {
            e.stopPropagation();
            showGallerySlide(currentGallerySlideIndex - 1);
        };

        nextBtn.onclick = (e) => {
            e.stopPropagation();
            showGallerySlide(currentGallerySlideIndex + 1);
        };

        thumbnailElements.forEach((thumbnail) => {
            thumbnail.onclick = (e) => {
                e.stopPropagation();
                const index = Number.parseInt(e.target.getAttribute("data-index"));
                if (!isNaN(index)) {
                    showGallerySlide(index);
                }
            };
        });
        // console.log("Galería de imágenes extra inicializada.");
    } else {
        if (openGalleryBtn) {
            openGalleryBtn.style.display = "none";
        }
        console.log(
            "Elementos de la galería de imágenes extra no encontrados. Funcionalidad no activa.",
        );
    }
}

/**
 * Inicializa los tooltips de descripción para los nombres de los temas.
 */
function initializeSongDescriptionTooltips() {
    const songTitles = document.querySelectorAll('.song-title[data-descripcion-tema]');
    let tooltipDiv = null; 

    // Crear el div del tooltip una sola vez y añadirlo al body
    if (songTitles.length > 0) {
        tooltipDiv = document.createElement('div');
        tooltipDiv.className = 'song-description-tooltip';
        document.body.appendChild(tooltipDiv);
    } else {
        return; // No hay títulos con descripciones, no hacer nada más
    }

    songTitles.forEach(titleElement => {
        const descripcion = titleElement.dataset.descripcionTema;
        
        // Asegurarse de que la descripción no sea solo espacios en blanco
        if (!descripcion || descripcion.trim() === '') {
            titleElement.style.cursor = 'default'; // No mostrar cursor de puntero si no hay tooltip
            return; 
        }

        titleElement.addEventListener('mouseenter', (event) => {
            tooltipDiv.innerHTML = descripcion; // Usar innerHTML para renderizar posibles saltos de línea si los hubiera

            // Generar color de fondo aleatorio (colores pastel o no demasiado oscuros/claros)
            const h = Math.floor(Math.random() * 360); // Tono
            const s = Math.floor(Math.random() * 30) + 70; // Saturación (70-100%)
            const l = Math.floor(Math.random() * 20) + 70; // Luminosidad (70-90%) - para colores más claros
            
            tooltipDiv.style.backgroundColor = `hsl(${h}, ${s}%, ${l}%)`;

            // Determinar color de texto para contraste basado en la luminosidad del fondo
            // Si la luminosidad (l) es alta (ej. > 75%), usar texto oscuro, sino texto claro.
            const textColor = l > 75 ? '#333333' : '#ffffff'; // Negro oscuro o blanco
            tooltipDiv.style.color = textColor;
            
            // Posicionar el tooltip
            const rect = titleElement.getBoundingClientRect(); // Coordenadas relativas al viewport
            
            // Posición inicial: debajo del título, ligeramente a la derecha
            let top = rect.bottom + window.scrollY + 8; // 8px debajo
            let left = rect.left + window.scrollX + (rect.width / 4);

            tooltipDiv.style.transform = 'translateY(10px)'; // Para efecto de entrada
            tooltipDiv.style.opacity = '0';
            tooltipDiv.style.display = 'block'; // Mostrar para obtener dimensiones y empezar transición

            // Ajustar si se sale de la pantalla (después de mostrarlo para tener dimensiones)
            const tooltipRect = tooltipDiv.getBoundingClientRect();

            if (left + tooltipRect.width > window.innerWidth - 10) { // 10px de margen derecho
                left = window.innerWidth - tooltipRect.width - 10;
            }
            if (top + tooltipRect.height > window.innerHeight - 10) { // 10px de margen inferior
                // Intentar ponerlo arriba si se sale por abajo
                top = rect.top + window.scrollY - tooltipRect.height - 8; // 8px arriba
                tooltipDiv.style.transform = 'translateY(-10px)'; // Ajustar efecto de entrada
            }
            if (left < 10) { // 10px de margen izquierdo
                left = 10;
            }
             if (top < window.scrollY + 10) { // 10px de margen superior (considerando scroll)
                top = window.scrollY + 10;
            }


            tooltipDiv.style.left = `${left}px`;
            tooltipDiv.style.top = `${top}px`;
            
            // Forzar reflow para asegurar que la transición se aplique
            void tooltipDiv.offsetWidth; 

            tooltipDiv.style.opacity = '1';
            tooltipDiv.style.transform = 'translateY(0)';
        });

        titleElement.addEventListener('mouseleave', () => {
            tooltipDiv.style.opacity = '0';
            tooltipDiv.style.transform = 'translateY(10px)';
            // Esperar a que termine la transición antes de ocultar completamente
            setTimeout(() => {
                // Solo ocultar si la opacidad sigue siendo 0 (el mouse no volvió a entrar rápidamente)
                if (tooltipDiv.style.opacity === '0') { 
                    tooltipDiv.style.display = 'none';
                }
            }, 200); // Duración de la transición CSS (0.15s = 150ms, un poco más para asegurar)
        });
    });
}


// Event listener principal que se ejecuta cuando el DOM está completamente cargado.
document.addEventListener("DOMContentLoaded", () => {
    initializeImageZoomModal();
    initializeExtraImageGallery();
    initializeSongDescriptionTooltips(); // Llamar a la nueva función
});
