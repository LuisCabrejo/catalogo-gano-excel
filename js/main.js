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

    // --- FUNCIONALIDAD DEL MENÚ DROPDOWN ---
    const productsDropdown = document.querySelector('.products-dropdown');
    if (productsDropdown) {
        const dropdownLink = productsDropdown.querySelector('a');
        const dropdownMenu = productsDropdown.querySelector('.dropdown-menu');
        const dropdownOptions = dropdownMenu.querySelectorAll('a');

        // Funcionalidad para móviles (click)
        dropdownLink.addEventListener('click', function(e) {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                productsDropdown.classList.toggle('active');
            }
        });

        // Cerrar dropdown al hacer click en una opción (solo móvil)
        dropdownOptions.forEach(option => {
            option.addEventListener('click', function(e) {
                if (window.innerWidth <= 768) {
                    // Cerrar el dropdown
                    productsDropdown.classList.remove('active');

                    // Esperar un poco para que se cierre el dropdown antes del scroll
                    setTimeout(() => {
                        const targetId = this.getAttribute('href');
                        const targetElement = document.querySelector(targetId);

                        if (targetElement) {
                            // Calcular offset considerando el menú sticky
                            const menuHeight = document.querySelector('.main-nav').offsetHeight;
                            const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                            const offsetPosition = elementPosition - menuHeight - 20; // 20px extra de padding

                            window.scrollTo({
                                top: offsetPosition,
                                behavior: 'smooth'
                            });
                        }
                    }, 300); // Tiempo de la animación de cierre
                }
            });
        });

        // Cerrar dropdown al hacer click fuera (solo móvil)
        document.addEventListener('click', function(e) {
            if (window.innerWidth <= 768 && !productsDropdown.contains(e.target)) {
                productsDropdown.classList.remove('active');
            }
        });

        // Cerrar dropdown al redimensionar ventana
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768) {
                productsDropdown.classList.remove('active');
            }
        });

        // Manejar scroll suave para todos los enlaces de anclaje
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);

                if (targetElement && !this.closest('.dropdown-menu')) {
                    // Solo aplicar offset si no es un enlace del dropdown (ya manejado arriba)
                    const menuHeight = document.querySelector('.main-nav').offsetHeight;
                    const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                    const offsetPosition = elementPosition - menuHeight - 20;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    // --- LÓGICA DEL MODAL ---
    const modal = document.getElementById('product-modal');
    const modalBody = document.getElementById('modal-body');
    const closeModal = document.querySelector('.modal-close');

    // Botones de "Más detalles"
    document.querySelectorAll('.btn-details').forEach(button => {
        button.addEventListener('click', () => {
            const productId = button.dataset.productId;
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
        });
    });

    // Cerrar modal
    if (closeModal) {
        closeModal.addEventListener('click', () => modal.style.display = 'none');
    }

    window.addEventListener('click', (event) => {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    });

    // --- LÓGICA DE COMPARTIR ---
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

    // --- CONFIGURACIÓN DEL BOTÓN DE WHATSAPP (MANTENER FUNCIONALIDAD EXISTENTE) ---
    // Esta funcionalidad se mantiene para el botón flotante de WhatsApp
    // El carrito tendrá su propia gestión de WhatsApp
    const urlParams = new URLSearchParams(window.location.search);
    const defaultSocioId = '573203415438';
    const socioIdFromUrl = urlParams.get('socio');
    const finalSocioId = socioIdFromUrl || defaultSocioId;

    if (finalSocioId) {
        const whatsappButton = document.getElementById('whatsapp-button');
        if (whatsappButton) {
            const whatsappLink = `https://wa.me/${finalSocioId}?text=${encodeURIComponent('Hola, estoy interesado(a) en los productos Gano Excel. ¿Me podrías dar más información?')}`;

            whatsappButton.href = whatsappLink;
            whatsappButton.style.display = 'flex';
        }
    }

    // Log de confirmación
    console.log('🎯 Sistema principal del catálogo inicializado');
    console.log('🛒 El sistema de carrito se inicializará después...');
});
