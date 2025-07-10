/**
 * 🎯 SISTEMA DE DISTRIBUIDORES PARA CATÁLOGO - VERSIÓN MEJORADA
 * Este archivo personaliza el catálogo según el distribuidor que lo comparte
 * Consulta directamente Supabase para obtener datos actualizados del portal
 */

// 🔧 Configuración de Supabase (usar las mismas credenciales del portal)
const SUPABASE_URL = 'https://ovsvocjvjnqfaaugwnxg.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im92c3ZvY2p2am5xZmFhdWd3bnhnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE3ODEyMzcsImV4cCI6MjA2NzM1NzIzN30.ZErzsooaSXnS-NdmMYD0JcZFupFgrXfMLH-nOvU1NTE';

// Inicializar cliente Supabase
const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

/**
 * 🎯 Generar slug desde nombre completo (igual que en portal)
 * @param {string} fullName - Nombre completo del usuario
 * @returns {string} Slug amigable
 */
function generarSlugDesdNombre(fullName) {
    if (!fullName) return null;
    
    try {
        // Extraer primer nombre + primer apellido
        const parts = fullName.trim().split(' ');
        const nombreApellido = parts.length >= 2 ? `${parts[0]} ${parts[1]}` : parts[0];
        
        // Convertir a slug amigable (misma lógica que el portal)
        const slug = nombreApellido
            .toLowerCase()
            .normalize('NFD') // Descomponer caracteres acentuados
            .replace(/[\u0300-\u036f]/g, '') // Remover diacríticos
            .replace(/[^a-z0-9\s]/g, '') // Solo letras, números y espacios
            .replace(/\s+/g, '-') // Espacios a guiones
            .replace(/-+/g, '-') // Múltiples guiones a uno
            .replace(/^-|-$/g, ''); // Remover guiones al inicio/final
            
        return slug;
    } catch (error) {
        console.error('❌ Error generando slug:', error);
        return null;
    }
}

/**
 * 🔍 Buscar distribuidor por slug en Supabase (MEJORADO Y OPTIMIZADO)
 * @param {string} slug - Slug del distribuidor (ej: "maria-gonzalez")
 * @returns {Object|null} Datos del distribuidor o null
 */
async function buscarDistribuidor(slug) {
    try {
        console.log('🔍 Buscando distribuidor con slug:', slug);
        
        // Paso 1: Obtener todos los perfiles activos
        const { data: perfiles, error } = await supabaseClient
            .from('profiles')
            .select('full_name, whatsapp, email')
            .not('full_name', 'is', null);
            
        if (error) {
            console.error('❌ Error consultando Supabase:', error);
            return null;
        }
        
        if (!perfiles || perfiles.length === 0) {
            console.warn('⚠️ No se encontraron perfiles en la base de datos');
            return null;
        }
        
        console.log(`📋 Se encontraron ${perfiles.length} perfiles, buscando coincidencia...`);
        
        // Paso 2: Comparar slug de cada perfil con el slug buscado
        let distribuidorEncontrado = null;
        
        for (const perfil of perfiles) {
            const slugGenerado = generarSlugDesdNombre(perfil.full_name);
            
            console.log(`🔍 Comparando: "${slugGenerado}" vs "${slug}"`);
            
            if (slugGenerado === slug) {
                distribuidorEncontrado = perfil;
                console.log('✅ ¡DISTRIBUIDOR ENCONTRADO!', {
                    nombre: perfil.full_name,
                    slug_buscado: slug,
                    slug_generado: slugGenerado,
                    whatsapp: perfil.whatsapp
                });
                break;
            }
        }
        
        if (distribuidorEncontrado) {
            // Formatear número de WhatsApp
            let whatsappFormateado = distribuidorEncontrado.whatsapp;
            if (whatsappFormateado && !whatsappFormateado.startsWith('+')) {
                whatsappFormateado = '+57' + whatsappFormateado.replace(/[^\d]/g, '');
            }
            
            return {
                nombre: distribuidorEncontrado.full_name,
                whatsapp: whatsappFormateado,
                email: distribuidorEncontrado.email,
                slug: slug,
                primer_nombre: distribuidorEncontrado.full_name.split(' ')[0]
            };
        }
        
        console.warn('⚠️ No se encontró distribuidor para el slug:', slug);
        return null;
        
    } catch (error) {
        console.error('❌ Error en búsqueda de distribuidor:', error);
        return null;
    }
}

