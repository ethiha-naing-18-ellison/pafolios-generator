// Portfolio Generator - Main JavaScript functionality
class PortfolioGenerator {
    constructor() {
        this.selectedTemplate = 'classic';
        this.selectedTheme = 'dark';
        this.currentThemeLink = null;
        
        this.init();
    }

    init() {
        this.bindEvents();
        this.setDefaultSelections();
        this.loadTheme(this.selectedTheme);
    }

    bindEvents() {
        // Form submission
        const form = document.getElementById('portfolioForm');
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.generatePortfolio();
        });

        // Template selection
        const templateOptions = document.querySelectorAll('.template-option');
        templateOptions.forEach(option => {
            option.addEventListener('click', () => {
                this.selectTemplate(option);
            });
        });

        // Theme selection
        const themeOptions = document.querySelectorAll('.theme-option');
        themeOptions.forEach(option => {
            option.addEventListener('click', () => {
                this.selectTheme(option);
            });
        });

        // Refresh preview button
        const refreshBtn = document.getElementById('refreshPreview');
        refreshBtn.addEventListener('click', () => {
            this.generatePortfolio();
        });

        // Form inputs - live preview on change
        const formInputs = form.querySelectorAll('input, textarea');
        formInputs.forEach(input => {
            input.addEventListener('input', debounce(() => {
                if (this.hasRequiredFields()) {
                    this.generatePortfolio();
                }
            }, 500));
        });
    }

    setDefaultSelections() {
        // Set default template
        const defaultTemplate = document.querySelector(`.template-option[data-template="${this.selectedTemplate}"]`);
        if (defaultTemplate) {
            this.selectTemplate(defaultTemplate);
        }

        // Set default theme
        const defaultTheme = document.querySelector(`.theme-option[data-theme="${this.selectedTheme}"]`);
        if (defaultTheme) {
            this.selectTheme(defaultTheme);
        }
    }

    selectTemplate(templateElement) {
        // Remove active class from all templates
        document.querySelectorAll('.template-option').forEach(option => {
            option.classList.remove('active');
        });

        // Add active class to selected template
        templateElement.classList.add('active');
        this.selectedTemplate = templateElement.dataset.template;

        // Generate portfolio if form has data
        if (this.hasRequiredFields()) {
            this.generatePortfolio();
        }
    }

    selectTheme(themeElement) {
        // Remove active class from all themes
        document.querySelectorAll('.theme-option').forEach(option => {
            option.classList.remove('active');
        });

        // Add active class to selected theme
        themeElement.classList.add('active');
        this.selectedTheme = themeElement.dataset.theme;

        // Load theme CSS
        this.loadTheme(this.selectedTheme);

        // Generate portfolio if form has data
        if (this.hasRequiredFields()) {
            this.generatePortfolio();
        }
    }

    loadTheme(themeName) {
        // Remove existing theme link
        if (this.currentThemeLink) {
            this.currentThemeLink.remove();
        }

        // Create new theme link
        this.currentThemeLink = document.createElement('link');
        this.currentThemeLink.rel = 'stylesheet';
        this.currentThemeLink.href = `themes/${themeName}.css`;
        document.head.appendChild(this.currentThemeLink);
    }

    hasRequiredFields() {
        const form = document.getElementById('portfolioForm');
        const requiredFields = form.querySelectorAll('[required]');
        
        for (let field of requiredFields) {
            if (!field.value.trim()) {
                return false;
            }
        }
        return true;
    }

    getFormData() {
        const form = document.getElementById('portfolioForm');
        const formData = new FormData(form);
        
        return {
            fullName: formData.get('fullName') || '',
            jobTitle: formData.get('jobTitle') || '',
            bio: formData.get('bio') || '',
            skills: formData.get('skills') || '',
            profileImage: formData.get('profileImage') || '',
            github: formData.get('github') || '',
            linkedin: formData.get('linkedin') || '',
            twitter: formData.get('twitter') || '',
            portfolio: formData.get('portfolio') || ''
        };
    }

    generatePortfolio() {
        if (!this.hasRequiredFields()) {
            this.showPlaceholder();
            return;
        }

        const data = this.getFormData();
        const previewContainer = document.getElementById('portfolioPreview');
        
        // Show loading state
        previewContainer.innerHTML = '<div class="loading-spinner"><i class="fas fa-spinner fa-spin"></i> Generating portfolio...</div>';

        // Small delay to show loading state
        setTimeout(() => {
            try {
                let html = '';
                
                // Generate HTML based on selected template
                switch (this.selectedTemplate) {
                    case 'classic':
                        html = generateClassicTemplate(data);
                        break;
                    case 'card':
                        html = generateCardTemplate(data);
                        break;
                    case 'sidebar':
                        html = generateSidebarTemplate(data);
                        break;
                    case 'hero':
                        html = generateHeroTemplate(data);
                        break;
                    case 'glass':
                        html = generateGlassTemplate(data);
                        break;
                    default:
                        html = generateClassicTemplate(data);
                }

                // Apply theme class and insert HTML
                previewContainer.innerHTML = `<div class="theme-${this.selectedTheme}">${html}</div>`;
                previewContainer.classList.add('fade-in');
                
                // Remove fade-in class after animation
                setTimeout(() => {
                    previewContainer.classList.remove('fade-in');
                }, 300);

            } catch (error) {
                console.error('Error generating portfolio:', error);
                previewContainer.innerHTML = `
                    <div class="error-message">
                        <i class="fas fa-exclamation-triangle"></i>
                        <p>Error generating portfolio. Please try again.</p>
                    </div>
                `;
            }
        }, 300);
    }

    showPlaceholder() {
        const previewContainer = document.getElementById('portfolioPreview');
        previewContainer.innerHTML = `
            <div class="placeholder">
                <i class="fas fa-image"></i>
                <p>Fill out the form and select a template to see your portfolio preview</p>
            </div>
        `;
    }
}

