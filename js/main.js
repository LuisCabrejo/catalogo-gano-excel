document.addEventListener('DOMContentLoaded', function() {
    // --- ESTADO Y CONFIGURACIÓN ---
    let cart = [];
    const SHIPPING_COST = 15000;
    const formatCurrency = (value) => new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).format(value);

    // --- ELEMENTOS DEL DOM ---
    const productModal = document.getElementById('product-modal');
    const cartModal = document.getElementById('cart-modal');
    const cartItemsContainer = document.getElementById('cart-items-container');
    const cartSubtotalEl = document.getElementById('cart-subtotal');
    const cartShippingEl = document.getElementById('cart-shipping');
    const cartTotalEl = document.getElementById('cart-total');
    const cartCountBadge = document.getElementById('cart-count-badge');
    const wellnessButtons = document.querySelectorAll('.wellness-goal-btn');
    const allProductCards = document.querySelectorAll('.product-card');
    const checkoutForm = document.getElementById('checkout-form');

    // --- INICIALIZACIÓN ---
    allProductCards.forEach(card => {
        const product = productData[card.id];
        if (product) {
            const priceEl = card.querySelector('.product-price');
            if (priceEl) priceEl.textContent = formatCurrency(product.price);
        }
    });

    // --- ASESOR DE BIENESTAR ---
    wellnessButtons.forEach(button => {
        button.addEventListener('click', () => {
            const goal = button.dataset.goal;
            const isActive = button.classList.contains('active');
            wellnessButtons.forEach(btn => btn.classList.remove('active'));
            allProductCards.forEach(card => card.classList.remove('recommended'));

            if (!isActive) {
                button.classList.add('active');
                allProductCards.forEach(card => {
                    const product = productData[card.id];
                    if (product && product.wellnessTags.includes(goal)) {
                        card.classList.add('recommended');
                    }
                });
                document.querySelector('#productos').scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // --- MODAL DE DETALLES DE PRODUCTO ---
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

    // --- LÓGICA DEL CARRITO ---
    function updateCartUI() {
        cartItemsContainer.innerHTML = cart.length === 0 ? '<p class="cart-empty-message">Tu carrito está vacío.</p>' :
            cart.map(item => `
                <div class="cart-item">
                    <div class="cart-item-info">
                        <h5>${item.name}</h5>
                        <p class="cart-item-unit-price">${formatCurrency(item.price)}</p>
                    </div>
                    <div class="cart-item-qty">
                        <button data-id="${item.id}" class="qty-btn decrease">-</button>
                        <span>${item.quantity}</span>
                        <button data-id="${item.id}" class="qty-btn increase">+</button>
                    </div>
                    <div class="cart-item-price">${formatCurrency(item.price * item.quantity)}</div>
                </div>
            `).join('');

        const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const total = subtotal > 0 ? subtotal + SHIPPING_COST : 0;
        cartSubtotalEl.textContent = formatCurrency(subtotal);
        cartShippingEl.textContent = formatCurrency(subtotal > 0 ? SHIPPING_COST : 0);
        cartTotalEl.textContent = formatCurrency(total);
        cartCountBadge.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
    }

    function addToCart(productId) {
        const existingItem = cart.find(item => item.id === productId);
        if (existingItem) {
            existingItem.quantity++;
        } else {
            const product = productData[productId];
            if (product) {
                cart.push({ id: productId, name: product.name, price: product.price, quantity: 1 });
            }
        }
        updateCartUI();

        const button = document.querySelector(`.btn-add-to-cart[data-product-id="${productId}"]`);
        if (button) {
            button.textContent = 'Agregado ✓';
            button.classList.add('added');
            setTimeout(() => {
                button.textContent = 'Agregar 🛒';
                button.classList.remove('added');
            }, 1500);
        }
    }

    function changeQuantity(productId, change) {
        const itemIndex = cart.findIndex(item => item.id === productId);
        if (itemIndex > -1) {
            cart[itemIndex].quantity += change;
            if (cart[itemIndex].quantity <= 0) {
                cart.splice(itemIndex, 1);
            }
        }
        updateCartUI();
    }

    // --- GESTIÓN DE EVENTOS ---
    document.addEventListener('click', (event) => {
        const target = event.target;

        if (target.matches('.modal-close') || target.matches('.modal') || target.matches('.btn-continue-shopping')) {
            productModal.classList.remove('show');
            cartModal.classList.remove('show');
        }

        if (target.matches('.btn-details')) showProductDetails(target.dataset.productId);
        if (target.matches('.btn-add-to-cart')) addToCart(target.dataset.productId);
        if (target.matches('#cart-button')) {
            event.preventDefault();
            updateCartUI();
            cartModal.classList.add('show');
        }
        if (target.matches('.qty-btn')) {
            const change = target.classList.contains('increase') ? 1 : -1;
            changeQuantity(target.dataset.id, change);
        }
    });

    // --- CHECKOUT ---
    checkoutForm.addEventListener('submit', (e) => {
        e.preventDefault();
        if (cart.length === 0) return alert('Tu carrito está vacío.');

        const customerName = document.getElementById('customer-name').value;
        const customerAddress = document.getElementById('customer-address').value;
        const distributorWhatsapp = document.body.dataset.distributorWhatsapp;

        if (!distributorWhatsapp) return alert('Error: No se encontró el número del distribuidor.');

        const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const total = subtotal + SHIPPING_COST;

        let message = `🛒 *NUEVO PEDIDO* 🛒\n\n`;
        message += `👤 *Cliente:* ${customerName}\n`;
        message += `📍 *Dirección de envío:* ${customerAddress}\n\n`;
        message += `📦 *PRODUCTOS:*\n`;

        cart.forEach(item => {
            message += `• *${item.quantity}x* - ${item.name}\n  Precio: ${formatCurrency(item.price * item.quantity)}\n`;
        });

        message += `\n💰 *RESUMEN:*\n`;
        message += `Subtotal: ${formatCurrency(subtotal)}\n`;
        message += `Envío: ${formatCurrency(SHIPPING_COST)}\n`;
        message += `*Total:* *${formatCurrency(total)}*\n\n`;
        message += `¡Hola! Este es mi pedido. Por favor confirma disponibilidad y coordina el envío. 😊`;

        window.open(`https://api.whatsapp.com/send?phone=${distributorWhatsapp}&text=${encodeURIComponent(message)}`, '_blank');
    });
});
