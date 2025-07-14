document.addEventListener('DOMContentLoaded', () => {
    const updateHeaderBackground = () => {
        const scrollPosition = window.scrollY;
        const header = document.querySelector('header');
        
        // Calcular opacidad basada en el scroll (0.95 a 0.2)
        const opacity = Math.max(0.2, 0.95 - (scrollPosition / 300));
        
        // Aplicar el estilo directamente
        header.style.backgroundColor = `rgba(255, 255, 255, ${opacity})`;
    };

    // Aplicar estilo inicial
    updateHeaderBackground();

    // Añadir listener para el scroll
    window.addEventListener('scroll', () => {
        requestAnimationFrame(updateHeaderBackground);
    }, { passive: true });
});