/**
 * 🎨 Personalizar catálogo con datos del distribuidor (MEJORADO)
 * @param {Object} distribuidor - Datos del distribuidor
 */
function personalizarCatalogo(distribuidor) {
    try {
        console.log('🎨 Personalizando catálogo para:', distribuidor.nombre);
        
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
            headerSubtitle.textContent = `Descubre los productos Gano Excel recomendados por ${distribuidor.primer_nombre}`;
        }
        
        // 4. Personalizar mensaje de bienvenida
        const welcomeSection = document.querySelector('.welcome-section');
        if (welcomeSection) {
            const welcomeTitle = welcomeSection.querySelector('h2');
            const welcomeText = welcomeSection.querySelector('p');
            
            if (welcomeTitle) {
                welcomeTitle.textContent = `Bienvenido al catálogo de ${distribuidor.primer_nombre}`;
            }
            
            if (welcomeText) {
                welcomeText.innerHTML = `
                    <strong>${distribuidor.primer_nombre}</strong> te invita a explorar estos productos diseñados para nutrir tu cuerpo y mejorar tu día a día. 
                    Cada uno combina lo mejor de la naturaleza con innovación científica. 
                    <br><br>
                    <strong>💬 Para más información, precios o realizar un pedido, contacta directamente a ${distribuidor.primer_nombre} usando el botón de WhatsApp.</strong>
                `;
            }
        }
        
        // 5. Configurar botón de WhatsApp personalizado
        configurarWhatsAppPersonalizado(distribuidor);
        
        // 6. Agregar badge de distribuidor
        agregarBadgeDistribuidor(distribuidor);
        
        console.log('✅ Catálogo personalizado exitosamente para:', distribuidor.nombre);
        
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
        const whatsappButton = document.getElementById('whatsapp-button');
        
        if (whatsappButton && distribuidor.whatsapp) {
            // Mensaje personalizado con el nombre del distribuidor
            const mensaje = `Hola ${distribuidor.primer_nombre}, vi tu catálogo de productos Gano Excel y me interesan. ¿Me podrías dar más información sobre precios y disponibilidad?`;
            
            // URL de WhatsApp con número del distribuidor
            const whatsappUrl = `https://api.whatsapp.com/send?phone=${distribuidor.whatsapp}&text=${encodeURIComponent(mensaje)}`;
            
            whatsappButton.href = whatsappUrl;
            whatsappButton.style.display = 'flex';
            whatsappButton.title = `Contactar a ${distribuidor.primer_nombre} por WhatsApp`;
            
            console.log('📱 WhatsApp configurado para:', {
                nombre: distribuidor.primer_nombre,
                whatsapp: distribuidor.whatsapp,
                mensaje_preview: mensaje.substring(0, 50) + '...'
            });
        } else {
            console.warn('⚠️ No se pudo configurar WhatsApp:', {
                button_exists: !!whatsappButton,
                has_whatsapp: !!distribuidor.whatsapp
            });
        }
        
    } catch (error) {
        console.error('❌ Error configurando WhatsApp personalizado:', error);
    }
}

/**
 * 🏷️ Agregar badge de distribuidor para mayor confianza
 * @param {Object} distribuidor - Datos del distribuidor
 */
