import { productCategories } from './filter-section.js';

function initSellForm() {
    const form = document.getElementById('e-waste-form');
    const categoryContainer = document.getElementById('category-container');
    const nextButtons = document.querySelectorAll('.next-step');
    const prevButtons = document.querySelectorAll('.prev-step');
    const progressBar = document.getElementById('progress-bar');
    const steps = document.querySelectorAll('.form-step');
    const stepIndicators = document.querySelectorAll('.step');
    const successModal = document.getElementById('success-modal');
    let currentStep = 0;
    let selectedCategory = null;

    // Initialize categories
    if (categoryContainer) {
        categoryContainer.innerHTML = productCategories.map(cat => `
            <div class="category-card border-2 border-gray-200 rounded-lg p-4 cursor-pointer"
                 data-category="${cat.name.toLowerCase()}">
                <div class="flex items-center mb-2">
                    <div class="w-12 h-12 rounded-full bg-${cat.color}-100 flex items-center justify-center mr-4">
                        <i class="fas ${cat.icon} text-${cat.color}-500 text-xl"></i>
                    </div>
                    <h4 class="text-lg font-medium">${cat.name}</h4>
                </div>
                <p class="text-gray-600 text-sm">${cat.description}</p>
            </div>
        `).join('');

        // Add click event listeners to category cards
        const categoryCards = categoryContainer.querySelectorAll('.category-card');
        categoryCards.forEach(card => {
            card.addEventListener('click', () => {
                categoryCards.forEach(c => c.classList.remove('selected'));
                card.classList.add('selected');
                selectedCategory = card.dataset.category;
                nextButtons[0].disabled = false;
            });
        });
    }

    // Handle form validation
    function validateStep(step) {
        switch(step) {
            case 0:
                return !!selectedCategory;
            case 1:
                const name = document.getElementById('product-name').value;
                const description = document.getElementById('description').value;
                const images = document.getElementById('image-previews').children.length;
                return name && description && images > 0;
            case 2:
                const date = document.getElementById('pickup-date').value;
                const time = document.getElementById('pickup-time').value;
                const address = document.getElementById('address').value;
                const phone = document.getElementById('phone').value;
                return date && time && address && phone;
            case 3:
                const payment = document.querySelector('input[name="payment"]:checked');
                const terms = document.getElementById('terms').checked;
                return payment && terms;
            default:
                return true;
        }
    }

    // Handle form navigation
    function updateStep(step) {
        if (step > currentStep && !validateStep(currentStep)) {
            alert('Please fill in all required fields before proceeding.');
            return;
        }

        steps.forEach((s, index) => {
            s.classList.toggle('active', index === step);
            if (stepIndicators[index]) {
                const stepCircle = stepIndicators[index].querySelector('div');
                const stepText = stepIndicators[index].querySelector('span');
                if (index <= step) {
                    stepCircle.classList.remove('bg-gray-200', 'text-gray-600');
                    stepCircle.classList.add('bg-emerald-500', 'text-white');
                    stepText.classList.remove('text-gray-500');
                    stepText.classList.add('text-emerald-600');
                } else {
                    stepCircle.classList.add('bg-gray-200', 'text-gray-600');
                    stepCircle.classList.remove('bg-emerald-500', 'text-white');
                    stepText.classList.add('text-gray-500');
                    stepText.classList.remove('text-emerald-600');
                }
            }
        });
        progressBar.style.width = `${(step / (steps.length - 1)) * 100}%`;
        currentStep = step;
    }

    // Handle image upload
    const uploadBtn = document.getElementById('upload-btn');
    const fileInput = document.getElementById('product-images');
    const imagePreviews = document.getElementById('image-previews');

    uploadBtn?.addEventListener('click', () => fileInput.click());
    fileInput?.addEventListener('change', () => {
        imagePreviews.innerHTML = '';
        Array.from(fileInput.files).forEach(file => {
            const reader = new FileReader();
            reader.onload = (e) => {
                const preview = document.createElement('div');
                preview.className = 'relative w-24 h-24 rounded-lg overflow-hidden border border-gray-200';
                preview.innerHTML = `
                    <img src="${e.target.result}" class="w-full h-full object-cover" alt="Preview">
                    <button type="button" class="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center">
                        <i class="fas fa-times"></i>
                    </button>
                `;
                preview.querySelector('button').addEventListener('click', () => preview.remove());
                imagePreviews.appendChild(preview);
            };
            reader.readAsDataURL(file);
        });
    });

    // Handle button navigation
    nextButtons.forEach(button => {
        button.addEventListener('click', () => {
            if (currentStep < steps.length - 1) {
                updateStep(currentStep + 1);
            }
        });
    });

    prevButtons.forEach(button => {
        button.addEventListener('click', () => {
            if (currentStep > 0) {
                updateStep(currentStep - 1);
            }
        });
    });

    // Handle form submission
    form?.addEventListener('submit', (e) => {
        e.preventDefault();
        if (!validateStep(currentStep)) {
            alert('Please fill in all required fields before submitting.');
            return;
        }

        // Generate reference ID
        const refId = 'ECX-' + Date.now().toString().slice(-6);
        document.getElementById('reference-id').textContent = refId;

        // Set pickup details
        const date = new Date(document.getElementById('pickup-date').value);
        const time = document.getElementById('pickup-time');
        const timeText = time.options[time.selectedIndex].text;
        document.getElementById('pickup-details').textContent = 
            `${date.toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })} - ${timeText}`;

        // Show success modal
        successModal.classList.remove('hidden');
    });

    // Close modal when clicking outside
    successModal?.addEventListener('click', (e) => {
        if (e.target === successModal) {
            successModal.classList.add('hidden');
        }
    });

    // Initialize form
    updateStep(0);
    nextButtons[0].disabled = true;
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initSellForm);