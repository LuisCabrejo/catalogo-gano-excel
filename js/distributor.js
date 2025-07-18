/**
 * 🎯 SISTEMA DE DISTRIBUIDORES PARA CATÁLOGO - VERSIÓN CON AFILIACIÓN
 * Este archivo personaliza el catálogo según el distribuidor que lo comparte
 * Incluye configuración del enlace de afiliación del Back Office
 */

// 🔧 Configuración de Supabase
const SUPABASE_URL = 'https://ovsvocjvjnqfaaugwnxg.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im92c3ZvY2p2am5xZmFhdWd3bnhnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE3ODEyMzcsImV4cCI6MjA2NzM1NzIzN30.ZErzsooaSXnS-NdmMYD0JcZFupFgrXfMLH-nOvU1NTE';

// Inicializar cliente Supabase
const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

/**
 * 🎯 Generar slug desde nombre completo
 * @param {string} fullName - Nombre completo del usuario
 * @returns {string} Slug amigable
 */
function generarSlugDesdNombre(fullName) {
    if (!fullName) return null;

    try {
        console.log('🔧 Generando slug para:', fullName);

        // Extraer primer nombre + primer apellido
        const parts = fullName.trim().split(' ').filter(part => part.length > 0);

        let nombreParaSlug;
        if (parts.length >= 2) {
            nombreParaSlug = `${parts[0]} ${parts[1]}`;
        } else {
            nombreParaSlug = parts[0] || '';
        }

        console.log('📝 Nombre para slug:', nombreParaSlug);

        // Convertir a slug amigable
        const slug = nombreParaSlug
            .toLowerCase()
            .trim()
            // Reemplazar caracteres especiales manualmente
            .replace(/á/g, 'a').replace(/é/g, 'e').replace(/í/g, 'i').replace(/ó/g, 'o').replace(/ú/g, 'u')
            .replace(/à/g, 'a').replace(/è/g, 'e').replace(/ì/g, 'i').replace(/ò/g, 'o').replace(/ù/g, 'u')
            .replace(/ä/g, 'a').replace(/ë/g, 'e').replace(/ï/g, 'i').replace(/ö/g, 'o').replace(/ü/g, 'u')
            .replace(/ñ/g, 'n').replace(/ç/g, 'c')
            // Remover caracteres no alfanuméricos excepto espacios
            .replace(/[^a-z0-9\s]/g, '')
            // Espacios múltiples a uno solo
            .replace(/\s+/g, ' ')
            // Espacios a guiones
            .replace(/\s/g, '-')
            // Múltiples guiones a uno
            .replace(/-+/g, '-')
            // Remover guiones al inicio y final
            .replace(/^-+|-+$/g, '');

        console.log('✅ Slug generado:', slug);
        return slug;

    } catch (error) {
        console.error('❌ Error generando slug:', error);
        return null;
    }
}

/**
 * 🔍 Buscar distribuidor por slug en Supabase
 * @param {string} slug - Slug del distribuidor (ej: "maria-gonzalez")
 * @returns {Object|null} Datos del distribuidor o null
 */
