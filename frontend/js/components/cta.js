function initCTA() {
    const cta = document.getElementById('cta');
    cta.innerHTML = `
        <section class="py-16 bg-gray-800 text-white">
            <div class="container mx-auto px-4 text-center">
                <h2 class="text-3xl md:text-4xl font-bold mb-6">Ready to Make a Difference?</h2>
                <p class="text-xl mb-8 max-w-3xl mx-auto">Join thousands of eco-conscious individuals and businesses in our mission to reduce e-waste.</p>
                <div class="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
<a href="sell.html">
    <button class="bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-full font-bold transition duration-300">
        Sell Your E-Waste <i class="fas fa-arrow-right ml-2"></i>
    </button>
</a>

<a href="Volunteer.html">
    <button class="border-2 border-white hover:bg-white hover:text-gray-800 text-white px-8 py-3 rounded-full font-bold transition duration-300">
        Become a Volunteer
    </button>
</a>

                </div>
            </div>
        </section>
    `;
} 