/**
 * 🎯 SISTEMA DE DISTRIBUIDORES PARA CATÁLOGO - VERSIÓN CORREGIDA
 * Este archivo personaliza el catálogo según el distribuidor que lo comparte
 * Consulta directamente Supabase para obtener datos actualizados del portal
 */

// 🔧 Configuración de Supabase (CORREGIDA - usar las credenciales reales del sistema)
const SUPABASE_URL = 'https://ovsvocjvjnqfaaugwnxg.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im92c3ZvY2p2am5xZmFhdWd3bnhnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE3ODEyMzcsImV4cCI6MjA2NzM1NzIzN30.ZErzsooaSXnS-NdmMYD0JcZFupFgrXfMLH-nOvU1NTE';

// Inicializar cliente Supabase
const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

/**
 * 🎯 Generar slug desde nombre completo (CORREGIDO - identico al portal)
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
        
        // Convertir a slug amigable (proceso mejorado y más robusto)
        const slug = nombreParaSlug
            .toLowerCase()
            .trim()
            // Reemplazar caracteres especiales manualmente para mayor control
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
 * 🔍 Buscar distribuidor por slug en Supabase (CORREGIDO Y OPTIMIZADO)
 * @param {string} slug - Slug del distribuidor (ej: "maria-gonzalez")
 * @returns {Object|null} Datos del distribuidor o null
 */
async function buscarDistribuidor(slug) {
    try {
        console.log('🔍 ==========================================');
        console.log('🔍 INICIANDO BÚSQUEDA DE DISTRIBUIDOR');
        console.log('🔍 Slug buscado:', slug);
        console.log('🔍 ==========================================');
        
        // Verificar que el slug no esté vacío
        if (!slug || slug.trim() === '') {
            console.warn('⚠️ Slug vacío o inválido');
            return null;
        }
        
        // Paso 1: Obtener todos los perfiles activos con logs detallados
        console.log('📡 Consultando base de datos Supabase...');
        
        const { data: perfiles, error } = await supabaseClient
            .from('profiles')
            .select('full_name, whatsapp, email')
            .not('full_name', 'is', null);
            
        if (error) {
            console.error('❌ ERROR EN CONSULTA SUPABASE:', error);
            console.error('❌ Detalles del error:', JSON.stringify(error, null, 2));
            return null;
        }
        
        console.log('📊 RESPUESTA DE SUPABASE:');
        console.log('📊 Perfiles encontrados:', perfiles?.length || 0);
        
        if (!perfiles || perfiles.length === 0) {
            console.warn('⚠️ No se encontraron perfiles en la base de datos');
            console.warn('⚠️ Verificar conexión a Supabase y tabla "profiles"');
            return null;
        }
        
        // Mostrar todos los perfiles para debugging
        console.log('📋 PERFILES EN BASE DE DATOS:');
        perfiles.forEach((perfil, index) => {
            console.log(`📋 ${index + 1}. ${perfil.full_name} (WhatsApp: ${perfil.whatsapp})`);
        });
        
        // Paso 2: Generar slugs y buscar coincidencia
        console.log('🔍 GENERANDO SLUGS Y BUSCANDO COINCIDENCIAS...');
        
        let distribuidorEncontrado = null;
        
        for (const [index, perfil] of perfiles.entries()) {
            const slugGenerado = generarSlugDesdNombre(perfil.full_name);
            
            console.log(`🔍 [${index + 1}/${perfiles.length}] Perfil: "${perfil.full_name}"`);
            console.log(`🔍 [${index + 1}/${perfiles.length}] Slug generado: "${slugGenerado}"`);
            console.log(`🔍 [${index + 1}/${perfiles.length}] Slug buscado: "${slug}"`);
            console.log(`🔍 [${index + 1}/${perfiles.length}] ¿Coincide? ${slugGenerado === slug ? '✅ SÍ' : '❌ NO'}`);
            console.log('---');
            
            if (slugGenerado && slugGenerado === slug) {
                distribuidorEncontrado = perfil;
                console.log('🎉 ==========================================');
                console.log('🎉 ¡DISTRIBUIDOR ENCONTRADO!');
                console.log('🎉 Nombre:', perfil.full_name);
                console.log('🎉 WhatsApp:', perfil.whatsapp);
                console.log('🎉 Email:', perfil.email);
                console.log('🎉 Slug:', slug);
                console.log('🎉 ==========================================');
                break;
            }
        }
        
        if (distribuidorEncontrado) {
            // Formatear número de WhatsApp con validación mejorada
            let whatsappFormateado = distribuidorEncontrado.whatsapp;
            
            if (whatsappFormateado) {
                // Limpiar el número (solo dígitos)
                const numeroLimpio = whatsappFormateado.replace(/[^\d]/g, '');
                
                // Si no tiene código de país, agregar +57
                if (numeroLimpio.length === 10 && !numeroLimpio.startsWith('57')) {
                    whatsappFormateado = '+57' + numeroLimpio;
                } else if (numeroLimpio.length === 12 && numeroLimpio.startsWith('57')) {
                    whatsappFormateado = '+' + numeroLimpio;
                } else if (!whatsappFormateado.startsWith('+')) {
                    whatsappFormateado = '+' + numeroLimpio;
                }
                
                console.log('📱 WhatsApp formateado:', whatsappFormateado);
            }
            
            // Extraer primer nombre y primer apellido
            const nombrePartes = distribuidorEncontrado.full_name.split(' ').filter(parte => parte.length > 0);
            const primerNombre = nombrePartes[0] || '';
            const primerApellido = nombrePartes[1] || '';
            const nombreCompleto = nombrePartes.length >= 2 ? `${primerNombre} ${primerApellido}` : primerNombre;
            
            return {
                nombre: distribuidorEncontrado.full_name,
                whatsapp: whatsappFormateado,
                email: distribuidorEncontrado.email,
                slug: slug,
                primer_nombre: primerNombre,
                primer_apellido: primerApellido,
                nombre_completo: nombreCompleto
            };
        }
        
        console.log('❌ ==========================================');
        console.log('❌ NO SE ENCONTRÓ DISTRIBUIDOR');
        console.log('❌ Slug buscado:', slug);
        console.log('❌ Slugs disponibles:');
        perfiles.forEach(perfil => {
            const slugDisponible = generarSlugDesdNombre(perfil.full_name);
            console.log(`❌   - "${slugDisponible}" (${perfil.full_name})`);
        });
        console.log('❌ ==========================================');
        
        return null;
        
    } catch (error) {
        console.error('❌ ERROR CRÍTICO en búsqueda de distribuidor:', error);
        console.error('❌ Stack trace:', error.stack);
        return null;
    }
}

