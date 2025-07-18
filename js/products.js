// Base de datos de productos con precios
const productData = {
    // Bebidas
    'ganocafe-3-en-1': {
        name: 'GANOCAFÉ 3 EN 1',
        price: 110900,
        image: 'https://raw.githubusercontent.com/LuisCabrejo/catalogo-gano-excel/main/assets/images/ganocafe-3-en-1-catalogo-min.png',
        description: 'Una deliciosa mezcla de café premium con Ganoderma Lucidum, cremoso y azúcar. Cada sorbo te brinda una experiencia única que combina el sabor tradicional del café con los beneficios del hongo de la inmortalidad.',
        usage: 'Mezcla 1 sobre (21g) en 150ml de agua caliente. Revuelve bien y disfruta. Se puede tomar de 1 a 3 veces al día.',
        ingredients: ['Extracto de Ganoderma Lucidum', 'Café soluble premium', 'Cremora vegetal', 'Azúcar refinada', 'Saborizante natural']
    },
    'ganocafe-clasico': {
        name: 'GANOCAFÉ CLÁSICO',
        price: 110900,
        image: 'https://raw.githubusercontent.com/LuisCabrejo/catalogo-gano-excel/main/assets/images/gano-cafe-clasico-catalogo-min.png',
        description: 'Para los amantes del café puro, esta fórmula combina café negro de alta calidad con extracto de Ganoderma. Perfecto para quienes prefieren el sabor intenso del café sin aditivos.',
        usage: 'Mezcla 1 sobre (4.5g) en 150ml de agua caliente. Ideal para tomar en las mañanas o cuando necesites energía.',
        ingredients: ['Extracto de Ganoderma Lucidum', 'Café soluble 100% puro', 'Sabor natural a café']
    },
    'ganorico-latte': {
        name: 'GANORICO LATTE RICO',
        price: 119900,
        image: 'https://raw.githubusercontent.com/LuisCabrejo/catalogo-gano-excel/main/assets/images/latte-rico-catalogo-min.png',
        description: 'Una experiencia de latte premium con textura cremosa y espumosa. Esta mezcla perfecta de café, leche y Ganoderma crea una bebida indulgente pero saludable.',
        usage: 'Disuelve 1 sobre (25g) en 180ml de agua caliente. Bate suavemente para crear espuma y disfruta.',
        ingredients: ['Extracto de Ganoderma Lucidum', 'Café premium', 'Leche en polvo', 'Cremora natural', 'Edulcorante natural']
    },
    'ganorico-mocha': {
        name: 'GANORICO MOCHA RICO',
        price: 119900,
        image: 'https://raw.githubusercontent.com/LuisCabrejo/catalogo-gano-excel/main/assets/images/mocha-rico-catalogo-min.png',
        description: 'La combinación perfecta de café y chocolate enriquecida con Ganoderma. Un sabor indulgente que satisface tus antojos mientras cuida tu bienestar.',
        usage: 'Mezcla 1 sobre (25g) en 180ml de agua caliente. Perfecto para la tarde o como postre saludable.',
        ingredients: ['Extracto de Ganoderma Lucidum', 'Café premium', 'Cacao natural', 'Leche en polvo', 'Azúcar de caña']
    },
    'ganorico-shoko': {
        name: 'GANORICO SHOKO RICO',
        price: 124900,
        image: 'https://raw.githubusercontent.com/LuisCabrejo/catalogo-gano-excel/main/assets/images/shoko-rico-catalogo-min.png',
        description: 'Chocolate caliente nutritivo enriquecido con Ganoderma. Ideal para toda la familia, ofrece el placer del chocolate con beneficios para la salud.',
        usage: 'Disuelve 1 sobre (25g) en 180ml de agua caliente o leche. Ideal para niños y adultos en cualquier momento del día.',
        ingredients: ['Extracto de Ganoderma Lucidum', 'Cacao premium', 'Leche en polvo', 'Azúcar natural', 'Saborizante de chocolate']
    },
    'gano-cereal': {
        name: 'ESPIRULINA GANO C\'REAL',
        price: 119900,
        image: 'https://raw.githubusercontent.com/LuisCabrejo/catalogo-gano-excel/main/assets/images/ganocereal-spirulina-catalogo-min.png',
        description: 'Un cereal nutritivo que combina Spirulina y Ganoderma para crear un desayuno completo rico en proteínas, vitaminas y minerales esenciales.',
        usage: 'Mezcla 2 cucharadas (30g) con leche, yogur o agua. Ideal para el desayuno o como snack nutritivo.',
        ingredients: ['Extracto de Ganoderma Lucidum', 'Spirulina orgánica', 'Cereales integrales', 'Fibra natural', 'Vitaminas y minerales']
    },
    'oleaf-rooibos': {
        name: 'BEBIDA DE OLEAF GANO ROOIBOS',
        price: 119900,
        image: 'https://raw.githubusercontent.com/LuisCabrejo/catalogo-gano-excel/main/assets/images/te-rooibos-catalogo-min.png',
        description: 'Té rooibos sudafricano naturalmente libre de cafeína, enriquecido con Ganoderma. Perfecto para relajarse y promover un sueño reparador.',
        usage: 'Disuelve 1 sobre en agua caliente y deja reposar 3-5 minutos. Ideal para la noche o momentos de relajación.',
        ingredients: ['Extracto de Ganoderma Lucidum', 'Té Rooibos orgánico', 'Antioxidantes naturales', 'Sabor natural']
    },
    'chocolate-gano': {
        name: 'CHOCOLATE GANO',
        price: 124900,
        image: 'https://raw.githubusercontent.com/LuisCabrejo/catalogo-gano-excel/main/assets/images/gano-schokolade-catalogo-min.png',
        description: 'Bebida de chocolate concentrada con extracto puro de Ganoderma. Fórmula potente para quienes buscan máximos beneficios con sabor delicioso.',
        usage: 'Disuelve 1 sobre en agua caliente. Se puede tomar 1-2 veces al día, preferiblemente con el estómago vacío.',
        ingredients: ['Extracto concentrado de Ganoderma Lucidum', 'Cacao puro', 'Edulcorante natural']
    },
    'luvoco': {
        name: 'LUVOCO',
        price: 110900,
        image: 'https://raw.githubusercontent.com/LuisCabrejo/catalogo-gano-excel/main/assets/images/luvoco-catalogo-min.png',
        description: 'Café molido gourmet enriquecido con Ganoderma para preparar en casa. Calidad premium para los conocedores del buen café.',
        usage: 'Prepara como café tradicional en cafetera o prensa francesa. 1-2 cucharadas por taza según tu preferencia de intensidad.',
        ingredients: ['Café gourmet molido', 'Extracto de Ganoderma Lucidum', 'Tostado artesanal']
    },
    'reskine-collagen': {
        name: 'BEBIDA DE COLÁGENO RESKINE',
        price: 216900,
        image: 'https://raw.githubusercontent.com/LuisCabrejo/catalogo-gano-excel/main/assets/images/gano-plus-reskine-collagen-drinkcatalogo-min.png',
        description: 'Bebida revolucionaria que combina colágeno hidrolizado con Ganoderma para apoyar la belleza desde adentro, promoviendo piel firme y radiante.',
        usage: 'Disuelve 1 sobre en agua fría o al tiempo. Tomar preferiblemente en ayunas o antes de dormir.',
        ingredients: ['Colágeno hidrolizado', 'Extracto de Ganoderma Lucidum', 'Ácido hialurónico', 'Vitamina C', 'Sabor natural a frutas']
    },
    // Suplementos
    'capsulas-ganoderma': {
        name: 'Cápsulas de Ganoderma',
        price: 272500,
        image: 'https://raw.githubusercontent.com/LuisCabrejo/catalogo-gano-excel/main/assets/images/capsulas-de-ganoderma.webp',
        description: 'Extracto concentrado de Ganoderma Lucidum en cápsulas. La forma más pura y potente de obtener todos los beneficios del hongo milenario.',
        usage: 'Tomar 2 cápsulas al día con agua, preferiblemente antes de las comidas. No exceder la dosis recomendada.',
        ingredients: ['Extracto concentrado de Ganoderma Lucidum', 'Cápsula vegetal', 'Betaglucanos', 'Triterpenos', 'Polisacáridos']
    },
    'capsulas-excellium': {
        name: 'CÁPSULAS EXCELLIUM',
        price: 272500,
        image: 'https://raw.githubusercontent.com/LuisCabrejo/catalogo-gano-excel/main/assets/images/capsulas-de-excellium.webp',
        description: 'Conocido como el "tónico cerebral", contiene extracto del micelio joven del Ganoderma, rico en germanio orgánico para apoyar la función cerebral.',
        usage: 'Tomar 1-2 cápsulas al día con agua. Ideal tomarlas en la mañana para aprovechar sus efectos durante el día.',
        ingredients: ['Extracto de micelio de Ganoderma', 'Germanio orgánico', 'Cápsula vegetal', 'Aminoácidos esenciales']
    },
    'capsulas-cordygold': {
        name: 'CÁPSULAS CORDYGOLD',
        price: 336900,
        image: 'https://raw.githubusercontent.com/LuisCabrejo/catalogo-gano-excel/main/assets/images/capsulas-de-cordy-gold.webp',
        description: 'Cordyceps sinensis de alta calidad para aumentar la energía, resistencia y vitalidad. Ideal para deportistas y personas activas.',
        usage: 'Tomar 2 cápsulas al día, preferiblemente 30 minutos antes del ejercicio o actividad física intensa.',
        ingredients: ['Extracto de Cordyceps sinensis', 'Cápsula vegetal', 'Adenosina', 'Polisacáridos bioactivos']
    },
    // Cuidado Personal
    'gano-fresh': {
        name: 'PASTA DE DIENTES GANO FRESH',
        price: 73900,
        image: 'https://raw.githubusercontent.com/LuisCabrejo/catalogo-gano-excel/main/assets/images/gano-fresh.webp',
        description: 'Pasta dental enriquecida con Ganoderma, libre de flúor. Limpia suavemente mientras protege dientes y encías de forma natural.',
        usage: 'Usar como pasta dental regular. Aplicar sobre el cepillo y cepillar durante 2-3 minutos. Apta para toda la familia.',
        ingredients: ['Extracto de Ganoderma Lucidum', 'Bicarbonato de sodio', 'Aceites esenciales naturales', 'Agentes limpiadores suaves', 'Sin flúor']
    },
    'gano-soap': {
        name: 'JABÓN GANO',
        price: 73900,
        image: 'https://raw.githubusercontent.com/LuisCabrejo/catalogo-gano-excel/main/assets/images/gano-jabon.webp',
        description: 'Jabón artesanal enriquecido con Ganoderma y leche de cabra. Limpia, nutre e hidrata la piel dejándola suave y protegida.',
        usage: 'Humedecer la piel, aplicar el jabón generando espuma suave y enjuagar. Uso diario en rostro y cuerpo.',
        ingredients: ['Extracto de Ganoderma Lucidum', 'Leche de cabra', 'Aceites vegetales naturales', 'Glicerina natural', 'Base jabonosa vegetal']
    },
    'gano-transparent-soap': {
        name: 'JABÓN TRANSPARENTE GANO',
        price: 78500,
        image: 'https://raw.githubusercontent.com/LuisCabrejo/catalogo-gano-excel/main/assets/images/jabon-transparent-soap.webp',
        description: 'Jabón transparente con papaya y aloe vera, enriquecido con Ganoderma. Proporciona una limpieza profunda con efecto exfoliante suave.',
        usage: 'Aplicar sobre piel húmeda, masajear suavemente para exfoliar y enjuagar bien. Ideal para uso corporal.',
        ingredients: ['Extracto de Ganoderma Lucidum', 'Extracto de papaya', 'Aloe vera', 'Base jabonosa transparente', 'Agentes exfoliantes naturales']
    },
    'shampoo-piel-brillo': {
        name: 'Champú Piel&Brillo',
        price: 73900,
        image: 'https://raw.githubusercontent.com/LuisCabrejo/catalogo-gano-excel/main/assets/images/shampoo-p&b.webp',
        description: 'Champú revitalizante que fortalece el cabello desde la raíz. Limpia suavemente mientras aporta brillo y vitalidad.',
        usage: 'Aplicar sobre cabello húmedo, masajear suavemente el cuero cabelludo y enjuagar abundantemente.',
        ingredients: ['Extractos herbales', 'Vitaminas para el cabello', 'Agentes limpiadores suaves', 'Aceites nutritivos', 'pH balanceado']
    },
    'acondicionador-piel-brillo': {
        name: 'ACONDICIONADOR Piel&Brillo',
        price: 73900,
        image: 'https://raw.githubusercontent.com/LuisCabrejo/catalogo-gano-excel/main/assets/images/acondicionador-p&b.webp',
        description: 'Acondicionador que complementa el champú, dejando el cabello suave, manejable y con brillo natural. Facilita el peinado y reduce el frizz.',
        usage: 'Después del champú, aplicar de medios a puntas, dejar actuar 2-3 minutos y enjuagar completamente.',
        ingredients: ['Agentes acondicionadores', 'Aceites nutritivos', 'Vitaminas capilares', 'Extractos naturales', 'Siliconas suaves']
    },
    'exfoliante-piel-brillo': {
        name: 'EXFOLIANTE CORPORAL Piel&Brillo',
        price: 73900,
        image: 'https://raw.githubusercontent.com/LuisCabrejo/catalogo-gano-excel/main/assets/images/exfoliante_p&b.webp',
        description: 'Exfoliante corporal que elimina células muertas y estimula la renovación celular, dejando la piel suave y luminosa.',
        usage: 'Aplicar sobre piel húmeda con movimientos circulares suaves. Concentrarse en áreas más rugosas. Enjuagar bien.',
        ingredients: ['Partículas exfoliantes naturales', 'Aceites hidratantes', 'Vitaminas E y C', 'Extractos vegetales', 'Agentes humectantes']
    }
};
