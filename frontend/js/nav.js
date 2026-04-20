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
            <img src="../assets/icons/home.png" alt="Home" class="nav-icon" />
            <span>HOME</span>
          </a>
          <a href="about.html" class="nav-item">
            <img src="../assets/icons/info.png" alt="About" class="nav-icon" />
            <span>ABOUT US</span>
          </a>
          <a href="events.html" class="nav-item">
            <img src="../assets/icons/calendar.png" alt="Events" class="nav-icon" />
            <span>EVENTS</span>
          </a>
          <a href="members.html" class="nav-item">
            <img src="../assets/icons/members.png" alt="Members" class="nav-icon" />
            <span>MEMBERS</span>
          </a>
        </nav>
      </div>
    </header>
`;