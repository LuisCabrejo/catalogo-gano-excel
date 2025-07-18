/**
 * 🎯 SISTEMA DE DISTRIBUIDORES PARA CATÁLOGO - VERSIÓN 3.0
 * Ahora incluye manejo de enlace de afiliación personalizado
 */

// 🔧 Configuración de Supabase
const SUPABASE_URL = 'https://ovsvocjvjnqfaaugwnxg.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im92c3ZvY2p2am5xZmFhdWd3bnhnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE3ODEyMzcsImV4cCI6MjA2NzM1NzIzN30.ZErzsooaSXnS-NdmMYD0JcZFupFgrXfMLH-nOvU1NTE';

// Inicializar cliente Supabase
const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

/**
 * 🔧 Generar slug desde nombre completo
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
            .replace(/á/g, 'a').replace(/é/g, 'e').replace(/í/g, 'i').replace(/ó/g, 'o').replace(/ú/g, 'u')
            .replace(/à/g, 'a').replace(/è/g, 'e').replace(/ì/g, 'i').replace(/ò/g, 'o').replace(/ù/g, 'u')
            .replace(/ä/g, 'a').replace(/ë/g, 'e').replace(/ï/g, 'i').replace(/ö/g, 'o').replace(/ü/g, 'u')
            .replace(/ñ/g, 'n').replace(/ç/g, 'c')
            .replace(/[^a-z0-9\s]/g, '')
            .replace(/\s+/g, ' ')
            .replace(/\s/g, '-')
            .replace(/-+/g, '-')
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
 * @param {string} slug - Slug del distribuidor
 * @returns {Object|null} Datos del distribuidor o null
 */
async function buscarDistribuidor(slug) {
    try {
        console.log('🔍 ==========================================');
        console.log('🔍 BUSCANDO DISTRIBUIDOR');
        console.log('🔍 Slug:', slug);
        console.log('🔍 ==========================================');

        if (!slug || slug.trim() === '') {
            console.warn('⚠️ Slug vacío o inválido');
            return null;
        }

        // Consultar perfiles activos con nuevos campos
        console.log('📡 Consultando base de datos...');

        const { data: perfiles, error } = await supabaseClient
            .from('profiles')
            .select('full_name, whatsapp, email, affiliation_link')
            .not('full_name', 'is', null);

        if (error) {
            console.error('❌ ERROR EN CONSULTA:', error);
            return null;
        }

        console.log('📊 Perfiles encontrados:', perfiles?.length || 0);

        if (!perfiles || perfiles.length === 0) {
            console.warn('⚠️ No se encontraron perfiles');
            return null;
        }

        // Buscar coincidencia de slug
        let distribuidorEncontrado = null;

        for (const [index, perfil] of perfiles.entries()) {
            const slugGenerado = generarSlugDesdNombre(perfil.full_name);

            console.log(`🔍 [${index + 1}] ${perfil.full_name} → "${slugGenerado}"`);

            if (slugGenerado && slugGenerado === slug) {
                distribuidorEncontrado = perfil;
                console.log('🎉 ¡DISTRIBUIDOR ENCONTRADO!');
                break;
            }
        }

        if (distribuidorEncontrado) {
            // Formatear WhatsApp
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

            // Extraer nombres para personalización
            const nombreParts = distribuidorEncontrado.full_name.trim().split(' ').filter(part => part.length > 0);
            const primerNombre = nombreParts[0] || '';
            const primerApellido = nombreParts[1] || '';
            const nombreApellido = primerApellido ? `${primerNombre} ${primerApellido}` : primerNombre;

            return {
                nombre: distribuidorEncontrado.full_name,
                whatsapp: whatsappFormateado,
                email: distribuidorEncontrado.email,
                affiliation_link: distribuidorEncontrado.affiliation_link || null,
                slug: slug,
                primer_nombre: primerNombre,
                nombre_apellido: nombreApellido
            };
        }

        console.log('❌ NO SE ENCONTRÓ DISTRIBUIDOR');
        return null;

    } catch (error) {
        console.error('❌ ERROR CRÍTICO:', error);
        return null;
    }
}

/**
 * 🔗 Configurar enlace de afiliación personalizado
 * @param {Object} distribuidor - Datos del distribuidor
 */
