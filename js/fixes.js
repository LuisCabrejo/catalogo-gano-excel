/**
 * CORRECCIONES ESPECÍFICAS PARA LOS PROBLEMAS REPORTADOS
 * Este archivo se debe cargar después de main.js para asegurar que todas las correcciones se apliquen
 */

document.addEventListener('DOMContentLoaded', function() {
    console.log('🔧 Aplicando correcciones específicas...');

    // =================================
    // 1. CORREGIR NAVEGACIÓN Y SCROLL OFFSET
    // =================================

    // Función para scroll con offset correcto
    function scrollToSection(sectionId) {
        const section = document.querySelector(sectionId);
        if (section) {
            const navHeight = document.querySelector('.main-nav').offsetHeight;
            const targetPosition = section.offsetTop - navHeight - 20;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    }

    // Corregir todos los enlaces de navegación
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = this.getAttribute('href');
            if (target && target !== '#') {
                scrollToSection(target);
            }
        });
    });

    // =================================
    // 2. CORREGIR DROPDOWN EN MÓVIL
    // =================================

    const dropdown = document.querySelector('.nav-dropdown');
    const dropdownMenu = document.querySelector('.dropdown-menu');

    if (dropdown && dropdownMenu) {
        // Manejar clicks en móvil
        dropdown.addEventListener('click', function(e) {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                dropdownMenu.style.display = dropdownMenu.style.display === 'block' ? 'none' : 'block';
                dropdownMenu.style.opacity = dropdownMenu.style.display === 'block' ? '1' : '0';
                dropdownMenu.style.visibility = dropdownMenu.style.display === 'block' ? 'visible' : 'hidden';
            }
        });

        // Cerrar dropdown al hacer clic en un enlace
        dropdownMenu.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                dropdownMenu.style.display = 'none';
                dropdownMenu.style.opacity = '0';
                dropdownMenu.style.visibility = 'hidden';
            }
        });

        // Cerrar dropdown al hacer clic fuera
        document.addEventListener('click', function(e) {
            if (!dropdown.contains(e.target) && window.innerWidth <= 768) {
                dropdownMenu.style.display = 'none';
                dropdownMenu.style.opacity = '0';
                dropdownMenu.style.visibility = 'hidden';
            }
        });
    }

    // =================================
    // 3. ASEGURAR QUE EL CARRITO FUNCIONE
    // =================================

    const cartButton = document.getElementById('cart-button');
    const cartDrawer = document.getElementById('cart-drawer');
    const cartOverlay = document.getElementById('cart-overlay');

    if (cartButton) {
        // Forzar que el botón sea clicable
        cartButton.style.pointerEvents = 'auto';
        cartButton.style.cursor = 'pointer';

        // Agregar evento de clic si no existe
        cartButton.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();

            console.log('🛒 Abriendo carrito...');

            if (cartDrawer) {
                cartDrawer.classList.add('open');
                if (cartOverlay) {
                    cartOverlay.classList.add('show');
                }
                document.body.style.overflow = 'hidden';
            }
        });
    }

    // =================================
    // 4. MEJORAR SCROLL EN CARRITO MÓVIL
    // =================================

    const cartBody = document.querySelector('.cart-body');
    if (cartBody) {
        // Asegurar que el scroll funcione en móvil
        cartBody.style.webkitOverflowScrolling = 'touch';
        cartBody.style.overflowY = 'auto';
    }

    // =================================
    // 5. CORREGIR WHATSAPP FAB
    // =================================

    function actualizarWhatsAppFab() {
        const whatsappFab = document.getElementById('whatsapp-fab');
        const distributorWhatsapp = document.body.dataset.distributorWhatsapp;

        if (whatsappFab && distributorWhatsapp) {
            const mensaje = 'Hola, vi tu catálogo de productos Gano Excel y me interesan. ¿Me podrías dar más información?';
            const whatsappUrl = `https://api.whatsapp.com/send?phone=${distributorWhatsapp}&text=${encodeURIComponent(mensaje)}`;

            whatsappFab.href = whatsappUrl;
            whatsappFab.style.display = 'flex';

            console.log('📱 WhatsApp FAB actualizado:', whatsappUrl);
        }
    }

    // Ejecutar inmediatamente y después de 2 segundos para asegurar
    actualizarWhatsAppFab();
    setTimeout(actualizarWhatsAppFab, 2000);

    // =================================
    // 6. CORREGIR FUNCIONALIDAD DEL CHECKOUT
    // =================================

    const checkoutBtn = document.getElementById('checkout-btn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', function(e) {
            e.preventDefault();

            const distributorWhatsapp = document.body.dataset.distributorWhatsapp;
            const customerName = document.getElementById('customer-name')?.value?.trim();
            const customerAddress = document.getElementById('customer-address')?.value?.trim();

            if (!customerName || !customerAddress) {
                alert('Por favor completa todos los campos.');
                return;
            }

            if (!distributorWhatsapp) {
                alert('Error: No se pudo obtener el contacto del distribuidor.');
                return;
            }

            // Obtener items del carrito desde el DOM
            const cartItems = Array.from(document.querySelectorAll('.cart-item')).map(item => {
                const name = item.querySelector('.cart-item-name')?.textContent || '';
                const qty = item.querySelector('.cart-item-qty span')?.textContent || '1';
                const total = item.querySelector('.cart-item-total')?.textContent || '';

                return { name, quantity: qty, total };
            });

            if (cartItems.length === 0) {
                alert('Tu carrito está vacío.');
                return;
            }

            // Generar mensaje
            let mensaje = `🛒 *NUEVO PEDIDO DESDE EL CATÁLOGO* 🛒\n\n`;
            mensaje += `👤 *Cliente:* ${customerName}\n`;
            mensaje += `📍 *Dirección:* ${customerAddress}\n\n`;
            mensaje += `📦 *PRODUCTOS PEDIDOS:*\n`;

            cartItems.forEach(item => {
                mensaje += `• ${item.quantity}x ${item.name}\n`;
                mensaje += `  💰 ${item.total}\n\n`;
            });

            const subtotal = document.getElementById('cart-subtotal')?.textContent || '$0';
            const shipping = document.getElementById('cart-shipping')?.textContent || '$0';
            const total = document.getElementById('cart-total')?.textContent || '$0';

            mensaje += `💰 *RESUMEN DEL PEDIDO:*\n`;
            mensaje += `Subtotal: ${subtotal}\n`;
            mensaje += `Envío: ${shipping}\n`;
            mensaje += `*TOTAL: ${total}*\n\n`;
            mensaje += `¡Hola! Este es mi pedido desde tu catálogo. ¿Podrías confirmar disponibilidad y coordinar el envío? ¡Gracias! 😊`;

            // Abrir WhatsApp
            const whatsappUrl = `https://api.whatsapp.com/send?phone=${distributorWhatsapp}&text=${encodeURIComponent(mensaje)}`;
            window.open(whatsappUrl, '_blank');

            console.log('📱 Pedido enviado por WhatsApp');
        });
    }

    // =================================
    // 7. ASEGURAR RESPONSIVE EN NAVEGACIÓN
    // =================================

    function ajustarNavegacionResponsive() {
        const navLinks = document.querySelectorAll('.nav-link');
        const screenWidth = window.innerWidth;

        navLinks.forEach(link => {
            if (screenWidth <= 480) {
                link.style.fontSize = '0.75rem';
                link.style.padding = '6px 10px';
            } else if (screenWidth <= 768) {
                link.style.fontSize = '0.8rem';
                link.style.padding = '8px 12px';
            } else {
                link.style.fontSize = '0.9rem';
                link.style.padding = '8px 16px';
            }
        });
    }

    // Ejecutar al cargar y al redimensionar
    ajustarNavegacionResponsive();
    window.addEventListener('resize', ajustarNavegacionResponsive);

    // =================================
    // 8. DEBUGGING PARA IDENTIFICAR PROBLEMAS
    // =================================

    if (window.location.search.includes('debug=true')) {
        console.log('🔧 Modo DEBUG activado');

        // Mostrar información del distribuidor
        console.log('📊 Datos del distribuidor:', {
            whatsapp: document.body.dataset.distributorWhatsapp,
            affiliation: document.body.dataset.distributorAffiliation
        });

        // Verificar elementos críticos
        const elementos = {
            'Carrito botón': !!document.getElementById('cart-button'),
            'Carrito drawer': !!document.getElementById('cart-drawer'),
            'WhatsApp FAB': !!document.getElementById('whatsapp-fab'),
            'Checkout botón': !!document.getElementById('checkout-btn'),
            'Dropdown menu': !!document.querySelector('.dropdown-menu')
        };

        console.table(elementos);
    }

    console.log('✅ Correcciones específicas aplicadas correctamente');
});