/**
 * 🎨 Personalizar catálogo con datos del distribuidor (MEJORADO CON VERIFICACIONES)
 * @param {Object} distribuidor - Datos del distribuidor
 */
function personalizarCatalogo(distribuidor) {
    try {
        console.log('🎨 ==========================================');
        console.log('🎨 INICIANDO PERSONALIZACIÓN DEL CATÁLOGO');
        console.log('🎨 Distribuidor:', distribuidor.nombre);
        console.log('🎨 Primer nombre:', distribuidor.primer_nombre);
        console.log('🎨 ==========================================');
        
        // 1. Personalizar título de la página (SOLO PRIMER NOMBRE)
        const tituloAnterior = document.title;
        document.title = `Catálogo de ${distribuidor.primer_nombre} - Gano Excel`;
        console.log('📝 Título actualizado:', `"${tituloAnterior}" → "${document.title}"`);
        
        // 2. Personalizar header principal (CON NOMBRE + APELLIDO) ⭐
        const headerTitle = document.querySelector('header h1');
        if (headerTitle) {
            const textoAnterior = headerTitle.textContent;
            headerTitle.textContent = `Catálogo de Bienestar de ${distribuidor.nombre_completo}`;
            console.log('📝 Header h1 actualizado:', `"${textoAnterior}" → "${headerTitle.textContent}"`);
        } else {
            console.warn('⚠️ No se encontró header h1');
        }
        
        // 3. Personalizar subtítulo del header (SOLO PRIMER NOMBRE)
        const headerSubtitle = document.querySelector('header p');
        if (headerSubtitle) {
            const textoAnterior = headerSubtitle.textContent;
            headerSubtitle.textContent = `Descubre los productos Gano Excel recomendados por ${distribuidor.primer_nombre}`;
            console.log('📝 Header p actualizado:', `"${textoAnterior}" → "${headerSubtitle.textContent}"`);
        } else {
            console.warn('⚠️ No se encontró header p');
        }
        
        // 4. Personalizar mensaje de bienvenida
        const welcomeSection = document.querySelector('.welcome-section');
        if (welcomeSection) {
            const welcomeTitle = welcomeSection.querySelector('h2');
            const welcomeText = welcomeSection.querySelector('p');
            
            if (welcomeTitle) {
                const textoAnterior = welcomeTitle.textContent;
                welcomeTitle.textContent = `Bienvenido al catálogo de ${distribuidor.primer_nombre}`;
                console.log('📝 Welcome h2 actualizado:', `"${textoAnterior}" → "${welcomeTitle.textContent}"`);
            }
            
            if (welcomeText) {
                const textoAnterior = welcomeText.innerHTML;
                welcomeText.innerHTML = `
                    <strong>${distribuidor.primer_nombre}</strong> te invita a explorar estos productos diseñados para nutrir tu cuerpo y mejorar tu día a día. 
                    Cada uno combina lo mejor de la naturaleza con innovación científica. 
                    <br><br>
                    <strong>💬 Para más información, precios o realizar un pedido, contacta directamente a ${distribuidor.primer_nombre} usando el botón de WhatsApp.</strong>
                `;
                console.log('📝 Welcome p actualizado');
            }
        } else {
            console.warn('⚠️ No se encontró .welcome-section');
        }
        
        // 5. Configurar botón de WhatsApp personalizado
        configurarWhatsAppPersonalizado(distribuidor);
        
        // 6. Agregar badge de distribuidor
        agregarBadgeDistribuidor(distribuidor);
        
        console.log('🎨 ==========================================');
        console.log('✅ PERSONALIZACIÓN COMPLETADA EXITOSAMENTE');
        console.log('🎨 ==========================================');
        
    } catch (error) {
        console.error('❌ Error personalizando catálogo:', error);
        console.error('❌ Stack trace:', error.stack);
    }
}

