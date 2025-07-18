// =================================
// BASE DE DATOS DE PRODUCTOS GANO EXCEL
// Versión 3.0 - Actualizada para el nuevo sistema
// =================================

const productData = {
    // ===== BEBIDAS ENRIQUECIDAS =====
    'ganocafe-3-en-1': {
        name: 'GANOCAFÉ 3 EN 1',
        price: 67000,
        description: 'Una deliciosa mezcla de café premium con Ganoderma Lucidum, cremoso y azúcar. Cada sorbo te brinda una experiencia única que combina el sabor tradicional del café con los beneficios del hongo de la inmortalidad.',
        usage: 'Mezcla 1 sobre (21g) en 150ml de agua caliente. Revuelve bien y disfruta. Se puede tomar de 1 a 3 veces al día.',
        ingredients: [
            'Extracto de Ganoderma Lucidum (6 variedades fusionadas)',
            'Café soluble premium',
            'Cremora vegetal natural',
            'Azúcar refinada',
            'Saborizante natural'
        ],
        isGanodermaBased: true,
        wellnessTags: ['energia', 'defensas', 'digestivo'],
        category: 'bebidas'
    },

    'ganocafe-clasico': {
        name: 'GANOCAFÉ CLÁSICO',
        price: 58000,
        description: 'Para los amantes del café puro, esta fórmula combina café negro de alta calidad con extracto de Ganoderma. Perfecto para quienes prefieren el sabor intenso del café sin aditivos.',
        usage: 'Mezcla 1 sobre (4.5g) en 150ml de agua caliente. Ideal para tomar en las mañanas o cuando necesites energía.',
        ingredients: [
            'Extracto de Ganoderma Lucidum concentrado',
            'Café soluble 100% puro',
            'Sabor natural a café'
        ],
        isGanodermaBased: true,
        wellnessTags: ['energia', 'concentracion', 'defensas'],
        category: 'bebidas'
    },

    'ganorico-latte': {
        name: 'GANORICO LATTE RICO',
        price: 78000,
        description: 'Una experiencia de latte premium con textura cremosa y espumosa. Esta mezcla perfecta de café, leche y Ganoderma crea una bebida indulgente pero saludable.',
        usage: 'Disuelve 1 sobre (25g) en 180ml de agua caliente. Bate suavemente para crear espuma y disfruta.',
        ingredients: [
            'Extracto de Ganoderma Lucidum',
            'Café premium',
            'Leche en polvo',
            'Cremora natural',
            'Edulcorante natural'
        ],
        isGanodermaBased: true,
        wellnessTags: ['energia', 'relajacion', 'digestivo'],
        category: 'bebidas'
    },

    'ganorico-mocha': {
        name: 'GANORICO MOCHA RICO',
        price: 78000,
        description: 'La combinación perfecta de café y chocolate enriquecida con Ganoderma. Un sabor indulgente que satisface tus antojos mientras cuida tu bienestar.',
        usage: 'Mezcla 1 sobre (25g) en 180ml de agua caliente. Perfecto para la tarde o como postre saludable.',
        ingredients: [
            'Extracto de Ganoderma Lucidum',
            'Café premium',
            'Cacao natural',
            'Leche en polvo',
            'Azúcar de caña'
        ],
        isGanodermaBased: true,
        wellnessTags: ['energia', 'relajacion'],
        category: 'bebidas'
    },

    'shoko-rico': {
        name: 'GANORICO SHOKO RICO',
        price: 75000,
        description: 'Chocolate caliente nutritivo enriquecido con Ganoderma. Ideal para toda la familia, ofrece el placer del chocolate con beneficios para la salud.',
        usage: 'Disuelve 1 sobre (25g) en 180ml de agua caliente o leche. Ideal para niños y adultos en cualquier momento del día.',
        ingredients: [
            'Extracto de Ganoderma Lucidum',
            'Cacao premium',
            'Leche en polvo',
            'Azúcar natural',
            'Saborizante de chocolate'
        ],
        isGanodermaBased: true,
        wellnessTags: ['energia', 'relajacion', 'digestivo'],
        category: 'bebidas'
    },

    'ganocereal-spirulina': {
        name: 'ESPIRULINA GANO C\'REAL',
        price: 82000,
        description: 'Un cereal nutritivo que combina Spirulina y Ganoderma para crear un desayuno completo rico en proteínas, vitaminas y minerales esenciales.',
        usage: 'Mezcla 2 cucharadas (30g) con leche, yogur o agua. Ideal para el desayuno o como snack nutritivo.',
        ingredients: [
            'Extracto de Ganoderma Lucidum',
            'Spirulina orgánica',
            'Cereales integrales',
            'Fibra natural',
            'Vitaminas y minerales'
        ],
        isGanodermaBased: true,
        wellnessTags: ['energia', 'digestivo', 'defensas'],
        category: 'bebidas'
    },

    'oleaf-rooibos': {
        name: 'BEBIDA DE OLEAF GANO ROOIBOS',
        price: 65000,
        description: 'Té rooibos sudafricano naturalmente libre de cafeína, enriquecido con Ganoderma. Perfecto para relajarse y promover un sueño reparador.',
        usage: 'Disuelve 1 sobre en agua caliente y deja reposar 3-5 minutos. Ideal para la noche o momentos de relajación.',
        ingredients: [
            'Extracto de Ganoderma Lucidum',
            'Té Rooibos orgánico',
            'Antioxidantes naturales',
            'Sabor natural'
        ],
        isGanodermaBased: true,
        wellnessTags: ['relajacion', 'defensas'],
        category: 'bebidas'
    },

    'ganochocolate': {
        name: 'CHOCOLATE GANO',
        price: 62000,
        description: 'Bebida de chocolate concentrada con extracto puro de Ganoderma. Fórmula potente para quienes buscan máximos beneficios con sabor delicioso.',
        usage: 'Disuelve 1 sobre en agua caliente. Se puede tomar 1-2 veces al día, preferiblemente con el estómago vacío.',
        ingredients: [
            'Extracto concentrado de Ganoderma Lucidum',
            'Cacao puro',
            'Edulcorante natural'
        ],
        isGanodermaBased: true,
        wellnessTags: ['energia', 'defensas', 'concentracion'],
        category: 'bebidas'
    },

    'luvoco': {
        name: 'LUVOCO',
        price: 85000,
        description: 'Café molido gourmet enriquecido con Ganoderma para preparar en casa. Calidad premium para los conocedores del buen café.',
        usage: 'Prepara como café tradicional en cafetera o prensa francesa. 1-2 cucharadas por taza según tu preferencia de intensidad.',
        ingredients: [
            'Café gourmet molido',
            'Extracto de Ganoderma Lucidum',
            'Tostado artesanal'
        ],
        isGanodermaBased: true,
        wellnessTags: ['energia', 'concentracion'],
        category: 'bebidas'
    },

    'colageno-reskine': {
        name: 'BEBIDA DE COLÁGENO RESKINE',
        price: 95000,
        description: 'Bebida revolucionaria que combina colágeno hidrolizado con Ganoderma para apoyar la belleza desde adentro, promoviendo piel firme y radiante.',
        usage: 'Disuelve 1 sobre en agua fría o al tiempo. Tomar preferiblemente en ayunas o antes de dormir.',
        ingredients: [
            'Colágeno hidrolizado',
            'Extracto de Ganoderma Lucidum',
            'Ácido hialurónico',
            'Vitamina C',
            'Sabor natural a frutas'
        ],
        isGanodermaBased: true,
        wellnessTags: ['belleza', 'defensas'],
        category: 'bebidas'
    },

    // ===== CÁPSULAS Y SUPLEMENTOS =====
    'capsulas-ganoderma': {
        name: 'Cápsulas de Ganoderma',
        price: 88000,
        description: 'Extracto concentrado de Ganoderma Lucidum en cápsulas. La forma más pura y potente de obtener todos los beneficios del hongo milenario.',
        usage: 'Tomar 2 cápsulas al día con agua, preferiblemente antes de las comidas. No exceder la dosis recomendada.',
        ingredients: [
            'Extracto concentrado de Ganoderma Lucidum',
            'Cápsula vegetal',
            'Betaglucanos',
            'Triterpenos',
            'Polisacáridos'
        ],
        isGanodermaBased: true,
        wellnessTags: ['defensas', 'energia', 'concentracion'],
        category: 'capsulas'
    },

    'capsulas-excellium': {
        name: 'CÁPSULAS EXCELLIUM',
        price: 95000,
        description: 'Conocido como el "tónico cerebral", contiene extracto del micelio joven del Ganoderma, rico en germanio orgánico para apoyar la función cerebral.',
        usage: 'Tomar 1-2 cápsulas al día con agua. Ideal tomarlas en la mañana para aprovechar sus efectos durante el día.',
        ingredients: [
            'Extracto de micelio de Ganoderma',
            'Germanio orgánico',
            'Cápsula vegetal',
            'Aminoácidos esenciales'
        ],
        isGanodermaBased: true,
        wellnessTags: ['concentracion', 'energia', 'defensas'],
        category: 'capsulas'
    },

    'capsulas-cordy-gold': {
        name: 'CÁPSULAS CORDYGOLD',
        price: 105000,
        description: 'Cordyceps sinensis de alta calidad para aumentar la energía, resistencia y vitalidad. Ideal para deportistas y personas activas.',
        usage: 'Tomar 2 cápsulas al día, preferiblemente 30 minutos antes del ejercicio o actividad física intensa.',
        ingredients: [
            'Extracto de Cordyceps sinensis',
            'Cápsula vegetal',
            'Adenosina',
            'Polisacáridos bioactivos'
        ],
        isGanodermaBased: false,
        wellnessTags: ['energia', 'defensas'],
        category: 'capsulas'
    },

    // ===== CUIDADO PERSONAL Y BELLEZA =====
    'gano-fresh': {
        name: 'PASTA DE DIENTES GANO FRESH',
        price: 35000,
        description: 'Pasta dental enriquecida con Ganoderma, libre de flúor. Limpia suavemente mientras protege dientes y encías de forma natural.',
        usage: 'Usar como pasta dental regular. Aplicar sobre el cepillo y cepillar durante 2-3 minutos. Apta para toda la familia.',
        ingredients: [
            'Extracto de Ganoderma Lucidum',
            'Bicarbonato de sodio',
            'Aceites esenciales naturales',
            'Agentes limpiadores suaves',
            'Sin flúor'
        ],
        isGanodermaBased: true,
        wellnessTags: ['belleza'],
        category: 'cuidado-personal'
    },

    'shampoo-p&b': {
        name: 'Champú Piel&Brillo',
        price: 42000,
        description: 'Champú revitalizante que fortalece el cabello desde la raíz. Limpia suavemente mientras aporta brillo y vitalidad.',
        usage: 'Aplicar sobre cabello húmedo, masajear suavemente el cuero cabelludo y enjuagar abundantemente.',
        ingredients: [
            'Extractos herbales',
            'Vitaminas para el cabello',
            'Agentes limpiadores suaves',
            'Aceites nutritivos',
            'pH balanceado'
        ],
        isGanodermaBased: false,
        wellnessTags: ['belleza'],
        category: 'cuidado-personal'
    },

    'acondicionador-p&b': {
        name: 'ACONDICIONADOR Piel&Brillo',
        price: 42000,
        description: 'Acondicionador que complementa el champú, dejando el cabello suave, manejable y con brillo natural. Facilita el peinado y reduce el frizz.',
        usage: 'Después del champú, aplicar de medios a puntas, dejar actuar 2-3 minutos y enjuagar completamente.',
        ingredients: [
            'Agentes acondicionadores',
            'Aceites nutritivos',
            'Vitaminas capilares',
            'Extractos naturales',
            'Siliconas suaves'
        ],
        isGanodermaBased: false,
        wellnessTags: ['belleza'],
        category: 'cuidado-personal'
    },

    'gano-soap': {
        name: 'JABÓN GANO',
        price: 38000,
        description: 'Jabón artesanal enriquecido con Ganoderma y leche de cabra. Limpia, nutre e hidrata la piel dejándola suave y protegida.',
        usage: 'Humedecer la piel, aplicar el jabón generando espuma suave y enjuagar. Uso diario en rostro y cuerpo.',
        ingredients: [
            'Extracto de Ganoderma Lucidum',
            'Leche de cabra',
            'Aceites vegetales naturales',
            'Glicerina natural',
            'Base jabonosa vegetal'
        ],
        isGanodermaBased: true,
        wellnessTags: ['belleza'],
        category: 'cuidado-personal'
    },

    'exfoliante-p&b': {
        name: 'EXFOLIANTE CORPORAL Piel&Brillo',
        price: 45000,
        description: 'Exfoliante corporal que elimina células muertas y estimula la renovación celular, dejando la piel suave y luminosa.',
        usage: 'Aplicar sobre piel húmeda con movimientos circulares suaves. Concentrarse en áreas más rugosas. Enjuagar bien.',
        ingredients: [
            'Partículas exfoliantes naturales',
            'Aceites hidratantes',
            'Vitaminas E y C',
            'Extractos vegetales',
            'Agentes humectantes'
        ],
        isGanodermaBased: false,
        wellnessTags: ['belleza'],
        category: 'cuidado-personal'
    },

    'jabon-transparente': {
        name: 'JABÓN TRANSPARENTE GANO',
        price: 38000,
        description: 'Jabón transparente con papaya y aloe vera, enriquecido con Ganoderma. Proporciona una limpieza profunda con efecto exfoliante suave.',
        usage: 'Aplicar sobre piel húmeda, masajear suavemente para exfoliar y enjuagar bien. Ideal para uso corporal.',
        ingredients: [
            'Extracto de Ganoderma Lucidum',
            'Extracto de papaya',
            'Aloe vera',
            'Base jabonosa transparente',
            'Agentes exfoliantes naturales'
        ],
        isGanodermaBased: true,
        wellnessTags: ['belleza'],
        category: 'cuidado-personal'
    }
};

