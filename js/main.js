document.addEventListener('DOMContentLoaded', function() {
    // --- ESTADO Y CONFIGURACIÓN ---
    let cart = [];
    const SHIPPING_COST = 15000;
    const formatCurrency = (value) => new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).format(value);

    // --- ELEMENTOS DEL DOM ---
    const productModal = document.getElementById('product-modal');
    const cartModal = document.getElementById('cart-modal');
    const wellnessButtons = document.querySelectorAll('.wellness-goal-btn');

    // --- RENDERIZADO INICIAL DE PRODUCTOS ---
    function renderProducts() {
        const categoryContainers = {
            bebidas: document.querySelector('#bebidas .product-grid'),
            capsulas: document.querySelector('#capsulas .product-grid'),
            'cuidado-personal': document.querySelector('#cuidado-personal .product-grid')
        };

        for (const productId in productData) {
            const product = productData[productId];
            const container = categoryContainers[product.category];

            if (container) {
                const card = document.createElement('article');
                card.className = 'product-card';
                card.id = product.id;

                const benefitsList = product.benefits.map(b => `<li>${b}</li>`).join('');

                card.innerHTML = `
                    <img src="${product.image}" alt="${product.name}">
                    <div class="product-info">
                        <h3>${product.name}</h3>
                        <div class="product-price">${formatCurrency(product.price)}</div>
                        <div class="invima-registro">Registro INVIMA: ${product.invima}</div>
                        <ul class="product-benefits">
                            ${benefitsList}
                        </ul>
                        <div class="product-actions">
                            <button class="btn btn-details" data-product-id="${product.id}">Detalles</button>
                            <button class="btn btn-add-to-cart" data-product-id="${product.id}">Agregar 🛒</button>
                        </div>
                    </div>
                `;
                container.appendChild(card);
            }
        }
    }

    // --- ASESOR DE BIENESTAR ---
    wellnessButtons.forEach(button => {
        button.addEventListener('click', () => {
            const goal = button.dataset.goal;
            const isActive = button.classList.contains('active');
            const allProductCards = document.querySelectorAll('.product-card');

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

        const modalBody = productModal.querySelector('.modal-body');
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
        const cartItemsContainer = document.getElementById('cart-items-container');
        const cartSubtotalEl = document.getElementById('cart-subtotal');
        const cartShippingEl = document.getElementById('cart-shipping');
        const cartTotalEl = document.getElementById('cart-total');
        const cartCountBadge = document.getElementById('cart-count-badge');

        cartItemsContainer.innerHTML = cart.length === 0 ? '<p class="cart-empty-message">Tu carrito está vacío.</p>' :
            cart.map(item => `
                <div class="cart-item">
                    <div class="cart-item-info"><h5>${item.name}</h5><p>${formatCurrency(item.price)}</p></div>
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
            cart.push({ id: productId, name: product.name, price: product.price, quantity: 1 });
        }
        updateCartUI();

        const button = document.querySelector(`.btn-add-to-cart[data-product-id="${productId}"]`);
        if(button) {
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
        if (event.target.matches('.modal-close') || event.target.matches('.modal')) {
            productModal.classList.remove('show');
            cartModal.classList.remove('show');
        }
        if (event.target.matches('.btn-details')) showProductDetails(event.target.dataset.productId);
        if (event.target.matches('.btn-add-to-cart')) addToCart(event.target.dataset.productId);
        if (event.target.matches('#cart-button')) { event.preventDefault(); updateCartUI(); cartModal.classList.add('show'); }
        if (event.target.matches('.qty-btn')) {
            const change = event.target.classList.contains('increase') ? 1 : -1;
            changeQuantity(event.target.dataset.id, change);
        }
    });

     // --- CHECKOUT (LÓGICA DE MENSAJE ACTUALIZADA) ---
    const checkoutForm = document.getElementById('checkout-form');
    checkoutForm.addEventListener('submit', (e) => {
        e.preventDefault();
        if (cart.length === 0) return alert('Tu carrito está vacío.');

        const customerName = document.getElementById('customer-name').value;
        const customerAddress = document.getElementById('customer-address').value;
        const distributorWhatsapp = document.body.dataset.distributorWhatsapp;
        const distributorName = document.querySelector('.welcome-section h2')?.textContent.replace('¡Hola! Soy ', '').trim() || 'Distribuidor';

        if (!distributorWhatsapp) return alert('Error: No se encontró el número del distribuidor.');

        const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const total = subtotal + SHIPPING_COST;

        // --- INICIO DE LA NUEVA LÓGICA DEL MENSAJE ---
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
        // --- FIN DE LA NUEVA LÓGICA DEL MENSAJE ---

        window.open(`https://api.whatsapp.com/send?phone=${distributorWhatsapp}&text=${encodeURIComponent(message)}`, '_blank');
    });

    // --- INICIALIZAR LA APP ---
    renderProducts();
});
