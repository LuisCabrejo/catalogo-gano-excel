document.addEventListener('DOMContentLoaded', function() {
    // =================================
    // 1. ESTADO Y CONFIGURACIÓN INICIAL
    // =================================
    let cart = [];
    const SHIPPING_COST = 15000;
    const formatCurrency = (value) => new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
        minimumFractionDigits: 0
    }).format(value);

    // =================================
    // 2. SELECCIÓN DE ELEMENTOS DEL DOM
    // =================================
    const productModal = document.getElementById('product-modal');
    const cartSidebar = document.getElementById('cart-sidebar');
    const cartOverlay = document.getElementById('cart-overlay');
    const cartItemsContainer = document.getElementById('cart-items-container');
    const cartSubtotalEl = document.getElementById('cart-subtotal');
    const cartShippingEl = document.getElementById('cart-shipping');
    const cartTotalEl = document.getElementById('cart-total');
    const cartCountBadge = document.getElementById('cart-count-badge');
    const checkoutBtn = document.getElementById('checkout-btn');
    const closeCartBtn = document.getElementById('close-cart');
    const cartButton = document.getElementById('cart-button');
    const wellnessButtons = document.querySelectorAll('.wellness-goal-btn');
    const allProductCards = document.querySelectorAll('.product-card');
    const proofSection = document.querySelector('.innovation-proof');
    const toastContainer = document.getElementById('toast-container');

    // Elementos del menú
    const navDropdown = document.querySelector('.nav-dropdown');
    const dropdownToggle = document.querySelector('.dropdown-toggle');
    const dropdownItems = document.querySelectorAll('.dropdown-item');

    // =================================
    // 3. INICIALIZACIÓN DE LA PÁGINA
    // =================================

    // Poblar precios en las tarjetas de producto
    allProductCards.forEach(card => {
        const product = productData[card.id];
        if (product) {
            const priceEl = card.querySelector('.product-price');
            if (priceEl) priceEl.textContent = formatCurrency(product.price);
        }
    });

    // Inicializar carrito
    updateCartUI();
    updateCartCount();

    // Configurar menú responsivo
    setupResponsiveMenu();

    // =================================
    // 4. CONFIGURACIÓN DEL MENÚ RESPONSIVO
    // =================================
    function setupResponsiveMenu() {
        // Solo en mobile (<=768px) manejar clicks en dropdown
        function handleDropdownClick(e) {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                navDropdown.classList.toggle('active');
            }
        }

        // Cerrar dropdown al hacer click en items (mobile y desktop)
        function closeDropdownOnItemClick(e) {
            // Agregar clase de feedback visual
            e.currentTarget.classList.add('clicked');

            // Cerrar dropdown
            if (navDropdown) {
                navDropdown.classList.remove('active');
            }

            // Remover clase después de un momento
            setTimeout(() => {
                e.currentTarget.classList.remove('clicked');
            }, 200);
        }

        // Event listeners
        if (dropdownToggle) {
            dropdownToggle.addEventListener('click', handleDropdownClick);
        }

        dropdownItems.forEach(item => {
            item.addEventListener('click', closeDropdownOnItemClick);
        });

        // Cerrar dropdown al hacer click fuera
        document.addEventListener('click', (e) => {
            if (!navDropdown.contains(e.target)) {
                navDropdown.classList.remove('active');
            }
        });

        // Manejar cambios de tamaño de ventana
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) {
                navDropdown.classList.remove('active');
            }
        });
    }

    // =================================
    // 5. SISTEMA DE NOTIFICACIONES TOAST
    // =================================
    function showToast(title, message, type = 'success') {
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;

        const icon = type === 'success' ? '✅' : '❌';

        toast.innerHTML = `
            <div class="toast-icon">${icon}</div>
            <div class="toast-content">
                <div class="toast-title">${title}</div>
                <div class="toast-message">${message}</div>
            </div>
        `;

        toastContainer.appendChild(toast);

        // Auto-remove después de 3 segundos
        setTimeout(() => {
            if (toast.parentNode) {
                toast.style.animation = 'slideOutRight 0.3s ease';
                setTimeout(() => toast.remove(), 300);
            }
        }, 3000);
    }

    // =================================
    // 6. ANIMACIÓN DEL CONTADOR
    // =================================
    function animateCountUp() {
        const stats = document.querySelectorAll('.innovation-stat');
        stats.forEach(stat => {
            const target = parseInt(stat.dataset.count);
            let current = 0;
            const increment = target / 50;

            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    clearInterval(timer);
                    if (target === 200) {
                        stat.textContent = target + '+';
                    } else if (target === 100) {
                        stat.textContent = target + '%';
                    } else {
                        stat.textContent = target;
                    }
                } else {
                    stat.textContent = Math.ceil(current);
                }
            }, 40);
        });
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCountUp();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    if (proofSection) {
        observer.observe(proofSection);
    }

    // =================================
    // 7. FUNCIONES DEL CARRITO
    // =================================

    function updateCartCount() {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCountBadge.textContent = totalItems;
        cartCountBadge.style.display = totalItems > 0 ? 'flex' : 'none';
    }

    function updateCartUI() {
        const isEmpty = cart.length === 0;

        if (isEmpty) {
            cartItemsContainer.innerHTML = `
                <div class="cart-empty">
                    <div class="cart-empty-icon">🛒</div>
                    <p>Tu carrito está vacío</p>
                    <small>¡Comienza agregando productos!</small>
                </div>
            `;
        } else {
            cartItemsContainer.innerHTML = cart.map(item => `
                <div class="cart-item" data-id="${item.id}">
                    <div class="cart-item-header">
                        <div class="cart-item-info">
                            <h5>${item.name}</h5>
                        </div>
                        <div class="cart-item-price">${formatCurrency(item.price * item.quantity)}</div>
                    </div>
                    <div class="cart-item-controls">
                        <div class="quantity-controls">
                            <button class="qty-btn decrease" data-id="${item.id}" ${item.quantity <= 1 ? 'disabled' : ''}>-</button>
                            <span class="quantity-display">${item.quantity}</span>
                            <button class="qty-btn increase" data-id="${item.id}">+</button>
                        </div>
                        <button class="remove-item" data-id="${item.id}">🗑️</button>
                    </div>
                </div>
            `).join('');
        }

        // Calcular totales
        const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const shipping = subtotal > 0 ? SHIPPING_COST : 0;
        const total = subtotal + shipping;

        cartSubtotalEl.textContent = formatCurrency(subtotal);
        cartShippingEl.textContent = formatCurrency(shipping);
        cartTotalEl.textContent = formatCurrency(total);

        // Habilitar/deshabilitar botón de checkout
        checkoutBtn.disabled = isEmpty;

        updateCartCount();
    }

    function addToCart(productId) {
        const product = productData[productId];
        if (!product) return;

        const existingItem = cart.find(item => item.id === productId);

        if (existingItem) {
            existingItem.quantity++;
            showToast('Cantidad actualizada', `${product.name} (${existingItem.quantity} unidades)`);
        } else {
            cart.push({
                id: productId,
                name: product.name,
                price: product.price,
                quantity: 1
            });
            showToast('Producto agregado', `${product.name} agregado al carrito`);
        }

        updateCartUI();

        // Feedback visual en el botón
        const button = document.querySelector(`.btn-quick-add[data-product-id="${productId}"]`);
        if (button) {
            const originalText = button.textContent;
            button.textContent = 'Agregado ✓';
            button.classList.add('added');

            setTimeout(() => {
                button.textContent = originalText;
                button.classList.remove('added');
            }, 1500);
        }
    }

    function removeFromCart(productId) {
        const itemIndex = cart.findIndex(item => item.id === productId);
        if (itemIndex > -1) {
            const removedItem = cart[itemIndex];
            cart.splice(itemIndex, 1);
            showToast('Producto eliminado', `${removedItem.name} eliminado del carrito`);
            updateCartUI();
        }
    }

    function changeQuantity(productId, change) {
        const item = cart.find(item => item.id === productId);
        if (item) {
            item.quantity += change;
            if (item.quantity <= 0) {
                removeFromCart(productId);
            } else {
                updateCartUI();
            }
        }
    }

    function openCart() {
        cartSidebar.classList.add('open');
        cartOverlay.classList.add('show');
        document.body.style.overflow = 'hidden';
    }

    function closeCart() {
        cartSidebar.classList.remove('open');
        cartOverlay.classList.remove('show');
        document.body.style.overflow = '';
    }

    // =================================
    // 8. MODAL DE DETALLES
    // =================================
    function showProductDetails(productId) {
        const data = productData[productId];
        if (!data) return;

        const modalBody = productModal.querySelector('.modal-body-details');
        modalBody.innerHTML = `
            <h3>${data.name}</h3>
            <p>${data.description}</p>
            <h4 class="modal-subtitle">Modo de Uso</h4>
            <p>${data.usage}</p>
            <h4 class="modal-subtitle">Ingredientes Clave</h4>
            <ul>${data.ingredients.map(ing => `<li>${ing}</li>`).join('')}</ul>
            <div class="trust-badges-container">
                ${data.isGanodermaBased ? `
                    <span class="trust-badge">🍄 6 Variedades Fusionadas</span>
                    <span class="trust-badge">💧 100% Hidrosoluble</span>
                    <span class="trust-badge">🌿 +200 Fitonutrientes</span>
                ` : ''}
            </div>
        `;
        productModal.classList.add('show');
    }

    // =================================
    // 9. ASESOR DE BIENESTAR
    // =================================
    wellnessButtons.forEach(button => {
        button.addEventListener('click', () => {
            const goal = button.dataset.goal;
            const isActive = button.classList.contains('active');

            // Remover estado activo de todos
            wellnessButtons.forEach(btn => btn.classList.remove('active'));
            allProductCards.forEach(card => card.classList.remove('recommended'));

            if (!isActive) {
                button.classList.add('active');

                // Destacar productos recomendados
                allProductCards.forEach(card => {
                    const product = productData[card.id];
                    if (product && product.wellnessTags && product.wellnessTags.includes(goal)) {
                        card.classList.add('recommended');
                    }
                });

                // Scroll a productos con offset correcto
                const productosSection = document.querySelector('#productos');
                if (productosSection) {
                    const navHeight = document.querySelector('nav.main-nav').offsetHeight;
                    const targetPosition = productosSection.offsetTop - navHeight - 20;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }

                showToast('Productos recomendados', 'Productos destacados según tu objetivo');
            }
        });
    });

    // =================================
    // 10. CHECKOUT POR WHATSAPP
    // =================================
    function processCheckout() {
        if (cart.length === 0) {
            showToast('Carrito vacío', 'Agrega productos antes de continuar', 'error');
            return;
        }

        const distributorWhatsapp = document.body.dataset.distributorWhatsapp;
        if (!distributorWhatsapp) {
            showToast('Error', 'No se encontró contacto del distribuidor', 'error');
            return;
        }

        const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const total = subtotal + SHIPPING_COST;

        let message = `🛒 *NUEVO PEDIDO DESDE EL CATÁLOGO* 🛒\n\n`;
        message += `📦 *PRODUCTOS SOLICITADOS:*\n`;

        cart.forEach(item => {
            message += `• ${item.quantity}x ${item.name}\n`;
            message += `  ${formatCurrency(item.price)} c/u = ${formatCurrency(item.price * item.quantity)}\n\n`;
        });

        message += `💰 *RESUMEN DEL PEDIDO:*\n`;
        message += `Subtotal: ${formatCurrency(subtotal)}\n`;
        message += `Envío: ${formatCurrency(SHIPPING_COST)}\n`;
        message += `*Total: ${formatCurrency(total)}*\n\n`;
        message += `Hola! Me interesa realizar este pedido. ¿Podrías confirmarme disponibilidad y coordinar el envío? 😊`;

        const whatsappUrl = `https://api.whatsapp.com/send?phone=${distributorWhatsapp}&text=${encodeURIComponent(message)}`;

        // Abrir WhatsApp
        window.open(whatsappUrl, '_blank');

        // Cerrar carrito
        closeCart();

        showToast('Redirigiendo a WhatsApp', 'Completa tu pedido por WhatsApp');
    }

    // =================================
    // 11. NAVEGACIÓN SUAVE CON OFFSET
    // =================================
    function smoothScrollWithOffset(targetId) {
        const target = document.querySelector(targetId);
        if (target) {
            const navHeight = document.querySelector('nav.main-nav').offsetHeight;
            const targetPosition = target.offsetTop - navHeight - 20;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    }

    // =================================
    // 12. GESTIÓN DE EVENTOS
    // =================================

    // Eventos del carrito
    if (cartButton) {
        cartButton.addEventListener('click', (e) => {
            e.preventDefault();
            openCart();
        });
    }

    if (closeCartBtn) {
        closeCartBtn.addEventListener('click', closeCart);
    }

    if (cartOverlay) {
        cartOverlay.addEventListener('click', closeCart);
    }

    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', processCheckout);
    }

    // Delegación de eventos para el documento
    document.addEventListener('click', (event) => {
        const target = event.target;

        // Cerrar modales
        if (target.matches('.modal-close') || target.matches('.modal')) {
            productModal.classList.remove('show');
        }

        // Botones de producto
        if (target.closest('.btn-details')) {
            const productId = target.closest('.btn-details').dataset.productId;
            showProductDetails(productId);
        }

        if (target.closest('.btn-quick-add')) {
            const productId = target.closest('.btn-quick-add').dataset.productId;
            addToCart(productId);
        }

        // Controles del carrito
        if (target.matches('.qty-btn')) {
            const productId = target.dataset.id;
            const change = target.classList.contains('increase') ? 1 : -1;
            changeQuantity(productId, change);
        }

        if (target.matches('.remove-item')) {
            const productId = target.dataset.id;
            removeFromCart(productId);
        }

        // Enlaces de navegación que requieren scroll offset
        if (target.matches('a[href^="#"]')) {
            const href = target.getAttribute('href');
            if (href && href !== '#') {
                event.preventDefault();
                smoothScrollWithOffset(href);
            }
        }
    });

    // Prevenir cierre del modal al hacer click dentro del contenido
    document.querySelectorAll('.modal-content').forEach(content => {
        content.addEventListener('click', (e) => e.stopPropagation());
    });

    // Cerrar carrito y modal con ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeCart();
            if (productModal) {
                productModal.classList.remove('show');
            }
            // Cerrar dropdown en mobile
            if (navDropdown) {
                navDropdown.classList.remove('active');
            }
        }
    });

    // =================================
    // 13. INICIALIZACIÓN FINAL
    // =================================
    console.log('🛒 Sistema de carrito inicializado correctamente');
    console.log('📱 Menú responsivo configurado');
    console.log('✨ Catálogo Gano Excel cargado completamente');
});

// =================================
// 14. FUNCIONES GLOBALES PARA DEBUGGING
// =================================
window.cartDebug = {
    getCart: () => cart,
    clearCart: () => {
        cart = [];
        updateCartUI();
        console.log('🗑️ Carrito limpiado');
    },
    addTestProduct: () => {
        const testProduct = Object.keys(productData)[0];
        addToCart(testProduct);
        console.log('🧪 Producto de prueba agregado');
    }
};

// =================================
// 15. ESTILOS DINÁMICOS PARA ANIMACIONES
// =================================
const style = document.createElement('style');
style.textContent = `
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