async function buscarDistribuidor(slug) {
    try {
        console.log('🔍 ==========================================');
        console.log('🔍 INICIANDO BÚSQUEDA DE DISTRIBUIDOR');
        console.log('🔍 Slug buscado:', slug);
        console.log('🔍 ==========================================');

        if (!slug || slug.trim() === '') {
            console.warn('⚠️ Slug vacío o inválido');
            return null;
        }

        // Consultar todos los perfiles activos
        console.log('📡 Consultando base de datos Supabase...');

        const { data: perfiles, error } = await supabaseClient
            .from('profiles')
            .select('full_name, whatsapp, email, backoffice_affiliate_link')
            .not('full_name', 'is', null);

        if (error) {
            console.error('❌ ERROR EN CONSULTA SUPABASE:', error);
            return null;
        }

        console.log('📊 Perfiles encontrados:', perfiles?.length || 0);

        if (!perfiles || perfiles.length === 0) {
            console.warn('⚠️ No se encontraron perfiles en la base de datos');
            return null;
        }

        // Buscar coincidencia por slug
        console.log('🔍 GENERANDO SLUGS Y BUSCANDO COINCIDENCIAS...');

        let distribuidorEncontrado = null;

        for (const [index, perfil] of perfiles.entries()) {
            const slugGenerado = generarSlugDesdNombre(perfil.full_name);

            console.log(`🔍 [${index + 1}/${perfiles.length}] Perfil: "${perfil.full_name}"`);
            console.log(`🔍 [${index + 1}/${perfiles.length}] Slug generado: "${slugGenerado}"`);
            console.log(`🔍 [${index + 1}/${perfiles.length}] ¿Coincide? ${slugGenerado === slug ? '✅ SÍ' : '❌ NO'}`);

            if (slugGenerado && slugGenerado === slug) {
                distribuidorEncontrado = perfil;
                console.log('🎉 ¡DISTRIBUIDOR ENCONTRADO!');
                console.log('🎉 Nombre:', perfil.full_name);
                console.log('🎉 WhatsApp:', perfil.whatsapp);
                console.log('🎉 Email:', perfil.email);
                console.log('🎉 Enlace Afiliación:', perfil.backoffice_affiliate_link);
                break;
            }
        }

        if (distribuidorEncontrado) {
            // Formatear número de WhatsApp
            let whatsappFormateado = distribuidorEncontrado.whatsapp;

            if (whatsappFormateado) {
                const numeroLimpio = whatsappFormateado.replace(/[^\d]/g, '');

                if (numeroLimpio.length === 10 && !numeroLimpio.startsWith('57')) {
                    whatsappFormateado = '+57' + numeroLimpio;
                } else if (numeroLimpio.length === 12 && numeroLimpio.startsWith('57')) {
                    whatsappFormateado = '+' + numeroLimpio;
                } else if (!whatsappFormateado.startsWith('+')) {
                    whatsappFormateado = '+' + numeroLimpio;
                }
            }

            // Extraer primer nombre
            const nombreParts = distribuidorEncontrado.full_name.trim().split(' ').filter(part => part.length > 0);
            const primerNombre = nombreParts[0] || '';
            const primerApellido = nombreParts[1] || '';
            const nombreApellido = primerApellido ? `${primerNombre} ${primerApellido}` : primerNombre;

            return {
                nombre: distribuidorEncontrado.full_name,
                whatsapp: whatsappFormateado,
                email: distribuidorEncontrado.email,
                affiliateLink: distribuidorEncontrado.backoffice_affiliate_link,
                slug: slug,
                primer_nombre: primerNombre,
                nombre_apellido: nombreApellido
            };
        }

        console.log('❌ NO SE ENCONTRÓ DISTRIBUIDOR');
        return null;

    } catch (error) {
        console.error('❌ ERROR CRÍTICO en búsqueda de distribuidor:', error);
        return null;
    }
}

/**
 * 🔗 Configurar enlace de afiliación
 * @param {Object} distribuidor - Datos del distribuidor
 */
function configurarEnlaceAfiliacion(distribuidor) {
    try {
        console.log('🔗 Configurando enlace de afiliación...');

        const afiliacionLink = document.getElementById('afiliacion-link');

        if (afiliacionLink) {
            if (distribuidor.affiliateLink && distribuidor.affiliateLink.trim() !== '') {
                // El distribuidor tiene enlace personalizado
                afiliacionLink.href = distribuidor.affiliateLink;
                afiliacionLink.title = `Únete al equipo de ${distribuidor.primer_nombre}`;

                console.log('🔗 Enlace de afiliación configurado:');
                console.log('🔗   URL:', distribuidor.affiliateLink);
                console.log('🔗   Distribuidor:', distribuidor.primer_nombre);
            } else {
                // Enlace por defecto si no tiene configurado
                afiliacionLink.href = 'https://ganoexcel.com/gano-excel-colombia/';
                afiliacionLink.title = 'Conoce la oportunidad de negocio Gano Excel';

                console.log('🔗 Usando enlace de afiliación por defecto');
            }

            // Abrir en nueva pestaña
            afiliacionLink.target = '_blank';
            afiliacionLink.rel = 'noopener noreferrer';

        } else {
            console.warn('⚠️ No se encontró enlace de afiliación (#afiliacion-link)');
        }

    } catch (error) {
        console.error('❌ Error configurando enlace de afiliación:', error);
    }
}

/**
 * 🎨 Personalizar catálogo con datos del distribuidor
 * @param {Object} distribuidor - Datos del distribuidor
 */
function personalizarCatalogo(distribuidor) {
    try {
        console.log('🎨 ==========================================');
        console.log('🎨 INICIANDO PERSONALIZACIÓN DEL CATÁLOGO');
        console.log('🎨 Distribuidor:', distribuidor.nombre);
        console.log('🎨 ==========================================');

        // 1. Personalizar título de la página
        document.title = `Catálogo de ${distribuidor.primer_nombre} - Gano Excel`;

        // 2. Personalizar header principal
        const headerTitle = document.querySelector('header h1');
        if (headerTitle) {
            headerTitle.textContent = `Catálogo de Bienestar de ${distribuidor.primer_nombre}`;
        }

        // 3. Personalizar subtítulo del header
        const headerSubtitle = document.querySelector('header p');
        if (headerSubtitle) {
            headerSubtitle.textContent = `Transforma tu bienestar con productos que nutren cuerpo, mente y espíritu`;
        }

        // 4. Configurar WhatsApp personalizado
        configurarWhatsAppPersonalizado(distribuidor);

        // 5. Agregar badge de distribuidor
        agregarBadgeDistribuidor(distribuidor);

        // 6. Configurar enlace de afiliación
        configurarEnlaceAfiliacion(distribuidor);

        console.log('✅ PERSONALIZACIÓN COMPLETADA EXITOSAMENTE');

    } catch (error) {
        console.error('❌ Error personalizando catálogo:', error);
    }
}

