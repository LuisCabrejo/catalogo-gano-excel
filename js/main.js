// --- SCRIPT DE FUNCIONALIDADES ---
document.addEventListener('DOMContentLoaded', function() {
    
    // --- LÓGICA DEL MODAL ---
    const modal = document.getElementById('product-modal');
    const modalBody = document.getElementById('modal-body');
    const closeModal = document.querySelector('.modal-close');

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

    closeModal.addEventListener('click', () => modal.style.display = 'none');
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

    // --- LÓGICA DEL BOTÓN DE WHATSAPP ---
    const urlParams = new URLSearchParams(window.location.search);
    const defaultSocioId = '573203415438'; // Número por defecto
    const socioIdFromUrl = urlParams.get('socio');

    // Usa el 'socio' de la URL si existe, si no, usa el por defecto.
    const finalSocioId = socioIdFromUrl || defaultSocioId;

    if (finalSocioId) {
        const whatsappButton = document.getElementById('whatsapp-button');
        const whatsappLink = `https://wa.me/${finalSocioId}?text=${encodeURIComponent('Hola, estoy interesado(a) en los productos Gano Excel. ¿Me podrías dar más información?')}`;
        
        whatsappButton.href = whatsappLink;
        whatsappButton.style.display = 'flex'; // Muestra el botón
    }
});