// =================================
// FUNCIONES AUXILIARES
// =================================

/**
 * Obtener productos por categoría
 * @param {string} category - Categoría de productos
 * @returns {Object} Productos filtrados por categoría
 */
function getProductsByCategory(category) {
    const filtered = {};
    Object.keys(productData).forEach(id => {
        if (productData[id].category === category) {
            filtered[id] = productData[id];
        }
    });
    return filtered;
}

/**
 * Obtener productos por objetivo de bienestar
 * @param {string} goal - Objetivo de bienestar
 * @returns {Object} Productos que apoyan el objetivo específico
 */
function getProductsByWellnessGoal(goal) {
    const filtered = {};
    Object.keys(productData).forEach(id => {
        const product = productData[id];
        if (product.wellnessTags && product.wellnessTags.includes(goal)) {
            filtered[id] = product;
        }
    });
    return filtered;
}

/**
 * Obtener productos con Ganoderma
 * @returns {Object} Productos que contienen Ganoderma
 */
function getGanodermaProducts() {
    const filtered = {};
    Object.keys(productData).forEach(id => {
        if (productData[id].isGanodermaBased) {
            filtered[id] = productData[id];
        }
    });
    return filtered;
}

/**
 * Buscar productos por nombre
 * @param {string} searchTerm - Término de búsqueda
 * @returns {Object} Productos que coinciden con la búsqueda
 */
