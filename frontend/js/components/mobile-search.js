function initMobileSearch() {
    const mobileMenu = document.createElement('div');
    mobileMenu.id = 'mobile-menu';
    mobileMenu.className = 'md:hidden fixed inset-0 bg-gradient-to-b from-blue-600 to-blue-800 z-50 transform translate-x-full transition-transform duration-300';
    mobileMenu.innerHTML = `
        <div class="container mx-auto px-4 py-6">
            <!-- Close Button -->
            <button id="close-mobile-menu" class="text-white absolute top-6 right-6">
                <i class="fas fa-times text-2xl"></i>
            </button>

            <!-- Mobile Search -->
            <div class="pt-12 pb-6">
                <div class="relative">
                    <input type="text" placeholder="Search for products..." 
                        class="w-full px-4 py-2 rounded-full border border-white/20 bg-white/10 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50">
                    <button class="absolute right-0 top-0 h-full px-4 text-white">
                        <i class="fas fa-search"></i>
                    </button>
                </div>
            </div>

            <!-- Mobile Navigation -->
            <nav class="space-y-6">
                <a href="/frontend/index.html" class="block text-white text-lg py-2">Home</a>
                <div class="mobile-dropdown">
                    <button class="flex items-center justify-between w-full text-white text-lg py-2">
                        Categories
                        <i class="fas fa-chevron-down text-sm"></i>
                    </button>
                    <div class="mobile-dropdown-menu hidden pl-4 mt-2 space-y-2">
                        <a href="#" class="block text-white/90 py-2">Mobile Phones</a>
                        <a href="#" class="block text-white/90 py-2">Laptops</a>
                        <a href="#" class="block text-white/90 py-2">Tablets</a>
                        <a href="#" class="block text-white/90 py-2">Home Appliances</a>
                    </div>
                </div>
                <a href="#" class="block text-white text-lg py-2">About</a>
                <a href="#" class="block text-white text-lg py-2">Sell</a>

                <!-- Mobile User Actions -->
                <div class="border-t border-white/20 pt-6 mt-6">
                    <div class="grid grid-cols-3 gap-4 mb-6">
                        <a href="#" class="flex flex-col items-center text-white">
                            <i class="fas fa-coins text-xl mb-1"></i>
                            <span class="text-sm">Points</span>
                        </a>
                        <a href="#" class="flex flex-col items-center text-white">
                            <i class="fas fa-shopping-cart text-xl mb-1"></i>
                            <span class="text-sm">Cart</span>
                        </a>
                        <a href="#" class="flex flex-col items-center text-white">
                            <i class="fas fa-bell text-xl mb-1"></i>
                            <span class="text-sm">Alerts</span>
                        </a>
                    </div>

                    <!-- Mobile Auth Buttons -->
                    <div class="space-y-3">
                        <a href="/frontend/signin.html" class="block w-full text-center text-white border border-white/20 px-4 py-2 rounded-full hover:bg-white/10 transition duration-300">
                            Sign In
                        </a>
                        <a href="/frontend/signup.html" class="block w-full text-center bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-full transition duration-300">
                            Sign Up
                        </a>
                    </div>
                </div>
            </nav>
        </div>
    `;

    document.body.appendChild(mobileMenu);

    // Toggle mobile menu
    const menuButton = document.querySelector('.md\\:hidden');
    const closeButton = document.getElementById('close-mobile-menu');

    menuButton.addEventListener('click', () => {
        mobileMenu.classList.remove('translate-x-full');
    });

    closeButton.addEventListener('click', () => {
        mobileMenu.classList.add('translate-x-full');
    });

    // Toggle mobile dropdowns
    const mobileDropdowns = document.querySelectorAll('.mobile-dropdown button');
    mobileDropdowns.forEach(button => {
        button.addEventListener('click', () => {
            const menu = button.nextElementSibling;
            const icon = button.querySelector('i');
            menu.classList.toggle('hidden');
            icon.classList.toggle('fa-chevron-down');
            icon.classList.toggle('fa-chevron-up');
        });
    });
} 