document.addEventListener('DOMContentLoaded', () => {
  // --- LÓGICA DE TRADUCCIÓN ---
  const langBtn = document.getElementById('lang-btn');
  let currentLang = 'ES';

  const translations = {
    ES: {
      "nav-home": "Inicio",
      "nav-product": "Producto",
      "nav-about": "Nosotros",
      "nav-plans": "Planes",
      "nav-countries": "Países",
      "nav-regions": "Regiones",
      "nav-contracting": "Contratación",
      "hero-title": "Gestión y Monitoreo de<br>Suministro de Gas Natural<br>en Tiempo Real",
      "hero-sub": "Iníciate ahora",
      "hero-cta": "Control, Seguridad y Telemetría IoT",
      "btn-redirect": "Solicitar Instalación <i class=\"fa-solid fa-arrow-down\"></i>",
      "prod-q1-title": "¿Qué hacemos?",
      "prod-q1-desc": "Digitalizamos la gestión tradicional del gas natural mediante infraestructura IoT avanzada. Conectamos tus medidores físicos a una plataforma en la nube altamente escalable, capaz de procesar telemetría de consumo, presión y estado de válvulas en tiempo real.",
      "prod-q2-title": "¿Cómo solucionamos tu problema?",
      "prod-q2-desc": "Eliminamos la incertidumbre en tus facturas y los tiempos de reacción lentos ante incidentes. Recibirás alertas inmediatas por correo, SMS o WhatsApp ante cualquier anomalía o posible fuga, y podrás visualizar tu gasto en Soles antes de fin de mes.",
      "prod-q3-title": "¿Por qué confiar en nosotros?",
      "prod-q3-desc": "SmartGN es un ecosistema desarrollado por Ventrax, fundamentado en arquitecturas limpias, cifrado de datos extremo a extremo y alta disponibilidad (99.5%). Además, integramos un directorio centralizado de técnicos verificados listos para asistirte.",
      "feat-1-title": "Hardware IoT Preciso",
      "feat-1-desc": "Sensores de alta tecnología instalados por expertos que miden la presión y el volumen de gas de forma ininterrumpida.",
      "feat-2-title": "Prevención de Riesgos",
      "feat-2-desc": "El sistema detecta anomalías y fugas en segundos, enviando alertas inmediatas a tu correo, SMS o WhatsApp.",
      "feat-3-title": "Ahorro y Control",
      "feat-3-desc": "Visualiza tus métricas convertidas a Soles (PEN) en tiempo real para optimizar tu presupuesto mensual y evitar cobros excesivos.",
      "about-title": "Acerca de Nosotros",
      "about-desc": "En ciudades de alto crecimiento donde la seguridad y el control de recursos son prioritarios, <strong>SmartGN</strong> (desarrollado por <em>Ventrax</em>) surge para centralizar la gestión del suministro de gas natural en hogares, comercios y edificios. Utilizamos sensores IoT y telemetría en tiempo real para supervisar el consumo, monitorear el estado de válvulas, enviar alertas críticas y conectar a los usuarios con técnicos verificados.",
      "team-title": "Integrantes",
      "plans-title": "Planes de Suscripción",
      "plans-desc": "Selecciona el plan que se adapte a tu necesidad. La compra inicial de hardware aplica a ambos planes.",
      "plan-1-title": "Plan Free",
      "plan-1-f1": "Monitoreo en tiempo real",
      "plan-1-f2": "Alertas críticas de seguridad",
      "plan-1-f3": "Acceso a directorio técnico",
      "plan-1-f4": "Estimación básica de gasto",
      "plan-popular": "Recomendado",
      "plan-2-title": "Plan Pro",
      "plan-2-f1": "Gestor Multi-Medidor (Edificios)",
      "plan-2-f2": "Comparativas de múltiples puntos",
      "plan-2-f3": "Reportes consolidados detallados",
      "plan-2-f4": "Historial avanzado de consumo (12 meses)",
      "countries-title": "Países Disponibles",
      "countries-desc": "Actualmente <strong>SmartGN</strong> está disponible en <strong>Perú</strong>, impulsando la digitalización y seguridad energética de más de 2,4 millones de conexiones.",
      "regions-title": "Regiones de Alcance",
      "regions-desc": "Zonas estratégicas con cobertura de red donde garantizamos telemetría continua y acceso a un directorio de técnicos.",
      "reg-1-title": "Lima Metropolitana",
      "reg-1-sub": "Residencial & Multi-Medidor",
      "reg-2-title": "Callao",
      "reg-2-sub": "Comercios & Condominios",
      "reg-3-title": "Región Ica",
      "reg-3-sub": "Cobertura de Red & Pilotos",
      "reg-4-title": "Zonas Urbanas",
      "reg-4-sub": "Expansión Nacional",
      "contracting-title": "Formulario de Contratación e Instalación",
      "contracting-desc": "Completa tus datos para solicitar el dispositivo, procesar el pago y agendar la instalación.",
      "form-contact-title": "1. Información de Contacto",
      "label-fname": "Nombres",
      "label-lname": "Apellidos",
      "label-email": "Correo Electrónico",
      "label-phone": "Teléfono",
      "form-location-title": "2. Dirección de Instalación",
      "label-address": "Dirección completa",
      "label-city": "Ciudad / Distrito",
      "label-zip": "Código Postal",
      "form-payment-title": "3. Método de Pago Seguro (Niubiz)",
      "label-cardname": "Nombre en la tarjeta",
      "label-cardnumber": "Número de tarjeta",
      "label-exp": "Vencimiento",
      "label-cvv": "CVV",
      "btn-submit-order": "Pagar y Solicitar Instalación",
      "summary-title": "Resumen del Pedido",
      "summary-item-1": "Dispositivo IoT SmartGN",
      "summary-item-2": "Servicio de Instalación Técnica",
      "summary-total-label": "Total a Pagar",
      "summary-note": "Al procesar el pago, autorizas la creación de tu cuenta en la plataforma y la asignación de un instalador. El cargo se realizará de manera encriptada y segura a través de Niubiz.",
      "input-fname": "Ej. Juan",
      "input-lname": "Ej. Pérez",
      "input-email": "juan@ejemplo.com",
      "input-phone": "+51 999 999 999",
      "input-address": "Av. Principal 123, Dpto 4",
      "input-city": "Ej. Miraflores, Lima",
      "input-zip": "Ej. 15074",
      "input-cardname": "JUAN PEREZ",
      "input-cardnumber": "0000 0000 0000 0000",
      "input-exp": "MM/AA",
      "input-cvv": "123",
      "footer-copy": "© 2026 SmartGN por Ventrax. Todos los derechos reservados."
    },
    EN: {
      "nav-home": "Home",
      "nav-product": "Product",
      "nav-about": "About Us",
      "nav-plans": "Plans",
      "nav-countries": "Countries",
      "nav-regions": "Regions",
      "nav-contracting": "Checkout",
      "hero-title": "Real-Time Natural Gas<br>Supply Management<br>and Monitoring",
      "hero-sub": "Get started now",
      "hero-cta": "Control, Security, and IoT Telemetry",
      "btn-redirect": "Request Installation <i class=\"fa-solid fa-arrow-down\"></i>",
      "prod-q1-title": "What do we do?",
      "prod-q1-desc": "We digitalize traditional natural gas management through advanced IoT infrastructure. We connect your physical meters to a highly scalable cloud platform, capable of processing consumption telemetry, pressure, and valve states in real-time.",
      "prod-q2-title": "How do we solve your problem?",
      "prod-q2-desc": "We eliminate uncertainty in your bills and slow reaction times to incidents. You will receive immediate alerts via email, SMS, or WhatsApp regarding any anomaly or potential leak, and you'll be able to view your expenses in PEN before the end of the month.",
      "prod-q3-title": "Why trust us?",
      "prod-q3-desc": "SmartGN is an ecosystem developed by Ventrax, founded on clean architectures, end-to-end data encryption, and high availability (99.5%). Additionally, we integrate a centralized directory of verified technicians ready to assist you.",
      "feat-1-title": "Precise IoT Hardware",
      "feat-1-desc": "High-tech sensors installed by experts that measure gas pressure and volume without interruption.",
      "feat-2-title": "Risk Prevention",
      "feat-2-desc": "The system detects anomalies and leaks in seconds, sending immediate alerts to your email, SMS, or WhatsApp.",
      "feat-3-title": "Savings and Control",
      "feat-3-desc": "View your metrics converted to local currency (PEN) in real-time to optimize your monthly budget.",
      "about-title": "About Us",
      "about-desc": "In fast-growing cities where safety and resource control are top priorities, <strong>SmartGN</strong> (developed by <em>Ventrax</em>) centralizes natural gas supply management for homes, businesses, and buildings. We use IoT sensors and real-time telemetry to track consumption, monitor valve states, dispatch critical alerts, and connect users with verified technicians.",
      "team-title": "Team Members",
      "plans-title": "Subscription Plans",
      "plans-desc": "Select the plan that fits your needs. The initial hardware purchase applies to both plans.",
      "plan-1-title": "Free Plan",
      "plan-1-f1": "Real-time monitoring",
      "plan-1-f2": "Critical security alerts",
      "plan-1-f3": "Access to technical directory",
      "plan-1-f4": "Basic expense estimation",
      "plan-popular": "Recommended",
      "plan-2-title": "Pro Plan",
      "plan-2-f1": "Multi-Meter Manager (Buildings)",
      "plan-2-f2": "Comparisons of multiple points",
      "plan-2-f3": "Detailed consolidated reports",
      "plan-2-f4": "Advanced consumption history (12 months)",
      "countries-title": "Available Countries",
      "countries-desc": "Currently, <strong>SmartGN</strong> is available in <strong>Peru</strong>, driving energy digitalization and safety for over 2.4 million connections.",
      "regions-title": "Reach Regions",
      "regions-desc": "Strategic network coverage zones where we guarantee continuous telemetry and access to a technical directory.",
      "reg-1-title": "Metropolitan Lima",
      "reg-1-sub": "Residential & Multi-Meter",
      "reg-2-title": "Callao",
      "reg-2-sub": "Commercial & Condominiums",
      "reg-3-title": "Ica Region",
      "reg-3-sub": "Network Coverage & Pilots",
      "reg-4-title": "Urban Zones",
      "reg-4-sub": "National Expansion",
      "contracting-title": "Contracting & Installation Form",
      "contracting-desc": "Fill in your details to request the device, process the payment, and schedule the installation.",
      "form-contact-title": "1. Contact Information",
      "label-fname": "First Name",
      "label-lname": "Last Name",
      "label-email": "Email Address",
      "label-phone": "Phone Number",
      "form-location-title": "2. Installation Address",
      "label-address": "Full Address",
      "label-city": "City / District",
      "label-zip": "Zip / Postal Code",
      "form-payment-title": "3. Secure Payment (Niubiz)",
      "label-cardname": "Name on card",
      "label-cardnumber": "Card Number",
      "label-exp": "Expiration",
      "label-cvv": "CVV",
      "btn-submit-order": "Pay and Request Installation",
      "summary-title": "Order Summary",
      "summary-item-1": "SmartGN IoT Device",
      "summary-item-2": "Technical Installation Service",
      "summary-total-label": "Total to Pay",
      "summary-note": "By processing the payment, you authorize the creation of your account and the assignment of an installer. The charge will be processed securely via Niubiz.",
      "input-fname": "e.g. John",
      "input-lname": "e.g. Smith",
      "input-email": "john@example.com",
      "input-phone": "+1 555 555 5555",
      "input-address": "123 Main St, Apt 4",
      "input-city": "e.g. Miraflores, Lima",
      "input-zip": "e.g. 15074",
      "input-cardname": "JOHN SMITH",
      "input-cardnumber": "0000 0000 0000 0000",
      "input-exp": "MM/YY",
      "input-cvv": "123",
      "footer-copy": "© 2026 SmartGN by Ventrax. All rights reserved."
    }
  };

  if (langBtn) {
    langBtn.addEventListener('click', () => {
      currentLang = currentLang === 'ES' ? 'EN' : 'ES';
      langBtn.textContent = currentLang;
      
      const t = translations[currentLang];
      
      for (const key in t) {
        const element = document.getElementById(key);
        if (element) {
          if (element.tagName === 'INPUT') {
            element.placeholder = t[key];
          } else {
            element.innerHTML = t[key];
          }
        }
      }
    });
  }

  // --- LÓGICA DEL CARRUSEL HERO ---
  const track = document.getElementById('carousel-track');
  const nextButton = document.getElementById('carousel-next');
  const prevButton = document.getElementById('carousel-prev');
  
  if (track && nextButton && prevButton) {
    const slides = Array.from(track.children);
    let currentSlideIndex = 0;
    let slideInterval;
    const pauseTime = 6000;

    function updateCarouselPosition() {
      track.style.transform = `translateX(-${currentSlideIndex * 100}%)`;
    }

    function moveToNextSlide() {
      currentSlideIndex = (currentSlideIndex + 1) % slides.length;
      updateCarouselPosition();
    }

    function moveToPrevSlide() {
      currentSlideIndex = (currentSlideIndex - 1 + slides.length) % slides.length;
      updateCarouselPosition();
    }

    function startAutoplay() {
      slideInterval = setInterval(moveToNextSlide, pauseTime);
    }

    function resetAutoplay() {
      clearInterval(slideInterval);
      startAutoplay();
    }

    nextButton.addEventListener('click', () => {
      moveToNextSlide();
      resetAutoplay();
    });

    prevButton.addEventListener('click', () => {
      moveToPrevSlide();
      resetAutoplay();
    });

    startAutoplay();
  }
});