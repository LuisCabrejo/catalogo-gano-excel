// Base de datos de productos con precios, imágenes y objetivos de bienestar
const productData = {
    // Bebidas
    'ganocafe-3-en-1': {
        name: 'GANOCAFÉ 3 EN 1',
        price: 110900,
        image: 'https://raw.githubusercontent.com/LuisCabrejo/catalogo-gano-excel/main/assets/images/ganocafe-3-en-1-catalogo-min.png',
        goals: ['energia', 'defensas', 'digestivo'],
        description: 'Una deliciosa mezcla de café premium con Ganoderma Lucidum, cremoso y azúcar...',
        usage: 'Mezcla 1 sobre (21g) en 150ml de agua caliente...',
        ingredients: ['Extracto de Ganoderma Lucidum', 'Café soluble premium', 'Cremora vegetal', 'Azúcar refinada', 'Saborizante natural']
    },
    'ganocafe-clasico': {
        name: 'GANOCAFÉ CLÁSICO',
        price: 110900,
        image: 'https://raw.githubusercontent.com/LuisCabrejo/catalogo-gano-excel/main/assets/images/gano-cafe-clasico-catalogo-min.png',
        goals: ['energia', 'concentracion', 'defensas'],
        description: 'Para los amantes del café puro, esta fórmula combina café negro de alta calidad con extracto de Ganoderma...',
        usage: 'Mezcla 1 sobre (4.5g) en 150ml de agua caliente...',
        ingredients: ['Extracto de Ganoderma Lucidum', 'Café soluble 100% puro', 'Sabor natural a café']
    },
    'ganorico-latte': {
        name: 'GANORICO LATTE RICO',
        price: 119900,
        image: 'https://raw.githubusercontent.com/LuisCabrejo/catalogo-gano-excel/main/assets/images/latte-rico-catalogo-min.png',
        goals: ['energia', 'relajacion', 'digestivo'],
        description: 'Una experiencia de latte premium con textura cremosa y espumosa...',
        usage: 'Disuelve 1 sobre (25g) en 180ml de agua caliente...',
        ingredients: ['Extracto de Ganoderma Lucidum', 'Café premium', 'Leche en polvo', 'Cremora natural', 'Edulcorante natural']
    },
    'ganorico-mocha': {
        name: 'GANORICO MOCHA RICO',
        price: 119900,
        image: 'https://raw.githubusercontent.com/LuisCabrejo/catalogo-gano-excel/main/assets/images/mocha-rico-catalogo-min.png',
        goals: ['energia', 'relajacion', 'defensas'],
        description: 'La combinación perfecta de café y chocolate enriquecida con Ganoderma...',
        usage: 'Mezcla 1 sobre (25g) en 180ml de agua caliente...',
        ingredients: ['Extracto de Ganoderma Lucidum', 'Café premium', 'Cacao natural', 'Leche en polvo', 'Azúcar de caña']
    },
    'ganorico-shoko': {
        name: 'GANORICO SHOKO RICO',
        price: 124900,
        image: 'https://raw.githubusercontent.com/LuisCabrejo/catalogo-gano-excel/main/assets/images/shoko-rico-catalogo-min.png',
        goals: ['energia', 'relajacion', 'defensas'],
        description: 'Chocolate caliente nutritivo enriquecido con Ganoderma...',
        usage: 'Disuelve 1 sobre (25g) en 180ml de agua caliente o leche...',
        ingredients: ['Extracto de Ganoderma Lucidum', 'Cacao premium', 'Leche en polvo', 'Azúcar natural', 'Saborizante de chocolate']
    },
    'gano-cereal': {
        name: 'ESPIRULINA GANO C\'REAL',
        price: 119900,
        image: 'https://raw.githubusercontent.com/LuisCabrejo/catalogo-gano-excel/main/assets/images/ganocereal-spirulina-catalogo-min.png',
        goals: ['energia', 'digestivo', 'defensas'],
        description: 'Un cereal nutritivo que combina Spirulina y Ganoderma...',
        usage: 'Mezcla 2 cucharadas (30g) con leche, yogur o agua...',
        ingredients: ['Extracto de Ganoderma Lucidum', 'Spirulina orgánica', 'Cereales integrales', 'Fibra natural', 'Vitaminas y minerales']
    },
    'oleaf-rooibos': {
        name: 'BEBIDA DE OLEAF GANO ROOIBOS',
        price: 119900,
        image: 'https://raw.githubusercontent.com/LuisCabrejo/catalogo-gano-excel/main/assets/images/te-rooibos-catalogo-min.png',
        goals: ['relajacion', 'defensas', 'digestivo'],
        description: 'Té rooibos sudafricano naturalmente libre de cafeína, enriquecido con Ganoderma...',
        usage: 'Disuelve 1 sobre en agua caliente y deja reposar 3-5 minutos...',
        ingredients: ['Extracto de Ganoderma Lucidum', 'Té Rooibos orgánico', 'Antioxidantes naturales', 'Sabor natural']
    },
    'chocolate-gano': {
        name: 'CHOCOLATE GANO',
        price: 124900,
        image: 'https://raw.githubusercontent.com/LuisCabrejo/catalogo-gano-excel/main/assets/images/gano-schokolade-catalogo-min.png',
        goals: ['energia', 'concentracion', 'defensas' , 'relajacion'],
        description: 'Bebida de chocolate concentrada con extracto puro de Ganoderma...',
        usage: 'Disuelve 1 sobre en agua caliente...',
        ingredients: ['Extracto concentrado de Ganoderma Lucidum', 'Cacao puro', 'Edulcorante natural']
    },
    'luvoco': {
        name: 'LUVOCO',
        price: 110900,
        image: 'https://raw.githubusercontent.com/LuisCabrejo/catalogo-gano-excel/main/assets/images/luvoco-catalogo-min.png',
        goals: ['energia', 'concentracion', 'defensas'],
        description: 'Café molido gourmet enriquecido con Ganoderma para preparar en casa...',
        usage: 'Prepara como café tradicional en cafetera o prensa francesa...',
        ingredients: ['Café gourmet molido', 'Extracto de Ganoderma Lucidum', 'Tostado artesanal']
    },
    'reskine-collagen': {
        name: 'BEBIDA DE COLÁGENO RESKINE',
        price: 216900,
        image: 'https://raw.githubusercontent.com/LuisCabrejo/catalogo-gano-excel/main/assets/images/gano-plus-reskine-collagen-drinkcatalogo-min.png',
        goals: ['belleza'],
        description: 'Bebida revolucionaria que combina colágeno hidrolizado con Ganoderma...',
        usage: 'Disuelve 1 sobre en agua fría o al tiempo...',
        ingredients: ['Colágeno hidrolizado', 'Extracto de Ganoderma Lucidum', 'Ácido hialurónico', 'Vitamina C', 'Sabor natural a frutas']
    },
    // Suplementos
    'capsulas-ganoderma': {
        name: 'Cápsulas de Ganoderma',
        price: 272500,
        image: 'https://raw.githubusercontent.com/LuisCabrejo/catalogo-gano-excel/main/assets/images/capsulas-de-ganoderma.webp',
        goals: ['defensas', 'energia', 'relajacion'],
        description: 'Extracto concentrado de Ganoderma Lucidum en cápsulas...',
        usage: 'Tomar 2 cápsulas al día con agua...',
        ingredients: ['Extracto concentrado de Ganoderma Lucidum', 'Cápsula vegetal', 'Betaglucanos', 'Triterpenos', 'Polisacáridos']
    },
    'capsulas-excellium': {
        name: 'CÁPSULAS EXCELLIUM',
        price: 272500,
        image: 'https://raw.githubusercontent.com/LuisCabrejo/catalogo-gano-excel/main/assets/images/capsulas-de-excellium.webp',
        goals: ['concentracion', 'energia'],
        description: 'Conocido como el "tónico cerebral", contiene extracto del micelio joven del Ganoderma...',
        usage: 'Tomar 1-2 cápsulas al día con agua...',
        ingredients: ['Extracto de micelio de Ganoderma', 'Germanio orgánico', 'Cápsula vegetal', 'Aminoácidos esenciales']
    },
    'capsulas-cordygold': {
        name: 'CÁPSULAS CORDYGOLD',
        price: 336900,
        image: 'https://raw.githubusercontent.com/LuisCabrejo/catalogo-gano-excel/main/assets/images/capsulas-de-cordy-gold.webp',
        goals: ['energia', 'defensas'],
        description: 'Cordyceps sinensis de alta calidad para aumentar la energía...',
        usage: 'Tomar 2 cápsulas al día...',
        ingredients: ['Extracto de Cordyceps sinensis', 'Cápsula vegetal', 'Adenosina', 'Polisacáridos bioactivos']
    },
    // Cuidado Personal
    'gano-fresh': {
        name: 'PASTA DE DIENTES GANO FRESH',
        price: 73900,
        image: 'https://raw.githubusercontent.com/LuisCabrejo/catalogo-gano-excel/main/assets/images/gano-fresh.webp',
        goals: ['belleza', 'digestivo'], // El Ganoderma puede ayudar con llagas bucales
        description: 'Pasta dental enriquecida con Ganoderma, libre de flúor...',
        usage: 'Usar como pasta dental regular...',
        ingredients: ['Extracto de Ganoderma Lucidum', 'Bicarbonato de sodio', 'Aceites esenciales naturales', 'Agentes limpiadores suaves', 'Sin flúor']
    },
    'gano-soap': {
        name: 'JABÓN GANO',
        price: 73900,
        image: 'https://raw.githubusercontent.com/LuisCabrejo/catalogo-gano-excel/main/assets/images/gano-jabon.webp',
        goals: ['belleza'],
        description: 'Jabón artesanal enriquecido con Ganoderma y leche de cabra...',
        usage: 'Humedecer la piel, aplicar el jabón...',
        ingredients: ['Extracto de Ganoderma Lucidum', 'Leche de cabra', 'Aceites vegetales naturales', 'Glicerina natural', 'Base jabonosa vegetal']
    },
    'gano-transparent-soap': {
        name: 'JABÓN TRANSPARENTE GANO',
        price: 78500,
        image: 'https://raw.githubusercontent.com/LuisCabrejo/catalogo-gano-excel/main/assets/images/jabon-transparent-soap.webp',
        goals: ['belleza'],
        description: 'Jabón transparente con papaya y aloe vera, enriquecido con Ganoderma...',
        usage: 'Aplicar sobre piel húmeda...',
        ingredients: ['Extracto de Ganoderma Lucidum', 'Extracto de papaya', 'Aloe vera', 'Base jabonosa transparente', 'Agentes exfoliantes naturales']
    },
    'shampoo-piel-brillo': {
        name: 'Champú Piel&Brillo',
        price: 73900,
        image: 'https://raw.githubusercontent.com/LuisCabrejo/catalogo-gano-excel/main/assets/images/shampoo-p&b.webp',
        goals: ['belleza'],
        description: 'Champú revitalizante que fortalece el cabello desde la raíz...',
        usage: 'Aplicar sobre cabello húmedo...',
        ingredients: ['Extractos herbales', 'Vitaminas para el cabello', 'Agentes limpiadores suaves', 'Aceites nutritivos', 'pH balanceado']
    },
    'acondicionador-piel-brillo': {
        name: 'ACONDICIONADOR Piel&Brillo',
        price: 73900,
        image: 'https://raw.githubusercontent.com/LuisCabrejo/catalogo-gano-excel/main/assets/images/acondicionador-p&b.webp',
        goals: ['belleza'],
        description: 'Acondicionador que complementa el champú...',
        usage: 'Después del champú, aplicar de medios a puntas...',
        ingredients: ['Agentes acondicionadores', 'Aceites nutritivos', 'Vitaminas capilares', 'Extractos naturales', 'Siliconas suaves']
    },
    'exfoliante-piel-brillo': {
        name: 'EXFOLIANTE CORPORAL Piel&Brillo',
        price: 73900,
        image: 'https://raw.githubusercontent.com/LuisCabrejo/catalogo-gano-excel/main/assets/images/exfoliante_p&b.webp',
        goals: ['belleza'],
        description: 'Exfoliante corporal que elimina células muertas...',
        usage: 'Aplicar sobre piel húmeda con movimientos circulares suaves...',
        ingredients: ['Partículas exfoliantes naturales', 'Aceites hidratantes', 'Vitaminas E y C', 'Extractos vegetales', 'Agentes humectantes']
    }
};
