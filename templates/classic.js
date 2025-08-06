// Classic Template - Clean resume-style layout
function generateClassicTemplate(data) {
    const profileImage = data.profileImage ? 
        `<img src="${data.profileImage}" alt="${data.fullName}" class="profile-image">` : 
        `<div class="profile-placeholder"><i class="fas fa-user"></i></div>`;

    const socialLinks = generateSocialLinks(data);
    const skillsList = data.skills.split(',').map(skill => 
        `<span class="skill-tag">${skill.trim()}</span>`
    ).join('');

    return `
        <div class="template-classic">
            <header class="classic-header">
                <div class="profile-section">
                    ${profileImage}
                    <div class="profile-info">
                        <h1 class="name">${data.fullName}</h1>
                        <h2 class="title">${data.jobTitle}</h2>
                    </div>
                </div>
            </header>

            <main class="classic-main">
                <section class="about-section">
                    <h3><i class="fas fa-user"></i> About Me</h3>
                    <p class="bio">${data.bio}</p>
                </section>

                <section class="skills-section">
                    <h3><i class="fas fa-code"></i> Skills</h3>
                    <div class="skills-container">
                        ${skillsList}
                    </div>
                </section>

                <section class="contact-section">
                    <h3><i class="fas fa-envelope"></i> Connect With Me</h3>
                    <div class="social-links">
                        ${socialLinks}
                    </div>
                </section>
            </main>
        </div>
    `;
}

// Helper function to generate social links
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