function configurarEnlaceAfiliacion(distribuidor) {
    try {
        console.log('🔗 Configurando enlace de afiliación...');

        const affiliationLink = document.getElementById('affiliation-link');

        if (affiliationLink) {
            if (distribuidor.affiliation_link && distribuidor.affiliation_link.trim() !== '') {
                // El distribuidor tiene enlace de afiliación personalizado
                affiliationLink.href = distribuidor.affiliation_link;
                affiliationLink.title = `Únete al equipo de ${distribuidor.primer_nombre}`;
                affiliationLink.style.display = 'inline-block';

                console.log('🔗 Enlace de afiliación configurado:');
                console.log('🔗   URL:', distribuidor.affiliation_link);
                console.log('🔗   Distribuidor:', distribuidor.primer_nombre);
            } else {
                // Sin enlace personalizado, ocultar la opción
                affiliationLink.style.display = 'none';
                console.log('🔗 Sin enlace de afiliación, opción oculta');
            }
        } else {
            console.warn('⚠️ No se encontró elemento #affiliation-link');
        }

    } catch (error) {
        console.error('❌ Error configurando enlace de afiliación:', error);
    }
}

/**
 * 🔗 Personalizar enlace de oportunidad empresarial
 * @param {Object} distribuidor - Datos del distribuidor
 */
function personalizarEnlaceOportunidad(distribuidor) {
    try {
        console.log('🔗 Personalizando enlace de oportunidad...');

        const oportunidadLinks = document.querySelectorAll('a[href*="oportunidad.4millones.com"]');

        oportunidadLinks.forEach(link => {
            const urlOportunidad = `https://oportunidad.4millones.com/?distribuidor=${distribuidor.slug}`;
            link.href = urlOportunidad;
            link.title = `Ver oportunidad empresarial - Referido por ${distribuidor.primer_nombre}`;
        });

        console.log('🔗 Enlaces de oportunidad personalizados');

    } catch (error) {
        console.error('❌ Error personalizando enlace de oportunidad:', error);
    }
}

/**
 * 🎨 Personalizar catálogo con datos del distribuidor
 * @param {Object} distribuidor - Datos del distribuidor
 */
function personalizarCatalogo(distribuidor) {
    try {
        console.log('🎨 ==========================================');
        console.log('🎨 PERSONALIZANDO CATÁLOGO');
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

        // 5. Configurar enlace de afiliación
        configurarEnlaceAfiliacion(distribuidor);

        // 6. Personalizar enlace de oportunidad
        personalizarEnlaceOportunidad(distribuidor);

        // 7. Agregar badge de distribuidor
        agregarBadgeDistribuidor(distribuidor);

        // 8. Configurar datos en el body para JavaScript
        document.body.dataset.distributorWhatsapp = distribuidor.whatsapp || '';
        document.body.dataset.distributorAffiliation = distribuidor.affiliation_link || '';

        console.log('✅ PERSONALIZACIÓN COMPLETADA');

    } catch (error) {
        console.error('❌ Error personalizando catálogo:', error);
    }
}

/**
 * 📱 Configurar WhatsApp personalizado del distribuidor
 * @param {Object} distribuidor - Datos del distribuidor
 */
function configurarWhatsAppPersonalizado(distribuidor) {
    try {
        console.log('📱 Configurando WhatsApp...');

        const whatsappButton = document.getElementById('whatsapp-fab');

        if (!whatsappButton) {
            console.error('❌ No se encontró el botón de WhatsApp');
            return;
        }

        if (!distribuidor.whatsapp) {
            console.warn('⚠️ Distribuidor no tiene WhatsApp');
            return;
        }

        const mensaje = `Hola ${distribuidor.primer_nombre}, vi tu catálogo de productos Gano Excel y me interesan. ¿Me podrías dar más información?`;
        const whatsappUrl = `https://api.whatsapp.com/send?phone=${distribuidor.whatsapp}&text=${encodeURIComponent(mensaje)}`;

        whatsappButton.href = whatsappUrl;
        whatsappButton.style.display = 'flex';
        whatsappButton.title = `Contactar a ${distribuidor.primer_nombre} por WhatsApp`;

        console.log('📱 WhatsApp configurado exitosamente');

    } catch (error) {
        console.error('❌ Error configurando WhatsApp:', error);
    }
}