/**
 * 📱 Configurar botón de WhatsApp personalizado del distribuidor
 * @param {Object} distribuidor - Datos del distribuidor
 */
function configurarWhatsAppPersonalizado(distribuidor) {
    try {
        console.log('📱 Configurando WhatsApp personalizado...');

        const whatsappButton = document.getElementById('whatsapp-fab');

        if (!whatsappButton) {
            console.error('❌ No se encontró el botón de WhatsApp');
            return;
        }

        if (!distribuidor.whatsapp) {
            console.warn('⚠️ Distribuidor no tiene número de WhatsApp');
            return;
        }

        // Configurar el atributo data para el carrito
        document.body.setAttribute('data-distributor-whatsapp', distribuidor.whatsapp);

        // Mensaje personalizado
        const mensaje = `Hola ${distribuidor.primer_nombre}, vi tu catálogo de productos Gano Excel y me interesan. ¿Me podrías dar más información sobre precios y disponibilidad?`;

        // URL de WhatsApp
        const whatsappUrl = `https://api.whatsapp.com/send?phone=${distribuidor.whatsapp}&text=${encodeURIComponent(mensaje)}`;

        whatsappButton.href = whatsappUrl;
        whatsappButton.style.display = 'flex';
        whatsappButton.title = `Contactar a ${distribuidor.primer_nombre} por WhatsApp`;

        console.log('📱 WhatsApp configurado exitosamente');

    } catch (error) {
        console.error('❌ Error configurando WhatsApp personalizado:', error);
    }
}

/**
 * 🏷️ Agregar badge de distribuidor
 * @param {Object} distribuidor - Datos del distribuidor
 */
function agregarBadgeDistribuidor(distribuidor) {
    try {
        console.log('🏷️ Agregando badge de distribuidor...');

        const header = document.querySelector('header');
        if (header) {
            // Verificar si ya existe un badge
            const badgeExistente = header.querySelector('.distributor-badge');
            if (badgeExistente) {
                badgeExistente.remove();
            }

            // Crear badge de distribuidor
            const badge = document.createElement('div');
            badge.className = 'distributor-badge';
            badge.innerHTML = `
                <div style="
                    background: linear-gradient(135deg, #25D366, #128C7E);
                    color: white;
                    padding: 12px 20px;
                    border-radius: 25px;
                    font-size: 15px;
                    font-weight: 600;
                    margin: 15px auto;
                    display: inline-block;
                    box-shadow: 0 4px 12px rgba(37, 211, 102, 0.3);
                    text-align: center;
                    animation: fadeInScale 0.6s ease-out;
                ">
                    📱 Catálogo personalizado de ${distribuidor.nombre_apellido}
                </div>
            `;

            // Agregar estilos de animación si no existen
            if (!document.querySelector('#badge-styles')) {
                const styles = document.createElement('style');
                styles.id = 'badge-styles';
                styles.innerHTML = `
                    @keyframes fadeInScale {
                        0% { opacity: 0; transform: scale(0.8); }
                        100% { opacity: 1; transform: scale(1); }
                    }
                `;
                document.head.appendChild(styles);
            }

            header.appendChild(badge);
            console.log('🏷️ Badge agregado exitosamente');
        }
    } catch (error) {
        console.error('❌ Error agregando badge:', error);
    }
}

/**
 * 🔄 Configurar fallback si no hay distribuidor específico
 */
function configurarFallback() {
    try {
        console.log('🔄 CONFIGURANDO FALLBACK (DISTRIBUIDOR POR DEFECTO)');

        // WhatsApp por defecto
        const whatsappButton = document.getElementById('whatsapp-fab');
        if (whatsappButton) {
            const numeroDefecto = '+573118870682';
            const mensajeDefecto = 'Hola, vi el catálogo de productos Gano Excel y me interesan. ¿Me podrías dar más información sobre precios y disponibilidad?';
            const whatsappUrl = `https://api.whatsapp.com/send?phone=${numeroDefecto}&text=${encodeURIComponent(mensajeDefecto)}`;

            whatsappButton.href = whatsappUrl;
            whatsappButton.style.display = 'flex';
            whatsappButton.title = 'Contactar por WhatsApp';

            // Configurar para el carrito también
            document.body.setAttribute('data-distributor-whatsapp', numeroDefecto);
        }

        // Enlace de afiliación por defecto
        const afiliacionLink = document.getElementById('afiliacion-link');
        if (afiliacionLink) {
            afiliacionLink.href = 'https://ganoexcel.com/gano-excel-colombia/';
            afiliacionLink.title = 'Conoce la oportunidad de negocio Gano Excel';
            afiliacionLink.target = '_blank';
        }

        // Mantener título original
        document.title = 'Catálogo de Bienestar - Gano Excel';

        console.log('🔄 Fallback configurado exitosamente');

    } catch (error) {
        console.error('❌ Error configurando fallback:', error);
    }
}

