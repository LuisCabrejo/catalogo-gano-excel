document.addEventListener('DOMContentLoaded', () => {
    // --- CONFIGURACIÓN DE SUPABASE ---
    const SUPABASE_URL = 'https://ovsvocjvjnqfaaugwnxg.supabase.co';
    const SUPABASE_ANON_KEY = 'eyJhbGciOiJIJzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im92c3ZvY2p2am5xZmFhdWd3bnhnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE3ODEyMzcsImV4cCI6MjA2NzM1NzIzN30.ZErzsooaSXnS-NdmMYD0JcZFupFgrXfMLH-nOvU1NTE';

    if (typeof window.supabase === 'undefined') {
        console.error('❌ Supabase no está disponible. Aplicando fallback.');
        configurarFallback();
        return;
    }
    const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

    // --- FUNCIONES AUXILIARES ---
    function generarSlug(fullName) {
        if (!fullName) return null;
        const parts = fullName.trim().toLowerCase().split(' ').filter(part => part.length > 0);
        const nombreParaSlug = (parts.length >= 2) ? `${parts[0]} ${parts[1]}` : parts[0] || '';
        return nombreParaSlug.replace(/[áäà]/g, 'a').replace(/[éëè]/g, 'e').replace(/[íïì]/g, 'i').replace(/[óöò]/g, 'o').replace(/[úüù]/g, 'u').replace(/ñ/g, 'n').replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-');
    }

    // --- LÓGICA PRINCIPAL ---
    async function buscarDistribuidor(slug) {
        try {
            if (!slug) return null;
            // AÑADIDO 'affiliate_link' A LA CONSULTA
            const { data: perfiles, error } = await supabaseClient.from('profiles').select('full_name, whatsapp, affiliate_link').not('full_name', 'is', null);
            if (error) { console.error('❌ Error en Supabase:', error); return null; }
            if (!perfiles) return null;

            for (const perfil of perfiles) {
                if (generarSlug(perfil.full_name) === slug) {
                    let whatsapp = perfil.whatsapp ? perfil.whatsapp.replace(/[^\d]/g, '') : '';
                    if (whatsapp.length === 10) whatsapp = '57' + whatsapp;

                    const nombreParts = perfil.full_name.trim().split(' ');
                    return {
                        nombre: perfil.full_name,
                        whatsapp: whatsapp,
                        primer_nombre: nombreParts[0] || '',
                        affiliate_link: perfil.affiliate_link // Se añade el nuevo campo
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
        document.body.dataset.distributorWhatsapp = distribuidor.whatsapp;
        document.title = `Catálogo de ${distribuidor.primer_nombre} - Gano Excel`;

        // Configurar enlace de contacto del FAB
        configurarWhatsAppFAB(distribuidor.whatsapp, distribuidor.primer_nombre);

        // Configurar el nuevo enlace de afiliación
        const affiliateButton = document.getElementById('affiliate-link-button');
        if (affiliateButton && distribuidor.affiliate_link) {
            affiliateButton.href = distribuidor.affiliate_link;
            affiliateButton.style.display = 'inline-block'; // Mostrar el botón
        } else if (affiliateButton) {
            affiliateButton.style.display = 'none'; // Ocultar si no hay enlace
        }
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
        const numeroDefecto = '573118870682';
        document.body.dataset.distributorWhatsapp = numeroDefecto;
        configurarWhatsAppFAB(numeroDefecto, 'Gano Excel');
        // Ocultar botón de afiliación en modo fallback
        const affiliateButton = document.getElementById('affiliate-link-button');
        if(affiliateButton) affiliateButton.style.display = 'none';
    }

    async function inicializar() {
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