// Helper function for debouncing
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

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

// Smooth scrolling for sidebar navigation (for sidebar template)
function initSidebarNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Remove active class from all links
            navLinks.forEach(l => l.classList.remove('active'));
            
            // Add active class to clicked link
            link.classList.add('active');
            
            // Smooth scroll to target section
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const generator = new PortfolioGenerator();
    
    // Add some sample data for demo purposes
    if (window.location.search.includes('demo=true')) {
        fillSampleData();
    }
});

// Function to fill sample data for demonstration
function fillSampleData() {
    document.getElementById('fullName').value = 'Alex Johnson';
    document.getElementById('jobTitle').value = 'Full Stack Developer';
    document.getElementById('bio').value = 'Passionate developer with 5+ years of experience building scalable web applications. I love creating elegant solutions to complex problems and staying up-to-date with the latest technologies.';
    document.getElementById('skills').value = 'JavaScript, React, Node.js, Python, MongoDB, PostgreSQL, Docker, AWS, Git, TypeScript';
    document.getElementById('github').value = 'https://github.com/alexjohnson';
    document.getElementById('linkedin').value = 'https://linkedin.com/in/alexjohnson';
    document.getElementById('twitter').value = 'https://twitter.com/alexjohnson';
    document.getElementById('portfolio').value = 'https://alexjohnson.dev';
    
    // Trigger portfolio generation
    setTimeout(() => {
        const generator = new PortfolioGenerator();
        generator.generatePortfolio();
    }, 500);
}

// Add CSS for loading and error states
const additionalStyles = `
    .loading-spinner {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        min-height: 400px;
        color: var(--text-muted);
        font-size: 1.1rem;
        gap: 1rem;
    }

    .loading-spinner i {
        font-size: 2rem;
        color: var(--primary-color);
    }

    .error-message {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        min-height: 400px;
        color: var(--danger-color);
        text-align: center;
        padding: 2rem;
    }

    .error-message i {
        font-size: 3rem;
        margin-bottom: 1rem;
    }

    .error-message p {
        font-size: 1.1rem;
        max-width: 400px;
    }

    /* Preview container animations */
    .portfolio-preview.fade-in {
        animation: fadeInUp 0.3s ease-out;
    }

    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    /* Template-specific enhancements */
    .template-sidebar .nav-link.active {
        background: var(--primary-color);
        color: white;
    }

    /* Responsive enhancements */
    @media (max-width: 768px) {
        .template-sidebar {
            flex-direction: column;
        }
        
        .template-sidebar .sidebar {
            width: 100%;
            height: auto;
            position: static;
        }
        
        .template-sidebar .main-content {
            padding: 2rem;
        }
    }
`;

// Inject additional styles
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);