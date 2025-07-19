/**
 * 🔗 Personalizar enlace de oportunidad empresarial con datos del distribuidor
 * @param {Object} distribuidor - Datos del distribuidor
 */
function personalizarEnlaceOportunidad(distribuidor) {
    try {
        const oportunidadLink = document.querySelector('.oportunidad-link');
        if (oportunidadLink) {
            const urlOportunidad = `https://oportunidad.4millones.com/?distribuidor=${distribuidor.slug}`;
            oportunidadLink.href = urlOportunidad;
            oportunidadLink.title = `Ver oportunidad empresarial - Referido por ${distribuidor.primer_nombre}`;
        }
    } catch (error) {
        console.error('❌ Error personalizando enlace de oportunidad:', error);
    }
}

/**
 * 🔗 Personalizar enlace de afiliación de Gano Excel con datos del distribuidor
 * @param {Object} distribuidor - Datos del distribuidor
 */
function personalizarEnlaceAfiliacion(distribuidor) {
    try {
        const affiliateLinkButton = document.getElementById('affiliate-menu-link');
        if (affiliateLinkButton) {
            if (distribuidor.affiliate_link && distribuidor.affiliate_link.startsWith('http')) {
                affiliateLinkButton.href = distribuidor.affiliate_link;
                affiliateLinkButton.style.display = 'inline-flex';
            }
        }
    } catch (error) {
        console.error('❌ Error personalizando el enlace de afiliación:', error);
    }
}

/**
 * 🎯 SISTEMA DE DISTRIBUIDORES PARA CATÁLOGO
 */
const SUPABASE_URL = 'https://ovsvocjvjnqfaaugwnxg.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im92c3ZvY2p2am5xZmFhdWd3bnhnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE3ODEyMzcsImV4cCI6MjA2NzM1NzIzN30.ZErzsooaSXnS-NdmMYD0JcZFupFgrXfMLH-nOvU1NTE';
const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

/**
 * 🎯 Generar slug desde nombre completo
 * @param {string} fullName - Nombre completo del usuario
 * @returns {string} Slug amigable
 */
function generarSlugDesdNombre(fullName) {
    if (!fullName) return null;
    try {
        const parts = fullName.trim().split(' ').filter(part => part.length > 0);
        let nombreParaSlug = (parts.length >= 2) ? `${parts[0]} ${parts[1]}` : (parts[0] || '');

        const slug = nombreParaSlug
            .toLowerCase()
            .trim()
            .replace(/[áàä]/g, 'a').replace(/[éèë]/g, 'e').replace(/[íìï]/g, 'i').replace(/[óòö]/g, 'o').replace(/[úùü]/g, 'u')
            .replace(/ñ/g, 'n').replace(/ç/g, 'c')
            .replace(/[^a-z0-9\s]/g, '')
            .replace(/\s+/g, ' ').replace(/\s/g, '-')
            .replace(/-+/g, '-').replace(/^-+|-+$/g, '');
        return slug;
    } catch (error) {
        console.error('❌ Error generando slug:', error);
        return null;
    }
}

/**
 * 🔍 Buscar distribuidor por slug en Supabase (Versión Estable - No Optimizada)
 * @param {string} slug - Slug del distribuidor
 * @returns {Object|null} Datos del distribuidor o null
 */
async function buscarDistribuidor(slug) {
    try {
        if (!slug || slug.trim() === '') {
            console.warn('⚠️ Slug vacío o inválido');
            return null;
        }

        console.log('📡 Consultando base de datos Supabase (método estable)...');
        const { data: perfiles, error } = await supabaseClient
            .from('profiles')
            .select('full_name, whatsapp, email, affiliate_link')
            .not('full_name', 'is', null);

        if (error) {
            console.error('❌ ERROR EN CONSULTA SUPABASE:', error);
            return null;
        }

        if (!perfiles || perfiles.length === 0) {
            console.warn('⚠️ No se encontraron perfiles en la base de datos');
            return null;
        }

        let distribuidorEncontrado = null;
        for (const perfil of perfiles) {
            const slugGenerado = generarSlugDesdNombre(perfil.full_name);
            if (slugGenerado && slugGenerado === slug) {
                distribuidorEncontrado = perfil;
                break;
            }
        }

        if (distribuidorEncontrado) {
            let whatsappFormateado = distribuidorEncontrado.whatsapp;
            if (whatsappFormateado) {
                const numeroLimpio = whatsappFormateado.replace(/[^\d]/g, '');
                if (numeroLimpio.length === 10 && !numeroLimpio.startsWith('57')) {
                    whatsappFormateado = '+57' + numeroLimpio;
                } else if (!whatsappFormateado.startsWith('+')) {
                    whatsappFormateado = '+' + numeroLimpio;
                }
            }
            const nombreParts = distribuidorEncontrado.full_name.trim().split(' ').filter(part => part.length > 0);
            const primerNombre = nombreParts[0] || '';
            const primerApellido = nombreParts[1] || '';
            const nombreApellido = primerApellido ? `${primerNombre} ${primerApellido}` : primerNombre;

            return {
                nombre: distribuidorEncontrado.full_name,
                whatsapp: whatsappFormateado,
                email: distribuidorEncontrado.email,
                affiliate_link: distribuidorEncontrado.affiliate_link,
                slug: slug,
                primer_nombre: primerNombre,
                nombre_apellido: nombreApellido
            };
        }

        console.log('❌ No se encontró el distribuidor con el slug:', slug);
        return null;

    } catch (error) {
        console.error('❌ ERROR CRÍTICO en búsqueda de distribuidor:', error);
        return null;
    }
}

