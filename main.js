// Wacht tot het DOM volledig is geladen
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navList = document.querySelector('.nav-list');
    
    if (mobileMenuToggle && navList) {
        mobileMenuToggle.addEventListener('click', function() {
            navList.classList.toggle('active');
            mobileMenuToggle.classList.toggle('active');
            
            // Update ARIA attributes
            const isExpanded = mobileMenuToggle.getAttribute('aria-expanded') === 'true';
            mobileMenuToggle.setAttribute('aria-expanded', !isExpanded);
            
            // Voorkom scrollen van de pagina wanneer het menu open is
            document.body.classList.toggle('menu-open');
        });
    }
    
    // Sluit menu wanneer er op een link wordt geklikt
    const navLinks = document.querySelectorAll('.nav-list a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navList.classList.remove('active');
            mobileMenuToggle.classList.remove('active');
            mobileMenuToggle.setAttribute('aria-expanded', 'false');
            document.body.classList.remove('menu-open');
        });
    });
    
    // Sluit het menu als er buiten geklikt wordt
    document.addEventListener('click', function(e) {
        if (navList.classList.contains('active') && 
            !e.target.closest('.mobile-menu-toggle') && 
            !e.target.closest('.nav-list')) {
            navList.classList.remove('active');
            mobileMenuToggle.classList.remove('active');
            mobileMenuToggle.setAttribute('aria-expanded', 'false');
            document.body.classList.remove('menu-open');
        }
    });
    
    // Header aanpassingen bij scrollen
    const header = document.querySelector('.header');
    let lastScrollPosition = 0;
    
    function handleHeaderOnScroll() {
        const currentScrollPosition = window.scrollY;
        
        if (currentScrollPosition > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        lastScrollPosition = currentScrollPosition;
    }
    
    window.addEventListener('scroll', handleHeaderOnScroll);
    
    // Smooth scroll naar secties
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = header.offsetHeight;
                
                window.scrollTo({
                    top: targetElement.offsetTop - headerHeight,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Actieve menu-item markeren op basis van scroll positie
    function setActiveNavItem() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPosition = window.scrollY;
        const headerHeight = header.offsetHeight;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - headerHeight - 20;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                document.querySelectorAll('.nav-link').forEach(link => {
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
    
    // Voer de functie eenmaal uit bij het laden van de pagina
    setActiveNavItem();
});

// Voeg CSS classe toe aan body om menu-scrolling te voorkomen
document.head.insertAdjacentHTML('beforeend', `
    <style>
        body.menu-open {
            overflow: hidden;
        }
    </style>
`);
