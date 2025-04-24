// Sample product data with all required fields
const allProducts = [
    {
        id: 1,
        title: "MacBook Pro 14\" (2021)",
        description: "M1 Pro chip, 16GB RAM, 512GB SSD. Excellent condition with original box and accessories.",
        images: [
            "../assets/images/mac.jpg?text=MacBook+Front",
            ],
        recyclingCategory: "Repairable",
        productCategory: "Laptops & PCs",
        tags: ["Apple", "Laptop", "M1", "16GB RAM"],
        weight: 1.6,
        battery: "Non-removable",
        hazardousMaterials: "",
        seller: {
            name: "Rahul Sharma",
            phone: "+91 98765 43210",
            email: "rahul@example.com",
            address: "123 Green Park, New Delhi"
        },
        pickup: {
            address: "123 Green Park, New Delhi",
            instructions: "Call before arriving",
            date: "2023-06-15",
            timeSlot: "2PM-5PM"
        },
        price: 125000,
       
        postedDate: "2023-05-20"
    },
    {
        id: 2,
        title: "Lithium Battery Pack",
        description: "High-capacity lithium battery pack from electric scooter. Needs proper disposal.",
        images: [
            "../assets/images/lith.jpg?text=Battery+Pack"
        ],
        recyclingCategory: "Hazardous",
        productCategory: "Hazardous Materials",
        tags: ["Battery", "Lithium", "48V", "Hazardous"],
        weight: 5.2,
        battery: "Non-removable",
        hazardousMaterials: "Lithium-ion, cobalt, nickel",
        seller: {
            name: "Priya Patel",
            phone: "+91 87654 32109",
            email: "priya@example.com",
            address: "456 Whitefield, Bangalore"
        },
        pickup: {
            address: "456 Whitefield, Bangalore",
            instructions: "Handle with care - hazardous materials",
            date: "2023-06-20",
            timeSlot: "10AM-1PM"
        },
        price: 3500,
       
        postedDate: "2023-05-25"
    },
    {
        id: 3,
        title: "Sony CRT Television",
        description: "32-inch CRT TV from 2005. No longer working but contains valuable recyclable materials.",
        images: [
            "../assets/images/crt.jpg?text=CRT+TV"
        ],
        recyclingCategory: "Recyclable",
        productCategory: "Home Appliances",
        tags: ["Sony", "CRT", "Heavy", "Lead-glass"],
        weight: 48,
        battery: "No",
        hazardousMaterials: "Leaded glass",
        seller: {
            name: "Arun Kumar",
            phone: "+91 76543 21098",
            email: "arun@example.com",
            address: "789 Koramangala, Bangalore"
        },
        pickup: {
            address: "789 Koramangala, Bangalore",
            instructions: "Ground floor pickup only - no elevator",
            date: "2023-06-18",
            timeSlot: "9AM-12PM"
        },
        price: 1200,
        postedDate: "2023-05-28"
    }
];

// Keep track of current filters and search query
let currentFilters = {
    recycling: [],
    product: []
};
let currentSearchQuery = '';
function handleCardClick(event) {
    // Prevent flip when clicking on the chat button
    if (event.target.closest('.chat-button')) {
        return;
    }

    const card = event.currentTarget;
    
    // Remove flipped class from all other cards
    document.querySelectorAll('.product-card').forEach(otherCard => {
        if (otherCard !== card) {
            otherCard.classList.remove('flipped');
        }
    });

    // Toggle the flipped state of the clicked card
    card.classList.toggle('flipped');
    
    // Force a reflow to ensure the animation works
    void card.offsetWidth;
    
    // Ensure proper z-index handling
    const front = card.querySelector('.front');
    const back = card.querySelector('.back');
    
    if (card.classList.contains('flipped')) {
        front.style.zIndex = '1';
        back.style.zIndex = '2';
    } else {
        front.style.zIndex = '2';
        back.style.zIndex = '1';
    }
}