/**
 * 📱 Configurar botón de WhatsApp personalizado del distribuidor (MEJORADO)
 * @param {Object} distribuidor - Datos del distribuidor
 */
function configurarWhatsAppPersonalizado(distribuidor) {
    try {
        console.log('📱 Configurando WhatsApp personalizado...');
        
        const whatsappButton = document.getElementById('whatsapp-button');
        
        if (!whatsappButton) {
            console.error('❌ No se encontró el botón de WhatsApp con id "whatsapp-button"');
            return;
        }
        
        if (!distribuidor.whatsapp) {
            console.warn('⚠️ Distribuidor no tiene número de WhatsApp');
            return;
        }
        
        // Mensaje personalizado con el nombre del distribuidor
        const mensaje = `Hola ${distribuidor.primer_nombre}, vi tu catálogo de productos Gano Excel y me interesan. ¿Me podrías dar más información sobre precios y disponibilidad?`;
        
        // URL de WhatsApp con número del distribuidor
        const whatsappUrl = `https://api.whatsapp.com/send?phone=${distribuidor.whatsapp}&text=${encodeURIComponent(mensaje)}`;
        
        whatsappButton.href = whatsappUrl;
        whatsappButton.style.display = 'flex';
        whatsappButton.title = `Contactar a ${distribuidor.primer_nombre} por WhatsApp`;
        
        console.log('📱 WhatsApp configurado exitosamente:');
        console.log('📱   Nombre:', distribuidor.primer_nombre);
        console.log('📱   Número:', distribuidor.whatsapp);
        console.log('📱   URL:', whatsappUrl);
        
    } catch (error) {
        console.error('❌ Error configurando WhatsApp personalizado:', error);
    }
}

/**
 * 🏷️ Agregar badge de distribuidor para mayor confianza (MEJORADO)
 * @param {Object} distribuidor - Datos del distribuidor
 */
function agregarBadgeDistribuidor(distribuidor) {
    try {
        console.log('🏷️ Agregando badge de distribuidor...');
        
        const header = document.querySelector('header');
        if (header) {
            // Verificar si ya existe un badge para evitar duplicados
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
                    📱 Catálogo personalizado de ${distribuidor.primer_nombre}
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
        } else {
            console.warn('⚠️ No se encontró elemento header para agregar badge');
        }
    } catch (error) {
        console.error('❌ Error agregando badge:', error);
    }
}

/**
 * 🔄 Configurar fallback si no hay distribuidor específico (MEJORADO)
 */
