// ============================================================
//  SENS TECH — App Principal (Fusionado)
// ============================================================

const App = (() => {
    // ==================== DATA ====================
    const sensores = [
      { id: 'ect', name: 'Sensor ECT', fullName: 'Engine Coolant Temperature Sensor', icon: 'lucide:thermometer-snowflake', category: 'sensores', description: 'El sensor ECT mide la temperatura del líquido refrigerante del motor. Esta señal es crítica para que la ECU determine el enriquecimiento de la mezcla en frío, el tiempo de apertura del termostato y la activación de los ventiladores de refrigeración. Una falla aquí provoca consumo excesivo y sobrecalentamiento.', specs: { 'Tipo': 'Termistor NTC', 'Rango de Operación': '-40°C a 130°C', 'Señal de Salida': '0.5V – 4.5V (variable)', 'Resistencia (25°C)': '2kΩ – 3kΩ (promedio)', 'Conector': '2 pines', 'Ubicación': 'Culata o caja del termostato', 'Función Principal': 'Monitoreo de temperatura de motor', 'Código OBD2': 'P0115–P0119' } },
        { id: 'iat', name: 'Sensor IAT', fullName: 'Intake Air Temperature Sensor', icon: 'lucide:thermometer', category: 'sensores', description: 'El sensor IAT monitorea la temperatura del aire entrante al motor para que la ECU calcule la densidad del aire. Al ser un factor determinante en el cálculo del volumen de aire, ayuda a la ECU a ajustar el ancho de pulso de los inyectores y el avance de encendido para maximizar el rendimiento.', specs: { 'Tipo': 'Termistor NTC (Coeficiente de temperatura negativo)', 'Rango de Operación': '-40°C a 125°C', 'Señal de Salida': '0.1V – 4.8V (analógica)', 'Resistencia (25°C)': '2,000Ω – 3,000Ω (varía por fabricante)', 'Conector': '2 pines', 'Ubicación': 'Cuerpo de aceleración / Múltiple de admisión / Ducto de aire', 'Función Principal': 'Cálculo de densidad del aire', 'Código OBD2': 'P0110–P0114' } },
        { id: 'tps', name: 'Sensor TPS', fullName: 'Throttle Position Sensor', icon: 'lucide:gauge', category: 'sensores', description: 'El sensor TPS monitorea el ángulo de apertura de la mariposa de aceleración. La ECU utiliza esta señal para determinar la carga del motor, el enriquecimiento durante la aceleración, el corte de combustible en desaceleración y el control de la transmisión automática. Un desgaste en la pista resistiva suele causar tirones o ralentí inestable.', specs: { 'Tipo': 'Potenciómetro (pista resistiva) / Efecto Hall', 'Rango de Operación': '0° a 90° de apertura', 'Señal de Salida': '0.5V (ralentí) – 4.5V (WOT)', 'Alimentación': '5V DC (Vref)', 'Conector': '3 pines (Vref, Señal, Tierra)', 'Ubicación': 'Eje de la mariposa (cuerpo de aceleración)', 'Función Principal': 'Monitoreo de carga y posición del acelerador', 'Código OBD2': 'P0120–P0124' } },
       { id: 'map', name: 'Sensor MAP', fullName: 'Manifold Absolute Pressure Sensor', icon: 'lucide:activity', category: 'sensores', description: 'El sensor MAP mide la presión absoluta dentro del colector de admisión, proporcionando a la ECU datos fundamentales sobre la carga del motor. Esta información permite calcular el flujo de masa de aire de forma indirecta (sistema Speed-Density) y ajustar la cantidad de combustible y el avance del encendido en tiempo real.', specs: { 'Tipo': 'Piezo-resistivo / Vacío-presión', 'Rango de Operación': '10 kPa – 115 kPa (atmosférico) / hasta 200+ kPa (turbo)', 'Señal de Salida': '0.5V – 4.8V (analógica)', 'Alimentación': '5V DC (Vref)', 'Conector': '3 a 4 pines', 'Ubicación': 'Múltiple de admisión', 'Función Principal': 'Cálculo de carga de motor', 'Código OBD2': 'P0105–P0109' } },
        { id: 'maf', name: 'Sensor MAF', fullName: 'Mass Air Flow Sensor', icon: 'lucide:wind', category: 'sensores', description: 'El sensor MAF mide la masa real de aire que ingresa al motor utilizando un hilo o película caliente (Hot Wire). Esta es una medida directa y precisa que permite a la ECU determinar la carga del motor y calcular la cantidad de combustible necesaria para una combustión estequiométrica eficiente.', specs: { 'Tipo': 'Hilo caliente (Hot Wire) / Película caliente', 'Rango de Operación': '0 – 500+ g/s (gramos por segundo)', 'Señal de Salida': '0.5V – 5.0V (analógica) o Frecuencia (Hz)', 'Alimentación': '12V DC (calefactor) / 5V DC (señal)', 'Conector': '3 a 6 pines', 'Ubicación': 'Conducto de admisión (después del filtro)', 'Función Principal': 'Medición directa de masa de aire', 'Código OBD2': 'P0100–P0104' } },
        { id: 'ckp-cmp-sync', name: 'Sensores de Sincronización (CKP/CMP)', fullName: 'Crankshaft & Camshaft Position Sensors', icon: 'lucide:refresh-cw', category: 'sensores', description: 'El conjunto CKP/CMP es la referencia absoluta del motor. El CKP (cigüeñal) dicta la velocidad de rotación y la posición del pistón, mientras que el CMP (árbol de levas) define la fase del ciclo (admisión vs. escape). La ECU compara ambos para gestionar la inyección secuencial y el encendido preciso.', specs: { 'Tipo': 'Inductivo (VR) / Efecto Hall', 'Alimentación': '5V-12V (según sensor)', 'Salida': 'Señal AC o Digital 0-5V', 'Conector': '2 a 3 pines', 'Ubicación': 'Monoblock y Culata', 'Función Principal': 'Sincronización de encendido e inyección', 'Código OBD2': 'P0335–P0344' } },
        { id: 'o2-sensor', name: 'Sensor de Oxígeno', fullName: 'Oxygen Sensor (O2 / Lambda)', icon: 'lucide:activity', category: 'sensores', description: 'El sensor de oxígeno monitorea la concentración de O2 en los gases de escape. La ECU compara esta lectura con el valor ideal para ajustar constantemente la mezcla aire-combustible (bucle cerrado). El sensor 1 (antes del catalizador) regula la mezcla; el sensor 2 (después) monitorea la eficiencia del catalizador.', specs: { 'Tipo': 'Zirconia / Planar / Banda Ancha (AFR)', 'Voltaje': '0.1V – 0.9V (Narrow) / 0–5V (Wideband)', 'Resistencia Calefactor': '2–15 Ω', 'Conector': '2 a 5 pines', 'Ubicación': 'Múltiple de escape y tubo de escape', 'Función Principal': 'Control estequiométrico y monitoreo de emisiones', 'Código OBD2': 'P0130–P0167' } },
        { id: 'vss', name: 'Sensor VSS', fullName: 'Vehicle Speed Sensor', icon: 'lucide:gauge', category: 'sensores', description: 'El sensor VSS mide la velocidad de rotación de la transmisión o de las ruedas. Esta señal es enviada a la ECU y al panel de instrumentos (velocímetro). La ECU utiliza estos datos para gestionar los puntos de cambio en transmisiones automáticas, el corte de combustible en desaceleración y el control de crucero.', specs: { 'Tipo': 'Efecto Hall / Inductivo / Óptico', 'Rango de Operación': '0 – 250+ km/h', 'Señal de Salida': 'Digital (Onda cuadrada) / AC (Inductivo)', 'Alimentación': '5V o 12V DC', 'Conector': '2 a 3 pines', 'Ubicación': 'Caja de cambios / Eje de salida / Cubo de rueda (ABS)', 'Función Principal': 'Monitoreo de velocidad del vehículo', 'Código OBD2': 'P0500–P0503' } },
    ];

    const actuadores = [
        { id: 'BUJIA DE ENCENDIDO', name: 'BUJIA DE ENCENDIDO', fullName: 'ENCENDIDO', icon: 'lucide:droplets', category: 'actuadores', description: 'La bujía de encendido es el componente fundamental responsable de iniciar el ciclo de potencia en el motor de combustión interna. Su función consiste en convertir la alta tensión suministrada por el sistema de encendido en un arco eléctrico preciso, el cual genera la chispa necesaria para inflamar la mezcla aire-combustible dentro de la cámara de combustión.', specs: { 'Tipo': 'Resistor / Iridio / Platino / Cobre', 'Resistencia Interna': '3–7 kΩ (típica)', 'Rango Térmico': 'Grado térmico variable (Escala fabricante)', 'Voltaje': '15,000–40,000 V', 'Conector': 'Terminal SAE / Rosca M10, M12, M14', 'Luz de Electrodo': '0.6–1.8 mm', 'Función Principal': 'Ignición de mezcla aire-combustible', 'Código OBD2': 'P0300–P0309' } },
        { id: 'cable-encendido', name: 'Cable de Encendido', fullName: 'High Tension Cable', icon: 'lucide:git-branch', category: 'actuadores', description: 'El cable de encendido es el conductor de alta tensión encargado de transmitir la energía desde la bobina hacia la bujía. Su construcción interna de material resistivo es clave para minimizar interferencias electromagnéticas (EMI) en los sistemas electrónicos del vehículo.', specs: { 'Tipo': 'Núcleo resistivo / Carbón / Alambre', 'Resistencia': '5,000–15,000 Ω (por metro)', 'Voltaje Máximo': '40,000V+', 'Diámetro': '7 mm – 8.5 mm', 'Material Aislante': 'Silicona de alta temperatura', 'Temperatura Operativa': '-40°C a 200°C', 'Función Principal': 'Conducción de alta tensión', 'Código OBD2': 'P0300–P0309' } },
        { id: 'bobina', name: 'Bobina de Encendido', fullName: 'Ignition Coil', icon: 'lucide:zap', category: 'actuadores', description: 'La bobina de encendido transforma el bajo voltaje de la batería (12V) en alta tensión (20,000–40,000V) mediante inducción electromagnética para generar la chispa necesaria en la bujía. Los sistemas modernos suelen emplear bobinas independientes por cilindro para optimizar la eficiencia de encendido.', specs: { 'Tipo': 'Coil-on-plug / Bloque bobinas / Tipo DIS', 'Voltaje Entrada': '12V DC', 'Voltaje Salida': '20,000–40,000V', 'Resistencia Primaria': '0.3–2.0 Ω', 'Resistencia Secundaria': '6,000–15,000 Ω', 'Conector': '2-4 pines', 'Función Principal': 'Generación de alta tensión para ignición', 'Código OBD2': 'P0350–P0362' } },
       { id: 'inyector', name: 'Inyector de Combustible', fullName: 'Fuel Injector', icon: 'lucide:droplet', category: 'actuadores', description: 'El inyector de combustible es una válvula electromagnética de alta precisión que dosifica el combustible hacia el múltiple de admisión o directamente a la cámara de combustión. La ECU determina la cantidad de combustible mediante el ancho de pulso (tiempo de inyección), optimizando la estequiometría de la mezcla.', specs: { 'Tipo': 'Solenoide / Piezoeléctrico', 'Resistencia Bobina': '12–16 Ω (alto imp.) / 2–5 Ω (bajo imp.)', 'Presión Operación': '3–5 bar (MPI) / 50–200 bar (GDI)', 'Voltaje': '12V DC', 'Conector': '2 pines', 'Tiempo Inyección': '1–15 ms', 'Función Principal': 'Dosificación de combustible', 'Código OBD2': 'P0200–P0219' } },
       { id: 'vent-valve', name: 'Electrovalvula de Canister', fullName: 'EVAP Vent Solenoid Valve', icon: 'lucide:filter', category: 'actuadores', description: 'Esta electroválvula controla la entrada de aire fresco hacia el cánister de carbón activo. Es fundamental para permitir el flujo durante la purga y para el sellado del sistema al realizar las pruebas de estanqueidad (leak test) del sistema EVAP por parte de la ECU.', specs: { 'Tipo': 'Solenoide NC o NA', 'Estado de Reposo': 'Normalmente abierta (vent)', 'Voltaje': '12V DC', 'Resistencia': '20–60 Ω', 'Conector': '2 pines', 'Ubicación': 'Cerca del cánister o depósito de combustible', 'Función Principal': 'Ventilación y sellado del sistema EVAP', 'Código OBD2': 'P0446–P0455' } },
        { id: 'starter', name: 'Motor de Arranque', fullName: 'Starter Motor', icon: 'lucide:power', category: 'actuadores', description: 'El motor de arranque es un motor eléctrico de corriente continua que convierte la energía eléctrica de la batería en energía mecánica para accionar el cigüeñal y superar la resistencia inicial del motor de combustión. Utiliza un solenoide para engranar el piñón de ataque con la corona del volante de inercia.', specs: { 'Tipo': 'Motor serie DC / Solenoide de mando', 'Voltaje': '12V DC', 'Consumo Corriente': '150–400 A (arranque)', 'Resistencia Solenoide': '0.1–0.5 Ω', 'Conector': 'Terminal de fuerza y señal de mando', 'Ubicación': 'Carcasa de la caja de cambios / Bloque motor', 'Función Principal': 'Arranque inicial del motor', 'Código OBD2': 'P0615–P0617' } },
        { id: 'alternador', name: 'Alternador', fullName: 'Alternator', icon: 'lucide:battery-charging', category: 'actuadores', description: 'El alternador es un generador eléctrico que convierte la energía mecánica del motor en energía eléctrica de corriente alterna, la cual es rectificada internamente a corriente continua para alimentar los sistemas eléctricos del vehículo y recargar la batería mientras el motor está en marcha.', specs: { 'Tipo': 'Generador trifásico de c.a. / Puente rectificador', 'Voltaje Salida': '13.5–14.8V DC', 'Corriente Salida': '70–150 A (varía según modelo)', 'Resistencia Rotor': '2–5 Ω', 'Conector': 'Terminal B+ / Terminales de campo / Sensor', 'Ubicación': 'Montado en bloque motor (correa accesorios)', 'Función Principal': 'Generación eléctrica y carga de batería', 'Código OBD2': 'P0620–P0629' } },
        { id: 'actuador-ralenti', name: 'Actuador de Marcha Lenta', fullName: 'Idle Air Control Actuator', icon: 'lucide:gauge', category: 'actuadores', description: 'El actuador de marcha lenta, comúnmente integrado en el cuerpo de aceleración, regula el caudal de aire necesario para mantener el motor encendido cuando la mariposa está cerrada. Ajusta dinámicamente las RPM en ralentí compensando cargas eléctricas o mecánicas (aire acondicionado, dirección asistida).', specs: { 'Tipo': 'Motor paso a paso / Solenoide rotativo', 'Voltaje': '12V DC', 'Resistencia Bobina': '10–50 Ω', 'Conector': '4-6 pines', 'Ubicación': 'Cuerpo de aceleración', 'Función Principal': 'Estabilización de RPM en ralentí', 'Código OBD2': 'P0505–P0519' } },
    ];

    const allItems = [...sensores, ...actuadores];

    // ==================== STATE ====================
    let currentView = 'hero';
    let currentCategory = '';
    let currentItem = null;
    let currentZoom = 100;
    let mobileSearchOpen = false;

    // PDF.js State
    let pdfDoc = null;
    let pdfPageNum = 1;
    let pdfTotalPages = 0;
    let pdfScale = 1.2;
    let isRendering = false;
    const PDF_BASE_PATH = '../pdfs/';

    // ==================== INIT ====================
    function init() {
        if (typeof pdfjsLib !== 'undefined') {
            pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
        }
        checkHeroVideo();
        animateStats();
    }

    function checkHeroVideo() {
        const video = document.getElementById('heroVideo');
        const fallback = document.getElementById('heroSvgFallback');
        if (!video) return;
        video.addEventListener('loadeddata', () => { fallback.style.display = 'none'; });
        video.addEventListener('error', () => { video.style.display = 'none'; });
        setTimeout(() => { if (video.readyState < 2) video.style.display = 'none'; }, 3000);
    }

    // ==================== NAVIGATION ====================
    function showView(view, category) {
        document.getElementById('view-hero').style.display = 'none';
        document.getElementById('view-cards').style.display = 'none';
        document.getElementById('view-detail').style.display = 'none';

        if (view === 'hero') {
            currentView = 'hero';
            const el = document.getElementById('view-hero');
            el.style.display = 'flex';
            el.classList.remove('view-enter'); void el.offsetWidth; el.classList.add('view-enter');
            animateStats();
        } else if (view === 'cards') {
            currentView = 'cards';
            currentCategory = category;
            const el = document.getElementById('view-cards');
            el.style.display = 'block';
            el.classList.remove('view-enter'); void el.offsetWidth; el.classList.add('view-enter');
            renderCards(category);
        } else if (view === 'detail') {
            currentView = 'detail';
            const el = document.getElementById('view-detail');
            el.style.display = 'block';
            el.classList.remove('view-enter'); void el.offsetWidth; el.classList.add('view-enter');
        }
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // ==================== CARDS ====================
    function renderCards(category, filter = '') {
        const items = category === 'sensores' ? sensores : actuadores;
        const grid = document.getElementById('cardsGrid');
        const noResults = document.getElementById('noResults');
        const title = category === 'sensores' ? 'Sensores' : 'Actuadores';
        const subtitle = category === 'sensores' ? 'Explora nuestra biblioteca de sensores automotrices' : 'Explora nuestra biblioteca de actuadores automotrices';

        document.getElementById('cardsTitle').innerHTML = `<span class="gradient-text">${title}</span>`;
        document.getElementById('cardsSubtitle').textContent = subtitle;

        const filtered = filter ? items.filter(i => i.name.toLowerCase().includes(filter.toLowerCase()) || i.fullName.toLowerCase().includes(filter.toLowerCase()) || i.description.toLowerCase().includes(filter.toLowerCase())) : items;

        if (filtered.length === 0) { grid.innerHTML = ''; noResults.classList.remove('hidden'); return; }
        noResults.classList.add('hidden');

        grid.innerHTML = filtered.map((item, idx) => `
            <div class="card-animate group cursor-pointer" style="animation-delay: ${idx * 0.08}s;" onclick="App.openDetail('${item.id}', '${category}')">
                <div class="relative bg-surface-2 border border-white/5 rounded-2xl p-6 hover:border-neon/30 transition-all duration-300 neon-border-hover h-full flex flex-col">
                    <div class="w-14 h-14 rounded-xl bg-neon/5 border border-neon/10 flex items-center justify-center mb-4 group-hover:bg-neon/10 group-hover:border-neon/25 transition-all">
                        <iconify-icon icon="${item.icon}" class="text-neon text-2xl"></iconify-icon>
                    </div>
                    <div class="flex items-center gap-1.5 mb-3">
                        <span class="text-[10px] uppercase tracking-widest font-medium text-neon/60 bg-neon/5 border border-neon/10 rounded-full px-2.5 py-0.5">${category}</span>
                    </div>
                    <h3 class="font-display text-xl font-bold tracking-tight mb-1 group-hover:text-neon transition-colors">${item.name}</h3>
                    <p class="text-neutral-500 text-xs font-mono mb-3">${item.fullName}</p>
                    <p class="text-neutral-400 text-sm leading-relaxed flex-1 line-clamp-3">${item.description.substring(0, 120)}...</p>
                    <div class="flex items-center gap-1 mt-4 text-neon/50 group-hover:text-neon transition-colors text-sm font-medium">
                        <span>Ver ficha</span>
                        <iconify-icon icon="lucide:arrow-right" class="group-hover:translate-x-1 transition-transform"></iconify-icon>
                    </div>
                    <div class="absolute top-0 right-0 w-20 h-20 bg-neon/5 rounded-bl-[60px] opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
            </div>
        `).join('');
    }

    // ==================== DETAIL ====================
    function openDetail(id, category) {
        const items = category === 'sensores' ? sensores : actuadores;
        currentItem = items.find(i => i.id === id);
        if (!currentItem) return;

        document.getElementById('detailBackBtn').onclick = () => showView('cards', category);
        document.getElementById('detailIcon').innerHTML = `<iconify-icon icon="${currentItem.icon}" class="text-neon text-lg"></iconify-icon>`;
        document.getElementById('detailTitle').textContent = currentItem.name;
        document.getElementById('detailSubtitle').textContent = currentItem.fullName;
        document.getElementById('detailDescription').textContent = currentItem.description;
        document.getElementById('pdfFileName').textContent = `${currentItem.id}.pdf`;

        const specsHTML = Object.entries(currentItem.specs).map(([key, val]) => `
            <div class="spec-row flex justify-between items-start gap-3 py-3 border-b border-white/5 last:border-0 px-2 rounded">
                <span class="text-neutral-500 text-xs font-medium uppercase tracking-wider shrink-0">${key}</span>
                <span class="text-white text-sm text-right font-mono">${val}</span>
            </div>
        `).join('');
        document.getElementById('specsContent').innerHTML = specsHTML;

        currentZoom = 100; pdfPageNum = 1; pdfTotalPages = 0; pdfDoc = null;
        document.getElementById('zoomLevel').textContent = '100%';
        document.getElementById('pdfStatus').classList.add('hidden');
        
        loadRealPDF(currentItem.id);
        showView('detail');
    }

    // ==================== PDF REAL LOADER ====================
    async function loadRealPDF(id) {
        const pdfPath = PDF_BASE_PATH + id + '.pdf';
        const canvas = document.getElementById('pdfCanvas');
        const fallback = document.getElementById('pdfFallbackContent');

        if (typeof pdfjsLib === 'undefined') {
            canvas.classList.add('hidden'); fallback.classList.remove('hidden');
            renderFallbackPDF(); return;
        }

        try {
            const loadingTask = pdfjsLib.getDocument(pdfPath);
            pdfDoc = await loadingTask.promise;
            pdfTotalPages = pdfDoc.numPages; pdfPageNum = 1;
            canvas.classList.remove('hidden'); fallback.classList.add('hidden');
            await renderPDFPage(pdfPageNum);
            updatePageInfo();
            
            document.getElementById('pdfStatus').classList.remove('hidden');
            document.getElementById('pdfStatusIcon').setAttribute('icon', 'lucide:file-check');
            document.getElementById('pdfStatusText').textContent = `PDF real disponible — ${pdfTotalPages} página(s)`;
        } catch (error) {
            pdfDoc = null;
            canvas.classList.add('hidden'); fallback.classList.remove('hidden');
            renderFallbackPDF();
            document.getElementById('pdfStatus').classList.remove('hidden');
            document.getElementById('pdfStatusIcon').setAttribute('icon', 'lucide:file-question');
            document.getElementById('pdfStatusText').textContent = 'Vista previa generada — sin PDF real';
        }
    }

    async function renderPDFPage(pageNum) {
        if (!pdfDoc || isRendering) return;
        isRendering = true;
        try {
            const page = await pdfDoc.getPage(pageNum);
            const canvas = document.getElementById('pdfCanvas');
            const ctx = canvas.getContext('2d');
            const viewport = page.getViewport({ scale: pdfScale });
            canvas.height = viewport.height; canvas.width = viewport.width;
            await page.render({ canvasContext: ctx, viewport: viewport }).promise;
            isRendering = false;
        } catch (error) { isRendering = false; }
    }

    function nextPage() { if (!pdfDoc || pdfPageNum >= pdfTotalPages) return; pdfPageNum++; renderPDFPage(pdfPageNum); updatePageInfo(); }
    function prevPage() { if (!pdfDoc || pdfPageNum <= 1) return; pdfPageNum--; renderPDFPage(pdfPageNum); updatePageInfo(); }
    function updatePageInfo() { document.getElementById('pageInfo').textContent = `${pdfPageNum} / ${pdfTotalPages}`; }

    function zoomPDF(direction) {
        currentZoom = Math.min(150, Math.max(50, currentZoom + direction * 10));
        document.getElementById('zoomLevel').textContent = currentZoom + '%';
        if (pdfDoc) { pdfScale = (currentZoom / 100) * 1.2; renderPDFPage(pdfPageNum); }
        else { document.getElementById('pdfFallbackContent').style.transform = `scale(${currentZoom / 100})`; }
    }

    // ==================== FALLBACK PDF PREVIEW ====================
    function renderFallbackPDF() {
        if (!currentItem) return;
        const item = currentItem;
        const specsRows = Object.entries(item.specs).map(([key, val]) => `
            <tr style="border-bottom: 1px solid #e5e5e5;">
                <td style="padding: 8px 12px; font-size: 11px; color: #666; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; width: 40%; background: #f5f5f5;">${key}</td>
                <td style="padding: 8px 12px; font-size: 12px; color: #1a1a1a; font-family: monospace;">${val}</td>
            </tr>
        `).join('');

        document.getElementById('pdfFallbackContent').innerHTML = `
            <div style="font-family: 'Inter', sans-serif;">
                <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 30px; padding-bottom: 20px; border-bottom: 3px solid #00FF88;">
                    <div>
                        <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 8px;">
                            <div style="width: 36px; height: 36px; background: #003d20; border: 1px solid #00FF88; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: #00FF88; font-weight: bold; font-size: 14px;">ST</div>
                            <span style="font-size: 14px; font-weight: 600; color: #1a1a1a; letter-spacing: -0.02em;">SensTech</span>
                        </div>
                        <h1 style="font-size: 24px; font-weight: 700; color: #0a0a0a; margin: 0; letter-spacing: -0.03em; line-height: 1.2;">${item.name}</h1>
                        <p style="font-size: 12px; color: #666; font-family: monospace; margin-top: 4px;">${item.fullName}</p>
                    </div>
                    <div style="text-align: right;">
                        <div style="font-size: 10px; color: #999; text-transform: uppercase; letter-spacing: 0.1em;">Ficha Técnica</div>
                        <div style="font-size: 10px; color: #00cc6a; font-family: monospace; margin-top: 4px;">${item.id.toUpperCase()}-DS-2025</div>
                    </div>
                </div>
                <div style="margin-bottom: 24px;">
                    <h2 style="font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; color: #003d20; margin-bottom: 8px; border-left: 3px solid #00FF88; padding-left: 10px;">Descripción General</h2>
                    <p style="font-size: 12px; color: #444; line-height: 1.7;">${item.description}</p>
                </div>
                <div style="margin-bottom: 24px;">
                    <h2 style="font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; color: #003d20; margin-bottom: 10px; border-left: 3px solid #00FF88; padding-left: 10px;">Especificaciones Técnicas</h2>
                    <table style="width: 100%; border-collapse: collapse; border: 1px solid #e5e5e5; border-radius: 8px; overflow: hidden;">${specsRows}</table>
                </div>
                <div style="border-top: 1px solid #e5e5e5; padding-top: 15px; display: flex; justify-content: space-between; align-items: center;">
                    <span style="font-size: 9px; color: #999;">© 2025 SensTech</span>
                    <span style="font-size: 9px; color: #00cc6a; font-family: monospace;">${item.id.toUpperCase()}-DS-2025</span>
                </div>
            </div>
        `;
    }

    // ==================== DOWNLOAD REAL PDF ====================
    function downloadPDF() {
        if (!currentItem) return;
        const item = currentItem;
        const pdfPath = PDF_BASE_PATH + item.id + '.pdf';

        fetch(pdfPath, { method: 'HEAD' }).then(response => {
            if (response.ok) {
                const a = document.createElement('a'); a.href = pdfPath; a.download = `${item.id}_ficha_tecnica.pdf`;
                document.body.appendChild(a); a.click(); document.body.removeChild(a);
                showToast('PDF real descargado correctamente');
            } else { downloadFallbackHTML(); }
        }).catch(() => { downloadFallbackHTML(); });
    }

    function downloadFallbackHTML() {
        if (!currentItem) return;
        const item = currentItem;
        const htmlContent = `<!DOCTYPE html><html lang="es"><head><meta charset="UTF-8"><title>Ficha - ${item.name}</title><style>body{font-family:'Segoe UI',sans-serif;max-width:800px;margin:40px auto;color:#1a1a1a;padding:20px}h1{font-size:28px;margin-bottom:5px}h2{font-size:16px;color:#006640;border-left:3px solid #00FF88;padding-left:10px;margin-top:30px;text-transform:uppercase}table{width:100%;border-collapse:collapse;margin:10px 0 20px}td{padding:8px 12px;border-bottom:1px solid #e5e5e5;font-size:13px}td:first-child{color:#666;font-weight:600;text-transform:uppercase;font-size:11px;background:#f9f9f9;width:40%}.subtitle{color:#666;font-family:monospace;font-size:13px}.desc{font-size:14px;line-height:1.7;color:#444}.header{border-bottom:3px solid #00FF88;padding-bottom:20px;margin-bottom:25px;display:flex;justify-content:space-between;align-items:flex-start}.badge{font-size:10px;background:#003d20;color:#00FF88;padding:3px 8px;border-radius:4px;font-family:monospace}.footer{border-top:1px solid #e5e5e5;padding-top:15px;font-size:10px;color:#999;display:flex;justify-content:space-between}</style></head><body><div class="header"><div><h1>${item.name}</h1><p class="subtitle">${item.fullName}</p></div><div style="text-align:right"><span class="badge">${item.id.toUpperCase()}-DS-2025</span></div></div><h2>Descripción General</h2><p class="desc">${item.description}</p><h2>Especificaciones Técnicas</h2><table>${Object.entries(item.specs).map(([k,v]) => `<tr><td>${k}</td><td>${v}</td></tr>`).join('')}</table><div class="footer"><span>© 2025 SensTech</span><span>${item.id.toUpperCase()}-DS-2025</span></div></body></html>`;
        
        const blob = new Blob([htmlContent], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a'); a.href = url; a.download = `${item.id}_ficha_tecnica.html`;
        document.body.appendChild(a); a.click(); document.body.removeChild(a); URL.revokeObjectURL(url);
        showToast('Ficha técnica descargada (HTML). Coloca el PDF real en /pdfs/ para descarga directa.');
    }

    // ==================== SEARCH ====================
    function handleSearch(value) {
        document.getElementById('navSearch').value = value;
        document.getElementById('heroSearch').value = value;
        document.getElementById('mobileSearch').value = value;
    }

    function handleSearchEnter() {
        const val = document.getElementById('heroSearch').value.trim().toLowerCase();
        if (!val) return;
        
        // Buscar SOLO en el título principal (name) - coincidencia parcial
        const found = allItems.find(i => i.name.toLowerCase().includes(val));
        
        if (found) {
            // Abrir directamente la ficha de detalles
            openDetail(found.id, found.category);
        } else {
            // Si no encuentra, mostrar mensaje
            showToast('No se encontró el elemento buscado');
        }
    }

    // ==================== MOBILE SEARCH ====================
    function toggleMobileSearch() {
        const bar = document.getElementById('mobileSearchBar');
        mobileSearchOpen = !mobileSearchOpen;
        if (mobileSearchOpen) { bar.classList.remove('mobile-search-closed'); bar.classList.add('mobile-search-open'); document.getElementById('mobileSearch').focus(); }
        else { bar.classList.remove('mobile-search-open'); bar.classList.add('mobile-search-closed'); }
    }

    // ==================== SHARE & TOAST ====================
    function shareItem() {
        if (!currentItem) return;
        if (navigator.share) { navigator.share({ title: currentItem.name + ' — SensTech', text: currentItem.description }).catch(() => {}); }
        else { navigator.clipboard.writeText(`${currentItem.name}: ${currentItem.description}`).then(() => { showToast('Información copiada al portapapeles'); }); }
    }

    function showToast(msg) {
        const toast = document.getElementById('toast');
        document.getElementById('toastMsg').textContent = msg;
        toast.classList.remove('opacity-0', 'translate-y-4', 'pointer-events-none');
        toast.classList.add('opacity-100', 'translate-y-0');
        setTimeout(() => { toast.classList.add('opacity-0', 'translate-y-4', 'pointer-events-none'); toast.classList.remove('opacity-100', 'translate-y-0'); }, 3000);
    }

    // ==================== STATS ====================
    function animateStats() { animateNumber('statSensors', sensores.length); animateNumber('statActuators', actuadores.length); }
    function animateNumber(id, target) {
        const el = document.getElementById(id); if (!el) return; let current = 0;
        const step = target / (1000 / 16);
        const interval = setInterval(() => { current += step; if (current >= target) { current = target; clearInterval(interval); } el.textContent = Math.floor(current); }, 16);
    }

    // ==================== PUBLIC API ====================
    return { showView, openDetail, handleSearch, handleSearchEnter, toggleMobileSearch, downloadPDF, shareItem, zoomPDF, nextPage, prevPage, init };
})();

document.addEventListener('DOMContentLoaded', App.init);