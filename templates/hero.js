// Hero Template - Big hero section with centered content and call-to-action
function generateHeroTemplate(data) {
    const profileImage = data.profileImage ? 
        `<img src="${data.profileImage}" alt="${data.fullName}" class="profile-image">` : 
        `<div class="profile-placeholder"><i class="fas fa-user"></i></div>`;

    const socialLinks = generateSocialLinks(data);
    const skillsList = data.skills.split(',').map(skill => 
        `<span class="skill-tag">${skill.trim()}</span>`
    ).join('');

    return `
        <div class="template-hero">
            <section class="hero-section">
                <div class="hero-content">
                    ${profileImage}
                    <h1 class="hero-name">${data.fullName}</h1>
                    <h2 class="hero-title">${data.jobTitle}</h2>
                    <p class="hero-bio">${data.bio}</p>
                    <div class="hero-cta">
                        <div class="social-links">
                            ${socialLinks}
                        </div>
                    </div>
                </div>
                <div class="hero-background">
                    <div class="floating-element element-1"></div>
                    <div class="floating-element element-2"></div>
                    <div class="floating-element element-3"></div>
                </div>
            </section>

            <section class="skills-section">
                <div class="section-content">
                    <h3>Skills & Expertise</h3>
                    <div class="skills-grid">
                        ${skillsList}
                    </div>
                </div>
            </section>

            <section class="contact-section">
                <div class="section-content">
                    <h3>Let's Work Together</h3>
                    <p>Ready to bring your ideas to life? Let's connect and create something amazing!</p>
                    <div class="contact-buttons">
                        ${socialLinks}
                    </div>
                </div>
            </section>
        </div>
    `;
}