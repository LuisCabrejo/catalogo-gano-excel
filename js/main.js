document.addEventListener('DOMContentLoaded', function() {
    // =================================
    // 1. CONFIGURACIÓN Y ESTADO GLOBAL
    // =================================
    let cart = [];
    const SHIPPING_COST = 15000;

    // Formateo de moneda
    const formatCurrency = (value) => {
        return new Intl.NumberFormat('es-CO', {
            style: 'currency',
            currency: 'COP',
            minimumFractionDigits: 0
        }).format(value);
    };

    // =================================
    // 2. ELEMENTOS DEL DOM
    // =================================
    const productModal = document.getElementById('product-modal');
    const cartDrawer = document.getElementById('cart-drawer');
    const cartButton = document.getElementById('cart-button');
    const closeCartBtn = document.getElementById('close-cart');
    const cartItemsList = document.getElementById('cart-items-list');
    const cartSubtotalEl = document.getElementById('cart-subtotal');
    const cartShippingEl = document.getElementById('cart-shipping');
    const cartTotalEl = document.getElementById('cart-total');
    const cartCountBadge = document.getElementById('cart-count-badge');
    const checkoutBtn = document.getElementById('checkout-btn');
    const customerNameInput = document.getElementById('customer-name');
    const customerAddressInput = document.getElementById('customer-address');
    const wellnessButtons = document.querySelectorAll('.wellness-goal-btn');
    const allProductCards = document.querySelectorAll('.product-card');
    const proofSection = document.querySelector('.innovation-proof');
    const whatsappFab = document.getElementById('whatsapp-fab');

    // =================================
    // 3. INICIALIZACIÓN
    // =================================

    // Poblar precios en las tarjetas
    allProductCards.forEach(card => {
        const product = productData[card.id];
        if (product) {
            const priceEl = card.querySelector('.product-price');
            if (priceEl) priceEl.textContent = formatCurrency(product.price);
        }
    });

    // Crear overlay para el carrito en móvil
    const cartOverlay = document.createElement('div');
    cartOverlay.className = 'cart-overlay';
    cartOverlay.id = 'cart-overlay';
    document.body.appendChild(cartOverlay);

    // =================================
    // 4. FUNCIONES DEL CARRITO REDISEÑADO
    // =================================

    function openCart() {
        cartDrawer.classList.add('open');
        cartOverlay.classList.add('show');
        document.body.style.overflow = 'hidden';
        updateCartDisplay();
    }

    function closeCart() {
        cartDrawer.classList.remove('open');
        cartOverlay.classList.remove('show');
        document.body.style.overflow = '';
    }

    function addToCart(productId) {
        const existingItem = cart.find(item => item.id === productId);
        const product = productData[productId];

        if (!product) return;

        if (existingItem) {
            existingItem.quantity++;
        } else {
            cart.push({
                id: productId,
                name: product.name,
                price: product.price,
                quantity: 1
            });
        }

        updateCartDisplay();
        updateCartBadge();
        showAddedFeedback(productId);
    }

    function removeFromCart(productId) {
        cart = cart.filter(item => item.id !== productId);
        updateCartDisplay();
        updateCartBadge();
        validateCheckout();
    }

    function updateQuantity(productId, newQuantity) {
        const item = cart.find(item => item.id === productId);
        if (item) {
            if (newQuantity <= 0) {
                removeFromCart(productId);
            } else {
                item.quantity = newQuantity;
                updateCartDisplay();
                updateCartBadge();
                validateCheckout();
            }
        }
    }

    function updateCartDisplay() {
        if (cart.length === 0) {
            cartItemsList.innerHTML = `
                <div class="cart-empty">
                    <p>🛒 Tu carrito está vacío</p>
                    <p>¡Agrega algunos productos!</p>
                </div>
            `;
        } else {
            cartItemsList.innerHTML = cart.map(item => `
                <div class="cart-item" data-id="${item.id}">
                    <div class="cart-item-header">
                        <div class="cart-item-name">${item.name}</div>
                        <button class="cart-item-remove" onclick="removeFromCart('${item.id}')">×</button>
                    </div>
                    <div class="cart-item-controls">
                        <div class="cart-item-qty">
                            <button class="qty-btn" onclick="updateQuantity('${item.id}', ${item.quantity - 1})">-</button>
                            <span>${item.quantity}</span>
                            <button class="qty-btn" onclick="updateQuantity('${item.id}', ${item.quantity + 1})">+</button>
                        </div>
                        <div class="cart-item-total">${formatCurrency(item.price * item.quantity)}</div>
                    </div>
                </div>
            `).join('');
        }

        updateCartSummary();
        validateCheckout();
    }

    function updateCartSummary() {
        const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const shipping = subtotal > 0 ? SHIPPING_COST : 0;
        const total = subtotal + shipping;

        cartSubtotalEl.textContent = formatCurrency(subtotal);
        cartShippingEl.textContent = formatCurrency(shipping);
        cartTotalEl.textContent = formatCurrency(total);
    }

    function updateCartBadge() {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCountBadge.textContent = totalItems;

        // Mostrar/ocultar badge basado en cantidad
        if (totalItems > 0) {
            cartCountBadge.style.display = 'block';
            cartButton.setAttribute('data-count', totalItems);
        } else {
            cartCountBadge.style.display = 'none';
            cartButton.setAttribute('data-count', '0');
        }
    }

    function showAddedFeedback(productId) {
        const button = document.querySelector(`[data-product-id="${productId}"].btn-add-to-cart`);
        if (button) {
            const originalText = button.textContent;
            button.textContent = '✓ Agregado';
            button.classList.add('added');

            setTimeout(() => {
                button.textContent = originalText;
                button.classList.remove('added');
            }, 1500);
        }
    }

    function validateCheckout() {
        const hasItems = cart.length > 0;
        const hasName = customerNameInput.value.trim().length > 0;
        const hasAddress = customerAddressInput.value.trim().length > 0;

        checkoutBtn.disabled = !(hasItems && hasName && hasAddress);
    }

    // =================================
    // 5. FUNCIONES DE PRODUCTOS Y MODAL
    // =================================

    function showProductDetails(productId) {
        const product = productData[productId];
        if (!product) return;

        const modalBody = productModal.querySelector('.modal-body-details');
        modalBody.innerHTML = `
            <h3>${product.name}</h3>
            <p class="product-price-modal">${formatCurrency(product.price)}</p>
            <p>${product.description}</p>
            <h4 class="modal-subtitle">Modo de Uso</h4>
            <p>${product.usage}</p>
            <h4 class="modal-subtitle">Ingredientes Clave</h4>
            <ul>${product.ingredients.map(ing => `<li>${ing}</li>`).join('')}</ul>
            ${product.isGanodermaBased ? `
                <div class="trust-badges-container">
                    <span class="trust-badge">🍄 6 Variedades Fusionadas</span>
                    <span class="trust-badge">💧 100% Hidrosoluble</span>
                    <span class="trust-badge">🌿 +200 Fitonutrientes</span>
                </div>
            ` : ''}
        `;
        productModal.classList.add('show');
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
                    if (target === 100) {
                        stat.textContent = target + '%';
                    } else if (target === 200) {
                        stat.textContent = target + '+';
                    } else {
                        stat.textContent = target;
                    }
                } else {
                    stat.textContent = Math.ceil(current);
                }
            }, 40);
        });
    }

    // Observer para el contador
    if (proofSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCountUp();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        observer.observe(proofSection);
    }

    // =================================
    // 7. ASESOR DE BIENESTAR
    // =================================

    wellnessButtons.forEach(button => {
        button.addEventListener('click', () => {
            const goal = button.dataset.goal;
            const isActive = button.classList.contains('active');

            // Limpiar selecciones anteriores
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

                // Scroll suave a productos
                document.querySelector('#productos').scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // =================================
    // 8. GESTIÓN DE EVENTOS
    // =================================

    // Eventos del carrito
    cartButton.addEventListener('click', openCart);
    closeCartBtn.addEventListener('click', closeCart);
    cartOverlay.addEventListener('click', closeCart);

    // Validación del formulario
    customerNameInput.addEventListener('input', validateCheckout);
    customerAddressInput.addEventListener('input', validateCheckout);

    // Checkout
    checkoutBtn.addEventListener('click', (e) => {
        e.preventDefault();

        if (cart.length === 0) {
            alert('Tu carrito está vacío.');
            return;
        }

        const customerName = customerNameInput.value.trim();
        const customerAddress = customerAddressInput.value.trim();
        const distributorWhatsapp = document.body.dataset.distributorWhatsapp;

        if (!customerName || !customerAddress) {
            alert('Por favor completa todos los datos.');
            return;
        }

        if (!distributorWhatsapp) {
            alert('Error: No se encontró el número del distribuidor.');
            return;
        }

        // Generar mensaje de WhatsApp
        const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const total = subtotal + SHIPPING_COST;

        let message = `🛒 *NUEVO PEDIDO DESDE EL CATÁLOGO* 🛒\n\n`;
        message += `👤 *Cliente:* ${customerName}\n`;
        message += `📍 *Dirección:* ${customerAddress}\n\n`;
        message += `📦 *PRODUCTOS PEDIDOS:*\n`;

        cart.forEach(item => {
            message += `• ${item.quantity}x ${item.name}\n`;
            message += `  💰 ${formatCurrency(item.price * item.quantity)}\n\n`;
        });

        message += `💰 *RESUMEN DEL PEDIDO:*\n`;
        message += `Subtotal: ${formatCurrency(subtotal)}\n`;
        message += `Envío: ${formatCurrency(SHIPPING_COST)}\n`;
        message += `*TOTAL: ${formatCurrency(total)}*\n\n`;
        message += `¡Hola! Este es mi pedido desde tu catálogo. ¿Podrías confirmar disponibilidad y coordinar el envío? ¡Gracias! 😊`;

        // Abrir WhatsApp
        const whatsappUrl = `https://api.whatsapp.com/send?phone=${distributorWhatsapp}&text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');

        // Limpiar carrito después del envío
        setTimeout(() => {
            cart = [];
            updateCartDisplay();
            updateCartBadge();
            customerNameInput.value = '';
            customerAddressInput.value = '';
            closeCart();
        }, 1000);
    });

    // Delegación de eventos para clics generales
    document.addEventListener('click', (event) => {
        const target = event.target;

        // Cerrar modales
        if (target.matches('.modal-close') || (target.matches('.modal') && !target.closest('.modal-content'))) {
            productModal.classList.remove('show');
        }

        // Mostrar detalles de producto
        if (target.closest('.btn-details')) {
            const productId = target.closest('.btn-details').dataset.productId;
            showProductDetails(productId);
        }

        // Agregar al carrito
        if (target.closest('.btn-add-to-cart')) {
            const productId = target.closest('.btn-add-to-cart').dataset.productId;
            addToCart(productId);
        }
    });

    // Tecla Escape para cerrar modales y carrito
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            productModal.classList.remove('show');
            closeCart();
        }
    });

    // =================================
    // 9. FUNCIONES GLOBALES (para HTML onclick)
    // =================================

    // Exponer funciones necesarias al scope global
    window.removeFromCart = removeFromCart;
    window.updateQuantity = updateQuantity;

    // =================================
    // 10. INICIALIZACIÓN FINAL
    // =================================

    // Configurar estado inicial
    updateCartBadge();
    validateCheckout();

    // Scroll suave para enlaces internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    console.log('🎯 Catálogo inicializado correctamente');
    console.log('📊 Productos cargados:', Object.keys(productData).length);
    console.log('🛒 Sistema de carrito listo');
});
