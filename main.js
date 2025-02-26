// Wacht tot het DOM volledig is geladen
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navList = document.querySelector('.nav-list');
    
    if (mobileMenuToggle && navList) {
        mobileMenuToggle.addEventListener('click', function() {
            navList.classList.toggle('active');
        });
    }
    
    // Sluit menu wanneer er op een link wordt geklikt
    const navLinks = document.querySelectorAll('.nav-list a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navList.classList.remove('active');
        });
    });
    
    // Smooth scroll naar secties
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Offset voor de sticky header
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Actieve menu-item markeren op basis van scroll positie
    function setActiveNavItem() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPosition = window.scrollY;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                document.querySelectorAll('.nav-list a').forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    // Luister naar scroll events voor actieve menu-items
    window.addEventListener('scroll', setActiveNavItem);
    
    // Animaties toevoegen (kan later worden uitgebreid)
    function initAnimations() {
        // Hier kunnen later animaties worden toegevoegd
        console.log('Animaties geïnitialiseerd');
    }
    
    initAnimations();
});