function searchProducts(searchTerm) {
    const filtered = {};
    const term = searchTerm.toLowerCase();

    Object.keys(productData).forEach(id => {
        const product = productData[id];
        if (product.name.toLowerCase().includes(term) ||
            product.description.toLowerCase().includes(term)) {
            filtered[id] = product;
        }
    });
    return filtered;
}

/**
 * Obtener estadísticas de los productos
 * @returns {Object} Estadísticas generales
 */
function getProductStats() {
    const stats = {
        total: Object.keys(productData).length,
        bebidas: Object.keys(getProductsByCategory('bebidas')).length,
        capsulas: Object.keys(getProductsByCategory('capsulas')).length,
        cuidadoPersonal: Object.keys(getProductsByCategory('cuidado-personal')).length,
        conGanoderma: Object.keys(getGanodermaProducts()).length,
        precioPromedio: 0
    };

    const totalPrices = Object.values(productData).reduce((sum, product) => sum + product.price, 0);
    stats.precioPromedio = Math.round(totalPrices / stats.total);

    return stats;
}

// =================================
// MENSAJES PARA DEBUG
// =================================

console.log('📦 ==========================================');
console.log('✅ BASE DE DATOS DE PRODUCTOS CARGADA V3.0');
console.log('📊 Estadísticas:', getProductStats());
console.log('🍄 Productos con Ganoderma:', Object.keys(getGanodermaProducts()).length);
console.log('📦 ==========================================');

// Exponer funciones útiles para debug
if (window.location.hostname === 'localhost' || window.location.search.includes('debug=true')) {
    window.productUtils = {
        getProductsByCategory,
        getProductsByWellnessGoal,
        getGanodermaProducts,
        searchProducts,
        getProductStats,
        data: productData
    };
    console.log('🔧 Utilidades de productos disponibles en window.productUtils');
}
