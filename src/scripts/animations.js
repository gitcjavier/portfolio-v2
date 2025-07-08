import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Función para inicializar todas las animaciones
export function initAnimations() {
  // Animación del header al cargar
  gsap.fromTo('header', 
    { y: -100, opacity: 0 },
    { y: 0, opacity: 1, duration: 1, ease: 'power2.out' }
  );

  // Animación del hero section
  const heroTimeline = gsap.timeline();
  
  heroTimeline
    .fromTo('.hero-image', 
      { scale: 0, opacity: 0, rotation: 180 },
      { scale: 1, opacity: 1, rotation: 0, duration: 1.2, ease: 'back.out(1.7)' }
    )
    .fromTo('.hero-title', 
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out' }, 
      '-=0.5'
    )
    .fromTo('.hero-subtitle', 
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out' }, 
      '-=0.3'
    )
    .fromTo('.hero-description', 
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out' }, 
      '-=0.3'
    )
    .fromTo('.hero-buttons', 
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out' }, 
      '-=0.3'
    );

  // Animación de las secciones con ScrollTrigger
  gsap.utils.toArray('.animate-section').forEach((section, index) => {
    gsap.fromTo(section, 
      { y: 100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse'
        }
      }
    );
  });

  // Animación de los títulos de sección
  gsap.utils.toArray('.section-title').forEach((title) => {
    gsap.fromTo(title, 
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: title,
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        }
      }
    );
  });

  // Animación de las tarjetas de proyectos
  gsap.utils.toArray('.project-card').forEach((card, index) => {
    gsap.fromTo(card, 
      { y: 80, opacity: 0, scale: 0.9 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.8,
        ease: 'back.out(1.7)',
        delay: index * 0.2,
        scrollTrigger: {
          trigger: card,
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        }
      }
    );
  });

  // Animación de las skills
  gsap.utils.toArray('.skill-tag').forEach((skill, index) => {
    gsap.fromTo(skill, 
      { x: -50, opacity: 0, scale: 0.8 },
      {
        x: 0,
        opacity: 1,
        scale: 1,
        duration: 0.8,
        ease: 'back.out(1.7)',
        delay: index * 0.1,
        scrollTrigger: {
          trigger: skill,
          start: 'top 90%',
          toggleActions: 'play none none reverse'
        }
      }
    );
  });
  
  // Animación de hover para skills
  gsap.utils.toArray('.skill-tag').forEach((skill) => {
    skill.addEventListener('mouseenter', () => {
      gsap.to(skill, { scale: 1.05, y: -5, duration: 0.3, ease: 'power2.out' });
    });
    
    skill.addEventListener('mouseleave', () => {
      gsap.to(skill, { scale: 1, y: 0, duration: 0.3, ease: 'power2.out' });
    });
  });

  // Animación de las cajas de información en About
  gsap.utils.toArray('.info-box').forEach((box, index) => {
    gsap.fromTo(box, 
      { x: index % 2 === 0 ? -80 : 80, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power2.out',
        delay: index * 0.2,
        scrollTrigger: {
          trigger: box,
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        }
      }
    );
  });

  // Animación del formulario de contacto
  gsap.utils.toArray('.form-field').forEach((field, index) => {
    gsap.fromTo(field, 
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        ease: 'power2.out',
        delay: index * 0.1,
        scrollTrigger: {
          trigger: field,
          start: 'top 90%',
          toggleActions: 'play none none reverse'
        }
      }
    );
  });

  // Animación de hover para botones
  gsap.utils.toArray('.animated-button').forEach((button) => {
    button.addEventListener('mouseenter', () => {
      gsap.to(button, { scale: 1.05, duration: 0.3, ease: 'power2.out' });
    });
    
    button.addEventListener('mouseleave', () => {
      gsap.to(button, { scale: 1, duration: 0.3, ease: 'power2.out' });
    });
  });

  // Animación de parallax para el fondo
  gsap.to('.parallax-bg', {
    yPercent: -50,
    ease: 'none',
    scrollTrigger: {
      trigger: 'body',
      start: 'top bottom',
      end: 'bottom top',
      scrub: true
    }
  });

  // Animación de texto escribiéndose
  const textElements = gsap.utils.toArray('.typewriter');
  textElements.forEach((element) => {
    const text = element.textContent;
    element.textContent = '';
    
    gsap.fromTo(element, 
      { width: 0 },
      {
        width: 'auto',
        duration: 2,
        ease: 'power2.inOut',
        scrollTrigger: {
          trigger: element,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        },
        onUpdate: function() {
          const progress = this.progress();
          const currentLength = Math.floor(progress * text.length);
          element.textContent = text.substring(0, currentLength);
        }
      }
    );
  });
}

// Función para animaciones de hover en las tarjetas de proyecto
export function initProjectCardHovers() {
  gsap.utils.toArray('.project-card').forEach((card) => {
    const icon = card.querySelector('.project-icon');
    
    card.addEventListener('mouseenter', () => {
      gsap.to(card, { y: -10, duration: 0.3, ease: 'power2.out' });
      gsap.to(icon, { rotation: 360, scale: 1.1, duration: 0.5, ease: 'power2.out' });
    });
    
    card.addEventListener('mouseleave', () => {
      gsap.to(card, { y: 0, duration: 0.3, ease: 'power2.out' });
      gsap.to(icon, { rotation: 0, scale: 1, duration: 0.5, ease: 'power2.out' });
    });
  });
}