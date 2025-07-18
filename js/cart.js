document.addEventListener('DOMContentLoaded', () => {
    // Evita ejecutar si no estamos en una página con productos
    if (!document.querySelector('.product-grid')) {
        return;
    }

    // --- ESTADO Y CONSTANTES ---
    let cart = JSON.parse(localStorage.getItem('ganocart')) || [];
    const SHIPPING_COST = 12000;

    // --- ELEMENTOS DEL DOM ---
    const cartIconWrapper = document.querySelector('.cart-icon-wrapper');
    const cartCounter = document.querySelector('.cart-counter');
    const cartPanel = document.getElementById('cart-panel');
    const cartOverlay = document.getElementById('cart-overlay');
    const closeCartBtn = document.getElementById('cart-close-btn');
    const cartItemsContainer = document.getElementById('cart-items-container');
    const cartSubtotalEl = document.getElementById('cart-subtotal');
    const cartShippingEl = document.getElementById('cart-shipping');
    const cartTotalEl = document.getElementById('cart-total');
    const checkoutBtn = document.getElementById('checkout-btn');
    const body = document.body;

    // Elementos del Modal de Finalizar Compra
    const checkoutModal = document.getElementById('checkout-modal');
    const closeCheckoutBtn = document.getElementById('checkout-close-btn');
    const checkoutForm = document.getElementById('checkout-form');
    const customerNameInput = document.getElementById('customer-name');
    const customerAddressInput = document.getElementById('customer-address');
    const whatsappMessageTextarea = document.getElementById('whatsapp-message');

    // --- FUNCIONES UTILITARIAS ---
    const formatPrice = (price) => new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
        minimumFractionDigits: 0
    }).format(price);

    // --- LÓGICA DEL CARRITO ---
    const saveCart = () => localStorage.setItem('ganocart', JSON.stringify(cart));

    const addToCart = (productId) => {
        const product = productData[productId];
        if (!product) return;

        const existingItem = cart.find(item => item.id === productId);
        if (existingItem) {
            existingItem.quantity++;
        } else {
            cart.push({
                id: productId,
                name: product.name,
                price: product.price,
                quantity: 1,
                image: product.image
            });
        }
        showNotification(`${product.name} añadido al carrito.`);
        updateCart();
    };

    const changeQuantity = (productId, newQuantity) => {
        const itemIndex = cart.findIndex(item => item.id === productId);
        if (itemIndex === -1) return;

        if (newQuantity <= 0) {
            removeFromCart(productId);
        } else {
            cart[itemIndex].quantity = newQuantity;
            updateCart();
        }
    };

    const removeFromCart = (productId) => {
        const itemName = cart.find(item => item.id === productId)?.name;
        cart = cart.filter(item => item.id !== productId);
        showNotification(`${itemName || 'Producto'} eliminado del carrito.`, 'error');
        updateCart();
        if (cart.length === 0 && cartPanel.classList.contains('open')) {
            toggleCartPanel();
        }
    };

    // --- ACTUALIZACIONES DE UI ---
    const updateCart = () => {
        renderCartItems();
        updateCartSummary();
        updateCartCounter();
        saveCart();
    };

    const updateCartCounter = () => {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCounter.textContent = totalItems;
        cartCounter.style.display = totalItems > 0 ? 'flex' : 'none';
    };

    const updateCartSummary = () => {
        const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        cartSubtotalEl.textContent = formatPrice(subtotal);
        cartShippingEl.textContent = formatPrice(SHIPPING_COST);
        cartTotalEl.textContent = formatPrice(subtotal + SHIPPING_COST);
        checkoutBtn.disabled = cart.length === 0;
    };

    const renderCartItems = () => {
        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p class="cart-empty-msg">Tu carrito está vacío.</p>';
            return;
        }
        cartItemsContainer.innerHTML = cart.map(item => `
            <div class="cart-item" data-product-id="${item.id}">
                <img src="${item.image}" alt="${item.name}">
                <div class="cart-item-info">
                    <p class="cart-item-name">${item.name}</p>
                    <p class="cart-item-price">${formatPrice(item.price)}</p>
                </div>
                <div class="cart-item-controls">
                    <button class="quantity-btn decrease-qty" aria-label="Disminuir cantidad">-</button>
                    <span>${item.quantity}</span>
                    <button class="quantity-btn increase-qty" aria-label="Aumentar cantidad">+</button>
                </div>
                <button class="remove-item-btn" aria-label="Eliminar producto">&times;</button>
            </div>
        `).join('');
    };

    const toggleCartPanel = () => {
        const isOpen = cartPanel.classList.toggle('open');
        cartOverlay.classList.toggle('open');
        body.style.overflow = isOpen ? 'hidden' : '';
    };

    const showNotification = (message, type = 'success') => {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        body.appendChild(notification);
        setTimeout(() => notification.classList.add('show'), 10);
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => body.removeChild(notification), 500);
        }, 3000);
    };

    // --- LÓGICA DE FINALIZAR COMPRA ---
    const generateWhatsAppMessage = () => {
        const customerName = customerNameInput.value.trim() || '[Nombre del Cliente]';
        const customerAddress = customerAddressInput.value.trim() || '[Dirección de Envío]';
        const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const orderSummary = cart.map(item => `${item.quantity}x ${item.name}`).join('\n');
        const message = `Hola, quiero realizar el siguiente pedido:\n\n*Cliente:* ${customerName}\n*Dirección de Envío:* ${customerAddress}\n\n*Resumen del Pedido:*\n${orderSummary}\n\n*Subtotal:* ${formatPrice(subtotal)}\n*Costo de Envío:* ${formatPrice(SHIPPING_COST)}\n*Total a Pagar:* ${formatPrice(subtotal + SHIPPING_COST)}\n\nEl pago se puede realizar por Transferencia Bancaria o Nequi. ¡Gracias!`;
        whatsappMessageTextarea.value = message;
        return message;
    };

    const openCheckoutModal = () => {
        if (cart.length === 0) return;
        toggleCartPanel();
        checkoutModal.style.display = 'block';
        generateWhatsAppMessage();
    };

    const closeCheckoutModal = () => checkoutModal.style.display = 'none';

    // --- EVENT LISTENERS ---
    cartIconWrapper.addEventListener('click', e => {
        e.preventDefault();
        toggleCartPanel();
    });
    [closeCartBtn, cartOverlay].forEach(el => el.addEventListener('click', toggleCartPanel));

    body.addEventListener('click', e => {
        if (e.target.closest('.btn-add-to-cart')) {
            addToCart(e.target.closest('.btn-add-to-cart').dataset.productId);
        }
    });

    cartItemsContainer.addEventListener('click', e => {
        const target = e.target;
        const cartItem = target.closest('.cart-item');
        if (!cartItem) return;

        const productId = cartItem.dataset.productId;
        const item = cart.find(i => i.id === productId);

        if (target.matches('.increase-qty')) changeQuantity(productId, item.quantity + 1);
        if (target.matches('.decrease-qty')) changeQuantity(productId, item.quantity - 1);
        if (target.matches('.remove-item-btn')) removeFromCart(productId);
    });

    checkoutBtn.addEventListener('click', openCheckoutModal);
    closeCheckoutBtn.addEventListener('click', closeCheckoutModal);
    window.addEventListener('click', e => {
        if (e.target === checkoutModal) closeCheckoutModal();
    });

    checkoutForm.addEventListener('input', generateWhatsAppMessage);
    checkoutForm.addEventListener('submit', e => {
        e.preventDefault();
        if (!customerNameInput.value.trim() || !customerAddressInput.value.trim()) {
            alert('Por favor, completa tu nombre y dirección.');
            return;
        }
        const distributorWppButton = document.getElementById('whatsapp-button');
        const href = distributorWppButton?.href;
        if (!href) {
            alert('Error: No se encontró el contacto del distribuidor.');
            return;
        }
        const phone = new URL(href).searchParams.get('phone');
        if (!phone) {
            alert('Error: El número de WhatsApp del distribuidor no es válido.');
            return;
        }
        const message = encodeURIComponent(generateWhatsAppMessage());
        window.open(`https://api.whatsapp.com/send?phone=${phone}&text=${message}`, '_blank');
    });

    // --- INICIALIZACIÓN ---
    updateCart();
});
