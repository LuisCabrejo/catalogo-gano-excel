/**
 * 🛒 SISTEMA DE CARRITO DE COMPRAS - GANO EXCEL
 * Funcionalidad completa de carrito con integración a WhatsApp
 */

// Clase principal del carrito
class ShoppingCart {
    constructor() {
        this.items = [];
        this.shippingCost = 12000; // Costo de envío fijo
        this.init();
    }

    init() {
        this.createCartHTML();
        this.bindEvents();
        this.updateCartBadge();
        console.log('🛒 Sistema de carrito inicializado');
    }

    // Crear estructura HTML del carrito
    createCartHTML() {
        const cartModal = document.createElement('div');
        cartModal.id = 'cart-modal';
        cartModal.className = 'cart-modal';
        cartModal.innerHTML = `
            <div class="cart-modal-content">
                <div class="cart-header">
                    <h2>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16" style="margin-right: 10px;">
                            <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l1.313 7h8.17l1.313-7zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2"/>
                        </svg>
                        Mi Carrito de Compras
                    </h2>
                    <span class="cart-close">&times;</span>
                </div>
                <div class="cart-body">
                    <div id="cart-items-container">
                        <!-- Los items se cargarán aquí dinámicamente -->
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(cartModal);
    }

    // Vincular eventos
    bindEvents() {
        // Evento para abrir carrito
        document.addEventListener('click', (e) => {
            if (e.target.closest('.cart-button')) {
                e.preventDefault();
                this.openCart();
            }
        });

        // Evento para cerrar carrito
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('cart-close') || e.target.id === 'cart-modal') {
                this.closeCart();
            }
        });

        // Eventos para botones de agregar al carrito
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('btn-cart')) {
                e.preventDefault();
                const productId = e.target.dataset.productId;
                this.addToCart(productId);
            }
        });

        // Eventos dentro del carrito
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('quantity-btn-plus')) {
                const productId = e.target.dataset.productId;
                this.updateQuantity(productId, 1);
            } else if (e.target.classList.contains('quantity-btn-minus')) {
                const productId = e.target.dataset.productId;
                this.updateQuantity(productId, -1);
            } else if (e.target.classList.contains('remove-btn')) {
                const productId = e.target.dataset.productId;
                this.removeFromCart(productId);
            } else if (e.target.id === 'checkout-btn') {
                this.processCheckout();
            }
        });
    }

    // Agregar producto al carrito
    addToCart(productId) {
        const product = this.getProductInfo(productId);
        if (!product) {
            console.error('Producto no encontrado:', productId);
            return;
        }

        const existingItem = this.items.find(item => item.id === productId);

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.items.push({
                id: productId,
                name: product.name,
                price: product.price,
                image: product.image,
                quantity: 1
            });
        }

        this.updateCartBadge();
        this.showAddedToCartMessage(product.name);
        console.log('🛒 Producto agregado:', product.name);
    }

    // Obtener información del producto
    getProductInfo(productId) {
        const productPrices = {
            // Bebidas
            'ganocafe-3-en-1': { name: 'GANOCAFÉ 3 EN 1', price: 110900 },
            'ganocafe-clasico': { name: 'GANOCAFÉ CLÁSICO', price: 110900 },
            'ganorico-latte': { name: 'GANORICO LATTE RICO', price: 119900 },
            'ganorico-mocha': { name: 'GANORICO MOCHA RICO', price: 119900 },
            'ganorico-shoko': { name: 'GANORICO SHOKO RICO', price: 124900 },
            'gano-cereal': { name: 'ESPIRULINA GANO C\'REAL', price: 119900 },
            'oleaf-rooibos': { name: 'BEBIDA DE OLEAF GANO ROOIBOS', price: 119900 },
            'chocolate-gano': { name: 'CHOCOLATE GANO', price: 124900 },
            'luvoco': { name: 'LUVOCO', price: 110900 },
            'reskine-collagen': { name: 'BEBIDA DE COLÁGENO RESKINE', price: 216900 },

            // Suplementos
            'capsulas-ganoderma': { name: 'Cápsulas de Ganoderma', price: 272500 },
            'capsulas-excellium': { name: 'CÁPSULAS EXCELLIUM', price: 272500 },
            'capsulas-cordygold': { name: 'CÁPSULAS CORDYGOLD', price: 336900 },

            // Cuidado Personal
            'gano-fresh': { name: 'PASTA DE DIENTES GANO FRESH', price: 73900 },
            'gano-soap': { name: 'JABÓN GANO', price: 73900 },
            'gano-transparent-soap': { name: 'JABÓN TRANSPARENTE GANO', price: 78500 },
            'shampoo-piel-brillo': { name: 'Champú Piel&Brillo', price: 73900 },
            'acondicionador-piel-brillo': { name: 'ACONDICIONADOR Piel&Brillo', price: 73900 },
            'exfoliante-piel-brillo': { name: 'EXFOLIANTE CORPORAL Piel&Brillo', price: 73900 }
        };

        const productInfo = productPrices[productId];
        if (!productInfo) return null;

        // Obtener imagen del producto
        const productCard = document.getElementById(productId);
        const image = productCard ? productCard.querySelector('img')?.src : '';

        return {
            ...productInfo,
            image: image
        };
    }

    // Actualizar cantidad de producto
    updateQuantity(productId, change) {
        const item = this.items.find(item => item.id === productId);
        if (!item) return;

        item.quantity += change;

        if (item.quantity <= 0) {
            this.removeFromCart(productId);
            return;
        }

        this.updateCartBadge();
        this.renderCartItems();
    }

    // Remover producto del carrito
    removeFromCart(productId) {
        this.items = this.items.filter(item => item.id !== productId);
        this.updateCartBadge();
        this.renderCartItems();
        console.log('🛒 Producto removido del carrito');
    }

    // Actualizar badge del carrito
    updateCartBadge() {
        const cartButton = document.querySelector('.cart-button');
        if (!cartButton) return;

        const totalItems = this.items.reduce((sum, item) => sum + item.quantity, 0);

        let badge = cartButton.querySelector('.cart-badge');
        if (totalItems > 0) {
            if (!badge) {
                badge = document.createElement('span');
                badge.className = 'cart-badge';
                cartButton.appendChild(badge);
            }
            badge.textContent = totalItems;
        } else if (badge) {
            badge.remove();
        }
    }

    // Mostrar mensaje de producto agregado
    showAddedToCartMessage(productName) {
        // Crear toast notification
        const toast = document.createElement('div');
        toast.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #10b981;
            color: white;
            padding: 15px 20px;
            border-radius: 8px;
            z-index: 10000;
            font-weight: 600;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            animation: slideInRight 0.3s ease;
        `;
        toast.innerHTML = `
            <div style="display: flex; align-items: center; gap: 10px;">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M2.5 8a5.5 5.5 0 0 1 8.25-4.764.5.5 0 0 0 .5-.866A6.5 6.5 0 1 0 14.5 8a.5.5 0 0 0-1 0 5.5 5.5 0 1 1-11 0"/>
                    <path d="M15.354 3.354a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0z"/>
                </svg>
                <span>¡${productName} agregado al carrito!</span>
            </div>
        `;

        // Agregar estilos de animación si no existen
        if (!document.querySelector('#toast-styles')) {
            const styles = document.createElement('style');
            styles.id = 'toast-styles';
            styles.innerHTML = `
                @keyframes slideInRight {
                    from { transform: translateX(100%); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
                @keyframes slideOutRight {
                    from { transform: translateX(0); opacity: 1; }
                    to { transform: translateX(100%); opacity: 0; }
                }
            `;
            document.head.appendChild(styles);
        }

        document.body.appendChild(toast);

        // Remover después de 3 segundos
        setTimeout(() => {
            toast.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }

    // Abrir carrito
    openCart() {
        this.renderCartItems();
        document.getElementById('cart-modal').style.display = 'block';
        document.body.style.overflow = 'hidden';
    }

    // Cerrar carrito
    closeCart() {
        document.getElementById('cart-modal').style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    // Renderizar items del carrito
    renderCartItems() {
        const container = document.getElementById('cart-items-container');

        if (this.items.length === 0) {
            container.innerHTML = `
                <div class="cart-empty">
                    <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l1.313 7h8.17l1.313-7z"/>
                    </svg>
                    <h3>Tu carrito está vacío</h3>
                    <p>Agrega algunos productos para comenzar tu compra</p>
                </div>
            `;
            return;
        }

        const subtotal = this.getSubtotal();
        const total = subtotal + this.shippingCost;

        container.innerHTML = `
            <div class="cart-items">
                ${this.items.map(item => `
                    <div class="cart-item">
                        <img src="${item.image}" alt="${item.name}" class="cart-item-image" onerror="this.src='https://via.placeholder.com/80x80?text=Producto'">
                        <div class="cart-item-details">
                            <div class="cart-item-name">${item.name}</div>
                            <div class="cart-item-price">$${this.formatPrice(item.price)}</div>
                        </div>
                        <div class="cart-item-controls">
                            <button class="quantity-btn quantity-btn-minus" data-product-id="${item.id}">-</button>
                            <span class="quantity-display">${item.quantity}</span>
                            <button class="quantity-btn quantity-btn-plus" data-product-id="${item.id}">+</button>
                            <button class="remove-btn" data-product-id="${item.id}">Eliminar</button>
                        </div>
                    </div>
                `).join('')}
            </div>

            <div class="cart-summary">
                <div class="summary-row">
                    <span>Subtotal:</span>
                    <span>$${this.formatPrice(subtotal)}</span>
                </div>
                <div class="summary-row">
                    <span>Envío:</span>
                    <span>$${this.formatPrice(this.shippingCost)}</span>
                </div>
                <div class="summary-row total">
                    <span>Total:</span>
                    <span>$${this.formatPrice(total)}</span>
                </div>
            </div>

            <div class="checkout-section">
                <div class="customer-form">
                    <div class="form-group">
                        <label for="customer-name">Nombre completo *</label>
                        <input type="text" id="customer-name" required placeholder="Tu nombre completo">
                    </div>
                    <div class="form-group">
                        <label for="customer-phone">Teléfono/WhatsApp *</label>
                        <input type="tel" id="customer-phone" required placeholder="3XX XXX XXXX">
                    </div>
                    <div class="form-group">
                        <label for="customer-address">Dirección de entrega *</label>
                        <textarea id="customer-address" required placeholder="Dirección completa con ciudad y departamento" rows="3"></textarea>
                    </div>
                </div>

                <div class="payment-methods">
                    <h4>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16" style="margin-right: 8px;">
                            <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 14H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v1h14V4a1 1 0 0 0-1-1zm13 4H1v5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1z"/>
                        </svg>
                        Métodos de Pago Disponibles
                    </h4>
                    <div class="payment-method">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M1.5 2A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2zm7 6.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0"/>
                        </svg>
                        <div>
                            <strong>Transferencia Bancaria</strong><br>
                            <small>Te enviaremos los datos bancarios por WhatsApp</small>
                        </div>
                    </div>
                    <div class="payment-method">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0M4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5z"/>
                        </svg>
                        <div>
                            <strong>Nequi</strong><br>
                            <small>Pago rápido y seguro desde tu celular</small>
                        </div>
                    </div>
                </div>

                <button id="checkout-btn" class="checkout-btn">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16" style="margin-right: 8px;">
                        <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z"/>
                    </svg>
                    Enviar Pedido por WhatsApp
                </button>
            </div>
        `;
    }

    // Procesar checkout
    processCheckout() {
        const name = document.getElementById('customer-name').value.trim();
        const phone = document.getElementById('customer-phone').value.trim();
        const address = document.getElementById('customer-address').value.trim();

        if (!name || !phone || !address) {
            alert('Por favor completa todos los campos requeridos');
            return;
        }

        const message = this.generateWhatsAppMessage(name, phone, address);
        this.sendToWhatsApp(message);
    }

    // Generar mensaje para WhatsApp
    generateWhatsAppMessage(customerName, customerPhone, customerAddress) {
        const subtotal = this.getSubtotal();
        const total = subtotal + this.shippingCost;

        let message = `🛒 *NUEVO PEDIDO - GANO EXCEL*\n\n`;
        message += `👤 *Cliente:* ${customerName}\n`;
        message += `📱 *Teléfono:* ${customerPhone}\n`;
        message += `📍 *Dirección:* ${customerAddress}\n\n`;
        message += `📦 *PRODUCTOS SOLICITADOS:*\n`;

        this.items.forEach((item, index) => {
            message += `${index + 1}. *${item.name}*\n`;
            message += `   💰 Precio: $${this.formatPrice(item.price)}\n`;
            message += `   📊 Cantidad: ${item.quantity}\n`;
            message += `   💵 Subtotal: $${this.formatPrice(item.price * item.quantity)}\n\n`;
        });

        message += `💰 *RESUMEN DEL PEDIDO:*\n`;
        message += `• Subtotal productos: $${this.formatPrice(subtotal)}\n`;
        message += `• Costo de envío: $${this.formatPrice(this.shippingCost)}\n`;
        message += `• *TOTAL A PAGAR: $${this.formatPrice(total)}*\n\n`;
        message += `💳 *MÉTODOS DE PAGO DISPONIBLES:*\n`;
        message += `• Transferencia Bancaria\n`;
        message += `• Nequi\n\n`;
        message += `Por favor confirma este pedido y envíame los datos de pago. ¡Gracias! 😊`;

        return message;
    }

    // Enviar a WhatsApp
    sendToWhatsApp(message) {
        // Obtener número del distribuidor o usar el por defecto
        const whatsappButton = document.getElementById('whatsapp-button');
        let whatsappNumber = '+573118870682'; // Número por defecto

        if (whatsappButton && whatsappButton.href) {
            const match = whatsappButton.href.match(/phone=([^&]+)/);
            if (match) {
                whatsappNumber = decodeURIComponent(match[1]);
            }
        }

        const whatsappUrl = `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${encodeURIComponent(message)}`;

        // Abrir WhatsApp en nueva ventana
        window.open(whatsappUrl, '_blank');

        // Cerrar carrito y limpiar
        this.closeCart();
        this.clearCart();

        // Mostrar mensaje de confirmación
        setTimeout(() => {
            alert('¡Pedido enviado! Serás redirigido a WhatsApp para confirmar tu compra.');
        }, 500);
    }

    // Limpiar carrito
    clearCart() {
        this.items = [];
        this.updateCartBadge();
        console.log('🛒 Carrito limpiado después del checkout');
    }

    // Obtener subtotal
    getSubtotal() {
        return this.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    }

    // Formatear precio
    formatPrice(price) {
        return new Intl.NumberFormat('es-CO').format(price);
    }
}

// Variable global del carrito
let cart;

// Función para agregar precios a los productos en el DOM
function addPricesToProducts() {
    const productPrices = {
        // Bebidas
        'ganocafe-3-en-1': 110900,
        'ganocafe-clasico': 110900,
        'ganorico-latte': 119900,
        'ganorico-mocha': 119900,
        'ganorico-shoko': 124900,
        'gano-cereal': 119900,
        'oleaf-rooibos': 119900,
        'chocolate-gano': 124900,
        'luvoco': 110900,
        'reskine-collagen': 216900,

        // Suplementos
        'capsulas-ganoderma': 272500,
        'capsulas-excellium': 272500,
        'capsulas-cordygold': 336900,

        // Cuidado Personal
        'gano-fresh': 73900,
        'gano-soap': 73900,
        'gano-transparent-soap': 78500,
        'shampoo-piel-brillo': 73900,
        'acondicionador-piel-brillo': 73900,
        'exfoliante-piel-brillo': 73900
    };

    // Agregar precios y botón de carrito a cada producto
    Object.keys(productPrices).forEach(productId => {
        const productCard = document.getElementById(productId);
        if (productCard) {
            const productInfo = productCard.querySelector('.product-info');
            const productActions = productCard.querySelector('.product-actions');

            if (productInfo && !productInfo.querySelector('.product-price')) {
                // Agregar precio
                const priceElement = document.createElement('div');
                priceElement.className = 'product-price';
                priceElement.textContent = `$${new Intl.NumberFormat('es-CO').format(productPrices[productId])}`;

                // Insertar precio después del título
                const title = productInfo.querySelector('h3');
                title.insertAdjacentElement('afterend', priceElement);
            }

            if (productActions && !productActions.querySelector('.btn-cart')) {
                // Agregar botón de carrito
                const cartButton = document.createElement('button');
                cartButton.className = 'btn btn-cart';
                cartButton.dataset.productId = productId;
                cartButton.innerHTML = `
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" style="margin-right: 5px;">
                        <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l1.313 7h8.17l1.313-7zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2"/>
                    </svg>
                    Agregar
                `;
                productActions.appendChild(cartButton);
            }
        }
    });

    console.log('💰 Precios agregados a los productos');
}

// Función para agregar botón de carrito al menú
function addCartButtonToNav() {
    const nav = document.querySelector('.main-nav');
    if (nav && !nav.querySelector('.cart-button')) {
        const cartButton = document.createElement('a');
        cartButton.href = '#';
        cartButton.className = 'cart-button';
        cartButton.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" style="margin-right: 5px;">
                <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l1.313 7h8.17l1.313-7zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2"/>
            </svg>
            Carrito
        `;
        nav.appendChild(cartButton);
        console.log('🛒 Botón de carrito agregado al menú');
    }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    // Esperar un poco para que los otros scripts se ejecuten primero
    setTimeout(() => {
        addCartButtonToNav();
        addPricesToProducts();
        cart = new ShoppingCart();
        console.log('🛒 Sistema de carrito completamente inicializado');
    }, 1000);
});

// Exportar para uso global
window.ShoppingCart = ShoppingCart;
