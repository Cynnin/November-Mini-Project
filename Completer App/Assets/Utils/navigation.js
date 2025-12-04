export class Navigation extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({
      mode: "open"
    });
  }

  static get observedAttributes() {
    return ['collapsed'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'collapsed') {
      this.updateStyles();
    }
  }

  connectedCallback() {
    //To set up a list for the links
    this.shadowRoot.innerHTML = `
      <style>
        /*Styling for the buttons*/
        :host {
          --color-blue-50: oklch(0.97 0.014 254.604);
          --color-blue-600: oklch(0.546 0.245 262.881);
          --color-green-50: oklch(0.982 0.018 155.826);
          --color-green-600: oklch(0.627 0.194 149.214);
          --color-cyan-50: oklch(0.984 0.019 200.873);
          --color-cyan-600: oklch(0.609 0.126 221.723);
          --color-indigo-50: oklch(0.962 0.018 272.314);
          --color-indigo-600: oklch(0.511 0.262 276.966);
          --color-purple-50: oklch(0.977 0.014 308.299);
          --color-purple-600: oklch(0.558 0.288 302.321);
          --color-gray-50: oklch(0.985 0.002 247.839);
          --color-gray-600: oklch(0.446 0.03 256.802);
          --color-white: #fff;
        }

        ul { 
          list-style: none; 
          padding: 0; 
          margin: 0; 
        }
        .nav-link {
          /* Style the button links */
          width: 100%;
          text-align: left;
          padding: 10px 15px;
          border: none;
          background: transparent;
          cursor: default;
          color: oklch(21.402% 0.02741 265.092 / 0.872);
          transition: background 0.2s, color 0.2s;
          font-size: 14px;
          display: flex;
          align-items: center;
          gap: 8px; /*For spacing between icon and text*/
        }
        .nav-link:hover {
          background: var(--color-gray-50);
          color: var(--color-white);
          transform: translateY(-1px);
          box-shadow: 0 6px 18px rgba(16, 24, 40, 0.06);
        }

        /*To wrap text for collapse*/
        .link-title {
            transition: opacity 0.3s ease, max-width 0.3s ease, padding 0.3s ease;
            white-space: nowrap;
            overflow: hidden;
            max-width: 150px;
        }

        /*For when the host element has the collapsed attributr*/
        :host([collapsed]) .link-title {
        opacity: 0;
        max-width: 0;
        padding-left: 0;
        }
        
        /* --- Active Styles --- */

        /* Default/Dashboard (Indigo) */
        .nav-link.active-indigo {
          background: var(--color-indigo-50);
          color: var(--color-indigo-600);
          font-weight: bold;
        }
        .nav-link.active-indigo svg {
          color: var(--color-indigo-600);
        }

        /* Tasks (Blue) */
        .nav-link.active-blue {
          background: var(--color-blue-50);
          color: var(--color-blue-600);
          font-weight: bold;
        }
        .nav-link.active-blue svg {
          color: var(--color-blue-600);
        }

        /* Community (Purple) */
        .nav-link.active-purple {
          background: var(--color-purple-50);
          color: var(--color-purple-600);
          font-weight: bold;
        }
        .nav-link.active-purple svg {
          color: var(--color-purple-600);
        }
        
        /*Expenses (Cyan)*/
        .nav-link.active-cyan {
            background: var(--color-cyan-50);
            color: var(--color-cyan-600);
            font-weight: bold;
        }
        .nav-link.active-cyan svg {
            color: var(--color-cyan-600);
        }

        /*Notes (Green)*/
        .nav-link.active-green {
            background: var(--color-green-50);
            color: var(--color-green-600);
            font-weight: bold;
        }
        .nav-link.active-green svg {
            color: var(--color-green-600);
        }

        /*Settings (Grey)*/
        .nav-link.active-grey {
            background: var(--color-gray-50);
            color: var(--color-gray-600);
            font-weight: bold;
        }
        .nav-link.active-gray svg {
            color: var(--color-gray-600);
        }
      </style>
      <ul id="nav-links"></ul> 
    `;

    this.setupNavigation();
  }

  updateStyles() {}
  //For the navigation links and event listeners.
  setupNavigation() {
    const navLinksContainer = this.shadowRoot.getElementById('nav-links');

    const items = [
      {
        title: 'Dashboard',
        href: '/', 
        icon: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-layout-dashboard"><rect x="3" y="3" width="7" height="9"/><rect x="14" y="3" width="7" height="5"/><rect x="14" y="12" width="7" height="9"/><rect x="3" y="16" width="7" height="5"/></svg>`,
        activeClass: 'active-indigo' //Added unique class
      },
      {
        title: 'Tasks',
        href: './taskpage.html',
        icon: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-square-check-big h-5 w-5 text-blue-600" aria-hidden="true"><path d="M21 10.656V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h12.344"></path><path d="m9 11 3 3L22 4"></path></svg>`,
        activeClass: 'active-blue' //Added unique class
      },
      {
        title: 'Community',
        href: './communitypage.html',
        icon: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-users"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
        activeClass: 'active-purple' //Added unique class
      },
      {
        title: 'Expenses',
        href: '#', //Not needed for now
        icon: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" aria-hidden="true" class="lucide lucide-dollar-sign h-5 w-5 flex-shrink-0" viewBox="0 0 24 24"><path d="M12 2v20m5-17H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>`,
        activeClass: 'active-cyan'
      },
      {
        title: 'Notes',
        href: '#', //Not needed for now
        icon: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-file-text h-4 w-4 text-white" aria-hidden="true"><path d="M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z"></path><path d="M14 2v5a1 1 0 0 0 1 1h5"></path><path d="M10 9H8"></path><path d="M16 13H8"></path><path d="M16 17H8"></path></svg>`,
        activeClass: 'active-green'
      },
      {
        title: 'Settings',
        href: '#', //Not needed for now
        icon: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" aria-hidden="true" class="lucide lucide-settings h-5 w-5 flex-shrink-0" viewBox="0 0 24 24"><path d="M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915"/><circle cx="12" cy="12" r="3"/></svg>`,
        activeClass: 'active-grey'
      },
    ];

    items.forEach(item => {
      const li = document.createElement('li');
      const button = document.createElement('button');

      //To setup button properties + icon
      button.innerHTML = item.icon + `<span class = "link-title">${item.title}</span>`;
      button.classList.add('nav-link');
      //To store the href path in a data attribute
      button.dataset.href = item.href;
      //To store the specific active class for later use
      button.dataset.activeClass = item.activeClass; 

      //To add click event listener
      button.addEventListener('click', (e) => {
        e.preventDefault();

        if (item.href && item.href !== '#') {
          //If the href is the root path, append fragment identifier
          const pathToSend = item.href === '/' ? '/#dashboard-container' : item.href;

          //To update active link immediately (internal component state change)
          this.updateActiveLink(item.href);

          //To dispatch navigate event to the parent <side-bar>
         
          this.dispatchEvent(new CustomEvent('navigate', {
            bubbles: true,
            composed: true,
            detail: {
              path: pathToSend
            }
          }));
        }
      });

      li.appendChild(button);
      navLinksContainer.appendChild(li);
    });

    //To set initial active link based on the URL when the component first loads
    this.updateActiveLink();
  }

  //To update active link based on path
  updateActiveLink(path = null) {
    //To check against the full path, including hash, if present
    const targetPath = path || (window.location.pathname + window.location.hash);
    const navLinks = this.shadowRoot.querySelectorAll('.nav-link');

    //To normalize path (handles relative paths, trailing slashes, and file extensions)
    const normalizePath = (p) => {
      let normalized = p.replace(/\/$/, ''); //To remove trailing slash

      
      if (!normalized.startsWith('/') && normalized !== '#') {
        try {
          normalized = new URL(normalized, window.location.origin).pathname;
        } catch (e) {
         
        }
      }

      
      normalized = normalized.replace(/\.html$/, '').replace(/#.*$/, '');

      
      if (normalized === '/dashboardpage' || normalized === '/index' || normalized === '') {
        return '/';
      }

      return normalized;
    };

   
    const normalizedTargetPath = normalizePath(targetPath);
    
    //Custom active classes to be removed/checked
    const activeClasses = ['active-blue', 'active-green', 'active-purple', 'active-indigo', 'active-cyan', 'active-grey'];


    navLinks.forEach(link => {
      const linkHref = link.dataset.href;
      const linkActiveClass = link.dataset.activeClass;
      const normalizedLinkPath = normalizePath(linkHref);

     
      activeClasses.forEach(cls => link.classList.remove(cls));

      
      if (normalizedLinkPath === normalizedTargetPath) {
        link.classList.add(linkActiveClass);
      }
    });

   
    const hasActiveLink = Array.from(navLinks).some(link => activeClasses.some(cls => link.classList.contains(cls)));

    if (!hasActiveLink && normalizedTargetPath === '/') {
      
      const dashboardLink = Array.from(navLinks).find(link => link.dataset.href === '/');
      dashboardLink?.classList.add(dashboardLink.dataset.activeClass);
    }
  }
}