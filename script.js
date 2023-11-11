document.addEventListener('DOMContentLoaded', () => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add the animation class to each text element in the section
                entry.target.querySelectorAll('h1, h2, p, a').forEach(text => {
                    text.classList.add('text-animate');
                });
            }
        });
    }, {
        threshold: 0.5 // Adjust if needed
    });

    // Observe all sections
    document.querySelectorAll('.section').forEach(section => {
        observer.observe(section);
    });
});