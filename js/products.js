// Base de datos de productos V5 con beneficios, clasificación de bienestar y atributos de confianza
const productData = {
    'ganocafe-3-en-1': {
        id: 'ganocafe-3-en-1', name: 'GANOCAFÉ 3 EN 1', price: 110900, category: 'bebidas', invima: 'SD2012-0002589',
        image: 'assets/images/ganocafe-3-en-1-catalogo-min.png',
        isGanodermaBased: true, wellnessTags: ['energia', 'defensas'],
        benefits: ['Aporta energía y vitalidad para tu día.','Apoya las defensas naturales del cuerpo.','Contribuye a la reducción del estrés y la fatiga.','Promueve un estado de ánimo positivo.','Disfruta de un delicioso y nutritivo sabor cremoso.'],
        description: 'Una deliciosa mezcla de café premium con Ganoderma Lucidum, cremoso y azúcar.',
        usage: 'Mezcla 1 sobre en 150ml de agua caliente. Revuelve bien y disfruta.',
        ingredients: ['Extracto de Ganoderma Lucidum', 'Café soluble premium', 'Cremora vegetal', 'Azúcar']
    },
    'ganocafe-clasico': {
        id: 'ganocafe-clasico', name: 'GANOCAFÉ CLÁSICO', price: 110900, category: 'bebidas', invima: 'SD2013-0002947',
        image: 'assets/images/gano-cafe-clasico-catalogo-min.png',
        isGanodermaBased: true, wellnessTags: ['energia', 'concentracion'],
        benefits: ['Ideal para los amantes del café negro (tinto).','Potenciado con nutrientes para apoyar tu salud.','Perfecto para iniciar el día con enfoque y claridad.','Contribuye a la protección antioxidante del cuerpo.','Apoya un metabolismo saludable.'],
        description: 'Para los amantes del café puro, esta fórmula combina café negro de alta calidad con extracto de Ganoderma.',
        usage: 'Mezcla 1 sobre en 150ml de agua caliente. Ideal para tomar en las mañanas.',
        ingredients: ['Extracto de Ganoderma Lucidum', 'Café soluble 100% puro']
    },
    'ganorico-latte': {
        id: 'ganorico-latte', name: 'GANORICO LATTE RICO', price: 119900, category: 'bebidas', invima: 'NSA-0012966-2022',
        image: 'assets/images/latte-rico-catalogo-min.png',
        isGanodermaBased: true, wellnessTags: ['energia', 'relajacion'],
        benefits: ['Disfruta de una experiencia de café latte premium.','Textura espumosa y cremosa que deleita tus sentidos.','Un gusto enriquecido para tu bienestar.','Contribuye a un sistema digestivo saludable.','Aporta una sensación de confort y relajación.'],
        description: 'Una experiencia de latte premium con textura cremosa y espumosa. Una bebida indulgente pero saludable.',
        usage: 'Disuelve 1 sobre en 180ml de agua caliente. Bate suavemente para crear espuma y disfruta.',
        ingredients: ['Extracto de Ganoderma Lucidum', 'Café premium', 'Leche en polvo']
    },
    'ganorico-mocha': {
        id: 'ganorico-mocha', name: 'GANORICO MOCHA RICO', price: 119900, category: 'bebidas', invima: 'NSA-0012966-2022',
        image: 'assets/images/mocha-rico-catalogo-min.png',
        isGanodermaBased: true, wellnessTags: ['energia', 'relajacion'],
        benefits: ['La combinación perfecta de café y cacao saludable.','Un sabor indulgente que apoya tu bienestar.','Con betaglucanos para apoyar tus defensas.','Promueve la sensación de saciedad.','Ideal para recargar energías a media tarde.'],
        description: 'La combinación perfecta de café y chocolate enriquecida con Ganoderma.',
        usage: 'Mezcla 1 sobre en 180ml de agua caliente. Perfecto para la tarde.',
        ingredients: ['Extracto de Ganoderma Lucidum', 'Café premium', 'Cacao natural']
    },
    'shoko-rico': {
        id: 'shoko-rico', name: 'GANORICO SHOKO RICO', price: 124900, category: 'bebidas', invima: 'NSA-0010766-2021',
        image: 'assets/images/shoko-rico-catalogo-min.png',
        isGanodermaBased: true, wellnessTags: ['relajacion', 'defensas'],
        benefits: ['Chocolate nutritivo y delicioso para toda la familia.','Bebida reconfortante para momentos de relajación.','Apoya el bienestar general de forma placentera.','Contribuye al desarrollo de huesos fuertes.','Una opción inteligente para antojos de dulce.'],
        description: 'Chocolate caliente nutritivo enriquecido con Ganoderma. Ideal para toda la familia.',
        usage: 'Disuelve 1 sobre en 180ml de agua caliente o leche.',
        ingredients: ['Extracto de Ganoderma Lucidum', 'Cacao premium', 'Leche en polvo']
    },
    'ganocereal-spirulina': {
        id: 'ganocereal-spirulina', name: 'ESPIRULINA GANO C\'REAL', price: 119900, category: 'bebidas', invima: 'SD2014-0003291',
        image: 'assets/images/ganocereal-spirulina-catalogo-min.png',
        isGanodermaBased: true, wellnessTags: ['digestivo', 'energia', 'defensas'],
        benefits: ['Alto contenido de fibra para la salud digestiva.','Excelente fuente de proteína vegetal.','Promueve una nutrición completa y balanceada.','Rico en vitaminas y minerales esenciales.','Apoya la desintoxicación natural del organismo.'],
        description: 'Un cereal nutritivo que combina Spirulina y Ganoderma para crear un desayuno completo.',
        usage: 'Mezcla 2 cucharadas (30g) con leche, yogur o agua.',
        ingredients: ['Extracto de Ganoderma Lucidum', 'Spirulina orgánica', 'Cereales integrales']
    },
    'oleaf-rooibos': {
        id: 'oleaf-rooibos', name: 'BEBIDA DE OLEAF GANO ROOIBOS', price: 119900, category: 'bebidas', invima: 'SD2017-0004109',
        image: 'assets/images/te-rooibos-catalogo-min.png',
        isGanodermaBased: true, wellnessTags: ['relajacion', 'defensas', 'digestivo'],
        benefits: ['Bebida relajante para un descanso reparador.','Naturalmente libre de cafeína.','Rico en antioxidantes que combaten el estrés oxidativo.','Apoya la salud del sistema nervioso.','Contribuye a una correcta hidratación.'],
        description: 'Té rooibos sudafricano naturalmente libre de cafeína, enriquecido con Ganoderma.',
        usage: 'Disuelve 1 sobre en agua caliente y deja reposar 3-5 minutos.',
        ingredients: ['Extracto de Ganoderma Lucidum', 'Té Rooibos orgánico']
    },
    'ganochocolate': {
        id: 'ganochocolate', name: 'CHOCOLATE GANO', price: 124900, category: 'bebidas', invima: 'SD2013-0002947',
        image: 'assets/images/gano-schokolade-catalogo-min.png',
        isGanodermaBased: true, wellnessTags: ['relajacion', 'defensas'],
        benefits: ['Ofrece apoyo nutricional con delicioso sabor.','Fórmula concentrada con extracto de Ganoderma.','Ayuda a mejorar la circulación y salud cardiovascular.','Contribuye a un estado de ánimo equilibrado.','Fácil y rápido de preparar.'],
        description: 'Bebida de chocolate concentrada con extracto puro de Ganoderma.',
        usage: 'Disuelve 1 sobre en agua caliente.',
        ingredients: ['Extracto concentrado de Ganoderma Lucidum', 'Cacao puro']
    },
    'luvoco': {
        id: 'luvoco', name: 'LUVOCO', price: 110900, category: 'bebidas', invima: 'NSA-0012966-2022',
        image: 'assets/images/luvoco-catalogo-min.png',
        isGanodermaBased: true, wellnessTags: ['energia', 'concentracion'],
        benefits: ['Disfruta una experiencia de café molido gourmet.','Calidad de café premium para preparar en casa.','Enriquecido para fortalecer tu sistema inmune.','Aroma y sabor intensos para conocedores.','Apoya la función antioxidante del cuerpo.'],
        description: 'Café molido gourmet enriquecido con Ganoderma para preparar en casa.',
        usage: 'Prepara como café tradicional en cafetera o prensa francesa.',
        ingredients: ['Café gourmet molido', 'Extracto de Ganoderma Lucidum']
    },
    'colageno-reskine': {
        id: 'colageno-reskine', name: 'BEBIDA DE COLÁGENO RESKINE', price: 216900, category: 'bebidas', invima: 'SD20210004889',
        image: 'assets/images/gano-plus-reskine-collagen-drinkcatalogo-min.png',
        isGanodermaBased: true, wellnessTags: ['belleza'],
        benefits: ['Apoya la elasticidad y firmeza de la piel.','Fortalece el cabello y las uñas.','Contribuye a una apariencia más juvenil.','Ayuda a mantener la salud de articulaciones.','Fórmula única con Colágeno y Ganoderma.'],
        description: 'Bebida revolucionaria que combina colágeno hidrolizado con Ganoderma para apoyar la belleza desde adentro.',
        usage: 'Disuelve 1 sobre en agua fría o al tiempo.',
        ingredients: ['Colágeno hidrolizado', 'Extracto de Ganoderma Lucidum', 'Ácido hialurónico', 'Vitamina C']
    },
    'capsulas-ganoderma': {
        id: 'capsulas-ganoderma', name: 'Cápsulas de Ganoderma', price: 272500, category: 'capsulas', invima: 'SD2013-0002860',
        image: 'assets/images/capsulas-de-ganoderma.webp',
        isGanodermaBased: true, wellnessTags: ['defensas', 'relajacion'],
        benefits: ['Fortalece las defensas naturales del cuerpo.','Potente acción antioxidante que protege las células.','Promueve el bienestar general y el equilibrio.','Apoya la salud del sistema circulatorio.','Actúa como un adaptógeno natural.'],
        description: 'Extracto concentrado de Ganoderma Lucidum en cápsulas. La forma más pura y potente de obtener sus beneficios.',
        usage: 'Tomar 2 cápsulas al día con agua, preferiblemente antes de las comidas.',
        ingredients: ['Extracto concentrado de Ganoderma Lucidum', 'Polisacáridos', 'Triterpenos']
    },
    'capsulas-excellium': {
        id: 'capsulas-excellium', name: 'CÁPSULAS EXCELLIUM', price: 272500, category: 'capsulas', invima: 'SD2013-0002822',
        image: 'assets/images/capsulas-de-excellium.webp',
        isGanodermaBased: true, wellnessTags: ['concentracion', 'energia'],
        benefits: ['Apoya la función cerebral, memoria y concentración.','Conocido como el "tónico para el cerebro".','Ayuda a mantener un sistema nervioso saludable.','Promueve una óptima oxigenación celular.','Contribuye al desarrollo y función del cerebro.'],
        description: 'Conocido como el "tónico cerebral", contiene extracto del micelio joven del Ganoderma para apoyar la función cerebral.',
        usage: 'Tomar 1-2 cápsulas al día con agua. Ideal tomarlas en la mañana.',
        ingredients: ['Extracto de micelio de Ganoderma', 'Germanio orgánico', 'Aminoácidos']
    },
    'capsulas-cordy-gold': {
        id: 'capsulas-cordy-gold', name: 'CÁPSULAS CORDYGOLD', price: 336900, category: 'capsulas', invima: 'SD2017-0004056',
        image: 'assets/images/capsulas-de-cordy-gold.webp',
        isGanodermaBased: false, wellnessTags: ['energia', 'defensas'],
        benefits: ['Aumenta la energía, resistencia y rendimiento físico.','Apoya la salud del sistema respiratorio y pulmones.','Contribuye al buen funcionamiento de los riñones.','Mejora la vitalidad y apoya la función sexual.','Ayuda a regular el estrés y la fatiga crónica.'],
        description: 'Cordyceps sinensis de alta calidad para aumentar la energía, resistencia y vitalidad.',
        usage: 'Tomar 2 cápsulas al día, 30 minutos antes del ejercicio o actividad física.',
        ingredients: ['Extracto de Cordyceps sinensis', 'Adenosina', 'Polisacáridos bioactivos']
    },
    'gano-fresh': {
        id: 'gano-fresh', name: 'PASTA DE DIENTES GANO FRESH', price: 73900, category: 'cuidado-personal', invima: 'NSOC58855-14CO',
        image: 'assets/images/gano-fresh.webp',
        isGanodermaBased: true, wellnessTags: ['belleza'],
        benefits: ['Promueve la salud integral de dientes y encías.','Proporciona un aliento fresco y duradero.','Fórmula suave, sin flúor, ideal para toda la familia.','Ayuda a prevenir la formación de placa.','Contribuye a calmar la sensibilidad dental.'],
        description: 'Pasta dental enriquecida con Ganoderma, libre de flúor.',
        usage: 'Usar como pasta dental regular. Aplicar sobre el cepillo y cepillar durante 2-3 minutos.',
        ingredients: ['Extracto de Ganoderma Lucidum', 'Bicarbonato de sodio', 'Sin flúor']
    },
    'shampoo-p&b': {
        id: 'shampoo-p&b', name: 'Champú Piel&Brillo', price: 73900, category: 'cuidado-personal', invima: 'NSOC96485-19CO',
        image: 'assets/images/shampoo-p&b.webp',
        isGanodermaBased: false, wellnessTags: ['belleza'],
        benefits: ['Fortalece y revitaliza el cabello desde la raíz.','Proporciona un brillo saludable y natural.','Limpia suavemente el cuero cabelludo.','Ayuda a nutrir el folículo piloso.','Deja el cabello con una sensación de frescura.'],
        description: 'Champú revitalizante que fortalece el cabello desde la raíz.',
        usage: 'Aplicar sobre cabello húmedo, masajear y enjuagar.',
        ingredients: ['Extractos herbales', 'Vitaminas para el cabello']
    },
    'acondicionador-p&b': {
        id: 'acondicionador-p&b', name: 'ACONDICIONADOR Piel&Brillo', price: 73900, category: 'cuidado-personal', invima: 'NSOC96486-19CO',
        image: 'assets/images/acondicionador-p&b.webp',
        isGanodermaBased: false, wellnessTags: ['belleza'],
        benefits: ['Deja el cabello suave, sedoso y manejable.','Facilita el peinado y reduce el frizz.','Aporta una hidratación profunda sin ser graso.','Sella la cutícula para un acabado pulido.','El complemento perfecto para un cabello sano.'],
        description: 'Acondicionador que complementa el champú, dejando el cabello suave y manejable.',
        usage: 'Después del champú, aplicar de medios a puntas, dejar actuar y enjuagar.',
        ingredients: ['Agentes acondicionadores', 'Aceites nutritivos']
    },
    'gano-soap': {
        id: 'gano-soap', name: 'JABÓN GANO', price: 73900, category: 'cuidado-personal', invima: 'NSOC99970-20CO',
        image: 'assets/images/gano-jabon.webp',
        isGanodermaBased: true, wellnessTags: ['belleza'],
        benefits: ['Nutre e hidrata la piel profundamente.','Enriquecido con leche de cabra para mayor suavidad.','Ayuda a equilibrar el pH natural de la piel.','Limpia sin resecar, ideal para pieles sensibles.','Propiedades antioxidantes que protegen la piel.'],
        description: 'Jabón artesanal enriquecido con Ganoderma y leche de cabra.',
        usage: 'Uso diario en rostro y cuerpo.',
        ingredients: ['Extracto de Ganoderma Lucidum', 'Leche de cabra']
    },
    'exfoliante-p&b': {
        id: 'exfoliante-p&b', name: 'EXFOLIANTE CORPORAL Piel&Brillo', price: 73900, category: 'cuidado-personal', invima: 'NSOC96487-19CO',
        image: 'assets/images/exfoliante_p&b.webp',
        isGanodermaBased: false, wellnessTags: ['belleza'],
        benefits: ['Elimina eficazmente impurezas y células muertas.','Renueva y suaviza la textura de la piel.','Deja la piel con una apariencia luminosa.','Estimula la circulación y regeneración celular.','Prepara la piel para una mejor hidratación.'],
        description: 'Exfoliante corporal que elimina células muertas y estimula la renovación celular.',
        usage: 'Aplicar sobre piel húmeda con movimientos circulares suaves.',
        ingredients: ['Partículas exfoliantes naturales', 'Aceites hidratantes']
    },
    'jabon-transparente': {
        id: 'jabon-transparente', name: 'JABÓN TRANSPARENTE GANO', price: 78500, category: 'cuidado-personal', invima: 'NSO09915-21CO',
        image: 'assets/images/jabon-transparent-soap.webp',
        isGanodermaBased: true, wellnessTags: ['belleza', 'digestivo'],
        benefits: ['Limpia suavemente la piel, eliminando impurezas.','Con papaya para una micro-exfoliación natural.','El aloe vera proporciona un efecto calmante.','Ayuda a mejorar la apariencia de la piel.','Deja una sensación de frescura y limpieza total.'],
        description: 'Jabón transparente con papaya y aloe vera, enriquecido con Ganoderma.',
        usage: 'Aplicar sobre piel húmeda, masajear y enjuagar.',
        ingredients: ['Extracto de Ganoderma Lucidum', 'Extracto de papaya', 'Aloe vera']
    }
};
