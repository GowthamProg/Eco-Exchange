function initEcoAwareness() {
    const ecoAwareness = document.getElementById('eco-awareness');
    ecoAwareness.innerHTML = `
        <section class="py-12 bg-white">
            <div class="container mx-auto px-4">
                <h2 class="text-3xl font-bold text-center mb-10">E-Waste Awareness</h2>
                
                <div class="grid md:grid-cols-3 gap-8">
                    <!-- Card 1 -->
                    <div class="bg-green-50 rounded-lg overflow-hidden shadow-md">
                        <div class="h-48 bg-green-100 flex items-center justify-center">
                            <i class="fas fa-recycle text-6xl text-green-500"></i>
                        </div>
                        <div class="p-6">
                            <h3 class="font-bold text-xl mb-3">Why Recycle E-Waste?</h3>
                            <p class="text-gray-600 mb-4">Electronic waste contains toxic materials that can harm the environment and human health if not disposed of properly.</p>
                            <a href="#" class="text-green-500 font-medium hover:underline">Learn More →</a>
                        </div>
                    </div>
                    
                    <!-- Card 2 -->
                    <div class="bg-blue-50 rounded-lg overflow-hidden shadow-md">
                        <div class="h-48 bg-blue-100 flex items-center justify-center">
                            <i class="fas fa-chart-line text-6xl text-blue-500"></i>
                        </div>
                        <div class="p-6">
                            <h3 class="font-bold text-xl mb-3">E-Waste Statistics</h3>
                            <p class="text-gray-600 mb-4">India generates about 3.2 million tonnes of e-waste annually, with only 10% being recycled properly.</p>
                            <a href="#" class="text-blue-500 font-medium hover:underline">Learn More →</a>
                        </div>
                    </div>
                    
                    <!-- Card 3 -->
                    <div class="bg-purple-50 rounded-lg overflow-hidden shadow-md">
                        <div class="h-48 bg-purple-100 flex items-center justify-center">
                            <i class="fas fa-hand-holding-heart text-6xl text-purple-500"></i>
                        </div>
                        <div class="p-6">
                            <h3 class="font-bold text-xl mb-3">How You Can Help</h3>
                            <p class="text-gray-600 mb-4">By selling or donating your e-waste through our platform, you contribute to a cleaner environment and circular economy.</p>
                            <a href="#" class="text-purple-500 font-medium hover:underline">Learn More →</a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    `;
} 