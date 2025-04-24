function initFilterSection() {
    const filterSection = document.getElementById('filter-section');
    if (!filterSection) return;

    const recyclingCategories = [
        { name: 'Repairable', icon: 'fa-wrench', color: 'blue', description: 'Items that can be fixed and reused' },
        { name: 'Recyclable', icon: 'fa-recycle', color: 'emerald', description: 'Items suitable for recycling process' },
        { name: 'Spare Parts', icon: 'fa-cogs', color: 'amber', description: 'Reusable components and parts' },
        ];

    const productCategories = [
        { name: 'Phones & Tablets', icon: 'fa-mobile-alt', color: 'blue', description: 'Smartphones and tablets' },
        { name: 'Laptops & PCs', icon: 'fa-laptop', color: 'indigo', description: 'Computers and accessories' },
        { name: 'Home Appliances', icon: 'fa-blender', color: 'emerald', description: 'Mixers, AC, Microwave...' },
        { name: 'Machinery & Tools', icon: 'fa-tools', color: 'gray', description: 'Industrial and power tools' },
        { name: 'Vehicle Electronics', icon: 'fa-car', color: 'red', description: 'Automotive electronic parts' },
        { name: 'Toys & Games', icon: 'fa-gamepad', color: 'purple', description: 'Electronic toys and games' },
        { name: 'Medical Devices', icon: 'fa-heartbeat', color: 'pink', description: 'Healthcare equipment' },
        { name: 'Sensors & Monitoring', icon: 'fa-microchip', color: 'cyan', description: 'Control systems and sensors' },
        { name: 'Automatic Dispensers', icon: 'fa-pump-soap', color: 'teal', description: 'Sanitizer and vending machines' },
        { name: 'Hazardous Materials', icon: 'fa-radiation-alt', color: 'yellow', description: 'Batteries, capacitors, chemical storage, power banks' }
    ];

    filterSection.innerHTML = `
        <style>
            .filter-wrapper:hover > .filter-card:not(:hover):not(.selected) {
                filter: blur(2px);
                opacity: 0.7;
            }
            
            .filter-card {
                transition: all 0.3s ease;
                background-color: rgba(255, 255, 255, 0.9);
                backdrop-filter: blur(8px);
            }
            
            .filter-card:hover {
                transform: scale(1.03);
                background-color: rgba(255, 255, 255, 1);
            }

            .filter-card.selected {
                transform: translateY(-4px);
                box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
            }

            .filter-card.selected:hover {
                transform: translateY(-6px) scale(1.02);
            }

            .icon-circle {
                transition: all 0.3s ease;
            }

            .filter-card.selected .icon-circle {
                transform: scale(1.1);
            }

            .category-description {
                opacity: 0;
                transition: opacity 0.3s ease;
            }

            .filter-card:hover .category-description {
                opacity: 1;
            }
        </style>
        <section class="py-12 bg-white/30 backdrop-blur-sm">
            <div class="container mx-auto px-4">
                <!-- Recycling Categories -->
                <h2 class="text-3xl font-bold text-center mb-4">Filter by Category</h2>
                <p class="text-gray-600 text-center mb-10">Select how you want to dispose of your e-waste</p>
                <div class="filter-wrapper grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
                    ${recyclingCategories.map(cat => `
                        <button data-filter-type="recycling" data-category="${cat.name.toLowerCase()}" 
                            class="filter-card rounded-xl p-4 text-center transition-all duration-300 
                            focus:outline-none group hover:shadow-xl relative">
                            <div class="icon-circle w-14 h-14 bg-${cat.color}-100 rounded-full flex items-center justify-center mx-auto mb-3
                                group-hover:bg-${cat.color}-200 transition-colors duration-300">
                                <i class="fas ${cat.icon} text-${cat.color}-500 text-xl"></i>
                            </div>
                            <h3 class="text-base font-medium text-gray-800 mb-1">${cat.name}</h3>
                            <p class="text-gray-600 text-xs category-description">${cat.description}</p>
                            <div class="absolute top-2 right-2 opacity-0 transition-opacity duration-300 selected-indicator">
                                <i class="fas fa-check text-${cat.color}-500 text-lg"></i>
                            </div>
                        </button>
                    `).join('')}
                </div>

                <!-- Product Categories -->
                <h2 class="text-3xl font-bold text-center mb-4">Browse By Category</h2>
                <p class="text-gray-600 text-center mb-10">Explore e-waste categories</p>
                <div class="filter-wrapper grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                    ${productCategories.map(cat => `
                        <button data-filter-type="product" data-category="${cat.name.toLowerCase()}"
                            class="filter-card rounded-xl p-4 text-center transition-all duration-300
                            focus:outline-none group hover:shadow-xl relative">
                            <div class="icon-circle w-14 h-14 bg-${cat.color}-100 rounded-full flex items-center justify-center mx-auto mb-3
                                group-hover:bg-${cat.color}-200 transition-colors duration-300">
                                <i class="fas ${cat.icon} text-${cat.color}-500 text-xl"></i>
                            </div>
                            <h3 class="text-sm font-medium text-gray-800 mb-1">${cat.name}</h3>
                            <p class="text-gray-600 text-xs category-description">${cat.description}</p>
                            <div class="absolute top-2 right-2 opacity-0 transition-opacity duration-300 selected-indicator">
                                <i class="fas fa-check text-${cat.color}-500 text-lg"></i>
                            </div>
                        </button>
                    `).join('')}
                </div>
            </div>
        </section>
    `;

    // Track selected filters
    const selectedFilters = {
        recycling: new Set(),
        product: new Set()
    };

    // Add event listeners for filter buttons
    const filterButtons = filterSection.querySelectorAll('.filter-card');
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filterType = button.dataset.filterType;
            const category = button.dataset.category;
            const color = button.querySelector('i').classList.toString().match(/text-(\w+)-500/)[1];
            
            // Toggle selection
            if (selectedFilters[filterType].has(category)) {
                selectedFilters[filterType].delete(category);
                button.classList.remove('selected');
                button.classList.remove(`border-${color}-500`);
                button.querySelector('.selected-indicator').style.opacity = '0';
            } else {
                selectedFilters[filterType].add(category);
                button.classList.add('selected');
                button.classList.add(`border-${color}-500`);
                button.querySelector('.selected-indicator').style.opacity = '1';
            }

            // Apply filters to product cards
            applyFilters(selectedFilters);
        });
    });
}

function updateSelectionCount(filterType, count) {
    const countElement = document.querySelector(`[data-filter-type="${filterType}"] .selection-count`);
    if (countElement && count > 0) {
        countElement.textContent = `${count} selected`;
        countElement.style.opacity = '1';
    } else if (countElement) {
        countElement.style.opacity = '0';
    }
}

// Function to apply filters to product cards
function applyFilters(selectedFilters) {
    // Convert Sets to Arrays for compatibility with filterAndRenderListings
    const filters = {
        recycling: Array.from(selectedFilters.recycling),
        product: Array.from(selectedFilters.product)
    };
    
    // Call the filterAndRenderListings function from featured-listings.js
    if (typeof window.featuredListings?.filterAndRenderListings === 'function') {
        window.featuredListings.filterAndRenderListings('', filters);
    } else {
        console.error('filterAndRenderListings function not found');
    }
} 