function agregarBadgeDistribuidor(distribuidor) {
    try {
        const header = document.querySelector('header');
        if (header) {
            // Crear badge de distribuidor
            const badge = document.createElement('div');
            badge.className = 'distributor-badge';
            badge.innerHTML = `
                <div style="
                    background: linear-gradient(135deg, #25D366, #128C7E);
                    color: white;
                    padding: 8px 16px;
                    border-radius: 20px;
                    font-size: 14px;
                    font-weight: 600;
                    margin: 10px auto;
                    display: inline-block;
                    box-shadow: 0 2px 8px rgba(37, 211, 102, 0.3);
                ">
                    📱 Catálogo compartido por ${distribuidor.primer_nombre}
                </div>
            `;
            
            header.appendChild(badge);
            console.log('🏷️ Badge de distribuidor agregado');
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
        console.log('🔄 Configurando fallback (distribuidor por defecto)');
        
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
        }
        
        // Mantener título original
        document.title = 'Catálogo de Bienestar - Gano Excel';
        
    } catch (error) {
        console.error('❌ Error configurando fallback:', error);
    }
}

/**
 * 🚀 Función principal: Inicializar sistema de distribuidores
 */
async function inicializarDistribuidor() {
    try {
        console.log('🚀 =================================');
        console.log('🎯 INICIALIZANDO SISTEMA DE DISTRIBUIDORES');
        console.log('🚀 =================================');
        
        // Leer parámetros de URL
        const urlParams = new URLSearchParams(window.location.search);
        const distribuidorSlug = urlParams.get('distribuidor');
        const socioId = urlParams.get('socio'); // Fallback para compatibilidad
        
        console.log('📋 Parámetros detectados:', {
            distribuidor: distribuidorSlug,
            socio: socioId,
            url_completa: window.location.href
        });
        
        if (distribuidorSlug) {
            console.log('🔍 Buscando distribuidor con slug:', distribuidorSlug);
            
            // Buscar distribuidor específico por slug
            const distribuidor = await buscarDistribuidor(distribuidorSlug);
            
            if (distribuidor) {
                console.log('✅ DISTRIBUIDOR ENCONTRADO - Personalizando catálogo...');
                personalizarCatalogo(distribuidor);
                
                // Mostrar confirmación visual en la página
                setTimeout(() => {
                    console.log('🎉 CATÁLOGO PERSONALIZADO EXITOSAMENTE');
                }, 1000);
                
            } else {
                console.warn('⚠️ Distribuidor no encontrado para slug:', distribuidorSlug);
                console.log('🔄 Aplicando configuración por defecto...');
                configurarFallback();
            }
            
        } else if (socioId) {
            console.log('📝 Parámetro socio detectado (compatibilidad), usando fallback');
            configurarFallback();
            
        } else {
            console.log('📝 Sin parámetros de distribuidor, usando configuración por defecto');
            configurarFallback();
        }
        
        console.log('🚀 =================================');
        console.log('✅ INICIALIZACIÓN COMPLETADA');
        console.log('🚀 =================================');
        
    } catch (error) {
        console.error('❌ Error crítico inicializando distribuidor:', error);
        console.log('🔄 Aplicando fallback por error...');
        configurarFallback();
    }
}

/**
 * 🎬 Ejecutar cuando el DOM y Supabase estén listos
 */
document.addEventListener('DOMContentLoaded', () => {
    console.log('🎬 DOM cargado, verificando dependencias...');
    
    // Verificar que Supabase esté disponible
    if (typeof window.supabase === 'undefined') {
        console.error('❌ Supabase no está disponible en el catálogo');
        console.log('🔄 Aplicando fallback por falta de Supabase...');
        setTimeout(configurarFallback, 1000);
        return;
    }
    
    console.log('✅ Supabase disponible, inicializando sistema...');
    
    // Pequeño delay para asegurar que todo esté cargado
    setTimeout(() => {
        inicializarDistribuidor();
    }, 500);
});

// Mensaje de confirmación de carga
console.log('🎯 ===================================');
console.log('✅ SISTEMA DE DISTRIBUIDORES CARGADO');
console.log('🎯 ===================================');