/**
 * 🚀 Función principal: Inicializar sistema de distribuidores
 */
async function inicializarDistribuidor() {
    try {
        console.log('🚀 ==========================================');
        console.log('🚀 SISTEMA DE DISTRIBUIDORES - VERSIÓN CON AFILIACIÓN');
        console.log('🚀 ==========================================');
        console.log('🚀 URL actual:', window.location.href);

        // Leer parámetros de URL
        const urlParams = new URLSearchParams(window.location.search);
        const distribuidorSlug = urlParams.get('distribuidor');
        const socioId = urlParams.get('socio'); // Fallback para compatibilidad

        console.log('📋 PARÁMETROS DETECTADOS:');
        console.log('📋   distribuidor:', distribuidorSlug);
        console.log('📋   socio:', socioId);

        if (distribuidorSlug) {
            console.log('🔍 Procediendo con búsqueda de distribuidor...');

            // Buscar distribuidor específico por slug
            const distribuidor = await buscarDistribuidor(distribuidorSlug);

            if (distribuidor) {
                console.log('✅ DISTRIBUIDOR ENCONTRADO - Iniciando personalización...');
                personalizarCatalogo(distribuidor);

                setTimeout(() => {
                    console.log('🎉 CATÁLOGO PERSONALIZADO EXITOSAMENTE');
                    console.log('🎉 Distribuidor:', distribuidor.nombre);
                    console.log('🎉 Enlace afiliación:', distribuidor.affiliateLink || 'Por defecto');
                }, 1000);

            } else {
                console.warn('⚠️ DISTRIBUIDOR NO ENCONTRADO');
                console.log('🔄 Aplicando configuración por defecto...');
                configurarFallback();
            }

        } else if (socioId) {
            console.log('📝 Parámetro "socio" detectado (modo compatibilidad)');
            configurarFallback();

        } else {
            console.log('📝 Sin parámetros de distribuidor específico');
            configurarFallback();
        }

    } catch (error) {
        console.error('❌ ERROR CRÍTICO inicializando distribuidor:', error);
        console.log('🔄 Aplicando fallback por error...');
        configurarFallback();
    }
}

/**
 * 🧪 Función de testing para verificar slugs
 */
function testearSlugGeneration() {
    console.log('🧪 TESTING GENERACIÓN DE SLUGS');

    const casos = [
        'Ganocafé Online',
        'Luis Cabrejo Parra',
        'María González',
        'José Antonio Rodríguez',
        'Ana Sofía López',
        'Café Gano'
    ];

    casos.forEach(nombre => {
        const slug = generarSlugDesdNombre(nombre);
        console.log(`🧪 "${nombre}" → "${slug}"`);
    });
}

/**
 * 🎬 Ejecutar cuando el DOM y Supabase estén listos
 */
document.addEventListener('DOMContentLoaded', () => {
    console.log('🎬 DOM CARGADO - VERIFICANDO DEPENDENCIAS');

    // Verificar que Supabase esté disponible
    if (typeof window.supabase === 'undefined') {
        console.error('❌ Supabase no está disponible');
        console.log('🔄 Aplicando fallback por falta de Supabase...');
        setTimeout(configurarFallback, 1000);
        return;
    }

    console.log('✅ Supabase disponible');
    console.log('✅ Iniciando sistema en 500ms...');

    // Ejecutar testing en modo desarrollo
    if (window.location.hostname === 'localhost' || window.location.search.includes('debug=true')) {
        testearSlugGeneration();
    }

    // Ejecutar inicialización
    setTimeout(() => {
        inicializarDistribuidor();
    }, 500);
});

// Exponer funciones para debugging
if (window.location.hostname === 'localhost' || window.location.search.includes('debug=true')) {
    window.debugDistribuidor = {
        generarSlug: generarSlugDesdNombre,
        buscarDistribuidor: buscarDistribuidor,
        testearSlugs: testearSlugGeneration,
        reinicializar: inicializarDistribuidor
    };
    console.log('🔧 Funciones de debug disponibles en window.debugDistribuidor');
}

// Mensaje de confirmación de carga
console.log('🎯 ==========================================');
console.log('✅ SISTEMA DE DISTRIBUIDORES CARGADO (V3.0)');
console.log('🔗 + Enlace de Afiliación Configurado');
console.log('🛒 + Carrito Lateral Deslizante');
console.log('🎯 ==========================================');
