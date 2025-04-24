function initNavbar() {
    const navbar = document.getElementById('navbar');
    navbar.innerHTML = `
        <style>
            .nav-container {
                background-color: #1e272e;
                padding: 1rem 2rem;
                border-radius: 1.5rem;
                display: flex;
                justify-content: center;
                align-items: center;
            }

            .nav-menu {
                display: flex;
                list-style: none;
            }

            .nav-item {
                position: relative;
                cursor: pointer;
                display: inline-block;
                padding: 0.5rem 0.75rem;
            }

            .nav-item i {
                font-size: 1.1rem;
                vertical-align: middle;
            }

            .nav-label {
                position: absolute;
                bottom: -22px;
                left: 50%;
                transform: translateX(-50%) translateY(5px);
                font-size: 0.8rem;
                opacity: 0;
                transition: all 0.3s ease;
                white-space: nowrap;
            }

            .nav-label::after {
                content: "";
                position: absolute;
                left: 0;
                bottom: -2px;
                height: 2px;
                width: 100%;
                background-color: #00c3ff;
                transform: scaleX(0);
                transform-origin: left;
                transition: transform 0.3s ease;
            }

            .nav-item:hover .nav-label {
                opacity: 1;
                transform: translateX(-50%) translateY(0);
            }

            .nav-item:hover .nav-label::after {
                transform: scaleX(1);
            }

            .search-form {
                position: relative;
                transition: all 1s;
                width: 50px;
                height: 50px;
                background: rgba(255, 255, 255, 0.1);
                box-sizing: border-box;
                border-radius: 25px;
                border: 4px solid rgba(255, 255, 255, 0.2);
                padding: 5px;
            }

            .search-input {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                line-height: 30px;
                outline: 0;
                border: 0;
                display: none;
                font-size: 1em;
                border-radius: 20px;
                padding: 0 20px;
                background: rgba(255, 255, 255, 0.1);
                color: white;
                backdrop-filter: blur(5px);
            }

            .search-input::placeholder {
                color: rgba(255, 255, 255, 0.8);
            }

            .search-btn {
                box-sizing: border-box;
                padding: 10px;
                width: 42.5px;
                height: 42.5px;
                position: absolute;
                top: 0;
                right: 0;
                border-radius: 50%;
                color: white;
                text-align: center;
                font-size: 1.2em;
                transition: all 1s;
                display: flex;
                align-items: center;
                justify-content: center;
            }

            .search-form:hover,
            .search-form:focus-within {
                width: 300px;
                cursor: pointer;
                background: rgba(255, 255, 255, 0.2);
            }

            .search-form:hover .search-input,
            .search-form:focus-within .search-input {
                display: block;
            }

            .search-form:hover .search-btn,
            .search-form:focus-within .search-btn {
                background: #34d399;
                color: white;
            }

            @media (max-width: 768px) {
                .search-form {
                    display: none;
                }
            }

            .divider {
                width: 1px;
                height: 24px;
                background: rgba(255, 255, 255, 0.2);
                margin: 0 16px;
            }

            .nav-links-container {
                display: flex;
                align-items: center;
                gap: 24px;
            }

            .points-animation {
                animation: pointsPulse 0.5s ease-in-out;
            }

            @keyframes pointsPulse {
                0% { transform: scale(1); }
                50% { transform: scale(1.1); }
                100% { transform: scale(1); }
            }
        </style>
        <nav class="absolute top-0 left-0 w-full z-30">
            <div class="container mx-auto px-2 py-6 flex justify-between items-center">
                <!-- Left Side: Logo -->
                <div class="flex items-center">
                    <div class="flex items-center space-x-2 cursor-pointer transform hover:scale-105 transition-transform duration-300">
                        <i class="fas fa-recycle text-3xl text-white"></i>
                        <span class="text-xl font-bold text-white">EcoExchange</span>
                    </div>
                </div>
                
                <!-- Right Side: Navigation Links, Search, Icons, and Auth -->
                <div class="hidden md:flex items-center space-x-4">
                    <!-- Navigation Links -->
                    <div class="nav-links-container">
                        <a href="index.html" class="text-white hover:text-emerald-200 font-medium transform hover:scale-105 transition-all duration-300">Home</a>
                        <a href="about.html" class="text-white hover:text-emerald-200 font-medium transform hover:scale-105 transition-all duration-300">About</a>
                        <a href="dispose.html" class="text-white hover:text-emerald-200 font-medium transform hover:scale-105 transition-all duration-300">Dispose</a>
                       </div>

                    <!-- Search Bar -->
                    <form class="search-form" onsubmit="event.preventDefault();">
                        <input type="search" class="search-input" placeholder="Search for products..." />
                        <button type="button" class="search-btn">
                            <i class="fas fa-search"></i>
                        </button>
                    </form>

                    <div class="divider"></div>

                    <!-- User Action Icons -->
                    <div class="flex items-center space-x-3">
                        <div class="nav-item points-trigger">
                            <i class="fas fa-coins text-white"></i>
                            <span class="nav-label text-white">Points</span>
                            <div class="points-popup hidden absolute right-0 mt-2 bg-white/90 backdrop-blur-md shadow-lg rounded-lg p-4 z-40 w-64 transform transition-all duration-300 border border-emerald-200/50">
                                <h4 class="font-bold text-lg mb-2 text-gray-800">Your Eco Points</h4>
                                <p class="text-gray-700 mb-2">You have <span id="userPoints" class="font-bold text-emerald-600">0</span> points</p>
                                <p class="text-sm text-gray-600">Redeem points for discounts or donate to eco causes.</p>
                                <div class="mt-3">
                                    <button class="bg-emerald-500 text-white px-4 py-2 rounded-full text-sm hover:bg-emerald-600 transition-colors duration-300">Redeem</button>
                                </div>
                            </div>
                        </div>
                        <a href="cart.html" class="nav-item">
                            <i class="fas fa-shopping-cart text-white"></i>
                            <span class="nav-label text-white">Cart</span>
                        </a>
                        <a href="#" class="nav-item">
                            <i class="fas fa-bell text-white"></i>
                            <span class="nav-label text-white">Notifications</span>
                        </a>
                    </div>

                    <div class="divider"></div>

                    <!-- Auth Buttons -->
                    <div class="flex items-center space-x-4">
                        <div class="nav-item profile-trigger">
                            <i class="fas fa-user-circle text-white text-4xl"></i>
                            <span class="nav-label text-white">Profile</span>
                            <div class="profile-popup hidden absolute right-0 mt-2 bg-white/90 backdrop-blur-md shadow-lg rounded-lg p-4 z-40 w-64 transform transition-all duration-300 border border-emerald-200/50">
                                <div class="guest-view">
                                    <h4 class="font-bold text-lg mb-2 text-gray-800">Welcome to EcoExchange</h4>
                                    <p class="text-gray-600 text-sm mb-4">Sign in to access your profile, track orders, and manage listings.</p>
                                    <div class="space-y-2">
                                        <a href="signup.html" class="block w-full bg-white border border-emerald-500 text-emerald-500 text-center px-4 py-2 rounded-full text-sm hover:bg-emerald-50 transition-colors duration-300">
                                            Create Account
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Mobile Menu Button -->
                <button class="md:hidden p-2 text-white">
                    <i class="fas fa-bars text-xl"></i>
                </button>
            </div>
        </nav>
    `;

    // Initialize points
    initializePoints();

    // Add event listeners for points popup
    const pointsTrigger = navbar.querySelector('.points-trigger');
    const pointsPopup = navbar.querySelector('.points-popup');
    
    // Add event listeners for profile popup
    const profileTrigger = navbar.querySelector('.profile-trigger');
    const profilePopup = navbar.querySelector('.profile-popup');
    
    profileTrigger.addEventListener('mouseenter', () => {
        profilePopup.classList.remove('hidden');
    });
    
    profileTrigger.addEventListener('mouseleave', () => {
        setTimeout(() => {
            if (!profilePopup.matches(':hover')) {
                profilePopup.classList.add('hidden');
            }
        }, 300);
    });
    
    profilePopup.addEventListener('mouseleave', () => {
        profilePopup.classList.add('hidden');
    });

    pointsTrigger.addEventListener('mouseenter', () => {
        pointsPopup.classList.remove('hidden');
    });
    
    pointsTrigger.addEventListener('mouseleave', () => {
        setTimeout(() => {
            if (!pointsPopup.matches(':hover')) {
                pointsPopup.classList.add('hidden');
            }
        }, 300);
    });

    pointsPopup.addEventListener('mouseleave', () => {
        pointsPopup.classList.add('hidden');
    });

    // Add event listener for search input
    const searchInput = navbar.querySelector('.search-input');
    let searchTimeout;
    if (searchInput) {
        searchInput.addEventListener('input', (event) => {
            // Clear the previous timeout if it exists
            clearTimeout(searchTimeout);

            const query = event.target.value;

            // Set a new timeout to delay the search function call
            searchTimeout = setTimeout(() => {
                // Check if the filter function exists before calling
                if (typeof window.featuredListings?.filterAndRenderListings === 'function') {
                    window.featuredListings.filterAndRenderListings(query, currentFilters);
                } else {
                    console.error('filterAndRenderListings function not found. Make sure featured-listings.js is loaded and correct.');
                }
            }, 300); // Debounce time: 300ms
        });
    }
}

