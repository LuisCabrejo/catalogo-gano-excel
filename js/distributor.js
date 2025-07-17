/**
 * 🎯 SISTEMA DE DISTRIBUIDORES PARA CATÁLOGO - VERSIÓN 5.0
 * Personaliza el catálogo y configura el número de WhatsApp para los pedidos.
 */
document.addEventListener('DOMContentLoaded', () => {
    // 🔧 Configuración de Supabase
    const SUPABASE_URL = 'https://ovsvocjvjnqfaaugwnxg.supabase.co';
    const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im92c3ZvY2p2am5xZmFhdWd3bnhnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE3ODEyMzcsImV4cCI6MjA2NzM1NzIzN30.ZErzsooaSXnS-NdmMYD0JcZFupFgrXfMLH-nOvU1NTE';

    if (typeof window.supabase === 'undefined') {
        console.error('❌ Supabase no está disponible. Aplicando fallback.');
        configurarFallback();
        return;
    }
    const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

    function generarSlug(fullName) {
        if (!fullName) return null;
        const parts = fullName.trim().toLowerCase().split(' ').filter(part => part.length > 0);
        const nombreParaSlug = (parts.length >= 2) ? `${parts[0]} ${parts[1]}` : parts[0] || '';
        return nombreParaSlug.replace(/[áäà]/g, 'a').replace(/[éëè]/g, 'e').replace(/[íïì]/g, 'i').replace(/[óöò]/g, 'o').replace(/[úüù]/g, 'u').replace(/ñ/g, 'n').replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-');
    }

    async function buscarDistribuidor(slug) {
        try {
            if (!slug) return null;
            const { data: perfiles, error } = await supabaseClient.from('profiles').select('full_name, whatsapp').not('full_name', 'is', null);
            if (error) { console.error('❌ Error en Supabase:', error); return null; }
            if (!perfiles) return null;

            for (const perfil of perfiles) {
                if (generarSlug(perfil.full_name) === slug) {
                    let whatsapp = perfil.whatsapp ? perfil.whatsapp.replace(/[^\d]/g, '') : '';
                    if (whatsapp.length === 10) whatsapp = '57' + whatsapp;

                    const nombreParts = perfil.full_name.trim().split(' ');
                    const primerNombre = nombreParts[0] || '';
                    const primerApellido = nombreParts[1] || '';

                    return {
                        nombre: perfil.full_name,
                        whatsapp: whatsapp,
                        primer_nombre: primerNombre,
                        nombre_apellido: primerApellido ? `${primerNombre} ${primerApellido}` : primerNombre,
                        slug: slug
                    };
                }
            }
            return null;
        } catch (error) {
            console.error('❌ Error buscando distribuidor:', error);
            return null;
        }
    }

    function personalizarCatalogo(distribuidor) {
        console.log('🎨 Personalizando catálogo para:', distribuidor.nombre);
        document.body.dataset.distributorWhatsapp = distribuidor.whatsapp;
        document.title = `Catálogo de ${distribuidor.primer_nombre} - Gano Excel`;
        document.querySelector('header h1').textContent = `Catálogo de Bienestar de ${distribuidor.primer_nombre}`;

        const welcomeTitle = document.querySelector('.welcome-section h2');
        if (welcomeTitle) welcomeTitle.textContent = `¡Hola! Soy ${distribuidor.nombre_apellido}`;

        const welcomeText = document.querySelector('.welcome-section p');
        if (welcomeText) welcomeText.innerHTML = `Te doy la bienvenida a mi catálogo. Explora los productos y si tienes alguna duda, contáctame en el botón de WhatsApp.`;

        configurarWhatsAppFAB(distribuidor.whatsapp, distribuidor.primer_nombre);

        const oportunidadLink = document.querySelector('.oportunidad-link');
        if (oportunidadLink) oportunidadLink.href = `https://oportunidad.4millones.com/?distribuidor=${distribuidor.slug}`;
    }

    function configurarWhatsAppFAB(numero, nombre) {
        const fab = document.getElementById('whatsapp-fab');
        if (!fab || !numero) return;
        const mensaje = `Hola ${nombre}, vi tu catálogo y quisiera más información.`;
        fab.href = `https://api.whatsapp.com/send?phone=${numero}&text=${encodeURIComponent(mensaje)}`;
        fab.style.display = 'flex';
        fab.title = `Contactar a ${nombre} por WhatsApp`;
    }

    function configurarFallback() {
        console.log('🔄 Configurando fallback.');
        const numeroDefecto = '573118870682';
        document.body.dataset.distributorWhatsapp = numeroDefecto;
        configurarWhatsAppFAB(numeroDefecto, 'Gano Excel');
    }

    async function inicializar() {
        console.log('🚀 Inicializando sistema de distribuidores...');
        const distribuidorSlug = new URLSearchParams(window.location.search).get('distribuidor');
        if (distribuidorSlug) {
            const distribuidor = await buscarDistribuidor(distribuidorSlug);
            distribuidor ? personalizarCatalogo(distribuidor) : configurarFallback();
        } else {
            configurarFallback();
        }
    }

    inicializar();
});