/**
 * 🎨 Personalizar catálogo con datos del distribuidor
 * @param {Object} distribuidor - Datos del distribuidor
 */
function personalizarCatalogo(distribuidor) {
    window.distributorProfile = distribuidor;
    try {
        console.log('🎨 INICIANDO PERSONALIZACIÓN DEL CATÁLOGO PARA:', distribuidor.nombre);
        document.title = `Catálogo de ${distribuidor.primer_nombre} - Gano Excel`;

        const headerTitle = document.querySelector('header h1');
        if (headerTitle) headerTitle.textContent = `Catálogo de Bienestar de ${distribuidor.primer_nombre}`;

        const headerSubtitle = document.querySelector('header p');
        if (headerSubtitle) headerSubtitle.textContent = `Transforma tu bienestar con productos que nutren cuerpo, mente y espíritu`;

        configurarWhatsAppPersonalizado(distribuidor);
        agregarBadgeDistribuidor(distribuidor);
        personalizarEnlaceOportunidad(distribuidor);
        personalizarEnlaceAfiliacion(distribuidor);

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
        const whatsappButton = document.getElementById('whatsapp-button');
        if (!whatsappButton || !distribuidor.whatsapp) return;

        const mensaje = `Hola ${distribuidor.primer_nombre}, vi tu catálogo de productos Gano Excel y me interesan. ¿Me podrías dar más información?`;
        const whatsappUrl = `https://api.whatsapp.com/send?phone=${distribuidor.whatsapp}&text=${encodeURIComponent(mensaje)}`;
        whatsappButton.href = whatsappUrl;
        whatsappButton.style.display = 'flex';
        whatsappButton.title = `Contactar a ${distribuidor.primer_nombre} por WhatsApp`;
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
            const badgeExistente = header.querySelector('.distributor-badge');
            if (badgeExistente) badgeExistente.remove();

            const badge = document.createElement('div');
            badge.className = 'distributor-badge';
            badge.innerHTML = `<div style="background: linear-gradient(135deg, #25D366, #128C7E); color: white; padding: 12px 20px; border-radius: 25px; font-size: 15px; font-weight: 600; margin: 15px auto; display: inline-block; box-shadow: 0 4px 12px rgba(37, 211, 102, 0.3); text-align: center; animation: fadeInScale 0.6s ease-out;">📱 Catálogo personalizado de ${distribuidor.nombre_apellido}</div>`;

            if (!document.querySelector('#badge-styles')) {
                const styles = document.createElement('style');
                styles.id = 'badge-styles';
                styles.innerHTML = `@keyframes fadeInScale { 0% { opacity: 0; transform: scale(0.8); } 100% { opacity: 1; transform: scale(1); } }`;
                document.head.appendChild(styles);
            }
            header.appendChild(badge);
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
        const whatsappButton = document.getElementById('whatsapp-button');
        if (whatsappButton) {
            const numeroDefecto = '+573118870682';
            const mensajeDefecto = 'Hola, vi el catálogo de productos Gano Excel y me interesan. ¿Me podrías dar más información?';
            const whatsappUrl = `https://api.whatsapp.com/send?phone=${numeroDefecto}&text=${encodeURIComponent(mensajeDefecto)}`;
            whatsappButton.href = whatsappUrl;
            whatsappButton.style.display = 'flex';
            whatsappButton.title = 'Contactar por WhatsApp';
        }
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
        console.log('🚀 INICIANDO SISTEMA DE DISTRIBUIDORES 🚀');
        const urlParams = new URLSearchParams(window.location.search);
        const distribuidorSlug = urlParams.get('distribuidor');

        if (distribuidorSlug) {
            const distribuidor = await buscarDistribuidor(distribuidorSlug);
            if (distribuidor) {
                personalizarCatalogo(distribuidor);
            } else {
                configurarFallback();
            }
        } else {
            configurarFallback();
        }
    } catch (error) {
        console.error('❌ ERROR CRÍTICO inicializando distribuidor:', error);
        configurarFallback();
    }
}

/**
 * 🎬 Ejecutar cuando el DOM y Supabase estén listos
 */
document.addEventListener('DOMContentLoaded', () => {
    if (typeof window.supabase === 'undefined') {
        console.error('❌ Supabase no está disponible. Aplicando fallback.');
        setTimeout(configurarFallback, 500);
        return;
    }
    setTimeout(inicializarDistribuidor, 500);
});

console.log('✅ SISTEMA DE DISTRIBUIDORES CARGADO (VERSIÓN ESTABLE)');
