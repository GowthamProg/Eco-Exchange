// Form submission
document.getElementById('ewasteForm').addEventListener('submit', function(e) {
    e.preventDefault();
    // Calculate eco points
    const weight = parseFloat(document.getElementById('ewasteWeight').value) || 0;
    const condition = document.getElementById('condition').value;
    const hazardous = document.getElementById('hazardousMaterials').value;
    
    // Weight points (1 point per kg)
    const weightPoints = Math.round(weight * 10);
    document.getElementById('weightPoints').textContent = weightPoints;
    
    // Impact points based on condition
    let impactPoints = 0;
    switch(condition) {
        case 'working': impactPoints = 50; break;
        case 'partial': impactPoints = 30; break;
        case 'nonworking': impactPoints = 20; break;
        case 'damaged': impactPoints = 10; break;
    }
    document.getElementById('impactPoints').textContent = impactPoints;
    
    // Hazardous materials points
    let hazardPoints = 0;
    switch(hazardous) {
        case 'yes': hazardPoints = 40; break;
        case 'no': hazardPoints = 20; break;
        case 'unsure': hazardPoints = 10; break;
    }
    document.getElementById('hazardPoints').textContent = hazardPoints;
    
    // Update total points
    const totalPoints = weightPoints + impactPoints + hazardPoints;
    document.getElementById('totalPoints').textContent = totalPoints;
    
    // Add points to user's account
    if (window.ecoPoints && window.ecoPoints.addPoints) {
        window.ecoPoints.addPoints(totalPoints);
    }
    
    // Show success message
    const successModal = document.getElementById('successModal');
    const awardedPoints = document.getElementById('awardedPoints');
    awardedPoints.textContent = totalPoints;
    successModal.classList.remove('hidden');
    
    // Reset form
    this.reset();
    document.getElementById('previewContainer').innerHTML = '';
}); 