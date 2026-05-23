// Navigation component
document.getElementById('header-placeholder').innerHTML = `
    <header class="site-header">
      <div class="header-container">
        <div class="header-logo">
          <img src="../assets/icons/AWS LOGO.png" alt="AWS Logo" class="logo-img" />
          <div class="logo-text">
            <div class="logo-main">
              <span class="logo-aws">AWS</span>
              <span class="logo-learning">Learning Club</span>
            </div>
            <div class="logo-chapter">- JRU Chapter</div>
          </div>
        </div>
        
        <nav class="header-nav">
          <a href="../index.html" class="nav-item active">
            <span>HOME</span>
          </a>
          <a href="about.html" class="nav-item">
            <span>ABOUT US</span>
          </a>
          <a href="events.html" class="nav-item">
            <span>EVENTS</span>
          </a>
          <a href="members.html" class="nav-item">
            <span>MEMBERS</span>
          </a>
        </nav>
      </div>
    </header>
`;