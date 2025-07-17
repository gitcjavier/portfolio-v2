import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function initAnimations() {
  // Función para animar elementos en el viewport inicial con fade
  function animateInitialViewportElements() {
    const viewportElements = document.querySelectorAll('.hero-section img, .hero-section h1, .hero-section p, .hero-section .btn');
    
    gsap.fromTo(viewportElements, 
      { opacity: 0 },
      { opacity: 1, duration: 0.5, ease: 'power2.out', stagger: 0.1 }
    );
  }

  // Llamar a la función para animar elementos del viewport inicial
  animateInitialViewportElements();

  // Section animations with ScrollTrigger
  gsap.utils.toArray('.section-title').forEach((title) => {
    gsap.fromTo(title, 
      { y: 60, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: title,
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        }
      }
    );
  });

  // About section animations
  gsap.fromTo('.about-content', 
    { y: 50, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.about-content',
        start: 'top 85%',
        toggleActions: 'play none none reverse'
      }
    }
  );

  // Skill items stagger animation
  gsap.utils.toArray('.skill-item').forEach((item, index) => {
    gsap.fromTo(item, 
      { x: -30, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power3.out',
        delay: index * 0.1,
        scrollTrigger: {
          trigger: item,
          start: 'top 90%',
          toggleActions: 'play none none reverse'
        }
      }
    );
  });

  // Projects section animations
  gsap.utils.toArray('.project-item').forEach((project, index) => {
    gsap.fromTo(project, 
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.5,
        ease: 'power2.out',
        delay: index * 0.1,
        scrollTrigger: {
          trigger: project,
          start: 'top 90%',
          toggleActions: 'play none none reverse'
        }
      }
    );
  });

  // Contact section animations
  gsap.fromTo('.contact-content', 
    { y: 50, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.contact-content',
        start: 'top 85%',
        toggleActions: 'play none none reverse'
      }
    }
  );

  // Form groups stagger animation
  gsap.utils.toArray('.form-group').forEach((group, index) => {
    gsap.fromTo(group, 
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power3.out',
        delay: index * 0.1,
        scrollTrigger: {
          trigger: group,
          start: 'top 90%',
          toggleActions: 'play none none reverse'
        }
      }
    );
  });

  // Button hover animations
  gsap.utils.toArray('.btn').forEach((button) => {
    button.addEventListener('mouseenter', () => {
      gsap.to(button, { scale: 1.05, duration: 0.3, ease: 'power2.out' });
    });
    
    button.addEventListener('mouseleave', () => {
      gsap.to(button, { scale: 1, duration: 0.3, ease: 'power2.out' });
    });
  });

  // Header background change on scroll
  ScrollTrigger.create({
    start: 'top -90',
    end: 10,
    toggleClass: { className: 'scrolled', targets: 'header' }
  });
}

// Initialize animations when DOM is ready
document.addEventListener('DOMContentLoaded', initAnimations);