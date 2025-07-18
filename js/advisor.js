document.addEventListener('DOMContentLoaded', () => {
    const goalButtonsContainer = document.querySelector('.wellness-goals-grid');
    if (!goalButtonsContainer) return; // Salir si no está la sección del asesor

    const productCards = document.querySelectorAll('.product-card');
    const categorySections = document.querySelectorAll('.category-section');
    const goalButtons = goalButtonsContainer.querySelectorAll('.wellness-goal-btn');

    // Asignar los data-goals a cada tarjeta de producto desde productData
    productCards.forEach(card => {
        const productId = card.id;
        if (productData[productId] && productData[productId].goals) {
            card.dataset.goals = productData[productId].goals.join(' ');
        }
    });

    const filterProducts = (activeGoal) => {
        let hasVisibleProducts = false;

        productCards.forEach(card => {
            const cardGoals = card.dataset.goals || '';
            if (activeGoal === 'all' || cardGoals.includes(activeGoal)) {
                card.style.display = 'flex';
                hasVisibleProducts = true;
            } else {
                card.style.display = 'none';
            }
        });

        // Ocultar o mostrar los títulos de las categorías
        categorySections.forEach(section => {
            const visibleProductsInSection = section.querySelectorAll('.product-card[style*="display: flex"]');
            if (visibleProductsInSection.length > 0) {
                section.style.display = 'block';
            } else {
                section.style.display = 'none';
            }
        });
    };

    goalButtonsContainer.addEventListener('click', e => {
        const button = e.target.closest('.wellness-goal-btn');
        if (!button) return;

        const goal = button.dataset.goal;
        const isActive = button.classList.contains('active');

        // Desactivar todos los botones
        goalButtons.forEach(btn => btn.classList.remove('active'));

        if (isActive) {
            // Si ya estaba activo, desactivamos el filtro
            filterProducts('all');
        } else {
            // Si no estaba activo, lo activamos y filtramos
            button.classList.add('active');
            filterProducts(goal);
        }
    });
});
