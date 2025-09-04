// --- SMOOTH SCROLL PARA CLICS EN ENLACES ---
function anchorLinkHandler(e) {
  e.preventDefault();
  const targetId = this.getAttribute('href');
  const targetElement = document.querySelector(targetId);

  if (targetElement) {
    targetElement.scrollIntoView({ behavior: 'smooth' });
  }
}

// --- LÓGICA PARA SCROLL-SNAP SUAVE CON RUEDA DEL MOUSE ---
let isScrolling = false;
let scrollTimeout;

function smoothScrollSnap(e) {
  // Prevenir el comportamiento por defecto solo para la rueda del mouse
  if (e.deltaY === 0) return;
  e.preventDefault();

  if (isScrolling) return;

  const sections = document.querySelectorAll('section[id], footer[id]');
  if (sections.length === 0) return;

  // Encontrar la sección actual más cercana a la parte superior
  let currentSectionIndex = 0;
  let minDistance = Infinity;

  sections.forEach((section, index) => {
    const distance = Math.abs(section.getBoundingClientRect().top);
    if (distance < minDistance) {
      minDistance = distance;
      currentSectionIndex = index;
    }
  });

  let nextSectionIndex = currentSectionIndex;
  if (e.deltaY > 0) {
    // Scroll hacia abajo
    nextSectionIndex = Math.min(sections.length - 1, currentSectionIndex + 1);
  } else {
    // Scroll hacia arriba
    nextSectionIndex = Math.max(0, currentSectionIndex - 1);
  }

  if (nextSectionIndex !== currentSectionIndex) {
    isScrolling = true;
    const targetElement = sections[nextSectionIndex];
    targetElement.scrollIntoView({ behavior: 'smooth' });

    // Esperar a que termine la animación de scroll nativa (aproximado)
    // y luego liberar el bloqueo.
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
      isScrolling = false;
    }, 1000); // 1 segundo de cooldown
  }
}

function initAllScroll() {
  // Para enlaces de ancla
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', anchorLinkHandler);
  });

  // Para el scroll con la rueda del mouse en el contenedor principal
  const container = document.querySelector('main'); // Asume que el contenedor es <main>
  if (container) {
    container.addEventListener('wheel', smoothScrollSnap, { passive: false });
  }
}

function cleanupScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.removeEventListener('click', anchorLinkHandler);
  });
  const container = document.querySelector('main');
  if (container) {
    container.removeEventListener('wheel', smoothScrollSnap);
  }
}

// Integración con el ciclo de vida de Astro
document.addEventListener('astro:page-load', initAllScroll);
document.addEventListener('astro:before-swap', cleanupScroll);

