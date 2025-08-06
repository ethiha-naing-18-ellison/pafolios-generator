// Utility functions shared across portfolio templates

// Helper function to generate social links (shared across templates)
function generateSocialLinks(data) {
    const links = [];
    
    if (data.github) {
        links.push(`<a href="${data.github}" target="_blank" rel="noopener"><i class="fab fa-github"></i> GitHub</a>`);
    }
    if (data.linkedin) {
        links.push(`<a href="${data.linkedin}" target="_blank" rel="noopener"><i class="fab fa-linkedin"></i> LinkedIn</a>`);
    }
    if (data.twitter) {
        links.push(`<a href="${data.twitter}" target="_blank" rel="noopener"><i class="fab fa-twitter"></i> Twitter</a>`);
    }
    if (data.portfolio) {
        links.push(`<a href="${data.portfolio}" target="_blank" rel="noopener"><i class="fas fa-globe"></i> Portfolio</a>`);
    }
    
    return links.join('');
}

// Helper function to validate data
function validateFormData(data) {
    return data.fullName && data.jobTitle && data.bio && data.skills;
}

// Helper function to sanitize HTML input
function sanitizeInput(input) {
    const div = document.createElement('div');
    div.textContent = input;
    return div.innerHTML;
}