// Global variables
let currentStep = 1;
let selectedCategory = null;
let selectedCondition = null;
let selectedTimeSlot = null;
let selectedDate = null;
let uploadedImages = [];

// Initialize the form
document.addEventListener('DOMContentLoaded', function() {
    initializeCategorySelection();
    initializeImageUpload();
    initializeTimeSlots();
    initializeDatePicker();
    initializeNextButton();
});

// Category Selection
function initializeCategorySelection() {
    const categoryCards = document.querySelectorAll('.category-card');
    
    categoryCards.forEach(card => {
        card.addEventListener('click', function() {
            // Remove selected class from all cards
            categoryCards.forEach(c => c.classList.remove('selected'));
            
            // Add selected class to clicked card
            this.classList.add('selected');
            
            // Get the category from data attribute
            const category = this.getAttribute('data-category');
            selectCategory(category);
        });
    });
}

function selectCategory(category) {
    selectedCategory = category;
    updateNextButtonState();
    updateSummary();
}

// Image Upload
function initializeImageUpload() {
    const dropzone = document.getElementById('dropzone');
    const fileInput = document.getElementById('file-input');
    
    dropzone.addEventListener('click', () => fileInput.click());
    fileInput.addEventListener('change', handleFiles);
    
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        dropzone.addEventListener(eventName, preventDefaults, false);
    });
    
    ['dragenter', 'dragover'].forEach(eventName => {
        dropzone.addEventListener(eventName, highlight, false);
    });
    
    ['dragleave', 'drop'].forEach(eventName => {
        dropzone.addEventListener(eventName, unhighlight, false);
    });
    
    dropzone.addEventListener('drop', handleDrop, false);
}

function preventDefaults(e) {
    e.preventDefault();
    e.stopPropagation();
}

function highlight() {
    document.getElementById('dropzone').classList.add('active');
}

function unhighlight() {
    document.getElementById('dropzone').classList.remove('active');
}

function handleDrop(e) {
    const dt = e.dataTransfer;
    const files = dt.files;
    handleFiles({ target: { files } });
}

function handleFiles(e) {
    const files = e.target.files;
    if (files.length + uploadedImages.length > 5) {
        alert('You can upload a maximum of 5 images.');
        return;
    }
    
    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (!file.type.match('image.*')) continue;
        
        const reader = new FileReader();
        reader.onload = (function(theFile) {
            return function(e) {
                uploadedImages.push(e.target.result);
                renderImagePreviews();
            };
        })(file);
        reader.readAsDataURL(file);
    }
}

function renderImagePreviews() {
    const container = document.getElementById('image-previews');
    container.innerHTML = '';
    
    uploadedImages.forEach((img, index) => {
        const preview = document.createElement('div');
        preview.className = 'image-preview relative w-20 h-20 rounded-lg overflow-hidden';
        
        const imgElement = document.createElement('img');
        imgElement.src = img;
        imgElement.className = 'w-full h-full object-cover';
        
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'absolute top-1 right-1 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center text-xs';
        deleteBtn.innerHTML = '<i class="fas fa-times"></i>';
        deleteBtn.onclick = () => {
            uploadedImages.splice(index, 1);
            renderImagePreviews();
        };
        
        preview.appendChild(imgElement);
        preview.appendChild(deleteBtn);
        container.appendChild(preview);
    });
}

// Time Slots
function initializeTimeSlots() {
    document.querySelectorAll('.time-slot-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.time-slot-btn').forEach(b => {
                b.classList.remove('bg-emerald-100', 'border-emerald-300', 'text-emerald-800');
            });
            this.classList.add('bg-emerald-100', 'border-emerald-300', 'text-emerald-800');
            selectedTimeSlot = this.textContent;
            updateSummary();
        });
    });
}

// Date Picker
function initializeDatePicker() {
    const datePicker = document.querySelector('input[type="date"]');
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    const formattedDate = tomorrow.toISOString().split('T')[0];
    datePicker.value = formattedDate;
    datePicker.min = formattedDate;
    selectedDate = formattedDate;
    
    datePicker.addEventListener('change', function() {
        selectedDate = this.value;
        updateSummary();
    });
}

// Next Button
function initializeNextButton() {
    const nextButton = document.getElementById('next-button');
    nextButton.addEventListener('click', function() {
        if (!this.disabled) {
            nextStep(1);
        }
    });
}

function updateNextButtonState() {
    const nextButton = document.getElementById('next-button');
    if (selectedCategory) {
        nextButton.classList.add('enabled');
        nextButton.disabled = false;
    } else {
        nextButton.classList.remove('enabled');
        nextButton.disabled = true;
    }
}

// Condition Selection
function selectCondition(condition) {
    selectedCondition = condition;
    
    // Update UI
    document.querySelectorAll('.condition-btn').forEach(el => {
        el.classList.remove('bg-emerald-100', 'border-emerald-300', 'text-emerald-800');
    });
    event.currentTarget.classList.add('bg-emerald-100', 'border-emerald-300', 'text-emerald-800');
    
    // Show/hide emission details
    const emissionSection = document.getElementById('emission-details');
    if (condition === 'recyclable' || condition === 'hazardous') {
        emissionSection.classList.remove('hidden');
    } else {
        emissionSection.classList.add('hidden');
    }
    
    updateSummary();
}

