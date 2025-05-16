// public/js/musicadf_detail_logic.js
document.addEventListener('DOMContentLoaded', () => {
    // Lógica del modal de imagen
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    const captionText = document.getElementById('caption');
    const closeBtn = document.querySelector('.image-modal-close');
    const albumImages = document.querySelectorAll('.album-cover-image');

    let openTimeout;
    let closeTimeout;

    albumImages.forEach(img => {
        img.style.cursor = 'zoom-in';
        img.onclick = function() {
            clearTimeout(openTimeout);
            clearTimeout(closeTimeout);
            openTimeout = setTimeout(() => {
                if (modal) modal.style.display = "block";
                if (modalImg) modalImg.src = this.src;
                if (captionText) captionText.innerHTML = this.alt;
            }, 150); // Reducido para una apertura más rápida
        }
    });

    function closeModalAction() {
        clearTimeout(openTimeout);
        clearTimeout(closeTimeout);
        closeTimeout = setTimeout(() => {
            if (modal) modal.style.display = "none";
        }, 150); // Reducido para un cierre más rápido
    }

    if (closeBtn) {
        closeBtn.onclick = closeModalAction;
    }

    if (modal) {
        modal.onclick = function(event) {
            // Cerrar si se hace clic en el fondo del modal o en la imagen misma
            if (event.target === modal || event.target === modalImg) {
                closeModalAction();
            }
        }
    }
    // Cerrar modal con la tecla Escape
    document.addEventListener('keydown', function(event) {
        if (event.key === "Escape" && modal && modal.style.display === "block") {
            closeModalAction();
        }
    });


    // --- INICIO: Lógica para Tooltips de Descripción de Temas ---
    const songTitlesWithDesc = document.querySelectorAll('.song-name-hover[data-descripcion]');
    let descriptionTooltip = null;

    // Crear el elemento tooltip una sola vez y reutilizarlo
    if (songTitlesWithDesc.length > 0) {
        if (!document.querySelector('.song-description-tooltip')) { // Evita crear múltiples tooltips si el script se carga varias veces
            descriptionTooltip = document.createElement('div');
            descriptionTooltip.className = 'song-description-tooltip';
            document.body.appendChild(descriptionTooltip);
        } else {
            descriptionTooltip = document.querySelector('.song-description-tooltip');
        }
    }

    songTitlesWithDesc.forEach(titleEl => {
        const descripcion = titleEl.dataset.descripcion;
        if (!descripcion || descripcion.trim() === '') {
            titleEl.style.cursor = 'default';
            // Si no hay descripción, no se añaden los listeners de mouseenter/mouseleave
            return;
        }
        titleEl.style.cursor = 'pointer'; // Asegurar cursor si hay descripción

        let enterTimeout;
        let leaveTimeout;
        // Variable CSS para la dirección de la animación del tooltip
        titleEl.style.setProperty('--tooltip-initial-transform-y', '8px');


        titleEl.addEventListener('mouseenter', (event) => {
            if (!descriptionTooltip) return;
            clearTimeout(leaveTimeout); // Cancela cualquier timeout de ocultación pendiente

            enterTimeout = setTimeout(() => {
                descriptionTooltip.innerHTML = descripcion; // Usar innerHTML por si la descripción contiene HTML simple como <br>

                // Color de fondo y texto aleatorio para el tooltip
                const r = Math.floor(Math.random() * 180) + 55; // Colores un poco menos intensos para mejor legibilidad
                const g = Math.floor(Math.random() * 180) + 55;
                const b = Math.floor(Math.random() * 180) + 55;
                descriptionTooltip.style.backgroundColor = `rgb(${r},${g},${b})`;

                const brightness = (r * 299 + g * 587 + b * 114) / 1000; // Fórmula de luminosidad
                descriptionTooltip.style.color = brightness > 125 ? '#000000' : '#ffffff'; // Ajustar umbral si es necesario
                
                descriptionTooltip.style.display = 'block'; // Mostrar para calcular dimensiones
                descriptionTooltip.offsetHeight; // Forzar reflow para que la transición se aplique correctamente

                const rect = titleEl.getBoundingClientRect();
                const tooltipRect = descriptionTooltip.getBoundingClientRect();
                let top = rect.bottom + window.scrollY + 7; // Posición por defecto: abajo del elemento
                let left = rect.left + window.scrollX;
                let transformYValue = '8px'; // Animación hacia abajo por defecto

                // Ajustar si se sale de los bordes de la ventana
                if (left + tooltipRect.width > window.innerWidth - 10) { // Evitar desbordamiento derecho
                    left = window.innerWidth - tooltipRect.width - 10;
                }
                if (top + tooltipRect.height > (window.innerHeight + window.scrollY) - 10) { // Evitar desbordamiento inferior (considerando scroll)
                    top = rect.top + window.scrollY - tooltipRect.height - 7; // Posicionar arriba
                    transformYValue = '-8px'; // Animación hacia arriba
                }
                
                if (left < 10) left = 10; // Evitar desbordamiento izquierdo

                // Si se va a mostrar arriba y aun así se sale por arriba del viewport (ej. elemento muy arriba y tooltip alto)
                if (transformYValue === '-8px' && top < window.scrollY + 10) {
                    top = window.scrollY + 10; // Pegarlo al borde superior visible
                } else if (transformYValue === '8px' && top < window.scrollY + 10) { 
                    // Si se muestra abajo pero el elemento está tan arriba que el tooltip se saldría por arriba
                     top = window.scrollY + 10;
                }


                descriptionTooltip.style.setProperty('--tooltip-initial-transform-y', transformYValue);
                descriptionTooltip.style.left = `${left}px`;
                descriptionTooltip.style.top = `${top}px`;
                
                // Iniciar animación de entrada
                descriptionTooltip.style.opacity = '1';
                descriptionTooltip.style.transform = 'scale(1) translateY(0)';
            }, 150); // Pequeño retraso antes de mostrar
        });

        titleEl.addEventListener('mouseleave', () => {
            if (!descriptionTooltip) return;
            clearTimeout(enterTimeout); // Cancela cualquier timeout de muestra pendiente

            leaveTimeout = setTimeout(() => {
                // Iniciar animación de salida
                descriptionTooltip.style.opacity = '0';
                const initialY = descriptionTooltip.style.getPropertyValue('--tooltip-initial-transform-y') || '8px';
                descriptionTooltip.style.transform = `scale(0.9) translateY(${initialY})`;
                // Ocultar después de la transición
                setTimeout(() => {
                    // Solo ocultar si la opacidad sigue siendo 0 (evita problemas si el mouse vuelve a entrar rápidamente)
                    if (descriptionTooltip.style.opacity === '0') {
                        descriptionTooltip.style.display = 'none';
                    }
                }, 200); // Duración de la transición CSS
            }, 100); // Pequeño retraso antes de ocultar
        });
    });
    // --- FIN: Lógica para Tooltips de Descripción de Temas ---
});
