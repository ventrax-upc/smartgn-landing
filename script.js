document.addEventListener('DOMContentLoaded', () => {
  const languageButtons = document.querySelectorAll('.lang-option[data-lang]');
  const languageLabel = document.getElementById('language-label');
  const menuToggle = document.getElementById('nav-menu-toggle');
  const navLinks = document.getElementById('primary-navigation');
  const homeView = document.getElementById('home-page');
  const contractingView = document.getElementById('contracting-page');
  const legalView = document.getElementById('legal-page');
  const legalRoutes = new Map([['#privacy-policy', 'privacy'], ['#terms-and-conditions', 'terms']]);
  const teamVideo = document.getElementById('team-video');
  const teamVideoPlay = document.getElementById('team-video-play');
  teamVideoPlay.disabled = !teamVideo.dataset.videoUrl;
  teamVideoPlay.addEventListener('click', () => {
    teamVideo.src = teamVideo.dataset.videoUrl + '?autoplay=1';
    teamVideo.hidden = false;
    teamVideoPlay.hidden = true;
    teamVideo.focus();
  });
  let currentLang = 'EN';
  let renderCheckoutStatus = () => {};
  let refreshCheckoutConnection = () => {};
  let setCarouselActive = () => {};

  try {
    currentLang = localStorage.getItem('smartgnLanguage') === 'ES' ? 'ES' : 'EN';
  } catch {
    currentLang = 'EN';
  }

  const translations = {
    ES: {
      "checkout-send-code": "Enviar código",
      "checkout-code-label": "Código de seis dígitos",
      "checkout-confirm-code": "Verificar correo",
      "checkout-code-sent": "Revisa tu correo e ingresa el código de seis dígitos.",
      "checkout-code-rate": "Espera un momento antes de solicitar otro código.",
      "checkout-gateway-missing": "Esta página no tiene un Gateway configurado. Para probar en local, abre la Landing en http://localhost:5500.",
      "checkout-gateway-offline": "La página de contratación no está conectada al API Gateway. Vuelve a intentarlo cuando el servicio esté disponible.",
      "checkout-gateway-checking": "Comprobando la conexión al API Gateway…",
      "checkout-file-gateway": "La página abierta como archivo no está conectada al API Gateway local. Abre la Landing en http://localhost:5500 para solicitar el código.",
      "checkout-email-delivery-error": "No pudimos enviar el código. Comprueba que el Gateway esté disponible e inténtalo de nuevo.",
      "checkout-code-invalid": "El código es incorrecto o ha vencido.",
      "checkout-email-verified": "Correo verificado. Completa los datos de instalación.",
      "checkout-start-payment": "Abrir pago de prueba",
      "checkout-simulate-payment": "Simular pago local",
      "checkout-card-title": "Niubiz Sandbox",
      "checkout-card-note": "Usa una tarjeta de prueba. Este pago no genera un cargo real.",
      "checkout-card-number": "Número de tarjeta",
      "checkout-card-expiry": "Vencimiento",
      "checkout-pay": "Pagar en Sandbox",
      "checkout-niubiz-unknown": "El resultado del pago aún no está confirmado. No vuelvas a pagar esta orden.",
      "checkout-niubiz-verifying": "Verificando el pago…",
      "checkout-niubiz-retrying": "Abriendo un nuevo intento de pago…",
      "checkout-niubiz-error": "No se pudo completar el paso de Niubiz. Revisa los datos de la tarjeta de prueba.",
      "checkout-code-expired": "La verificación venció. Solicita un nuevo código.",
      "page-title": "SmartGN · Monitoreo de gas natural en tiempo real",
      "page-title-contracting": "SmartGN · Contratación",
      "page-description": "Consulta tu consumo de gas natural en tiempo real, recibe alertas y solicita la instalación de tu medidor SmartGN.",
      "page-description-contracting": "Solicita la instalación de SmartGN para tu hogar, comercio o edificio.",
      "brand-label": "SmartGN Inicio",
      "flag-image-alt": "Bandera del Perú",
      "nav-product": "Producto",
      "nav-about": "Nosotros",
      "nav-plans": "Planes",
      "nav-countries": "Países",
      "nav-regions": "Regiones",
      "nav-contracting": "Comencemos",
      "hero-title": "Gestión y Monitoreo de<br>Suministro de Gas Natural<br>en Tiempo Real",
      "hero-sub": "Comencemos ahora",
      "hero-cta": "Control, Seguridad y Telemetría IoT",
      "btn-redirect": "Solicitar Instalación <i class=\"fa-solid fa-arrow-right\" aria-hidden=\"true\"></i>",
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
      "plan-1-period": "/mes",
      "plan-1-f1": "Monitoreo en tiempo real",
      "plan-1-f2": "Alertas críticas de seguridad",
      "plan-1-f3": "Acceso a directorio técnico",
      "plan-1-f4": "Estimación básica de gasto",
      "plan-popular": "Recomendado",
      "plan-2-title": "Plan Pro",
      "plan-2-period": "/mes",
      "plan-2-f2": "Comparativas de múltiples puntos",
      "plan-2-f3": "Reportes consolidados detallados",
      "plan-2-f4": "Historial avanzado de consumo (12 meses)",
      "plan-2-f5": "Atención prioritaria de tickets de soporte",
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
      "contracting-desc": "Completa tus datos para solicitar el dispositivo y coordinar la instalación.",
      "form-contact-title": "1. Información de Contacto",
      "label-fname": "Nombres",
      "label-lname": "Apellidos",
      "label-email": "Correo Electrónico",
      "label-phone": "Teléfono",
      "form-location-title": "2. Dirección de Instalación",
      "label-address": "Dirección completa",
      "label-city": "Ciudad / Distrito",
      "label-zip": "Código Postal",
      "btn-submit-order": "Continuar al pago",
      "summary-title": "Resumen del Pedido",
      "summary-item-1": "Dispositivo IoT SmartGN",
      "summary-item-2": "Servicio de Instalación Técnica",
      "summary-total-label": "Total referencial",
      "checkout-loading": "Creando tu orden…",
      "checkout-error": "No se pudo completar la operación. Vuelve a intentarlo.",
      "checkout-pending": "Orden {id} por {amount}. El pago está pendiente.",
      "checkout-local": "Orden de prueba {id} por {amount}. El pago se confirma mediante el simulador local.",
      "checkout-confirmed": "Pago confirmado. El enlace de activación se enviará al correo registrado si corresponde.",
      "checkout-success-title": "Pago confirmado",
      "checkout-success-email-message": "Enviaremos los pasos de activación a {email}. Volverás al inicio en 10 segundos.",
      "checkout-success-home": "Volver al inicio",
      "checkout-declined": "El pago fue rechazado.",
      "input-fname": "Andrea",
      "input-lname": "García",
      "input-email": "juan@ejemplo.com",
      "input-phone": "+51 912 345 678",
      "input-address": "Av. José Larco 345, Dpto. 402",
      "input-city": "Miraflores, Lima",
      "input-zip": "15074",
      "footer-copy": `© ${new Date().getFullYear()} SmartGN por Ventrax. Todos los derechos reservados.`
    },
    EN: {
      "checkout-send-code": "Send code",
      "checkout-code-label": "Six-digit code",
      "checkout-confirm-code": "Verify email",
      "checkout-code-sent": "Check your email for the six-digit code.",
      "checkout-code-rate": "Wait a moment before requesting another code.",
      "checkout-gateway-missing": "This page has no Gateway configured. To test locally, open the Landing at http://localhost:5500.",
      "checkout-gateway-offline": "Checkout is not connected to the API Gateway. Try again when the service is available.",
      "checkout-gateway-checking": "Checking the API Gateway connection…",
      "checkout-file-gateway": "This file is not connected to the local API Gateway. Open the Landing at http://localhost:5500 to request a code.",
      "checkout-email-delivery-error": "We could not send the code. Check that the Gateway is running and try again.",
      "checkout-code-invalid": "The code is incorrect or expired.",
      "checkout-email-verified": "Email verified. Complete the installation details.",
      "checkout-start-payment": "Open test payment",
      "checkout-simulate-payment": "Simulate local payment",
      "checkout-card-title": "Niubiz Sandbox",
      "checkout-card-note": "Use a test card. This payment will not charge real money.",
      "checkout-card-number": "Card number",
      "checkout-card-expiry": "Expiry date",
      "checkout-pay": "Pay in Sandbox",
      "checkout-niubiz-unknown": "The payment result is still unconfirmed. Do not pay this order again.",
      "checkout-niubiz-verifying": "Verifying payment…",
      "checkout-niubiz-retrying": "Opening a new payment attempt…",
      "checkout-niubiz-error": "Niubiz could not complete this step. Check the test card details.",
      "checkout-code-expired": "Verification expired. Request a new code.",
      "page-title": "SmartGN · Real-Time Natural Gas Monitoring",
      "page-title-contracting": "SmartGN · Checkout",
      "page-description": "Track your natural gas consumption in real time, receive alerts, and request installation of your SmartGN meter.",
      "page-description-contracting": "Request SmartGN installation for your home, business, or building.",
      "brand-label": "SmartGN Home",
      "flag-image-alt": "Flag of Peru",
      "nav-product": "Product",
      "nav-about": "About Us",
      "nav-plans": "Plans",
      "nav-countries": "Countries",
      "nav-regions": "Regions",
      "nav-contracting": "Get started",
      "hero-title": "Real-Time Natural Gas<br>Supply Management<br>and Monitoring",
      "hero-sub": "Get started now",
      "hero-cta": "Control, Security, and IoT Telemetry",
      "btn-redirect": "Request Installation <i class=\"fa-solid fa-arrow-right\" aria-hidden=\"true\"></i>",
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
      "plan-1-period": "/month",
      "plan-1-f1": "Real-time monitoring",
      "plan-1-f2": "Critical security alerts",
      "plan-1-f3": "Access to technical directory",
      "plan-1-f4": "Basic expense estimation",
      "plan-popular": "Recommended",
      "plan-2-title": "Pro Plan",
      "plan-2-period": "/month",
      "plan-2-f2": "Comparisons of multiple points",
      "plan-2-f3": "Detailed consolidated reports",
      "plan-2-f4": "Advanced consumption history (12 months)",
      "plan-2-f5": "Priority handling for support tickets",
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
      "contracting-desc": "Enter your details to request a device and arrange an installation.",
      "form-contact-title": "1. Contact Information",
      "label-fname": "First Name",
      "label-lname": "Last Name",
      "label-email": "Email Address",
      "label-phone": "Phone Number",
      "form-location-title": "2. Installation Address",
      "label-address": "Full Address",
      "label-city": "City / District",
      "label-zip": "Zip / Postal Code",
      "btn-submit-order": "Continue to payment",
      "summary-title": "Order Summary",
      "summary-item-1": "SmartGN IoT Device",
      "summary-item-2": "Technical Installation Service",
      "summary-total-label": "Estimated total",
      "checkout-loading": "Creating your order…",
      "checkout-error": "The operation could not be completed. Please try again.",
      "checkout-pending": "Order {id} for {amount}. Payment is pending.",
      "checkout-local": "Test order {id} for {amount}. Payment is confirmed through the local simulator.",
      "checkout-confirmed": "Payment confirmed. An activation link will be sent to the registered email if applicable.",
      "checkout-success-title": "Payment confirmed",
      "checkout-success-email-message": "We’ll send activation instructions to {email}. You’ll return to the home page in 10 seconds.",
      "checkout-success-home": "Back to home",
      "checkout-declined": "Payment was declined.",
      "input-fname": "Andrea",
      "input-lname": "García",
      "input-email": "john@example.com",
      "input-phone": "+51 912 345 678",
      "input-address": "Av. José Larco 345, Dpto. 402",
      "input-city": "Miraflores, Lima",
      "input-zip": "15074",
      "footer-copy": `© ${new Date().getFullYear()} SmartGN by Ventrax. All rights reserved.`
    }
  };

  function updateMenuToggle(isOpen) {
    if (!menuToggle || !navLinks) return;

    menuToggle.setAttribute('aria-expanded', String(isOpen));
    menuToggle.setAttribute(
      'aria-label',
      currentLang === 'EN'
        ? (isOpen ? 'Close navigation menu' : 'Open navigation menu')
        : (isOpen ? 'Cerrar menú de navegación' : 'Abrir menú de navegación')
    );
    menuToggle.innerHTML = `<i class="fa-solid fa-${isOpen ? 'xmark' : 'bars'}" aria-hidden="true"></i>`;
    navLinks.classList.toggle('is-open', isOpen);
  }

  function applyLanguage(language) {
    currentLang = language;
    document.documentElement.lang = language.toLowerCase();
    teamVideo.title = language === 'ES' ? 'Sobre el equipo de SmartGN' : 'About the SmartGN team';
    teamVideoPlay.setAttribute('aria-label', language === 'ES'
      ? (teamVideoPlay.disabled ? 'Video del equipo sin configurar' : 'Reproducir el video del equipo')
      : (teamVideoPlay.disabled ? 'Team video not configured' : 'Play the team video'));
    const labels = language === 'ES'
      ? ['Producto', 'Planes', 'Países', 'Regiones', 'Nosotros', 'Contratar', 'Política de privacidad', 'Términos y condiciones', 'Acepto la', 'y los', 'Volver al inicio']
      : ['Product', 'Plans', 'Countries', 'Regions', 'About Us', 'Get started', 'Privacy Policy', 'Terms & Conditions', 'I accept the', 'and the', 'Back to home'];
    const labelIds = ['footer-product', 'footer-plans', 'footer-countries', 'footer-regions', 'footer-about', 'footer-contracting',
      'footer-privacy', 'footer-terms', 'checkout-legal-prefix', 'checkout-legal-and', 'legal-back'];
    labelIds.forEach((id, index) => { document.getElementById(id).textContent = labels[index]; });
    document.getElementById('checkout-privacy-link').textContent = labels[6];
    document.getElementById('footer-summary').textContent = language === 'ES'
      ? 'Monitorea tu consumo de gas natural y recibe alertas de tu medidor SmartGN.'
      : 'Monitor your natural gas consumption and receive alerts from your SmartGN meter.';
    document.getElementById('checkout-terms-link').textContent = labels[7];

    for (const [key, value] of Object.entries(translations[language])) {
      const element = document.getElementById(key);
      if (!element || element instanceof HTMLMetaElement) continue;

      if (element instanceof HTMLInputElement) {
        element.placeholder = value;
      } else {
        element.innerHTML = value;
      }
    }

    renderCheckoutStatus();
    const brandLink = document.getElementById('brand-link');
    if (brandLink) {
      brandLink.setAttribute('aria-label', translations[language]['brand-label']);
    }

    renderPageContent();

    if (navLinks) {
      navLinks.setAttribute('aria-label', language === 'EN' ? 'Main navigation' : 'Navegación principal');
    }

    const checkoutForm = document.getElementById('checkout-form');
    if (checkoutForm) {
      checkoutForm.setAttribute('aria-label', language === 'EN' ? 'Installation request' : 'Solicitud de instalación');
    }

    const previousSlideButton = document.getElementById('carousel-prev');
    const nextSlideButton = document.getElementById('carousel-next');
    if (previousSlideButton) {
      previousSlideButton.setAttribute('aria-label', language === 'EN' ? 'Previous' : 'Anterior');
    }
    if (nextSlideButton) {
      nextSlideButton.setAttribute('aria-label', language === 'EN' ? 'Next' : 'Siguiente');
    }

    languageButtons.forEach((button) => {
      const isSelected = button.dataset.lang === language;
      button.classList.toggle('is-active', isSelected);
      button.setAttribute('aria-pressed', String(isSelected));
    });

    if (languageLabel) {
      languageLabel.setAttribute('aria-label', language === 'EN' ? 'Language' : 'Idioma');
    }

    if (menuToggle) {
      updateMenuToggle(menuToggle.getAttribute('aria-expanded') === 'true');
    }

    try {
      localStorage.setItem('smartgnLanguage', language);
    } catch {
      // Language switching still works when browser storage is unavailable.
    }
  }

  function renderLegalPage() {
    const key = legalRoutes.get(location.hash);
    if (!key) return;
    const { title, sections } = smartgnLegal[currentLang][key];
    document.title = 'SmartGN · ' + (key === 'privacy'
      ? (currentLang === 'ES' ? 'Privacidad' : 'Privacy')
      : (currentLang === 'ES' ? 'Términos' : 'Terms'));
    document.getElementById('legal-title').textContent = title;
    const content = document.getElementById('legal-content');
    content.replaceChildren();
    for (const [heading, body] of sections) {
      const section = document.createElement('section');
      const subtitle = document.createElement('h2');
      const paragraph = document.createElement('p');
      subtitle.textContent = heading;
      paragraph.textContent = body;
      section.append(subtitle, paragraph);
      content.append(section);
    }
  }

  function renderPageContent() {
    const isContracting = location.hash === '#request-installation';
    const copy = translations[currentLang];
    document.title = copy[isContracting ? 'page-title-contracting' : 'page-title'];
    document.getElementById('page-description').content =
      copy[isContracting ? 'page-description-contracting' : 'page-description'];
    renderLegalPage();
  }

  function renderRoute(scrollTarget = null) {
    const isContracting = window.location.hash === '#request-installation';
    if (isContracting) refreshCheckoutConnection();
    const isLegal = legalRoutes.has(location.hash);
    const isHome = !isContracting && !isLegal;
    homeView.hidden = !isHome;
    contractingView.hidden = !isContracting;
    legalView.hidden = !isLegal;
    navLinks.hidden = !isHome;
    menuToggle.hidden = !isHome;
    document.getElementById('nav-contracting').hidden = !isHome;
    document.getElementById('footer-navigation').hidden = !isHome;
    document.querySelector('.footer').classList.toggle('footer--compact', !isHome);
    if (!isHome && !teamVideo.hidden) {
      teamVideo.removeAttribute('src');
      teamVideo.hidden = true;
      teamVideoPlay.hidden = false;
    }
    setCarouselActive(isHome);
    renderPageContent();
    if (!isHome) {
      window.scrollTo({ top: 0, behavior: 'auto' });
      return;
    }

    const targetId = scrollTarget || window.location.hash.slice(1);
    const target = targetId ? document.getElementById(targetId) : null;
    if (target && target.closest('#home-page')) {
      const behavior = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth';
      requestAnimationFrame(() => target.scrollIntoView({ behavior, block: 'start' }));
    }
  }

  function navigateTo(targetId) {
    const nextHash = `#${targetId}`;
    if (window.location.hash !== nextHash) {
      window.location.hash = nextHash;
    }
    renderRoute(targetId);
  }

  languageButtons.forEach((button) => {
    button.addEventListener('click', () => applyLanguage(button.dataset.lang));
  });

  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      updateMenuToggle(menuToggle.getAttribute('aria-expanded') !== 'true');
    });

    navLinks.querySelectorAll('a[href^="#"]').forEach((link) => {
      link.addEventListener('click', (event) => {
        event.preventDefault();
        updateMenuToggle(false);
        navigateTo(link.getAttribute('href').slice(1));
      });
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') updateMenuToggle(false);
    });
  }

  const brandLink = document.getElementById('brand-link');
  if (brandLink) {
    brandLink.addEventListener('click', (event) => {
      event.preventDefault();
      navigateTo('home');
    });
  }

  [document.getElementById('nav-contracting'), document.getElementById('btn-redirect')]
    .filter(Boolean)
    .forEach((link) => {
      link.addEventListener('click', (event) => {
        event.preventDefault();
        updateMenuToggle(false);
        navigateTo('request-installation');
      });
    });

  window.addEventListener('hashchange', () => renderRoute());

  const checkoutForm = document.getElementById('checkout-form');
  if (checkoutForm) {
    const submit = document.getElementById('btn-submit-order');
    const status = document.getElementById('form-status');
    const emailForm = document.getElementById('checkout-email-form');
    const codeForm = document.getElementById('checkout-code-form');
    const emailInput = document.getElementById('input-email');
    const codeInput = document.getElementById('checkout-code');
    const sendCode = document.getElementById('checkout-send-code');
    const confirmCode = document.getElementById('checkout-confirm-code');
    const emailStatus = document.getElementById('checkout-email-status');
    const details = document.getElementById('checkout-details');
    const phoneInput = document.getElementById('input-phone');
    const startPayment = document.getElementById('checkout-start-payment');
    const payment = document.getElementById('checkout-payment');
    const pay = document.getElementById('checkout-pay');
    const cardFields = [
      ['card-number', 'niubiz-number', '0000 0000 0000 0000'],
      ['card-expiry', 'niubiz-expiry', 'MM / YY'],
      ['card-cvc', 'niubiz-cvc', 'CVV'],
    ];
    const directFile = location.protocol === 'file:';
    const loopbackHosts = ['localhost', '127.0.0.1', '[::1]'];
    const loopbackPage = loopbackHosts.includes(location.hostname);
    const configuredGateway = checkoutForm.dataset.gatewayUrl.trim();
    let gateway = '';
    let local = false;
    try {
      const url = new URL(configuredGateway || (loopbackPage ? 'http://localhost:8000' : ''));
      local = loopbackPage && loopbackHosts.includes(url.hostname);
      if ((url.protocol === 'https:' || (local && url.protocol === 'http:'))
        && !url.username && !url.password && url.pathname === '/' && !url.search && !url.hash) {
        gateway = url.origin;
      }
    } catch {
      // Checkout reports the missing Gateway through its existing status message.
    }
    const canConnect = !directFile && window.isSecureContext && Boolean(gateway);
    let connection = 'checking';
    let checkingConnection = false;
    const inputs = [...checkoutForm.querySelectorAll('input:not([type="checkbox"])')];
    const legalAccepted = document.getElementById('checkout-legal-accepted');
    let attempt;
    let order;
    let session;
    let cardElements;
    let cardholder;
    let payformScript;
    let authorizationSubmitted = false;
    let retryReady = false;
    let declineTimer;
    let challenge;
    let verification;
    let emailBusy = false;
    let emailStatusKey = '';
    let busy = false;
    let statusKey = '';

    renderCheckoutStatus = () => {
      const messageKey = directFile ? 'checkout-file-gateway'
        : !canConnect ? 'checkout-gateway-missing'
        : connection === 'offline' ? 'checkout-gateway-offline'
        : connection === 'checking' ? 'checkout-gateway-checking'
        : emailStatusKey;
      emailStatus.hidden = !messageKey;
      emailStatus.textContent = translations[currentLang][messageKey] || '';
      status.hidden = !statusKey;
      if (!statusKey) return;
      let message = translations[currentLang][statusKey];
      if (order) {
        const amount = new Intl.NumberFormat(currentLang === 'ES' ? 'es-PE' : 'en-PE', {
          style: 'currency', currency: order.currency,
        }).format(order.amount);
        message = message.replace('{id}', order.id).replace('{amount}', amount);
      }
      status.textContent = message;
    };

    function updateControls() {
      details.disabled = !verification;
      codeForm.hidden = !challenge || Boolean(verification);
      emailInput.readOnly = emailBusy || Boolean(verification);
      sendCode.hidden = Boolean(verification);
      const connected = canConnect && connection === 'online';
      sendCode.disabled = !connected || emailBusy || !emailInput.validity.valid;
      confirmCode.disabled = !connected || emailBusy;
      submit.disabled = !connected || !verification || !legalAccepted.checked || busy || (Boolean(order) && !retryReady)
        || inputs.some(input => !input.value.trim() || !input.validity.valid);
      const simulatedCheckout = session?.provider === 'LOCAL_TEST_DOUBLE';
      startPayment.textContent = translations[currentLang][
        simulatedCheckout ? 'checkout-simulate-payment' : 'checkout-start-payment'];
      startPayment.hidden = order?.status !== 'PENDING' || authorizationSubmitted || Boolean(cardElements)
        || (simulatedCheckout && (!local || !session.localCheckoutAction));
      startPayment.disabled = !connected || busy;
      payment.hidden = !cardElements || order?.status !== 'PENDING';
      pay.disabled = !connected || busy || authorizationSubmitted || !cardElements;
      inputs.forEach((input) => { input.readOnly = busy || Boolean(attempt?.installationId); });
      renderCheckoutStatus();
    }

    refreshCheckoutConnection = async () => {
      if (!canConnect || checkingConnection) return;
      checkingConnection = true;
      try {
        const response = await fetch(gateway + '/health', {
          cache: 'no-store',
          credentials: 'omit',
          redirect: 'error',
          signal: AbortSignal.timeout(5000),
        });
        const health = response.ok ? await response.json() : null;
        connection = health?.status === 'UP' && health.service === 'api-gateway' ? 'online' : 'offline';
      } catch {
        connection = 'offline';
      } finally {
        checkingConnection = false;
        updateControls();
      }
    };
    window.setInterval(() => {
      if (location.hash === '#request-installation' && document.visibilityState === 'visible') {
        refreshCheckoutConnection();
      }
    }, 10000);

    async function request(path, method, body, headers = {}) {
      const response = await fetch(gateway + path, {
        method,
        credentials: 'omit',
        redirect: 'error',
        signal: AbortSignal.timeout(15000),
        headers: body ? { 'Content-Type': 'application/json', ...headers } : headers,
        body: body ? JSON.stringify(body) : undefined,
      });
      if (!response.ok) throw Object.assign(new Error('Checkout HTTP ' + response.status), { status: response.status });
      return response.json();
    }

    let successTimer;
    const successDialog = document.getElementById('checkout-success-dialog');
    const goHome = () => {
      window.location.replace(window.location.pathname + window.location.search + '#home');
      window.location.reload();
    };
    successDialog.addEventListener('cancel', event => event.preventDefault());
    document.getElementById('checkout-success-home').addEventListener('click', () => {
      clearTimeout(successTimer);
      goHome();
    });

    function displayOrder() {
      if (order.status === 'CONFIRMED') {
        statusKey = 'checkout-confirmed';
        if (!successTimer) {
          document.getElementById('checkout-success-email').textContent =
            translations[currentLang]['checkout-success-email-message'].replace('{email}', emailInput.value.trim());
          successDialog.showModal();
          successTimer = setTimeout(goHome, 10000);
        }
      }
      else if (order.status === 'DECLINED') {
        statusKey = 'checkout-declined';
        if (session?.provider === 'NIUBIZ_SANDBOX' && !declineTimer && !retryReady) {
          declineTimer = setTimeout(() => {
            declineTimer = undefined;
            if (order.status !== 'DECLINED') return;
            statusKey = '';
            retryReady = true;
            updateControls();
          }, 5000);
        }
      }
      else if (order.status === 'UNKNOWN' || authorizationSubmitted) statusKey = 'checkout-niubiz-unknown';
      else if (session?.provider === 'NIUBIZ_SANDBOX') statusKey = '';
      else statusKey = local ? 'checkout-local' : 'checkout-pending';
    }

    async function trackPayment(maxChecks) {
      for (let check = 0; check < maxChecks; check++) {
        await new Promise(resolve => setTimeout(resolve, 2500));
        try {
          order = await request('/api/v1/checkout/orders/' + order.id, 'GET', undefined, attempt.headers);
          if (['CONFIRMED', 'DECLINED'].includes(order.status)) {
            displayOrder();
            updateControls();
            return;
          }
        } catch {
          // A temporary network failure does not allow a second authorization.
        }
      }
    }

    function loadPayform() {
      // Payform allows one set of elements per SDK instance.
      payformScript?.remove();
      return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        payformScript = script;
        script.src = 'https://pocpaymentserve.s3.amazonaws.com/payform.min.js';
        script.onload = () => window.payform ? resolve(window.payform) : reject(new Error('Payform missing'));
        script.onerror = () => reject(new Error('Payform unavailable'));
        document.head.append(script);
      });
    }

    async function preparePayment() {
      session = await request('/api/v1/checkout/orders/' + order.id + '/sessions',
        'POST', undefined, attempt.headers);
      if (session.provider !== 'NIUBIZ_SANDBOX') return;

      retryReady = false;
      order.status = 'PENDING';
      authorizationSubmitted = false;
      cardElements = undefined;
      cardFields.forEach(([, id]) => document.getElementById(id).replaceChildren());
      const payform = await loadPayform();
      payform.setConfiguration({
        sessionkey: session.sessionKey,
        channel: 'web',
        merchantid: session.merchantId,
        purchasenumber: session.purchaseNumber,
        amount: Number(session.amount).toFixed(2),
        callbackurl: '',
        language: currentLang.toLowerCase(),
        font: 'https://fonts.googleapis.com/css?family=Montserrat:400&display=swap',
      });
      payment.hidden = false;
      let deadline;
      try {
        const style = {
          base: {
            color: '#f8fafc', fontWeight: 400, fontFamily: "'Montserrat', sans-serif",
            fontSize: '16px', fontSmoothing: 'antialiased',
            placeholder: { color: '#64748b' }, autofill: { color: '#f8fafc' },
          },
          invalid: { color: '#b91c1c', '::placeholder': { color: '#b91c1c' } },
        };
        const initializeFields = Promise.all(cardFields.map(async ([type, id, placeholder]) => {
          const element = await payform.createElement(type, { style, placeholder }, id);
          await element.promise;
          return element;
        }));
        const limit = new Promise((_, reject) => {
          deadline = setTimeout(() => reject(new Error('Niubiz fields did not initialize')), 15000);
        });
        cardElements = await Promise.race([initializeFields, limit]);
      } catch (error) {
        cardFields.forEach(([, id]) => document.getElementById(id).replaceChildren());
        throw error;
      } finally {
        clearTimeout(deadline);
      }
    }

    emailInput.addEventListener('input', () => {
      challenge = undefined;
      codeInput.value = '';
      emailStatusKey = '';
      updateControls();
    });

    checkoutForm.addEventListener('input', updateControls);

    phoneInput.addEventListener('input', () => {
      const value = phoneInput.value.trim();
      let digits = value.replace(/\D/g, '');
      if (value.startsWith('+51') || (digits.length === 11 && digits.startsWith('51'))) {
        digits = digits.slice(2);
      }
      const groups = digits.slice(0, 9).match(/.{1,3}/g);
      phoneInput.value = groups ? '+51 ' + groups.join(' ') : '';
    });

    emailForm.addEventListener('submit', async (event) => {
      event.preventDefault();
      if (sendCode.disabled || verification) return;
      emailBusy = true;
      updateControls();
      try {
        const email = emailInput.value.trim().toLowerCase();
        challenge = await request('/api/v1/installations/email-verifications', 'POST', { email });
        codeInput.value = '';
        emailStatusKey = 'checkout-code-sent';
      } catch (error) {
        if (!error.status) refreshCheckoutConnection();
        emailStatusKey = error.status === 429 ? 'checkout-code-rate' : 'checkout-email-delivery-error';
      } finally {
        emailBusy = false;
        updateControls();
        if (!codeForm.hidden) codeInput.focus();
      }
    });

    codeForm.addEventListener('submit', async (event) => {
      event.preventDefault();
      if (!challenge || verification || emailBusy) return;
      emailBusy = true;
      updateControls();
      try {
        verification = await request('/api/v1/installations/email-verifications/confirm', 'POST', {
          challengeId: challenge.challengeId, code: codeInput.value,
        });
        emailStatusKey = 'checkout-email-verified';
      } catch (error) {
        emailStatusKey = error.status === 422 ? 'checkout-code-invalid' : 'checkout-error';
      } finally {
        emailBusy = false;
        updateControls();
        if (verification) inputs[0].focus();
      }
    });

    checkoutForm.addEventListener('submit', async (event) => {
      event.preventDefault();
      if (submit.disabled) return;
      if (retryReady) {
        busy = true;
        statusKey = 'checkout-niubiz-retrying';
        updateControls();
        try {
          await preparePayment();
          displayOrder();
        } catch {
          statusKey = 'checkout-niubiz-error';
        } finally {
          busy = false;
          updateControls();
        }
        return;
      }
      for (const input of inputs) input.value = input.value.trim();
      if (inputs.some((input) => !input.value) || !checkoutForm.reportValidity()) {
        statusKey = 'checkout-error';
        renderCheckoutStatus();
        return;
      }

      const { firstName, lastName, phone, address, city, postalCode } =
        Object.fromEntries(new FormData(checkoutForm));
      const email = emailInput.value.trim().toLowerCase();
      attempt ??= {
        key: crypto.randomUUID(),
        headers: { 'X-Checkout-Secret': crypto.randomUUID() + crypto.randomUUID() },
      };
      busy = true;
      statusKey = 'checkout-loading';
      updateControls();
      try {
        attempt.installationId ??= (await request('/api/v1/installations/verified', 'POST', {
          challengeId: verification.challengeId,
          proof: verification.proof,
          contact: { name: firstName + ' ' + lastName, email, phone: phone.replace(/\s/g, '') },
          address: [address, city, postalCode].join(', '),
        })).id;
        order = await request('/api/v1/checkout/orders', 'POST', {
          installationId: attempt.installationId, email, firstName, lastName,
        }, { 'Idempotency-Key': attempt.key, ...attempt.headers });
        cardholder = {
          name: firstName, lastName, email, phoneNumber: phone.replace(/\s/g, ''),
          alias: 'SmartGN test payment', currencyConversion: false, recurrence: false,
        };
        if (order.status === 'PENDING') await preparePayment();
        displayOrder();
        if (session?.provider === 'LOCAL_TEST_DOUBLE') void trackPayment(120);
      } catch (error) {
        if (error.status === 403 && !attempt.installationId) {
          verification = undefined;
          challenge = undefined;
          emailStatusKey = 'checkout-code-expired';
        }
        statusKey = order ? 'checkout-niubiz-error' : 'checkout-error';
      } finally {
        busy = false;
        updateControls();
      }
    });

    startPayment.addEventListener('click', async () => {
      if (busy || order?.status !== 'PENDING') return;
      busy = true;
      updateControls();
      try {
        if (local && session?.provider === 'LOCAL_TEST_DOUBLE' && session.localCheckoutAction) {
          order = await request('/api/v1/checkout/orders/' + order.id + '/sandbox-authorizations',
            'POST', { transactionToken: session.localCheckoutAction }, attempt.headers);
        } else {
          await preparePayment();
        }
        displayOrder();
      } catch {
        statusKey = 'checkout-niubiz-error';
      } finally {
        busy = false;
        updateControls();
      }
    });

    pay.addEventListener('click', async () => {
      if (busy || authorizationSubmitted || order?.status !== 'PENDING' || !cardElements) return;
      busy = true;
      updateControls();
      try {
        const data = await window.payform.createToken(cardElements, cardholder);
        if (!data?.transactionToken) throw new Error('Niubiz transaction token missing');
        authorizationSubmitted = true;
        statusKey = 'checkout-niubiz-verifying';
        renderCheckoutStatus();
        order = await request('/api/v1/checkout/orders/' + order.id + '/sandbox-authorizations',
          'POST', { transactionToken: data.transactionToken }, attempt.headers);
        displayOrder();
        if (order.status === 'UNKNOWN') void trackPayment(6);
      } catch {
        statusKey = authorizationSubmitted ? 'checkout-niubiz-unknown' : 'checkout-niubiz-error';
        if (authorizationSubmitted) void trackPayment(6);
      } finally {
        busy = false;
        updateControls();
      }
    });

    updateControls();
  }

  applyLanguage(currentLang);
  renderRoute();

  const track = document.getElementById('carousel-track');
  const nextButton = document.getElementById('carousel-next');
  const prevButton = document.getElementById('carousel-prev');

  if (track && nextButton && prevButton) {
    const slides = Array.from(track.children);
    const slideCount = slides.length;

    if (slideCount > 1) {
      const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const firstClone = slides[0].cloneNode(true);
      const lastClone = slides[slideCount - 1].cloneNode(true);
      [firstClone, lastClone].forEach((clone) => {
        clone.setAttribute('aria-hidden', 'true');
        clone.removeAttribute('id');
        clone.querySelectorAll('[id]').forEach((element) => element.removeAttribute('id'));
      });
      track.prepend(lastClone);
      track.append(firstClone);

      let currentSlideIndex = 1;
      let slideInterval;
      let transitionFallback;
      let isTransitioning = false;
      const pauseTime = 6000;

      function updateCarouselPosition(animate = true) {
        if (!animate || reducedMotion) track.style.transition = 'none';
        track.style.transform = `translateX(-${currentSlideIndex * 100}%)`;

        if (!animate || reducedMotion) {
          track.offsetWidth;
          track.style.removeProperty('transition');
        }
      }

      function resetClonePosition() {
        clearTimeout(transitionFallback);
        if (currentSlideIndex === 0) {
          currentSlideIndex = slideCount;
          updateCarouselPosition(false);
        } else if (currentSlideIndex === slideCount + 1) {
          currentSlideIndex = 1;
          updateCarouselPosition(false);
        }
        isTransitioning = false;
      }

      function finishTransition() {
        resetClonePosition();
      }

      function moveToSlide(index) {
        if (isTransitioning) return;
        isTransitioning = true;
        currentSlideIndex = index;
        updateCarouselPosition();
        if (reducedMotion) {
          finishTransition();
        } else {
          clearTimeout(transitionFallback);
          transitionFallback = window.setTimeout(finishTransition, 1000);
        }
      }

      function startAutoplay() {
        clearInterval(slideInterval);
        if (reducedMotion || document.hidden || homeView.hidden) return;
        slideInterval = setInterval(() => moveToSlide(currentSlideIndex + 1), pauseTime);
      }

      function stopAutoplay() {
        clearInterval(slideInterval);
        if (!isTransitioning) return;

        clearTimeout(transitionFallback);
        track.style.transition = 'none';
        if (currentSlideIndex === 0) currentSlideIndex = slideCount;
        else if (currentSlideIndex === slideCount + 1) currentSlideIndex = 1;
        track.style.transform = `translateX(-${currentSlideIndex * 100}%)`;
        track.offsetWidth;
        track.style.removeProperty('transition');
        isTransitioning = false;
      }

      setCarouselActive = (active) => {
        if (active) startAutoplay();
        else stopAutoplay();
      };

      function resetAutoplay() {
        clearInterval(slideInterval);
        startAutoplay();
      }

      track.addEventListener('transitionend', (event) => {
        if (event.target === track && event.propertyName === 'transform') finishTransition();
      });
      track.addEventListener('transitioncancel', finishTransition);
      nextButton.addEventListener('click', () => {
        moveToSlide(currentSlideIndex + 1);
        resetAutoplay();
      });
      prevButton.addEventListener('click', () => {
        moveToSlide(currentSlideIndex - 1);
        resetAutoplay();
      });

      updateCarouselPosition(false);
      setCarouselActive(!homeView.hidden);
      document.addEventListener('visibilitychange', () => {
        setCarouselActive(!document.hidden && !homeView.hidden);
      });
    }
  }
});
