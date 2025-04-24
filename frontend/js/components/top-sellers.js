function initTopSellers() {
    const topSellers = document.getElementById('top-sellers');
    topSellers.innerHTML = `
        <section class="py-12 bg-gray-50">
            <div class="container mx-auto px-4">
                <div class="flex justify-between items-center mb-8">
                    <h2 class="text-3xl font-bold">Top Rated Sellers</h2>
                    <a href="#" class="text-blue-500 font-medium hover:underline">View All</a>
                </div>
                
                <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                    <!-- Seller 1 -->
                    <div class="bg-white rounded-lg p-4 text-center shadow-sm hover:shadow-md transition duration-300">
                        <div class="w-20 h-20 rounded-full bg-gray-200 mx-auto mb-3 overflow-hidden">
                            <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="Seller" class="w-full h-full object-cover">
                        </div>
                        <h3 class="font-bold">Priya Sharma</h3>
                        <p class="text-gray-500 text-sm mb-2">New Delhi</p>
                        <div class="flex justify-center text-yellow-400 mb-2">
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                        </div>
                        <p class="text-green-500 text-sm font-medium">1,200+ Transactions</p>
                    </div>
                    
                    <!-- Seller 2 -->
                    <div class="bg-white rounded-lg p-4 text-center shadow-sm hover:shadow-md transition duration-300">
                        <div class="w-20 h-20 rounded-full bg-gray-200 mx-auto mb-3 overflow-hidden">
                            <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Seller" class="w-full h-full object-cover">
                        </div>
                        <h3 class="font-bold">Rahul Patel</h3>
                        <p class="text-gray-500 text-sm mb-2">Mumbai</p>
                        <div class="flex justify-center text-yellow-400 mb-2">
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star-half-alt"></i>
                        </div>
                        <p class="text-green-500 text-sm font-medium">950+ Transactions</p>
                    </div>
                    
                    <!-- Seller 3 -->
                    <div class="bg-white rounded-lg p-4 text-center shadow-sm hover:shadow-md transition duration-300">
                        <div class="w-20 h-20 rounded-full bg-gray-200 mx-auto mb-3 overflow-hidden">
                            <img src="https://randomuser.me/api/portraits/women/68.jpg" alt="Seller" class="w-full h-full object-cover">
                        </div>
                        <h3 class="font-bold">Ananya Gupta</h3>
                        <p class="text-gray-500 text-sm mb-2">Bangalore</p>
                        <div class="flex justify-center text-yellow-400 mb-2">
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="far fa-star"></i>
                        </div>
                        <p class="text-green-500 text-sm font-medium">800+ Transactions</p>
                    </div>
                    
                    <!-- Seller 4 -->
                    <div class="bg-white rounded-lg p-4 text-center shadow-sm hover:shadow-md transition duration-300">
                        <div class="w-20 h-20 rounded-full bg-gray-200 mx-auto mb-3 overflow-hidden">
                            <img src="https://randomuser.me/api/portraits/men/75.jpg" alt="Seller" class="w-full h-full object-cover">
                        </div>
                        <h3 class="font-bold">Vikram Singh</h3>
                        <p class="text-gray-500 text-sm mb-2">Hyderabad</p>
                        <div class="flex justify-center text-yellow-400 mb-2">
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                        </div>
                        <p class="text-green-500 text-sm font-medium">1,500+ Transactions</p>
                    </div>
                    
                    <!-- Seller 5 -->
                    <div class="bg-white rounded-lg p-4 text-center shadow-sm hover:shadow-md transition duration-300">
                        <div class="w-20 h-20 rounded-full bg-gray-200 mx-auto mb-3 overflow-hidden">
                            <img src="https://randomuser.me/api/portraits/women/90.jpg" alt="Seller" class="w-full h-full object-cover">
                        </div>
                        <h3 class="font-bold">Neha Reddy</h3>
                        <p class="text-gray-500 text-sm mb-2">Chennai</p>
                        <div class="flex justify-center text-yellow-400 mb-2">
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star-half-alt"></i>
                            <i class="far fa-star"></i>
                        </div>
                        <p class="text-green-500 text-sm font-medium">600+ Transactions</p>
                    </div>
                </div>
            </div>
        </section>
    `;
} 