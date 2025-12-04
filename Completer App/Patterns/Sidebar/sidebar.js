export class SideBar extends HTMLElement {
 constructor() {
 super();
 this.attachShadow({
 mode: "open"
 });
 }

 static get observedAttributes() {

 return ['username', 'user-email']; 
 }

 connectedCallback() {
 this.render();
 
 
 this.setupUserProfile();
 this.setupCollapseButton();
 this.setupLogoutButton();
 this.setupNavigation();
 
 
 document.addEventListener('viewLoaded', this.handleViewLoaded.bind(this));
 }
    
   
    disconnectedCallback() {
        document.removeEventListener('viewLoaded', this.handleViewLoaded.bind(this));
    }

    handleViewLoaded(e) {
        this.updateActiveLink(e.detail.path);
    }
    
    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue !== newValue) {
           
            this.setupUserProfile();
        }
    }
    
   
    render() {
        this.shadowRoot.innerHTML = `
            <link rel="stylesheet" href="./Patterns/Sidebar/sidebar.css">
            <nav class="sidebar">
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
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" aria-hidden="true" class="lucide lucude-chevron-left h-4 w-4" viewBox="0 0 24 24">
                    <path d="m15 18-6-6 6-6"/>
                  </svg>
                </my-button>
              </div>
              <hr>
              <div class="user-profile">
                <div class="profile-container">
                  <div class="user-icon" id="user-icon"></div>
                  <div class="user-info">
                    <span class="username" id="username"></span>
                    <span class="user-email" id="user-email"></span>
                  </div>
                </div>
              </div>
              <hr>
              <div class="nav-links">
                <nav-component slot="navigation"></nav-component>
              </div>
              <div class="sidebar-footer">
                <my-button data-variant="ghost" class="logout-button">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" aria-hidden="true" class="lucide lucide-log-out h-5 w-5 flex-shrink-0" viewBox="0 0 24 24">
                    <path d="m16 17 5-5-5-5m5 5H9m0 9H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                  </svg>
                  Logout
                </my-button>
              </div>
            </nav>
        `;
    }

 setupUserProfile() {
 const username = this.getAttribute('username') || 'User';
 const userEmail = this.getAttribute('user-email') || 'user@email.com';

 const usernameSpan = this.shadowRoot.querySelector('#username');
 const userEmailSpan = this.shadowRoot.querySelector('#user-email');
    const userIcon = this.shadowRoot.querySelector('#user-icon');

 if (usernameSpan) usernameSpan.textContent = username;
 if (userEmailSpan) userEmailSpan.textContent = userEmail;
    
    
    if (userIcon && userIcon.textContent && userIcon.textContent !== username[0]) {
        userIcon.textContent = ''; 
    }
 }

 setupCollapseButton() {
 const collapseBtn = this.shadowRoot.getElementById('collapse-button');
 const sidebar = this.shadowRoot.querySelector('.sidebar');
 const navComponent = this.shadowRoot.querySelector('nav-component');
    
    

 if (collapseBtn && sidebar && navComponent) {

 collapseBtn.addEventListener('click', (e) => {
 e.preventDefault();
 const isCollapsed = sidebar.classList.toggle('collapsed');

   if (isCollapsed) {
    navComponent.setAttribute('collapsed', '');
   } else {
    navComponent.removeAttribute('collapsed');
   }

 collapseBtn.classList.toggle('rotate');
 collapseBtn.setAttribute('aria-expanded', !isCollapsed);
 });
 }
 }

 setupLogoutButton() {
 const logoutBtn = this.shadowRoot.querySelector('.logout-button');
 const username = this.getAttribute('username') || 'User';

 if (logoutBtn) {
 logoutBtn.addEventListener('click', () => {
 this.dispatchEvent(new CustomEvent('logout', {
 bubbles: true,
 composed: true,
 detail: {
 username
 }
 }));
 });
 }
 }

 setupNavigation() {
 const navComponent = this.shadowRoot.querySelector('nav-component');
 if (navComponent) {
 
 const initialPath = window.location.hash.slice(1) || window.location.pathname;
 this.updateActiveLink(initialPath); 

 navComponent.addEventListener('navigate', (e) => {
 
 this.dispatchEvent(new CustomEvent('navigate', {
 bubbles: true,
 composed: true,
 detail: {
 path: e.detail.path
 }
 }));
 });
 }
 }


 updateActiveLink(path = null) {
 const navComponent = this.shadowRoot.querySelector('nav-component');
 if (navComponent && navComponent.updateActiveLink) {
 
 navComponent.updateActiveLink(path);
 }
 }

 
 updateUserIcon(initials) {
 const userIcon = this.shadowRoot.querySelector('#user-icon');
 if (userIcon) {
 userIcon.textContent = initials;
 }
 }
}