function configurarFallback() {
    try {
        console.log('🔄 ==========================================');
        console.log('🔄 CONFIGURANDO FALLBACK (DISTRIBUIDOR POR DEFECTO)');
        console.log('🔄 ==========================================');
        
        const whatsappButton = document.getElementById('whatsapp-button');
        
        if (whatsappButton) {
            // Número por defecto de Ganocafé Online
            const numeroDefecto = '+573118870682';
            const mensajeDefecto = 'Hola, vi el catálogo de productos Gano Excel y me interesan. ¿Me podrías dar más información sobre precios y disponibilidad?';
            const whatsappUrl = `https://api.whatsapp.com/send?phone=${numeroDefecto}&text=${encodeURIComponent(mensajeDefecto)}`;
            
            whatsappButton.href = whatsappUrl;
            whatsappButton.style.display = 'flex';
            whatsappButton.title = 'Contactar por WhatsApp';
            
            console.log('📱 WhatsApp configurado con número por defecto:', numeroDefecto);
        } else {
            console.warn('⚠️ No se encontró botón de WhatsApp para fallback');
        }
        
        // Mantener título original
        document.title = 'Catálogo de Bienestar - Gano Excel';
        console.log('📝 Título mantenido por defecto');
        
        console.log('🔄 Fallback configurado exitosamente');
        
    } catch (error) {
        console.error('❌ Error configurando fallback:', error);
    }
}

/**
 * 🚀 Función principal: Inicializar sistema de distribuidores (MEJORADA)
 */
async function inicializarDistribuidor() {
    try {
        console.log('🚀 ==========================================');
        console.log('🚀 SISTEMA DE DISTRIBUIDORES - VERSIÓN CORREGIDA');
        console.log('🚀 ==========================================');
        console.log('🚀 URL actual:', window.location.href);
        console.log('🚀 Timestamp:', new Date().toISOString());
        
        // Leer parámetros de URL
        const urlParams = new URLSearchParams(window.location.search);
        const distribuidorSlug = urlParams.get('distribuidor');
        const socioId = urlParams.get('socio'); // Fallback para compatibilidad
        
        console.log('📋 PARÁMETROS DETECTADOS:');
        console.log('📋   distribuidor:', distribuidorSlug);
        console.log('📋   socio:', socioId);
        console.log('📋   search string:', window.location.search);
        
        if (distribuidorSlug) {
            console.log('🔍 Procediendo con búsqueda de distribuidor...');
            
            // Buscar distribuidor específico por slug
            const distribuidor = await buscarDistribuidor(distribuidorSlug);
            
            if (distribuidor) {
                console.log('✅ DISTRIBUIDOR ENCONTRADO - Iniciando personalización...');
                personalizarCatalogo(distribuidor);
                
                // Confirmación visual después de un momento
                setTimeout(() => {
                    console.log('🎉 ==========================================');
                    console.log('🎉 CATÁLOGO PERSONALIZADO EXITOSAMENTE');
                    console.log('🎉 Distribuidor:', distribuidor.nombre);
                    console.log('🎉 ==========================================');
                }, 1000);
                
            } else {
                console.warn('⚠️ DISTRIBUIDOR NO ENCONTRADO');
                console.warn('⚠️ Slug buscado:', distribuidorSlug);
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
        console.error('❌ Stack trace:', error.stack);
        console.log('🔄 Aplicando fallback por error...');
        configurarFallback();
    }
}

/**
 * 🧪 Función de testing para verificar slugs
 */
function testearSlugGeneration() {
    console.log('🧪 ==========================================');
    console.log('🧪 TESTING GENERACIÓN DE SLUGS');
    console.log('🧪 ==========================================');
    
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
    
    console.log('🧪 ==========================================');
}

/**
 * 🎬 Ejecutar cuando el DOM y Supabase estén listos
 */
document.addEventListener('DOMContentLoaded', () => {
    console.log('🎬 ==========================================');
    console.log('🎬 DOM CARGADO - VERIFICANDO DEPENDENCIAS');
    console.log('🎬 ==========================================');
    
    // Verificar que Supabase esté disponible
    if (typeof window.supabase === 'undefined') {
        console.error('❌ Supabase no está disponible en el catálogo');
        console.error('❌ Verificar que el script de Supabase esté cargado antes que este archivo');
        console.log('🔄 Aplicando fallback por falta de Supabase...');
        setTimeout(configurarFallback, 1000);
        return;
    }
    
    console.log('✅ Supabase disponible');
    console.log('✅ Iniciando sistema en 500ms...');
    
    // Ejecutar testing en modo desarrollo (opcional)
    if (window.location.hostname === 'localhost' || window.location.search.includes('debug=true')) {
        testearSlugGeneration();
    }
    
    // Pequeño delay para asegurar que todo esté cargado
    setTimeout(() => {
        inicializarDistribuidor();
    }, 500);
});

// Exponer funciones para debugging en consola (modo desarrollo)
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
console.log('✅ SISTEMA DE DISTRIBUIDORES CARGADO (V2.0)');
console.log('🎯 ==========================================');
