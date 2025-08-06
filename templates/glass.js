// Glass Template - Glassmorphic box layout with blur and modern styling
function generateGlassTemplate(data) {
    const profileImage = data.profileImage ? 
        `<img src="${data.profileImage}" alt="${data.fullName}" class="profile-image">` : 
        `<div class="profile-placeholder"><i class="fas fa-user"></i></div>`;

    const socialLinks = generateSocialLinks(data);
    const skillsList = data.skills.split(',').map(skill => 
        `<span class="skill-tag">${skill.trim()}</span>`
    ).join('');

    return `
        <div class="template-glass">
            <div class="glass-background">
                <div class="bg-blur-1"></div>
                <div class="bg-blur-2"></div>
                <div class="bg-blur-3"></div>
            </div>

            <div class="glass-container">
                <!-- Main Profile Glass -->
                <div class="glass-card main-card">
                    <div class="profile-section">
                        ${profileImage}
                        <h1 class="name">${data.fullName}</h1>
                        <h2 class="title">${data.jobTitle}</h2>
                    </div>
                </div>

                <!-- About Glass -->
                <div class="glass-card about-card">
                    <div class="card-header">
                        <h3><i class="fas fa-user"></i> About</h3>
                    </div>
                    <p class="bio">${data.bio}</p>
                </div>

                <!-- Skills Glass -->
                <div class="glass-card skills-card">
                    <div class="card-header">
                        <h3><i class="fas fa-code"></i> Skills</h3>
                    </div>
                    <div class="skills-container">
                        ${skillsList}
                    </div>
                </div>

                <!-- Contact Glass -->
                <div class="glass-card contact-card">
                    <div class="card-header">
                        <h3><i class="fas fa-rocket"></i> Connect</h3>
                    </div>
                    <div class="social-links">
                        ${socialLinks}
                    </div>
                </div>
            </div>
        </div>
    `;
}