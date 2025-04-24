document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initNavbar();
    initMobileSearch();
    initHero();
    initFilterSection();
    initFeaturedListings();
    initEcoAwareness();
    initCTA();
    initTopSellers();
    initNewsletter();
    initFooter();

    // Add active class to nav links on click
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // Simple product card hover effect
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.1)';
        });
        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.boxShadow = '';
        });
    });
    
    // Points popup functionality
    const pointsTrigger = document.querySelector('.points-trigger');
    const pointsPopup = document.querySelector('.points-popup');
    
    if (pointsTrigger && pointsPopup) {
        pointsTrigger.addEventListener('mouseenter', function() {
            pointsPopup.style.display = 'block';
        });
        
        pointsTrigger.addEventListener('mouseleave', function() {
            setTimeout(() => {
                if (!pointsPopup.matches(':hover')) {
                    pointsPopup.style.display = 'none';
                }
            }, 100);
        });
        
        pointsPopup.addEventListener('mouseleave', function() {
            this.style.display = 'none';
        });
    }
}); 