// Function to initialize points
function initializePoints() {
    // TODO: Replace with actual API call when backend is ready
    // For now, using localStorage to simulate user points
    let points = localStorage.getItem('userPoints');
    if (!points) {
        points = '0';
        localStorage.setItem('userPoints', points);
    }
    updatePointsDisplay(points);
}

// Function to update points display
function updatePointsDisplay(points) {
    const pointsElement = document.getElementById('userPoints');
    if (pointsElement) {
        const currentPoints = parseInt(pointsElement.textContent);
        const newPoints = parseInt(points);
        
        if (newPoints > currentPoints) {
            pointsElement.classList.add('points-animation');
            setTimeout(() => {
                pointsElement.classList.remove('points-animation');
            }, 500);
        }
        
        pointsElement.textContent = newPoints.toLocaleString();
    }
}

// Function to add points (to be called from other components)
function addPoints(amount) {
    const currentPoints = parseInt(localStorage.getItem('userPoints') || '0');
    const newPoints = currentPoints + amount;
    localStorage.setItem('userPoints', newPoints.toString());
    updatePointsDisplay(newPoints);
}

// Function to get current points
function getCurrentPoints() {
    return parseInt(localStorage.getItem('userPoints') || '0');
}

// Export functions for use in other components
window.ecoPoints = {
    addPoints,
    getCurrentPoints
}; 