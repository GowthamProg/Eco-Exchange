function initFooter() {
    const footer = document.getElementById('footer');
    footer.innerHTML = `
        <footer class="bg-gray-900 text-white pt-12 pb-6">
            <div class="container mx-auto px-4">
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
                    <!-- Column 1 -->
                    <div>
                        <div class="flex items-center space-x-2 mb-4">
                            <i class="fas fa-recycle text-3xl text-green-500"></i>
                            <span class="text-xl font-bold">EcoExchange</span>
                        </div>
                        <p class="text-gray-400 mb-4">Connecting people for responsible e-waste management since 2023.</p>
                        <div class="flex space-x-4">
                            <a href="#" class="text-gray-400 hover:text-white">
                                <i class="fab fa-facebook-f"></i>
                            </a>
                            <a href="#" class="text-gray-400 hover:text-white">
                                <i class="fab fa-twitter"></i>
                            </a>
                            <a href="#" class="text-gray-400 hover:text-white">
                                <i class="fab fa-instagram"></i>
                            </a>
                            <a href="#" class="text-gray-400 hover:text-white">
                                <i class="fab fa-linkedin-in"></i>
                            </a>
                        </div>
                    </div>
                    
                    <!-- Column 2 -->
                    <div>
                        <h3 class="text-lg font-bold mb-4">Quick Links</h3>
                        <ul class="space-y-2">
                            <li><a href="index.html" class="text-gray-400 hover:text-white">Home</a></li>
                            <li><a href="about.html" class="text-gray-400 hover:text-white">About Us</a></li>
                            <li><a href="dispose.html" class="text-gray-400 hover:text-white">Dispose E-Waste</a></li>
                            <li><a href="#" class="text-gray-400 hover:text-white">Buy E-Waste</a></li>
                            <li><a href="#" class="text-gray-400 hover:text-white">Volunteer</a></li>
                        </ul>
                    </div>
                    
                    <!-- Column 3 -->
                    <div>
                        <h3 class="text-lg font-bold mb-4">Categories</h3>
                        <ul class="space-y-2">
                            <li><a href="#" class="text-gray-400 hover:text-white">Mobile Phones</a></li>
                            <li><a href="#" class="text-gray-400 hover:text-white">Laptops & Computers</a></li>
                            <li><a href="#" class="text-gray-400 hover:text-white">Home Appliances</a></li>
                            <li><a href="#" class="text-gray-400 hover:text-white">TVs & Monitors</a></li>
                            <li><a href="#" class="text-gray-400 hover:text-white">Accessories</a></li>
                        </ul>
                    </div>
                    
                    <!-- Column 4 -->
                    <div>
                        <h3 class="text-lg font-bold mb-4">Contact Us</h3>
                        <ul class="space-y-2">
                            <li class="flex items-start">
                                <i class="fas fa-map-marker-alt mt-1 mr-3 text-gray-400"></i>
                                <span class="text-gray-400">123 Green Tech Park, Bangalore, India</span>
                            </li>
                            <li class="flex items-center">
                                <i class="fas fa-phone-alt mr-3 text-gray-400"></i>
                                <span class="text-gray-400">+91 9876543210</span>
                            </li>
                            <li class="flex items-center">
                                <i class="fas fa-envelope mr-3 text-gray-400"></i>
                                <span class="text-gray-400">info@ecoexchange.in</span>
                            </li>
                        </ul>
                    </div>
                </div>
                
                <div class="border-t border-gray-800 pt-6 flex flex-col md:flex-row justify-between items-center">
                    <p class="text-gray-500 text-sm mb-3 md:mb-0">© 2023 EcoExchange. All rights reserved.</p>
                    <div class="flex space-x-4">
                        <a href="#" class="text-gray-500 hover:text-white text-sm">Privacy Policy</a>
                        <a href="#" class="text-gray-500 hover:text-white text-sm">Terms of Service</a>
                        <a href="#" class="text-gray-500 hover:text-white text-sm">Cookie Policy</a>
                    </div>
                </div>
            </div>
        </footer>
    `;
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initFooter();
});

// Export functions for use in other components
window.footer = {
    initFooter
}; 