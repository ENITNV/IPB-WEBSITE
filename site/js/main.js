/* =========================================================
   Innovative Premium Bookkeeping Solutions — site script
   ---------------------------------------------------------
   1. SITE CONFIG  → where the contact form sends
   2. TRANSLATIONS → all English / Spanish text
   3. Behavior     → language toggle, mobile menu, form
   ========================================================= */

/* ---------- 1. SITE CONFIG (edit me) ---------- */
const SITE = {
  // The contact form posts here. "/api/contact" is the small contact service in
  // server/ (runs on the same server as the site). Yael's email address lives only
  // in that service's settings, never in this file.
  formEndpoint: "/api/contact",
  // true only on the private preview page, where there is no server to send to.
  previewMode: false
};

/* ---------- 2. TRANSLATIONS ---------- */
const I18N = {
  en: {
    "meta.title": "Innovative Premium Bookkeeping Solutions | Remote Bookkeeping",
    "meta.desc": "Reliable remote bookkeeping for small and midsize businesses. 12+ years of experience, bilingual English/Spanish service, and a standing monthly Zoom call.",
    "skip": "Skip to content",

    "nav.about": "About",
    "nav.services": "Services",
    "nav.why": "Why Us",
    "nav.contact": "Contact",
    "nav.cta": "Free Consultation",

    "hero.tagline": "You run the business. We run the numbers.",
    "hero.headline": "Reliable Bookkeeping, Handled Remotely, So You Can Focus on Your Business",
    "hero.sub": "12+ years of bookkeeping experience. Text, email, or hop on a monthly Zoom call. However you like to stay in touch, we're there.",
    "hero.cta1": "Get a Free Consultation",
    "hero.cta2": "See Our Services",

    "trust.years": "years of experience",
    "trust.bilingual": "bilingual service",
    "trust.reply": "business day to reply",

    "float.rec": "Books reconciled",
    "float.recSub": "Bank & credit cards",
    "float.zoom": "Monthly Zoom call",
    "float.zoomSub": "Always know where you stand",

    "stats.years": "Years of bookkeeping experience",
    "stats.reply": "Business day to respond to every inquiry",
    "stats.monthlyNum": "Monthly",
    "stats.monthly": "Zoom calls, plus email & text",
    "stats.lang": "Service in English or Spanish",

    "about.kicker": "Innovative Premium Bookkeeping",
    "about.heading": "About Us",
    "about.p1": "With over a decade of experience managing books for small and midsize businesses, we help owners stop worrying about their numbers and start understanding them. Clients work with us directly; you're never passed along to a junior associate or a call center.",
    "about.hl": "Close communication, without the commute.",
    "about.p2": "You'll hear from us by email, text, and a standing monthly Zoom call. It's the kind of consistent contact a lot of bookkeepers don't offer, in person or not.",
    "about.cardTitle": "How we stay in touch",
    "about.hours": "We work Pacific/Mountain business hours and respond to every inquiry within one business day.",
    "ch.email": "Email",
    "ch.emailSub": "Send documents and questions anytime",
    "ch.text": "Text",
    "ch.textSub": "Quick answers when you need them",
    "ch.zoom": "Monthly Zoom",
    "ch.zoomSub": "A standing review of your books",

    "services.kicker": "Services",
    "services.heading": "What We Can Take Off Your Plate",
    "svc.1.t": "Monthly Bookkeeping",
    "svc.1.d": "Bank & credit card reconciliations, categorized transactions, clean monthly reports.",
    "svc.2.t": "Accounts Payable & Receivable",
    "svc.2.d": "Invoicing, bill pay, and cash flow tracking.",
    "svc.3.t": "Financial Reporting",
    "svc.3.d": "Profit & loss and balance sheet reports you can actually read.",
    "svc.4.t": "Books Ready for Tax Season",
    "svc.4.d": "Clean records handed to your CPA (or ours) at the end of the year, with no scrambling in April.",
    "svc.5.t": "Payroll",
    "svc.5.d": "Partnered with ADP for seamless payroll processing.",
    "svc.6.t": "QuickBooks Setup & Cleanup",
    "svc.6.d": "New setup, catching up on past books, or fixing a messy file.",

    "why.kicker": "Why IPB",
    "why.heading": "Why Business Owners Choose to Work With Us",
    "why.1.t": "12+ years of experience",
    "why.1.d": "Across industries like doctors, lawyers, plumbers, restoration companies, house cleaning companies, CBS, contractors, landscapers, and trucking companies, among others.",
    "why.2.t": "Direct communication",
    "why.2.d": "You always talk to the same people: a family team that knows your books.",
    "why.3.t": "Consistently in touch",
    "why.3.d": "Email, text, and a monthly Zoom call, so you always know where your books stand.",
    "why.4.t": "Bilingual (English/Spanish)",
    "why.4.d": "Happy to work with you in whichever language is easiest.",
    "why.5.t": "Confidential & accurate",
    "why.5.d": "Your books, handled like they're our own.",

    "contact.kicker": "Free consultation",
    "contact.heading": "Let's Talk About Your Books",
    "contact.step1": "Send us the form",
    "contact.step2": "We reply within one business day",
    "contact.step3": "We meet for a free 30 minute consultation",
    "contact.body": "Reach out for a free 30 minute consultation. We'll take a look at what you need and let you know how we can help.",
    "contact.note": "All client work and updates happen over email, text, phone, and monthly Zoom calls. No office visits needed.",

    "form.name": "Name",
    "form.business": "Business Name",
    "form.email": "Email",
    "form.phone": "Phone",
    "form.message": "What do you need help with?",
    "form.submit": "Request a Free Consultation",
    "form.required": "Please fill in your name, email, and what you need help with.",
    "form.badEmail": "Please enter a valid email address.",
    "form.sending": "Sending…",
    "form.sent": "Thank you! Your request has been sent. We'll reply within one business day.",
    "form.busy": "Too many requests from this connection. Please wait a few minutes and try again.",
    "form.preview": "Preview only: on the live site, this sends your request to IPB by email.",
    "form.error": "We couldn't send your request. Please check your connection and try again in a few minutes.",
    
    "footer.rights": "All rights reserved."
  },

  es: {
    "meta.title": "Innovative Premium Bookkeeping Solutions | Contabilidad a Distancia",
    "meta.desc": "Contabilidad confiable a distancia para pequeñas y medianas empresas. Más de 12 años de experiencia, servicio bilingüe en inglés y español, y una llamada mensual por Zoom.",
    "skip": "Ir al contenido",

    "nav.about": "Nosotros",
    "nav.services": "Servicios",
    "nav.why": "Por Qué Nosotros",
    "nav.contact": "Contacto",
    "nav.cta": "Consulta Gratuita",

    "hero.tagline": "Tú manejas el negocio. Nosotros manejamos los números.",
    "hero.headline": "Contabilidad Confiable, a Distancia, Para Que Te Enfoques en Tu Negocio",
    "hero.sub": "Más de 12 años de experiencia en contabilidad. Mensaje de texto, correo, o una llamada mensual por Zoom. Como prefieras mantenernos en contacto, ahí estaremos.",
    "hero.cta1": "Agenda una Consulta Gratuita",
    "hero.cta2": "Ver Nuestros Servicios",

    "trust.years": "años de experiencia",
    "trust.bilingual": "servicio bilingüe",
    "trust.reply": "día hábil para responder",

    "float.rec": "Cuentas conciliadas",
    "float.recSub": "Bancos y tarjetas de crédito",
    "float.zoom": "Llamada mensual por Zoom",
    "float.zoomSub": "Siempre sabrás cómo vas",

    "stats.years": "Años de experiencia en contabilidad",
    "stats.reply": "Día hábil para responder cada consulta",
    "stats.monthlyNum": "Mensual",
    "stats.monthly": "Llamadas por Zoom, además de correo y texto",
    "stats.lang": "Atención en inglés o español",

    "about.kicker": "Innovative Premium Bookkeeping",
    "about.heading": "Sobre Nosotros",
    "about.p1": "Con más de una década de experiencia manejando la contabilidad de pequeñas y medianas empresas, ayudamos a los dueños de negocios a dejar de preocuparse por sus números y empezar a entenderlos. Trabajas directamente con nosotros; no hay traspaso a un asistente junior ni a un centro de llamadas.",
    "about.hl": "Comunicación cercana, sin necesidad de vernos en persona.",
    "about.p2": "Sabrás de nosotros por correo, mensaje de texto, y una llamada mensual por Zoom. Es el tipo de contacto constante que muchos contadores no ofrecen, ni en persona.",
    "about.cardTitle": "Cómo nos mantenemos en contacto",
    "about.hours": "Trabajamos en horario de las zonas horarias del Pacífico/Montaña y respondemos a cada consulta dentro de un día hábil.",
    "ch.email": "Correo",
    "ch.emailSub": "Envía documentos y preguntas cuando quieras",
    "ch.text": "Mensaje de texto",
    "ch.textSub": "Respuestas rápidas cuando las necesitas",
    "ch.zoom": "Zoom mensual",
    "ch.zoomSub": "Una revisión fija de tu contabilidad",

    "services.kicker": "Servicios",
    "services.heading": "Lo Que Podemos Hacer por Ti",
    "svc.1.t": "Contabilidad Mensual",
    "svc.1.d": "Conciliaciones bancarias y de tarjetas de crédito, transacciones categorizadas, reportes mensuales claros.",
    "svc.2.t": "Cuentas por Pagar y por Cobrar",
    "svc.2.d": "Facturación, pago de cuentas, y seguimiento de flujo de efectivo.",
    "svc.3.t": "Reportes Financieros",
    "svc.3.d": "Estados de pérdidas y ganancias, y balance general, fáciles de entender.",
    "svc.4.t": "Contabilidad Lista para Impuestos",
    "svc.4.d": "Registros organizados entregados a tu contador (o al nuestro) al fin de año, sin apuros en abril.",
    "svc.5.t": "Nómina",
    "svc.5.d": "En colaboración con ADP para un procesamiento de nómina sin complicaciones.",
    "svc.6.t": "Configuración y Limpieza de QuickBooks",
    "svc.6.d": "Configuración nueva, contabilidad atrasada, o corrección de archivos desordenados.",

    "why.kicker": "Por qué IPB",
    "why.heading": "Por Qué los Dueños de Negocios Nos Eligen",
    "why.1.t": "Más de 12 años de experiencia",
    "why.1.d": "En industrias como médicos, abogados, plomeros, empresas de restauración, empresas de limpieza, CBS, contratistas, paisajistas, y empresas de transporte, entre otras.",
    "why.2.t": "Comunicación directa",
    "why.2.d": "Siempre hablas con las mismas personas: un equipo familiar que conoce tu contabilidad.",
    "why.3.t": "Contacto constante",
    "why.3.d": "Correo, mensajes de texto, y una llamada mensual por Zoom, para que siempre sepas cómo van tus finanzas.",
    "why.4.t": "Bilingüe (inglés/español)",
    "why.4.d": "Con gusto trabajamos contigo en el idioma que prefieras.",
    "why.5.t": "Confidencial y preciso",
    "why.5.d": "Tu contabilidad, manejada como si fuera nuestra.",

    "contact.kicker": "Consulta gratuita",
    "contact.heading": "Hablemos de Tu Contabilidad",
    "contact.step1": "Envíanos el formulario",
    "contact.step2": "Te respondemos dentro de un día hábil",
    "contact.step3": "Nos reunimos para una consulta gratuita de 30 minutos",
    "contact.body": "Agenda una consulta gratuita de 30 minutos. Revisaremos lo que necesitas y te diremos cómo podemos ayudarte.",
    "contact.note": "Todo el trabajo con clientes y seguimiento se hace por correo, mensaje de texto, teléfono, y llamadas mensuales por Zoom. Sin visitas a la oficina.",

    "form.name": "Nombre",
    "form.business": "Nombre del Negocio",
    "form.email": "Correo",
    "form.phone": "Teléfono",
    "form.message": "¿En qué necesitas ayuda?",
    "form.submit": "Solicitar una Consulta Gratuita",
    "form.required": "Por favor completa tu nombre, correo, y en qué necesitas ayuda.",
    "form.badEmail": "Por favor ingresa un correo válido.",
    "form.sending": "Enviando…",
    "form.sent": "¡Gracias! Tu solicitud fue enviada. Te responderemos dentro de un día hábil.",
    "form.busy": "Demasiadas solicitudes desde esta conexión. Espera unos minutos e inténtalo de nuevo.",
    "form.preview": "Solo vista previa: en el sitio real, esto envía tu solicitud a IPB por correo.",
    "form.error": "No pudimos enviar tu solicitud. Revisa tu conexión e inténtalo de nuevo en unos minutos.",
    
    "footer.rights": "Todos los derechos reservados."
  }
};