// Function to render a single product card with flip animation
function renderProductCard(product) {
    // Determine category colors
    const recyclingColors = {
        'Repairable': 'bg-blue-100 text-blue-800',
        'Recyclable': 'bg-emerald-100 text-emerald-800',
        'Spare Parts': 'bg-yellow-100 text-yellow-800'
    };
    const productColors = {
        'Phones & Tablets': 'bg-blue-100 text-blue-800',
        'Laptops & PCs': 'bg-indigo-100 text-indigo-800',
        'Home Appliances': 'bg-emerald-100 text-emerald-800',
        'Machinery & Tools': 'bg-gray-100 text-gray-800',
        'Vehicle Electronics': 'bg-red-100 text-red-800',
        'Toys & Games': 'bg-purple-100 text-purple-800',
        'Medical Devices': 'bg-pink-100 text-pink-800',
        'Sensors & Monitoring': 'bg-cyan-100 text-cyan-800',
        'Automatic Dispensers': 'bg-teal-100 text-teal-800',
        'Hazardous Materials': 'bg-yellow-100 text-yellow-800'
    };
    

    return `
    <div class="product-card" onclick="handleCardClick(event)">
        <div class="product-inner">
            <!-- Front Side -->
            <div class="front">
                <div class="relative h-48 w-full overflow-hidden">
                    <img src="${product.images[0]}" alt="${product.title}" class="w-full h-full object-cover">
                </div>
                <div class="p-5">
                    <h3 class="text-xl font-bold text-gray-800 mb-2">${product.title}</h3>
                    <p class="text-gray-600 mb-4 line-clamp-2">${product.description}</p>
                    <div class="flex justify-between items-center">
                        <span class="text-2xl font-bold text-gray-900">₹${product.price.toLocaleString('en-IN')}</span>
                    </div>
                </div>
                <!-- Chat Icon for Email -->
                <a href="mailto:${product.seller.email}?subject=Inquiry%20about%20${encodeURIComponent(product.title)}&body=Hi%20${product.seller.name},%0A%0AI'm%20interested%20in%20your%20product%20${encodeURIComponent(product.title)}.%0A%0AThanks!" class="chat-button">
                    <i class="fas fa-comment-dots"></i>
                </a>
            </div>

            <!-- Back Side -->
            <div class="back">
                <div class="h-full overflow-y-auto">
                    <h3 class="text-xl font-bold text-gray-800 mb-3">Product Details</h3>
                    
                    <!-- Categories -->
                    <div class="mb-4">
                        <h4 class="font-semibold text-gray-700 mb-1">Categories</h4>
                        <div class="flex flex-wrap gap-1">
                            <span class="category-tag ${recyclingColors[product.recyclingCategory]}">${product.recyclingCategory}</span>
                            <span class="category-tag ${productColors[product.productCategory]}">${product.productCategory}</span>
                        </div>
                    </div>

                    <!-- Tags -->
                    <div class="mb-4">
                        <h4 class="font-semibold text-gray-700 mb-1">Tags</h4>
                        <div class="flex flex-wrap gap-1">
                            ${product.tags.map(tag => `<span class="category-tag bg-gray-100 text-gray-800">${tag}</span>`).join('')}
                        </div>
                    </div>

                    <!-- Product Specifications -->
                    <div class="mb-4">
                        <h4 class="font-semibold text-gray-700 mb-1">Specifications</h4>
                        <div class="space-y-2 text-sm">
                            ${product.weight ? `<div class="flex justify-between">
                                <span class="text-gray-600">Weight:</span>
                                <span class="font-medium">${product.weight} kg</span>
                            </div>` : ''}
                            ${product.battery ? `<div class="flex justify-between">
                                <span class="text-gray-600">Battery:</span>
                                <span class="font-medium">${product.battery}</span>
                            </div>` : ''}
                            ${product.hazardousMaterials ? `<div class="flex justify-between">
                                <span class="text-gray-600">Hazardous Materials:</span>
                                <span class="font-medium">${product.hazardousMaterials}</span>
                            </div>` : ''}
                        </div>
                    </div>

                    <!-- Seller Information -->
                    <div class="mb-4">
                        <h4 class="font-semibold text-gray-700 mb-1">Seller Information</h4>
                        <div class="bg-gray-50 p-3 rounded-lg">
                            <div class="flex items-center mb-2">
                                <i class="fas fa-user text-gray-400 mr-2"></i>
                                <span class="font-medium">${product.seller.name}</span>
                            </div>
                            <div class="flex items-center mb-2">
                                <i class="fas fa-phone text-gray-400 mr-2"></i>
                                <span>${product.seller.phone}</span>
                            </div>
                            <div class="flex items-center">
                                <i class="fas fa-map-marker-alt text-gray-400 mr-2"></i>
                                <span>${product.seller.address}</span>
                            </div>
                        </div>
                    </div>

                    <!-- Pickup Information -->
                    <div class="mb-4">
                        <h4 class="font-semibold text-gray-700 mb-1">Pickup Information</h4>
                        <div class="bg-gray-50 p-3 rounded-lg">
                            <div class="flex items-center mb-2">
                                <i class="fas fa-calendar-alt text-gray-400 mr-2"></i>
                                <span>${formatDate(product.pickup.date)}</span>
                            </div>
                            <div class="flex items-center mb-2">
                                <i class="fas fa-clock text-gray-400 mr-2"></i>
                                <span>${product.pickup.timeSlot}</span>
                            </div>
                            <div class="flex items-center">
                                <i class="fas fa-map-marker-alt text-gray-400 mr-2"></i>
                                <span>${product.pickup.address}</span>
                            </div>
                            ${product.pickup.instructions ? `<div class="mt-2 text-sm text-gray-600">
                                <i class="fas fa-info-circle mr-1"></i>
                                ${product.pickup.instructions}
                            </div>` : ''}
                        </div>
                    </div>

                    <!-- Posted Date -->
                    <div class="mb-4">
                        <h4 class="font-semibold text-gray-700 mb-1">Posted Date</h4>
                        <div class="text-sm text-gray-600">
                            ${formatDate(product.postedDate)}
                        </div>
                    </div>

                    <!-- Place Order Button -->
                    <div class="mt-4">
                        <button type="button" class="w-full px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition flex items-center justify-center">
                            <i class="fas fa-shopping-cart mr-2"></i>
                            Place Order
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `;

}

