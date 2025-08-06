// Card Template - Sectioned layout with cards for each block
function generateCardTemplate(data) {
    const profileImage = data.profileImage ? 
        `<img src="${data.profileImage}" alt="${data.fullName}" class="profile-image">` : 
        `<div class="profile-placeholder"><i class="fas fa-user"></i></div>`;

    const socialLinks = generateSocialLinks(data);
    const skillsList = data.skills.split(',').map(skill => 
        `<span class="skill-tag">${skill.trim()}</span>`
    ).join('');

    return `
        <div class="template-card">
            <div class="card-container">
                <!-- Profile Card -->
                <div class="card profile-card">
                    <div class="card-content">
                        ${profileImage}
                        <h1 class="name">${data.fullName}</h1>
                        <h2 class="title">${data.jobTitle}</h2>
                    </div>
                </div>

                <!-- About Card -->
                <div class="card about-card">
                    <div class="card-header">
                        <h3><i class="fas fa-user"></i> About Me</h3>
                    </div>
                    <div class="card-content">
                        <p class="bio">${data.bio}</p>
                    </div>
                </div>

                <!-- Skills Card -->
                <div class="card skills-card">
                    <div class="card-header">
                        <h3><i class="fas fa-code"></i> Skills</h3>
                    </div>
                    <div class="card-content">
                        <div class="skills-container">
                            ${skillsList}
                        </div>
                    </div>
                </div>

                <!-- Contact Card -->
                <div class="card contact-card">
                    <div class="card-header">
                        <h3><i class="fas fa-envelope"></i> Connect</h3>
                    </div>
                    <div class="card-content">
                        <div class="social-links">
                            ${socialLinks}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}