/**
 * 🏷️ Agregar badge de distribuidor
 * @param {Object} distribuidor - Datos del distribuidor
 */
function agregarBadgeDistribuidor(distribuidor) {
    try {
        console.log('🏷️ Agregando badge...');

        const header = document.querySelector('header');
        if (header) {
            // Verificar si ya existe
            const badgeExistente = header.querySelector('.distributor-badge');
            if (badgeExistente) {
                badgeExistente.remove();
            }

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
 * 🔄 Configurar fallback si no hay distribuidor
 */
function configurarFallback() {
    try {
        console.log('🔄 CONFIGURANDO FALLBACK');

        // WhatsApp por defecto
        const whatsappButton = document.getElementById('whatsapp-fab');
        if (whatsappButton) {
            const numeroDefecto = '+573118870682';
            const mensajeDefecto = 'Hola, vi el catálogo de productos Gano Excel y me interesan. ¿Me podrías dar más información?';
            const whatsappUrl = `https://api.whatsapp.com/send?phone=${numeroDefecto}&text=${encodeURIComponent(mensajeDefecto)}`;

            whatsappButton.href = whatsappUrl;
            whatsappButton.style.display = 'flex';

            document.body.dataset.distributorWhatsapp = numeroDefecto;
        }

        // Ocultar enlace de afiliación
        const affiliationLink = document.getElementById('affiliation-link');
        if (affiliationLink) {
            affiliationLink.style.display = 'none';
        }

        document.title = 'Catálogo de Bienestar - Gano Excel';
        console.log('🔄 Fallback configurado');

    } catch (error) {
        console.error('❌ Error configurando fallback:', error);
    }
}

/**
 * 🚀 Función principal de inicialización
 */
async function inicializarDistribuidor() {
    try {
        console.log('🚀 ==========================================');
        console.log('🚀 SISTEMA DE DISTRIBUIDORES V3.0');
        console.log('🚀 ==========================================');

        const urlParams = new URLSearchParams(window.location.search);
        const distribuidorSlug = urlParams.get('distribuidor');
        const socioId = urlParams.get('socio'); // Compatibilidad

        console.log('📋 Parámetros:', { distribuidorSlug, socioId });

        if (distribuidorSlug) {
            console.log('🔍 Buscando distribuidor...');

            const distribuidor = await buscarDistribuidor(distribuidorSlug);

            if (distribuidor) {
                console.log('✅ DISTRIBUIDOR ENCONTRADO');
                personalizarCatalogo(distribuidor);

                setTimeout(() => {
                    console.log('🎉 CATÁLOGO PERSONALIZADO EXITOSAMENTE');
                }, 1000);

            } else {
                console.warn('⚠️ DISTRIBUIDOR NO ENCONTRADO');
                configurarFallback();
            }

        } else {
            console.log('📝 Sin parámetros específicos');
            configurarFallback();
        }

    } catch (error) {
        console.error('❌ ERROR CRÍTICO:', error);
        configurarFallback();
    }
}

/**
 * 🎬 Ejecutar cuando el DOM esté listo
 */
document.addEventListener('DOMContentLoaded', () => {
    console.log('🎬 DOM CARGADO - VERIFICANDO SUPABASE');

    if (typeof window.supabase === 'undefined') {
        console.error('❌ Supabase no disponible');
        setTimeout(configurarFallback, 1000);
        return;
    }

    console.log('✅ Supabase disponible');
    console.log('✅ Iniciando sistema...');

    setTimeout(() => {
        inicializarDistribuidor();
    }, 500);
});

// Funciones de debug para desarrollo
if (window.location.hostname === 'localhost' || window.location.search.includes('debug=true')) {
    window.debugDistribuidor = {
        generarSlug: generarSlugDesdNombre,
        buscarDistribuidor: buscarDistribuidor,
        reinicializar: inicializarDistribuidor
    };
    console.log('🔧 Funciones de debug disponibles');
}

console.log('🎯 ==========================================');
console.log('✅ SISTEMA DE DISTRIBUIDORES CARGADO V3.0');
console.log('🔗 + Enlace de Afiliación Personalizado');
console.log('🎯 ==========================================');
