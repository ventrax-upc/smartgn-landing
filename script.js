document.addEventListener('DOMContentLoaded', () => {
  const languageButtons = document.querySelectorAll('.lang-option[data-lang]');
  const languageLabel = document.getElementById('language-label');
  const menuToggle = document.getElementById('nav-menu-toggle');
  const navLinks = document.getElementById('primary-navigation');
  const homeView = document.getElementById('home-page');
  const contractingView = document.getElementById('contracting-page');
  let currentLang = 'EN';
  let setCarouselActive = () => {};

  try {
    currentLang = localStorage.getItem('smartgnLanguage') === 'ES' ? 'ES' : 'EN';
  } catch {
    currentLang = 'EN';
  }

  const translations = {
    ES: {
      "page-title": "SmartGN | Gestión y Monitoreo Inteligente de Gas Natural",
      "page-title-contracting": "Contratación e Instalación | SmartGN",
      "page-description": "SmartGN monitorea el suministro de gas natural con telemetría IoT, alertas y control en tiempo real.",
      "page-description-contracting": "Solicita la instalación de SmartGN para tu hogar, comercio o edificio.",
      "brand-label": "SmartGN Inicio",
      "about-image-alt": "Panel de control y gestión de métricas",
      "team-image-1-alt": "Integrante 1",
      "team-image-2-alt": "Integrante 2",
      "team-image-3-alt": "Integrante 3",
      "team-image-4-alt": "Integrante 4",
      "team-image-5-alt": "Integrante 5",
      "team-image-6-alt": "Integrante 6",
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
      "form-payment-title": "3. Confirmación",
      "form-demo-note": "Este sitio todavía no recibe solicitudes ni procesa pagos. No ingreses datos de tarjeta.",
      "form-status": "El formulario aún no está conectado. No se envió ninguna solicitud ni se compartieron tus datos.",
      "label-cardname": "Nombre en la tarjeta",
      "label-cardnumber": "Número de tarjeta",
      "label-exp": "Vencimiento",
      "label-cvv": "CVV",
      "btn-submit-order": "Solicitar Instalación",
      "summary-title": "Resumen del Pedido",
      "summary-item-1": "Dispositivo IoT SmartGN",
      "summary-item-2": "Servicio de Instalación Técnica",
      "summary-total-label": "Total referencial",
      "summary-note": "Los importes son referenciales. Esta página aún no procesa pagos ni envía solicitudes.",
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
      "footer-copy": `© ${new Date().getFullYear()} SmartGN por Ventrax. Todos los derechos reservados.`
    },
    EN: {
      "page-title": "SmartGN | Real-Time Natural Gas Management and Monitoring",
      "page-title-contracting": "Contracting and Installation | SmartGN",
      "page-description": "SmartGN monitors natural gas supply with real-time IoT telemetry, alerts, and control.",
      "page-description-contracting": "Request SmartGN installation for your home, business, or building.",
      "brand-label": "SmartGN Home",
      "about-image-alt": "Monitoring and metrics dashboard",
      "team-image-1-alt": "Team member 1",
      "team-image-2-alt": "Team member 2",
      "team-image-3-alt": "Team member 3",
      "team-image-4-alt": "Team member 4",
      "team-image-5-alt": "Team member 5",
      "team-image-6-alt": "Team member 6",
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
      "form-payment-title": "3. Confirmation",
      "form-demo-note": "This site does not receive requests or process payments yet. Do not enter card details.",
      "form-status": "This form is not connected yet. No request was sent and your details were not shared.",
      "label-cardname": "Name on card",
      "label-cardnumber": "Card number",
      "label-exp": "Expiration",
      "label-cvv": "Security code",
      "btn-submit-order": "Request Installation",
      "summary-title": "Order Summary",
      "summary-item-1": "SmartGN IoT Device",
      "summary-item-2": "Technical Installation Service",
      "summary-total-label": "Estimated total",
      "summary-note": "These amounts are estimates. This page does not process payments or send requests yet.",
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

    for (const [key, value] of Object.entries(translations[language])) {
      const element = document.getElementById(key);
      if (!element) continue;

      if (element instanceof HTMLInputElement) {
        element.placeholder = value;
      } else if (element instanceof HTMLMetaElement) {
        element.content = value;
      } else if (element instanceof HTMLImageElement) {
        element.alt = value;
      } else {
        element.innerHTML = value;
      }
    }

    const brandLink = document.getElementById('brand-link');
    if (brandLink) {
      brandLink.setAttribute('aria-label', translations[language]['brand-label']);
    }

    const isContracting = window.location.hash === '#request-installation';
    document.title = translations[language][isContracting ? 'page-title-contracting' : 'page-title'];
    const pageDescription = document.getElementById('page-description');
    if (pageDescription) {
      pageDescription.content = translations[language][isContracting ? 'page-description-contracting' : 'page-description'];
    }

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

  function renderRoute(scrollTarget = null) {
    const isContracting = window.location.hash === '#request-installation';
    homeView.hidden = isContracting;
    contractingView.hidden = !isContracting;
    setCarouselActive(!isContracting);
    document.title = translations[currentLang][isContracting ? 'page-title-contracting' : 'page-title'];

    const pageDescription = document.getElementById('page-description');
    if (pageDescription) {
      pageDescription.content = translations[currentLang][isContracting ? 'page-description-contracting' : 'page-description'];
    }

    if (isContracting) {
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
    const submitOrderButton = document.getElementById('btn-submit-order');
    submitOrderButton?.addEventListener('click', () => {
      const invalidField = Array.from(checkoutForm.querySelectorAll('input[required]'))
        .find((field) => !field.checkValidity());
      if (invalidField) {
        invalidField.reportValidity();
        return;
      }

      const formStatus = document.getElementById('form-status');
      if (!formStatus) return;

      formStatus.textContent = translations[currentLang]['form-status'];
      formStatus.hidden = false;
    });
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
