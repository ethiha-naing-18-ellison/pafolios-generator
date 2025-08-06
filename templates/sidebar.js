// Sidebar Template - Sticky left sidebar with profile + navigation
function generateSidebarTemplate(data) {
    const profileImage = data.profileImage ? 
        `<img src="${data.profileImage}" alt="${data.fullName}" class="profile-image">` : 
        `<div class="profile-placeholder"><i class="fas fa-user"></i></div>`;

    const socialLinks = generateSocialLinks(data);
    const skillsList = data.skills.split(',').map(skill => 
        `<span class="skill-tag">${skill.trim()}</span>`
    ).join('');

    return `
        <div class="template-sidebar">
            <aside class="sidebar">
                <div class="sidebar-content">
                    <div class="profile-section">
                        ${profileImage}
                        <h1 class="name">${data.fullName}</h1>
                        <h2 class="title">${data.jobTitle}</h2>
                    </div>

                    <nav class="sidebar-nav">
                        <a href="#about" class="nav-link active">
                            <i class="fas fa-user"></i> About
                        </a>
                        <a href="#skills" class="nav-link">
                            <i class="fas fa-code"></i> Skills
                        </a>
                        <a href="#contact" class="nav-link">
                            <i class="fas fa-envelope"></i> Contact
                        </a>
                    </nav>

                    <div class="sidebar-social">
                        ${socialLinks}
                    </div>
                </div>
            </aside>

            <main class="main-content">
                <section id="about" class="content-section">
                    <h3>About Me</h3>
                    <p class="bio">${data.bio}</p>
                </section>

                <section id="skills" class="content-section">
                    <h3>Skills & Technologies</h3>
                    <div class="skills-container">
                        ${skillsList}
                    </div>
                </section>

                <section id="contact" class="content-section">
                    <h3>Let's Connect</h3>
                    <p>I'm always interested in new opportunities and collaborations. Feel free to reach out!</p>
                    <div class="contact-links">
                        ${socialLinks}
                    </div>
                </section>
            </main>
        </div>
    `;
}