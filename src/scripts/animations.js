import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/TextPlugin';

gsap.registerPlugin(ScrollTrigger, TextPlugin);

export function initAnimations() {
  // Header animation
  gsap.fromTo('header', 
    { y: -100, opacity: 0 },
    { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.5 }
  );

  // Hero section animations
  const heroTl = gsap.timeline({ delay: 1 });
  
  heroTl
    .fromTo('.hero-greeting', 
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }
    )
    .fromTo('.name-line', 
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out', stagger: 0.2 }, 
      '-=0.4'
    )
    .fromTo('.hero-subtitle', 
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }, 
      '-=0.3'
    )
    .fromTo('.hero-description', 
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }, 
      '-=0.3'
    )
    .fromTo('.hero-buttons', 
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }, 
      '-=0.3'
    )
    .fromTo('.scroll-indicator', 
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }, 
      '-=0.2'
    )
    .fromTo('.hero-decoration', 
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 1, duration: 1, ease: 'back.out(1.7)', stagger: 0.2 }, 
      '-=0.5'
    );

  // Typing animation for hero name
  const names = ['John', 'Developer', 'Creator', 'Problem Solver'];
  let currentIndex = 0;
  
  function typeNextName() {
    const typingElement = document.querySelector('.typing-text');
    if (typingElement) {
      gsap.to(typingElement, {
        duration: 1,
        text: names[currentIndex],
        ease: 'none',
        onComplete: () => {
          setTimeout(() => {
            currentIndex = (currentIndex + 1) % names.length;
            typeNextName();
          }, 2000);
        }
      });
    }
  }
  
  setTimeout(typeNextName, 2000);

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

  gsap.fromTo('.skills-section', 
    { y: 50, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 1,
      ease: 'power3.out',
      delay: 0.2,
      scrollTrigger: {
        trigger: '.skills-section',
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
  gsap.fromTo('#projects p', 
    { y: 30, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '#projects p',
        start: 'top 85%',
        toggleActions: 'play none none reverse'
      }
    }
  );

  gsap.utils.toArray('.project-item').forEach((project, index) => {
    const isEven = index % 2 === 0;
    
    gsap.fromTo(project, 
      { y: 80, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: project,
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    // Animate project content and image separately for better effect
    const content = project.querySelector('.project-content');
    const image = project.querySelector('.project-image');
    
    gsap.fromTo(content, 
      { x: isEven ? -50 : 50, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 1,
        ease: 'power3.out',
        delay: 0.2,
        scrollTrigger: {
          trigger: project,
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    gsap.fromTo(image, 
      { x: isEven ? 50 : -50, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 1,
        ease: 'power3.out',
        delay: 0.4,
        scrollTrigger: {
          trigger: project,
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        }
      }
    );
  });

  // Contact section animations
  gsap.fromTo('.contact-subtitle', 
    { y: 30, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.contact-subtitle',
        start: 'top 85%',
        toggleActions: 'play none none reverse'
      }
    }
  );

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

  // Contact items stagger animation
  gsap.utils.toArray('.contact-item').forEach((item, index) => {
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
  gsap.utils.toArray('.cta-primary, .cta-secondary, .submit-button').forEach((button) => {
    button.addEventListener('mouseenter', () => {
      gsap.to(button, { scale: 1.05, duration: 0.3, ease: 'power2.out' });
    });
    
    button.addEventListener('mouseleave', () => {
      gsap.to(button, { scale: 1, duration: 0.3, ease: 'power2.out' });
    });
  });

  // Skill item hover animations
  gsap.utils.toArray('.skill-item').forEach((item) => {
    item.addEventListener('mouseenter', () => {
      gsap.to(item, { y: -5, duration: 0.3, ease: 'power2.out' });
    });
    
    item.addEventListener('mouseleave', () => {
      gsap.to(item, { y: 0, duration: 0.3, ease: 'power2.out' });
    });
  });

  // Smooth scrolling for navigation links
  gsap.utils.toArray('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        gsap.to(window, {
          duration: 1,
          scrollTo: { y: target, offsetY: 80 },
          ease: 'power3.inOut'
        });
      }
    });
  });

  // Parallax effect for decorative elements
  gsap.utils.toArray('.hero-decoration').forEach((decoration, index) => {
    gsap.to(decoration, {
      y: -50 * (index + 1),
      rotation: 360,
      duration: 20,
      repeat: -1,
      ease: 'none'
    });
  });

  // Header background change on scroll
  ScrollTrigger.create({
    start: 'top -80',
    end: 99999,
    toggleClass: { className: 'scrolled', targets: 'header' }
  });
}

// Initialize animations when DOM is ready
document.addEventListener('DOMContentLoaded', initAnimations);