// Helper function to format date
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-IN', options);
}

function filterAndRenderListings(searchQuery = currentSearchQuery, filters = currentFilters) {
    const featuredListingsContainer = document.getElementById('featured-listings-grid');
    if (!featuredListingsContainer) return;

    currentSearchQuery = searchQuery.toLowerCase();
    currentFilters = filters;

    const filteredProducts = allProducts.filter(product => {
        // Filter by recycling category
        const recyclingMatch = currentFilters.recycling.length === 0 || 
                             currentFilters.recycling.some(filter => 
                                 filter.toLowerCase() === product.recyclingCategory.toLowerCase());
        
        // Filter by product category
        const productMatch = currentFilters.product.length === 0 || 
                           currentFilters.product.some(filter => 
                               filter.toLowerCase() === product.productCategory.toLowerCase());
        
        // Search across multiple fields
        const searchMatch = currentSearchQuery === '' ||
                           product.title.toLowerCase().includes(currentSearchQuery) ||
                           product.description.toLowerCase().includes(currentSearchQuery) ||
                           product.tags.some(tag => tag.toLowerCase().includes(currentSearchQuery));

        return recyclingMatch && productMatch && searchMatch;
    });

    // Rest of the rendering logic remains the same
    if (filteredProducts.length > 0) {
        featuredListingsContainer.innerHTML = filteredProducts.map(renderProductCard).join('');
    } else {
        featuredListingsContainer.innerHTML = `
            <div class="col-span-full text-center py-12">
                <i class="fas fa-box-open text-4xl text-gray-400 mb-4"></i>
                <p class="text-gray-600">No products found matching your criteria.</p>
            </div>
        `;
    }
}
// Initialize the listings
function initFeaturedListings() {
    const featuredListingsSection = document.getElementById('featured-listings');
    if (!featuredListingsSection) return;

    featuredListingsSection.innerHTML = `
        <section class="py-12">
            <div class="container mx-auto px-4">
                <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                    <div>
                        <h2 class="text-3xl font-bold text-gray-800">Featured Listings</h2>
                        <p class="text-gray-600 mt-1">Discover items ready for a new life</p>
                    </div>
                </div>
                
                <div id="featured-listings-grid" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    <!-- Product cards will be rendered here -->
                </div>
            </div>
        </section>
    `;

    // Initialize search functionality
    document.getElementById('searchInput')?.addEventListener('input', (e) => {
        filterAndRenderListings(e.target.value, currentFilters);
    });

    // Initial render
    filterAndRenderListings('', { recycling: [], product: [] });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initFeaturedListings();
});

// Export functions for use in other components
window.featuredListings = {
    filterAndRenderListings
};