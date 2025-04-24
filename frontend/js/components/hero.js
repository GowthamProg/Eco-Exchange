function initHero() {
    const hero = document.querySelector('#hero');
    if (!hero) return;

    // Add popup HTML to the document
    document.body.insertAdjacentHTML('beforeend', `
        <div id="ecoPointsPopup" class="fixed inset-0 bg-black bg-opacity-50 z-50 hidden">
            <div class="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg p-8 max-w-md w-full">
                <h2 class="text-2xl font-bold mb-4 text-emerald-800">Eco Points System</h2>
                <div class="space-y-4">
                    <p class="text-gray-600">Earn points for your eco-friendly actions:</p>
                    <ul class="list-disc pl-5 space-y-2 text-gray-600">
                        <li><span class="font-semibold">Disposal Points:</span> 10 points per kg of e-waste</li>
                        <li><span class="font-semibold">Condition Bonus:</span>
                            <ul class="list-none pl-5 space-y-1">
                                <li>- Working: 50 points</li>
                                <li>- Partially Working: 30 points</li>
                                <li>- Non-working: 20 points</li>
                                <li>- Damaged: 10 points</li>
                            </ul>
                        </li>
                        <li><span class="font-semibold">Hazardous Materials:</span>
                            <ul class="list-none pl-5 space-y-1">
                                <li>- Contains: 40 points</li>
                                <li>- Does not contain: 20 points</li>
                                <li>- Unsure: 10 points</li>
                            </ul>
                        </li>
                    </ul>
                    <p class="text-gray-600 mt-4">Use your points to get discounts on eco-friendly products!</p>
                </div>
                <button onclick="hideEcoPointsPopup()" class="mt-6 w-full bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition duration-300">
                    Got it!
                </button>
            </div>
        </div>
    `);

    // Add popup functions to window scope
    window.showEcoPointsPopup = function() {
        const popup = document.getElementById('ecoPointsPopup');
        popup.classList.remove('hidden');
        
        // Close popup when clicking outside
        popup.addEventListener('click', function(e) {
            if (e.target === popup) {
                hideEcoPointsPopup();
            }
        });
    };

    window.hideEcoPointsPopup = function() {
        const popup = document.getElementById('ecoPointsPopup');
        popup.classList.add('hidden');
    };

    // Initialize appropriate hero based on current page
    const path = window.location.pathname;
    if (path.includes('dispose.html')) {
        initDisposeHero(hero);
    } else if (path.includes('sell.html')) {
        initSellHero(hero);
    } else if (path.includes('about.html')) {
        initAboutHero(hero);
    } else {
        initHomeHero(hero);
    }
}

function initHomeHero(hero) {
    hero.innerHTML = `
        <section class="relative min-h-screen overflow-hidden">
            <!-- Background Slideshow -->
            <div class="absolute inset-0 bg-slideshow">
                <div class="slide active" style="background-image: url('../assets/images/slide 1.jpg');"></div>
                <div class="slide" style="background-image: url('../assets/images/slide 2.jpg');"></div>
                <div class="slide" style="background-image: url('../assets/images/slide 3.jpg');"></div>
                <div class="slide" style="background-image: url('../assets/images/slide 4.jpg');"></div>
            </div>
            <!-- Overlay with teal to light green gradient -->
            <div class="absolute inset-0" style="background: linear-gradient(180deg, #008B8B 0%, #009B8B 30%, #00AB8B 50%, #00CC9B 70%, #00DDBB 100%);opacity: 0.75;"></div>
            
            <div class="container mx-auto px-4 pt-32 pb-20 relative z-10">
                <div class="flex flex-col md:flex-row items-center">
                    <div class="md:w-1/2 mb-8 md:mb-0">
                        <h1 class="text-4xl md:text-5xl font-bold mb-4 text-white">Give Your E-Waste A Second Life</h1>
                        <p class="text-xl mb-6 text-white/90">Join our community to recycle, repair, or reuse electronic waste responsibly. Earn rewards for your eco-friendly actions!</p>
                        <div class="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-5">
                            <a href="sell.html" class="bg-white text-emerald-600 px-6 py-3 rounded-full font-bold hover:bg-emerald-50 transition duration-300 inline-flex items-center">
                                Sell Your Items <i class="fas fa-arrow-right ml-2"></i>
                            </a>
                            <a href="about.html" class="border-2 border-white text-white px-6 py-3 rounded-full font-bold hover:bg-white/10 transition duration-300 inline-flex items-center">
                                Learn More
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <!-- Decorative bottom wave -->
            <div class="absolute bottom-0 left-0 right-0">
                <svg class="w-full h-23 fill-current text-emerald-50" viewBox="0 0 600 74" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0,32L60,37.3C120,43,240,53,360,58.7C480,64,600,64,720,58.7C840,53,960,43,1080,37.3C1200,32,1320,32,1380,32L1440,32L1440,74L1380,74C1320,74,1200,74,1080,74C960,74,840,74,720,74C600,74,480,74,360,74C240,74,120,74,60,74L0,74Z"/>
                </svg>
            </div>
        </section>
    `;

    // Add slideshow styles
    const style = document.createElement('style');
    style.textContent = `
        .bg-slideshow {
            position: absolute;
            width: 100%;
            height: 100%;
            z-index: 0;
        }
        
        .slide {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-size: cover;
            background-position: center;
            opacity: 0;
            transition: opacity 1s ease-in-out;
            z-index: 1;
        }
        
        .slide.active {
            opacity: 1;
            z-index: 2;
        }
    `;
    document.head.appendChild(style);

    // Initialize slideshow
    const slides = document.querySelectorAll('.slide');
    let currentSlide = 0;

    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        slides[index].classList.add('active');
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    // Start slideshow
    showSlide(0);
    setInterval(nextSlide, 5000); // Change slide every 5 seconds
}