/* ---------- 3. Behavior ---------- */
(function () {
  const doc = document.documentElement;
  const STORAGE_KEY = "ipb-lang";
  let currentLang = "en";

  const t = (key) => (I18N[currentLang] && I18N[currentLang][key]) || I18N.en[key] || "";

  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* Language */
  function applyLang(lang) {
    if (!I18N[lang]) lang = "en";
    currentLang = lang;
    doc.lang = lang;
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const val = t(el.getAttribute("data-i18n"));
      if (val) el.textContent = val;
    });
    document.title = t("meta.title");
    const desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute("content", t("meta.desc"));
    document.querySelectorAll(".lang-toggle button").forEach((b) => {
      b.setAttribute("aria-pressed", String(b.dataset.lang === lang));
    });
    // Clear any old form message so it doesn't show in the wrong language
    const status = document.querySelector(".form-status");
    if (status) { status.textContent = ""; status.className = "form-status"; }
  }

  function initialLang() {
    const param = new URLSearchParams(location.search).get("lang");
    if (param && I18N[param]) return param;
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved && I18N[saved]) return saved;
    } catch (e) { /* storage unavailable */ }
    const nav = (navigator.language || "en").toLowerCase();
    return nav.startsWith("es") ? "es" : "en";
  }

  document.querySelectorAll(".lang-toggle button").forEach((btn) => {
    btn.addEventListener("click", () => {
      applyLang(btn.dataset.lang);
      try { localStorage.setItem(STORAGE_KEY, btn.dataset.lang); } catch (e) { /* ignore */ }
    });
  });

  applyLang(initialLang());

  /* Header shadow on scroll */
  const header = document.querySelector(".site-header");
  const onScroll = () => header.classList.toggle("scrolled", window.scrollY > 8);
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* Mobile menu */
  const menuBtn = document.querySelector(".menu-toggle");
  const nav = document.getElementById("main-nav");
  function closeMenu() { nav.classList.remove("open"); menuBtn.setAttribute("aria-expanded", "false"); }
  menuBtn.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    menuBtn.setAttribute("aria-expanded", String(open));
  });
  nav.querySelectorAll("a").forEach((a) => a.addEventListener("click", closeMenu));
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeMenu(); });

  /* Reveal on scroll */
  const revealTargets = document.querySelectorAll(
    ".section-head, .service, .about-copy, .contact-card-mini, .why-head, .why-list li, .contact-wrap"
  );
  if ("IntersectionObserver" in window) {
    revealTargets.forEach((el) => el.classList.add("reveal"));
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) { entry.target.classList.add("in"); io.unobserve(entry.target); }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    revealTargets.forEach((el) => io.observe(el));
  }

  /* Contact form */
  const form = document.getElementById("contact-form");
  const status = form.querySelector(".form-status");
  const setStatus = (msg, cls) => { status.textContent = msg; status.className = "form-status" + (cls ? " " + cls : ""); };

  const pageLoadedAt = Date.now();

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const val = (k) => (data.get(k) || "").toString().trim();

    const name = val("name");
    const email = val("email");
    const message = val("message");

    ["f-name", "f-email", "f-message"].forEach((id) => document.getElementById(id).parentElement.classList.remove("invalid"));
    const missing = [];
    if (!name) missing.push("f-name");
    if (!email) missing.push("f-email");
    if (!message) missing.push("f-message");
    if (missing.length) {
      missing.forEach((id) => document.getElementById(id).parentElement.classList.add("invalid"));
      document.getElementById(missing[0]).focus();
      return setStatus(t("form.required"), "err");
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      document.getElementById("f-email").parentElement.classList.add("invalid");
      document.getElementById("f-email").focus();
      return setStatus(t("form.badEmail"), "err");
    }

    if (SITE.previewMode) return setStatus(t("form.preview"), "ok");

    const payload = {
      name,
      business: val("business"),
      email,
      phone: val("phone"),
      message,
      language: currentLang === "es" ? "Spanish" : "English",
      website: val("website"),               // honeypot, should stay empty
      elapsed_ms: Date.now() - pageLoadedAt  // bots submit instantly
    };

    const btn = form.querySelector('button[type="submit"]');
    btn.disabled = true;
    setStatus(t("form.sending"));
    try {
      const res = await fetch(SITE.formEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload)
      });
      if (res.status === 429) return setStatus(t("form.busy"), "err");
      if (!res.ok) throw new Error(String(res.status));
      form.reset();
      setStatus(t("form.sent"), "ok");
    } catch (err) {
      setStatus(t("form.error"), "err");
    } finally {
      btn.disabled = false;
    }
  });
})();