// Update Order Summary
function updateSummary() {
    if (selectedCategory) {
        const categoryNames = {
            'phones': 'Phones & Tablets',
            'laptops': 'Laptops & PCs',
            'appliances': 'Home Appliances',
            'machinery': 'Machinery & Tools',
            'vehicle': 'Vehicle Electronics'
        };
        document.getElementById('summary-category').textContent = categoryNames[selectedCategory];
    }
    
    if (selectedCondition) {
        const conditionNames = {
            'repairable': 'Repairable',
            'recyclable': 'Recyclable',
            'parts': 'Spare Parts',
            'hazardous': 'Hazardous'
        };
        document.getElementById('summary-condition').textContent = conditionNames[selectedCondition];
    }
    
    const expectedPrice = document.querySelector('#step-4 input[type="number"]').value;
    if (expectedPrice) {
        document.getElementById('summary-price').textContent = `₹${expectedPrice}`;
        document.getElementById('summary-value').textContent = `₹${expectedPrice}`;
    }
    
    if (selectedDate) {
        const dateObj = new Date(selectedDate);
        const options = { day: 'numeric', month: 'long', year: 'numeric' };
        const formattedDate = dateObj.toLocaleDateString('en-IN', options);
        document.getElementById('summary-date').textContent = formattedDate;
        document.getElementById('modal-date').textContent = formattedDate;
    }
    
    if (selectedTimeSlot) {
        document.getElementById('summary-time').textContent = selectedTimeSlot;
        document.getElementById('modal-time').textContent = selectedTimeSlot;
    }
}

// Navigation Functions
function nextStep(step) {
    // Validate current step before proceeding
    if (step === 1 && !selectedCategory) {
        alert('Please select a category to proceed.');
        return;
    }
    
    if (step === 2) {
        const productName = document.querySelector('#step-2 input[type="text"]').value;
        if (!productName) {
            alert('Please enter a product name.');
            return;
        }
        if (!selectedCondition) {
            alert('Please select a condition type.');
            return;
        }
    }
    
    if (step === 3 && !selectedTimeSlot) {
        alert('Please select a time slot for pickup.');
        return;
    }
    
    if (step === 4) {
        const expectedPrice = document.querySelector('#step-4 input[type="number"]').value;
        if (!expectedPrice) {
            alert('Please enter an expected price.');
            return;
        }
        if (!document.querySelector('#step-4 input[type="checkbox"]').checked) {
            alert('Please agree to the terms and conditions.');
            return;
        }
    }
    
    // Hide current step
    document.getElementById(`step-${step}`).classList.add('hidden');
    
    // Show next step
    document.getElementById(`step-${step+1}`).classList.remove('hidden');
    
    // Update progress bar
    document.querySelectorAll('.progress-step').forEach((el, index) => {
        if (index < step) {
            el.classList.remove('active');
            el.classList.add('completed');
        } else if (index === step) {
            el.classList.add('active');
            el.classList.remove('completed');
        } else {
            el.classList.remove('active', 'completed');
        }
    });
    
    // Update progress bar width
    const progressPercentage = (step / 4) * 100;
    document.getElementById('progress-bar').style.width = `${progressPercentage}%`;
    
    // Update current step
    currentStep = step + 1;
    
    // Update summary if we're on step 4
    if (currentStep === 4) {
        updateSummary();
    }
}

function prevStep(step) {
    // Hide current step
    document.getElementById(`step-${step}`).classList.add('hidden');
    
    // Show previous step
    document.getElementById(`step-${step-1}`).classList.remove('hidden');
    
    // Update progress bar
    document.querySelectorAll('.progress-step').forEach((el, index) => {
        if (index < step - 1) {
            el.classList.remove('active');
            el.classList.add('completed');
        } else if (index === step - 1) {
            el.classList.add('active');
            el.classList.remove('completed');
        } else {
            el.classList.remove('active', 'completed');
        }
    });
    
    // Update progress bar width
    const progressPercentage = ((step - 1) / 4) * 100;
    document.getElementById('progress-bar').style.width = `${progressPercentage}%`;
    
    // Update current step
    currentStep = step - 1;
}

// Form Submission
function submitForm() {
    // Show loading state
    const submitBtn = document.querySelector('#step-4 button:last-child');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i> Processing...';
    submitBtn.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        // Generate random reference ID
        const refId = 'ECX-' + Math.random().toString(36).substr(2, 8).toUpperCase();
        document.getElementById('reference-id').textContent = refId;
        
        // Show success modal
        document.getElementById('success-modal').classList.remove('hidden');
        
        // Reset button
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }, 1500);
}

// Close Modal
function closeModal() {
    document.getElementById('success-modal').classList.add('hidden');
} 