function initDisposeHero(hero) {
    hero.innerHTML = `
        <section class="relative h-[500px] w-full">
            <div class="absolute inset-0" style="background: linear-gradient(rgba(3, 105, 161, 0.7), rgba(5, 150, 105, 0.7)), url('../assets/images/dispose.jpg'); background-size: cover; background-position: center;"></div>
            <div class="relative container mx-auto px-4 h-full flex items-center pt-20">
                <div class="max-w-xl">
                    <h1 class="text-4xl md:text-5xl font-bold text-white mb-4">Responsible E-Waste Disposal</h1>
                    <p class="text-xl text-white/90 mb-6">Join us in making a difference. Dispose of your electronic waste responsibly and earn Eco Points for your contribution to a greener planet.</p>
                    <div class="flex flex-col sm:flex-row gap-4">
                        <button onclick="showEcoPointsPopup()" class="border-2 border-white text-white px-6 py-3 rounded-full font-bold hover:bg-white/10 transition duration-300 text-center">
                            Learn About Eco Points <i class="fas fa-info-circle ml-2"></i>
                        </button>
                    </div>
                </div>
            </div>
            <!-- Decorative bottom wave -->
            <div class="absolute bottom-0 left-0 right-0">
                <svg class="w-full h-25 fill-current text-emerald-50" viewBox="0 0 1400 73" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0,32L60,37.3C120,43,240,53,360,58.7C480,64,600,64,720,58.7C840,53,960,43,1080,37.3C1200,32,1320,32,1380,32L1440,32L1440,74L1380,74C1320,74,1200,74,1080,74C960,74,840,74,720,74C600,74,480,74,360,74C240,74,120,74,60,74L0,74Z"/>
                </svg>
            </div>
        </section>
    `;
}

function initSellHero(hero) {
    hero.innerHTML = `
        <section class="relative min-h-[50vh] hero-bg">
            <div class="absolute inset-0 bg-gradient-to-r from-emerald-900/80 to-emerald-800/80"></div>
            <div class="container mx-auto px-4 pt-32 pb-20 relative z-10">
                <div class="max-w-3xl mx-auto text-center">
                    <h1 class="text-4xl md:text-5xl font-bold mb-4 text-white">Sell Your Items</h1>
                    <p class="text-xl mb-6 text-white/90">List your items for sale and contribute to a sustainable future. Earn eco points for every item sold!</p>
                </div>
            </div>
            <!-- Decorative bottom wave -->
            <div class="absolute bottom-0 left-0 right-0">
                <svg class="w-full h-25 fill-current text-emerald-50" viewBox="0 0 1400 80" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0,32L60,37.3C120,43,240,53,360,58.7C480,64,600,64,720,58.7C840,53,960,43,1080,37.3C1200,32,1320,32,1380,32L1440,32L1440,74L1380,74C1320,74,1200,74,1080,74C960,74,840,74,720,74C600,74,480,74,360,74C240,74,120,74,60,74L0,74Z"/>
                </svg>
            </div>
        </section>
    `;
} 