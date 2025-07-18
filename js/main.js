// Animación de conteo para las estadísticas
function animateCountUp() {
    const stats = document.querySelectorAll('.innovation-stat');

    stats.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-count'));
        const duration = 2000; // 2 segundos
        const stepTime = Math.abs(Math.floor(duration / target));
        let current = 0;

        const counter = setInterval(() => {
            current += Math.ceil(target / 50);
            if (current >= target) {
                current = target;
                clearInterval(counter);
            }

            if (target === 200) {
                stat.textContent = current + '+';
            } else if (target === 100) {
                stat.textContent = current + '%';
            } else {
                stat.textContent = current;
            }
        }, stepTime);
    });
}

// Observador para activar la animación cuando la sección sea visible
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCountUp();
            observer.disconnect(); // Solo anima una vez
        }
    });
}, { threshold: 0.5 });

// Observar la sección de pruebas
const proofSection = document.querySelector('.innovation-proof');
if (proofSection) {
    observer.observe(proofSection);
}

// Configuración del catálogo completo
document.addEventListener('DOMContentLoaded', function() {

    // --- LÓGICA DEL MODAL ---
    const modal = document.getElementById('product-modal');
    const modalBody = document.getElementById('modal-body');
    const closeModal = document.querySelector('.modal-close');

    // Botones de "Más detalles"
    // NOTA: Esta lógica seguirá funcionando con los nuevos botones.
    document.body.addEventListener('click', (e) => {
        if (e.target.classList.contains('btn-details')) {
            const productId = e.target.dataset.productId;
            const data = productData[productId];

            if (data) {
                modalBody.innerHTML = `
                    <h3>${data.name}</h3>
                    <p>${data.description}</p>
                    <h4 class="modal-subtitle">Modo de Uso</h4>
                    <p>${data.usage}</p>
                    <h4 class="modal-subtitle">Ingredientes Clave</h4>
                    <ul>
                        ${data.ingredients.map(ing => `<li>${ing}</li>`).join('')}
                    </ul>
                `;
                modal.style.display = 'block';
            } else {
                console.error('No se encontraron datos para el producto:', productId);
            }
        }
    });

    // Cerrar modal
    closeModal.addEventListener('click', () => modal.style.display = 'none');
    window.addEventListener('click', (event) => {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    });

    // --- LÓGICA DE COMPARTIR ---
    // NOTA: Este código se mantiene por si se reutiliza, pero los botones .btn-share ya no están en las tarjetas.
    document.querySelectorAll('.btn-share').forEach(button => {
        button.addEventListener('click', async (event) => {
            const productId = button.dataset.productId;
            const productCard = document.getElementById(productId);
            const productName = productCard.querySelector('h3').innerText;
            const shareUrl = `${window.location.origin}${window.location.pathname}#${productId}`;

            const shareData = {
                title: `Producto Gano Excel: ${productName}`,
                text: `¡Hola! Te comparto este producto que te puede interesar: ${productName}.`,
                url: shareUrl
            };

            if (navigator.share) {
                try {
                    await navigator.share(shareData);
                } catch (err) {
                    console.error("Error al compartir:", err);
                }
            } else {
                // Fallback para escritorio
                try {
                    await navigator.clipboard.writeText(shareUrl);
                    const originalText = button.innerText;
                    button.innerText = '¡Enlace Copiado!';
                    setTimeout(() => {
                        button.innerText = originalText;
                    }, 2000);
                } catch (err) {
                    console.error('Error al copiar el enlace:', err);
                    alert('No se pudo copiar el enlace. Por favor, cópialo manualmente.');
                }
            }
        });
    });

    // --- LÓGICA DEL MENÚ DESPLEGABLE ---
    const dropdownToggle = document.querySelector('.dropdown-toggle');
    const dropdownMenu = document.querySelector('.dropdown-menu');
    const dropdownItems = document.querySelectorAll('.dropdown-item');

    if (dropdownToggle && dropdownMenu) {
        // Función para cerrar el menú
        function closeDropdown() {
            dropdownMenu.classList.remove('show');
            dropdownToggle.setAttribute('aria-expanded', 'false');
            if (overlay) overlay.classList.remove('show');
        }

        // Función para abrir el menú
        function openDropdown() {
            dropdownMenu.classList.add('show');
            dropdownToggle.setAttribute('aria-expanded', 'true');
            if (overlay) overlay.classList.add('show');
        }

        // Toggle del menú al hacer clic en el botón
        dropdownToggle.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();

            if (dropdownMenu.classList.contains('show')) {
                closeDropdown();
            } else {
                openDropdown();
            }
        });

        // Cerrar el menú al hacer clic en un item
        dropdownItems.forEach(item => {
            item.addEventListener('click', () => {
                closeDropdown();

                // Scroll suave a la sección (opcional)
                const targetId = item.getAttribute('href');
                if (targetId && targetId.startsWith('#')) {
                    const targetSection = document.querySelector(targetId);
                    if (targetSection) {
                        targetSection.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                }
            });
        });

        // Cerrar el menú al hacer clic fuera
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.dropdown')) {
                closeDropdown();
            }
        });

        // Cerrar el menú al hacer scroll
        window.addEventListener('scroll', () => {
            if (dropdownMenu.classList.contains('show')) {
                closeDropdown();
            }
        });

        // Cerrar el menú con la tecla Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && dropdownMenu.classList.contains('show')) {
                closeDropdown();
                dropdownToggle.focus();
            }
        });

        // Crear overlay para móviles
        const isMobile = window.innerWidth <= 600;
        let overlay;

        if (isMobile) {
            overlay = document.createElement('div');
            overlay.className = 'dropdown-overlay';
            document.body.appendChild(overlay);

            // Cerrar al hacer clic en el overlay
            overlay.addEventListener('click', closeDropdown);
        }
    }

    // --- CONFIGURACIÓN DEL BOTÓN DE WHATSAPP ---
    // NOTA: La lógica de `distributor.js` es prioritaria y sobreescribirá esto, lo cual es correcto.
    // Esto se mantiene como un fallback.
    const urlParams = new URLSearchParams(window.location.search);
    const defaultSocioId = '573203415438';
    const socioIdFromUrl = urlParams.get('socio');
    const finalSocioId = socioIdFromUrl || defaultSocioId;

    if (finalSocioId && !urlParams.get('distribuidor')) { // Solo se ejecuta si no hay un distribuidor específico.
        const whatsappButton = document.getElementById('whatsapp-button');
        const whatsappLink = `https://wa.me/${finalSocioId}?text=${encodeURIComponent('Hola, estoy interesado(a) en los productos Gano Excel. ¿Me podrías dar más información?')}`;

        whatsappButton.href = whatsappLink;
        whatsappButton.style.display = 'flex';
    }
});
