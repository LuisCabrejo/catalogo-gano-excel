// --- DATABASE DE PRODUCTOS PARA EL MODAL ---
const productData = {
    'ganocafe-3-en-1': {
        name: 'GANOCAFÉ 3 EN 1',
        description: 'Es la bebida ideal para quienes buscan conveniencia sin sacrificar el sabor y los beneficios. Combina un café gourmet de alta calidad con crema no láctea y un toque dulce, todo enriquecido con el poderoso extracto de Ganoderma Lucidum. Es tu compañero perfecto para empezar el día con energía y bienestar.',
        usage: 'Vierta el contenido de un sobre en una taza, agregue agua caliente (no hirviendo) y mezcle bien. Disfrute en cualquier momento del día.',
        ingredients: ['Café instantáneo de calidad', 'Crema no láctea', 'Azúcar', 'Extracto de Ganoderma Lucidum']
    },
    'ganocafe-clasico': {
        name: 'GANOCAFÉ CLÁSICO',
        description: 'Para los puristas del café que no negocian el sabor intenso y el aroma profundo. Este café negro, tipo tinto, está potenciado con el extracto de Ganoderma Lucidum, ofreciendo una experiencia robusta que despierta tus sentidos y apoya tu bienestar con cada sorbo.',
        usage: 'Disuelva un sobre en una taza con agua caliente. Disfrútelo solo o con su endulzante preferido.',
        ingredients: ['Café negro instantáneo', 'Extracto de Ganoderma Lucidum']
    },
    'ganorico-latte': {
        name: 'GANORICO LATTE RICO',
        description: 'Una experiencia de cafetería premium en la comodidad de tu hogar. Este latte combina la suavidad de la leche con un café selecto, creando una bebida espumosa y deliciosa. Enriquecido con betaglucanos de Ganoderma, es un capricho que cuida de ti.',
        usage: 'Mezcle un sobre con agua caliente para obtener un latte cremoso y espumoso al instante.',
        ingredients: ['Café selecto', 'Crema no láctea', 'Betaglucanos de Ganoderma Lucidum']
    },
    'ganorico-mocha': {
        name: 'GANORICO MOCHA RICO',
        description: 'La fusión perfecta entre café rico y cacao indulgente, creando una bebida mocha que es tanto un placer para el paladar como un apoyo para tu bienestar. Enriquecido con los beneficios del Ganoderma Lucidum, es la opción ideal para un capricho saludable.',
        usage: 'Vierta el contenido de un sobre en una taza, agregue agua o leche caliente y mezcle hasta obtener una bebida homogénea y deliciosa.',
        ingredients: ['Café premium', 'Cacao en polvo', 'Crema no láctea', 'Betaglucanos de Ganoderma Lucidum']
    },
    'ganorico-shoko': {
        name: 'GANORICO SHOKO RICO',
        description: 'Un chocolate caliente que va más allá del sabor. Formulado para toda la familia, este chocolate suizo enriquecido con Ganoderma Lucidum es una bebida nutritiva y reconfortante, perfecta para cualquier momento del día.',
        usage: 'Ideal para niños y adultos. Mezcle un sobre con leche o agua caliente para un chocolate cremoso y lleno de beneficios.',
        ingredients: ['Cacao suizo', 'Crema no láctea', 'Azúcar', 'Extracto de Ganoderma Lucidum']
    },
    'gano-cereal': {
        name: 'ESPIRULINA GANO C\'REAL',
        description: 'El desayuno de los campeones. Este cereal combina la fibra de la avena con el poder nutricional de la Spirulina y el extracto de Ganoderma Lucidum. Es un alimento completo que te proporciona energía sostenida y una nutrición balanceada para empezar tu jornada.',
        usage: 'Vierta el contenido en un tazón y agregue leche o su bebida vegetal preferida. También puede consumirse solo como un snack nutritivo.',
        ingredients: ['Avena en hojuelas', 'Spirulina', 'Extracto de Ganoderma Lucidum', 'Crema no láctea']
    },
    'oleaf-rooibos': {
        name: 'BEBIDA DE OLEAF GANO ROOIBOS',
        description: 'Una infusión para calmar el cuerpo y la mente. Este té Rooibos, naturalmente libre de cafeína, está enriquecido con Ganoderma Lucidum. Sus propiedades antioxidantes y relajantes lo convierten en la bebida perfecta para finalizar el día o para un momento de pausa.',
        usage: 'Sumerja una bolsita de té en una taza con agua caliente durante 3-5 minutos. Disfrute solo o con un toque de miel.',
        ingredients: ['Hojas de Té Rooibos', 'Extracto de Ganoderma Lucidum']
    },
    'chocolate-gano': {
        name: 'CHOCOLATE GANO',
        description: 'Más que un simple chocolate. Esta fórmula en polvo combina el rico sabor del cacao con una dosis concentrada de extracto de Ganoderma Lucidum, creando una bebida funcional que apoya tu bienestar mientras disfrutas de un sabor clásico.',
        usage: 'Mezcle una porción con agua o leche caliente. Ideal como una bebida nutritiva y reconfortante.',
        ingredients: ['Cacao en polvo', 'Extracto de Ganoderma Lucidum']
    },
    'luvoco': {
        name: 'LUVOCO',
        description: 'Para los verdaderos conocedores del café. Luvoco es un café molido de tueste premium, diseñado para ser preparado en su método preferido (greca, cafetera de filtro, etc.). Cada grano está impregnado con los beneficios del Ganoderma Lucidum para una taza excepcional en aroma, sabor y bienestar.',
        usage: 'Utilice la cantidad deseada de café molido en su cafetera o método de preparación habitual.',
        ingredients: ['Café molido de tueste premium', 'Betaglucanos de Ganoderma Lucidum']
    },
    'reskine-collagen': {
        name: 'BEBIDA DE COLÁGENO RESKINE',
        description: 'Belleza que se bebe. Esta bebida funcional combina colágeno hidrolizado, esencial para la salud de la piel, cabello y uñas, con el poder antioxidante del Ganoderma Lucidum. Una fórmula diseñada para nutrir tu belleza desde el interior.',
        usage: 'Disuelva el contenido de un sobre en un vaso con agua o su bebida preferida. Consumir preferiblemente en ayunas.',
        ingredients: ['Colágeno hidrolizado', 'Extracto de Ganoderma Lucidum']
    },
    'capsulas-ganoderma': {
        name: 'Cápsulas de Ganoderma',
        description: 'La forma más pura y concentrada de obtener los beneficios del Ganoderma Lucidum. Cada cápsula contiene el extracto del hongo maduro, conocido por su capacidad para modular el sistema inmune y actuar como un potente antioxidante, promoviendo el equilibrio general del cuerpo.',
        usage: 'Tomar 1 o 2 cápsulas al día, preferiblemente con las comidas.',
        ingredients: ['Extracto de Ganoderma Lucidum (275 mg)']
    },
    'capsulas-excellium': {
        name: 'CÁPSULAS EXCELLIUM',
        description: 'Nutrición superior para tu cerebro. Estas cápsulas contienen el extracto del micelio del Ganoderma (hongo joven), rico en germanio orgánico y otros nutrientes que apoyan la oxigenación cerebral, la concentración y la salud del sistema nervioso.',
        usage: 'Tomar 1 o 2 cápsulas al día. Ideal para estudiantes, profesionales y adultos mayores.',
        ingredients: ['Micelio de Ganoderma Lucidum (275 mg)']
    },
    'capsulas-cordygold': {
        name: 'CÁPSULAS CORDYGOLD',
        description: 'El impulso de energía y vitalidad que necesitas. Formuladas con Cordyceps Sinensis, estas cápsulas son ideales para deportistas y personas con un estilo de vida activo. Apoyan la salud respiratoria, aumentan la resistencia y mejoran el rendimiento físico y mental.',
        usage: 'Tomar 1 o 2 cápsulas al día, especialmente antes de la actividad física.',
        ingredients: ['Cordyceps Sinensis (500 mg)']
    },
    'gano-fresh': {
        name: 'PASTA DE DIENTES GANO FRESH',
        description: 'Una sonrisa saludable de forma natural. Gano Fresh es una pasta dental sin flúor, enriquecida con extracto de Ganoderma Lucidum. Limpia suavemente, refresca el aliento y promueve la salud de dientes y encías sin químicos agresivos.',
        usage: 'Cepille sus dientes después de cada comida o al menos dos veces al día.',
        ingredients: ['Extracto de Ganoderma Lucidum', 'Menta', 'Sorbitol']
    },
    'gano-soap': {
        name: 'JABÓN GANO',
        description: 'Un jabón de uso diario que nutre mientras limpia. La combinación de extracto de Ganoderma Lucidum y leche de cabra ayuda a hidratar, suavizar y equilibrar el pH de la piel, dejándola limpia y radiante. Ideal para toda la familia.',
        usage: 'Use diariamente durante el baño o la ducha para limpiar cara y cuerpo.',
        ingredients: ['Extracto de Ganoderma Lucidum', 'Leche de cabra']
    },
    'gano-transparent-soap': {
        name: 'JABÓN TRANSPARENTE GANO',
        description: 'Limpieza y renovación para tu piel. Este jabón transparente combina las propiedades del Ganoderma Lucidum con la suavidad del aloe vera y el poder renovador del extracto de papaya. Ayuda a limpiar impurezas y a mejorar la textura de la piel.',
        usage: 'Ideal para la limpieza facial diaria. Masajee suavemente sobre la piel húmeda y enjuague.',
        ingredients: ['Extracto de Ganoderma Lucidum', 'Extracto de Papaya', 'Aloe Vera']
    },
    'shampoo-piel-brillo': {
        name: 'Champú Piel&Brillo',
        description: 'Revitaliza tu cabello con el poder del Ganoderma Lucidum. Este shampoo limpia suavemente, nutre el folículo piloso y fortalece el cabello desde la raíz, devolviéndole su brillo y vitalidad natural.',
        usage: 'Aplique sobre el cabello húmedo, masajee el cuero cabelludo y enjuague con abundante agua.',
        ingredients: ['Extracto de Ganoderma Lucidum', 'Aloe Vera']
    },
    'acondicionador-piel-brillo': {
        name: 'ACONDICIONADOR Piel&Brillo',
        description: 'El toque final para un cabello suave, brillante y manejable. Este acondicionador sella la hidratación, reduce el frizz y facilita el peinado, dejando tu cabello sedoso y protegido gracias a los beneficios del Ganoderma Lucidum.',
        usage: 'Después del shampoo, aplique de medios a puntas, deje actuar por unos minutos y enjuague.',
        ingredients: ['Extracto de Ganoderma Lucidum']
    },
    'exfoliante-piel-brillo': {
        name: 'EXFOLIANTE CORPORAL Piel&Brillo',
        description: 'Renueva tu piel y déjala luminosa. Este exfoliante corporal elimina suavemente las células muertas e impurezas, mientras el Ganoderma Lucidum nutre y protege. El resultado es una piel más suave, lisa y radiante.',
        usage: 'Durante la ducha, masajee sobre la piel húmeda con movimientos circulares y luego enjuague. Usar 1-2 veces por semana.',
        ingredients: ['Extracto de Ganoderma Lucidum', 'Polvo de semilla de albaricoque']
    }
};
