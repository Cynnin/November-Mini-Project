export class SideBar extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }



  connectedCallback() {
    this.shadowRoot.innerHTML = `
      <link rel="stylesheet" href="./Patterns/Sidebar/sidebar.css"/>
      <nav class="sidebar" id="myNav">
        <div class="sidebar-header">
          <div class="logo-and-title">
            <div class="logo-container">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-square-check-big h-5 w-5 text-blue-600" aria-hidden="true">
                <path d="M21 10.656V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h12.344"></path>
                <path d="m9 11 3 3L22 4"></path>
              </svg>
            </div>
            <div>
              <h1>TaskMaster</h1>
            </div>
          </div>
          <my-button id="collapse-button" aria-label="Toggle sidebar" aria-expanded="true">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" aria-hidden="true" class="lucide lucide-chevron-left h-4 w-4" viewBox="0 0 24 24">
              <path d="m15 18-6-6 6-6"/>
            </svg>
          </my-button>
        </div>
        <hr>

        <div class="user-profile">
        <div class="profile-container">
          <div class="user-icon"></div>
          <div class="user-info">
          <span class="username"></span>
          <span class="user-email"></span>
          </div>
          </div>
        </div>
        <hr>

        <ul class="nav-links">

          <li id="dashboard-link">
            <my-button href="./index.html" data-variant="ghost">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" aria-hidden="true" class="lucide lucide-layout-dashboard h-5 w-5 flex-shrink-0" viewBox="0 0 24 24">
                <rect width="7" height="9" x="3" y="3" rx="1"/>
                <rect width="7" height="5" x="14" y="3" rx="1"/>
                <rect width="7" height="9" x="14" y="12" rx="1"/>
                <rect width="7" height="5" x="3" y="16" rx="1"/>
              </svg>
              Dashboard
            </my-button>
          </li>

          <li id="tasks-link">
            <my-button href="./taskpage.html" data-variant="ghost">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-square-check-big h-5 w-5 text-blue-600" aria-hidden="true">
                <path d="M21 10.656V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h12.344"/>
                <path d="m9 11 3 3L22 4"/>
              </svg>
              Tasks
            </my-button>
          </li>

          <li id="community-link">
            <my-button href="./communitypage.html" data-variant="ghost">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" aria-hidden="true" class="lucide lucide-users h-5 w-5 flex-shrink-0" viewBox="0 0 24 24">
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M16 3.128a4 4 0 0 1 0 7.744M22 21v-2a4 4 0 0 0-3-3.87"/>
                <circle cx="9" cy="7" r="4"/>
              </svg>
              Community
            </my-button>
          </li>

          <li id="expenses-link">
            <my-button href="#" data-variant="ghost">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-dollar-sign h-5 w-5 text-cyan-600" aria-hidden="true">
                <line x1="12" x2="12" y1="2" y2="22"></line>
                <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
              </svg>
              Expenses
            </my-button>
          </li>

          <li id="notes-link">
            <my-button href="#" data-variant="ghost">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-file-text h-5 w-5 flex-shrink-0" aria-hidden="true">
                <path d="M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z"/>
                <path d="M14 2v5a1 1 0 0 0 1 1h5"/>
                <path d="M10 9H8"/>
                <path d="M16 13H8"/>
                <path d="M16 17H8"/>
              </svg>
              Notes
            </my-button>
          </li>

          <li id="settings-link">
            <my-button href="#" data-variant="ghost">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" aria-hidden="true" class="lucide lucide-settings h-5 w-5 flex-shrink-0" viewBox="0 0 24 24"><path d="M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915"/><circle cx="12" cy="12" r="3"/></svg>
              </svg>
              Settings
            </my-button>
          </li>
        </ul>

        <div class="sidebar-footer">
          <my-button data-variant="ghost" class="logout-button">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" aria-hidden="true" class="lucide lucide-log-out h-5 w-5 flex-shrink-0" viewBox="0 0 24 24">
              <path d="m16 17 5-5-5-5m5 5H9m0 9H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
            </svg>
            Logout
          </my-button>
        </div>
      </nav>
    `;
  
    //To set username
    const username = this.getAttribute('username') || 'User';
    const usernameSpan = this.shadowRoot.querySelector('.username');
    if (usernameSpan) {
      usernameSpan.textContent = username;
    }

    //To set email
    const userEmail = this.getAttribute('user-email') || '';
    const userEmailSpan = this.shadowRoot.querySelector('.user-email'); 
    if (userEmailSpan) {
      userEmailSpan.textContent = userEmail;
    }


    // Add ARIA attributes
    const nav = this.shadowRoot.querySelector('nav');
    nav.setAttribute('aria-label', 'Main navigation');

    const collapseBtn = this.shadowRoot.getElementById('collapse-button');
    collapseBtn.setAttribute('aria-label', 'Toggle sidebar');
    collapseBtn.setAttribute('aria-expanded', 'true');

    // Add collapse functionality
    const sidebar = this.shadowRoot.querySelector('.sidebar');
    if (collapseBtn && sidebar) {
      collapseBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const isCollapsed = sidebar.classList.toggle('collapsed');
        collapseBtn.classList.toggle('rotate');
        collapseBtn.setAttribute('aria-expanded', !isCollapsed);
      });
    }

    // Logout button - guard with null check
    const logoutBtn = this.shadowRoot.querySelector('.logout-button');
    if (logoutBtn) {
      logoutBtn.addEventListener('click', () => {
        
        const logoutHref = this.getAttribute('logout-href');
        if (logoutHref) {
          window.location.href = logoutHref;
          return;
        }

        this.dispatchEvent(new CustomEvent('logout', {
          bubbles: true,
          composed: true,
          detail: { username }
        }));
      });
    }

  // Nav links: now using <my-button href="..."> elements
const links = this.shadowRoot.querySelectorAll('.nav-links my-button');
if (links && links.length) {
  // Determine current path
  const currentPath = window.location.pathname;

  // Try to mark current location active, otherwise default to first link
  let matched = false;

  links.forEach(link => {
    const href = link.getAttribute('href');
    if (!href || href === '#') return;

    try {
      const linkPath = new URL(href, window.location.origin).pathname;
      if (linkPath === currentPath) {
        link.classList.add('active');
        matched = true;
      }
    } catch (err) {
      console.warn('Invalid href:', href);
    }
  });

  //Set default if on unmatched page
  if (!matched && currentPath === '/index.html') {
    links?.classList.add('active');
  }

  links.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      // remove active from all and set on clicked link
      links.forEach(l => l.classList.remove('active'));
      link.classList.add('active');
      const href = link.getAttribute('href');
      if (href && href !== '#') {
        this.dispatchEvent(new CustomEvent('navigate', {
          bubbles: true,
          composed: true,
          detail: { path: href }
        }));
      }
    });
  });
}
  }
  updateUserIcon(initials) {
   const userIcon = this.shadowRoot.querySelector('.user-icon');
    if (userIcon) {
    userIcon.textContent = initials;
}
  }
}

