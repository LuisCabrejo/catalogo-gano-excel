/**
 * 🎯 SISTEMA DE DISTRIBUIDORES PARA CATÁLOGO
 * Este archivo personaliza el catálogo según el distribuidor que lo comparte
 * Consulta directamente Supabase para obtener datos actualizados
 */

// 🔧 Configuración de Supabase (usar las mismas credenciales del portal)
const SUPABASE_URL = 'https://ovsvocjvjnqfaaugwnxg.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im92c3ZvY2p2am5xZmFhdWd3bnhnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY4ODYzODksImV4cCI6MjA1MjQ2MjM4OX0.VGZreq-e-f7O1Rz5Eo8JSDMNFsIbGLT8lY3UKKbNv5w';

// Inicializar cliente Supabase
const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

/**
 * 🔍 Buscar distribuidor por slug en Supabase
 * @param {string} slug - Slug del distribuidor (ej: "luis-cabrejo")
 * @returns {Object|null} Datos del distribuidor o null
 */
async function buscarDistribuidor(slug) {
    try {
        console.log('🔍 Buscando distribuidor:', slug);
        
        // Convertir slug a formato de búsqueda
        const nombreBusqueda = slug.replace(/-/g, ' ');
        
        // Consultar Supabase
        const { data, error } = await supabaseClient
            .from('profiles')
            .select('full_name, whatsapp, email')
            .ilike('full_name', `%${nombreBusqueda}%`)
            .single();
            
        if (error) {
            console.error('❌ Error consultando Supabase:', error);
            return null;
        }
        
        if (data) {
            console.log('✅ Distribuidor encontrado:', data);
            return {
                nombre: data.full_name,
                whatsapp: data.whatsapp,
                email: data.email,
                slug: slug
            };
        }
        
        return null;
    } catch (error) {
        console.error('❌ Error en búsqueda de distribuidor:', error);
        return null;
    }
}

/**
 * 🎨 Personalizar catálogo con datos del distribuidor
 * @param {Object} distribuidor - Datos del distribuidor
 */
function personalizarCatalogo(distribuidor) {
    try {
        // Personalizar header principal
        const headerTitle = document.querySelector('header h1');
        if (headerTitle) {
            headerTitle.textContent = `Catálogo de ${distribuidor.nombre}`;
        }
        
        // Personalizar mensaje de bienvenida
        const welcomeSection = document.querySelector('.welcome-section p');
        if (welcomeSection) {
            const primerNombre = distribuidor.nombre.split(' ')[0];
            welcomeSection.innerHTML = `
                Aquí encontrarás productos diseñados para nutrir tu cuerpo y mejorar tu día a día. 
                Cada uno de nuestros productos combina lo mejor de la naturaleza con innovación científica. 
                <strong>Para más información o para realizar un pedido, contacta a ${primerNombre}.</strong>
            `;
        }
        
        // Configurar botón de WhatsApp
        configurarWhatsApp(distribuidor);
        
        // Mensaje en consola para debug
        console.log('🎯 Catálogo personalizado para:', distribuidor.nombre);
        
    } catch (error) {
        console.error('❌ Error personalizando catálogo:', error);
    }
}

/**
 * 📱 Configurar botón de WhatsApp del distribuidor
 * @param {Object} distribuidor - Datos del distribuidor
 */
function configurarWhatsApp(distribuidor) {
    try {
        const whatsappButton = document.getElementById('whatsapp-button');
        
        if (whatsappButton && distribuidor.whatsapp) {
            const primerNombre = distribuidor.nombre.split(' ')[0];
            const mensaje = `Hola ${primerNombre}, estoy interesado(a) en los productos Gano Excel. ¿Me podrías dar más información?`;
            const whatsappUrl = `https://api.whatsapp.com/send?phone=${distribuidor.whatsapp}&text=${encodeURIComponent(mensaje)}`;
            
            whatsappButton.href = whatsappUrl;
            whatsappButton.style.display = 'flex';
            
            console.log('📱 WhatsApp configurado para:', primerNombre, distribuidor.whatsapp);
        }
    } catch (error) {
        console.error('❌ Error configurando WhatsApp:', error);
    }
}

/**
 * 🔄 Configurar fallback si no hay distribuidor específico
 */
function configurarFallback() {
    try {
        const whatsappButton = document.getElementById('whatsapp-button');
        
        if (whatsappButton) {
            // Número por defecto (tu número actual)
            const numeroDefecto = '573203415438';
            const mensajeDefecto = 'Hola, estoy interesado(a) en los productos Gano Excel. ¿Me podrías dar más información?';
            const whatsappUrl = `https://api.whatsapp.com/send?phone=${numeroDefecto}&text=${encodeURIComponent(mensajeDefecto)}`;
            
            whatsappButton.href = whatsappUrl;
            whatsappButton.style.display = 'flex';
            
            console.log('📱 WhatsApp configurado con número por defecto');
        }
    } catch (error) {
        console.error('❌ Error configurando fallback:', error);
    }
}

/**
 * 🚀 Función principal: Inicializar sistema de distribuidores
 */
async function inicializarDistribuidor() {
    try {
        // Leer parámetro de URL
        const urlParams = new URLSearchParams(window.location.search);
        const distribuidorSlug = urlParams.get('distribuidor');
        
        console.log('🎯 Inicializando catálogo...');
        console.log('📋 Parámetro distribuidor:', distribuidorSlug);
        
        if (distribuidorSlug) {
            // Buscar distribuidor específico
            const distribuidor = await buscarDistribuidor(distribuidorSlug);
            
            if (distribuidor) {
                // Personalizar para el distribuidor encontrado
                personalizarCatalogo(distribuidor);
            } else {
                console.warn('⚠️ Distribuidor no encontrado, usando configuración por defecto');
                configurarFallback();
            }
        } else {
            console.log('📝 Sin parámetro distribuidor, usando configuración por defecto');
            configurarFallback();
        }
        
    } catch (error) {
        console.error('❌ Error inicializando distribuidor:', error);
        configurarFallback();
    }
}

/**
 * 🎬 Ejecutar cuando el DOM esté listo
 */
document.addEventListener('DOMContentLoaded', () => {
    // Verificar que Supabase esté disponible
    if (typeof window.supabase === 'undefined') {
        console.error('❌ Supabase no está disponible en el catálogo');
        configurarFallback();
        return;
    }
    
    // Inicializar sistema de distribuidores
    inicializarDistribuidor();
});

// Mensaje de debug para confirmar que el script se cargó
console.log('🎯 Sistema de distribuidores cargado correctamente');
