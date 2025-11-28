//The global js file for the Completer App
import { SideBar } from "./Patterns/Sidebar/sidebar.js";
import { Card } from "./Components/Cards/cards.js";
import { Button } from '../Signup-sign-in/Components/Button/button.js';
import { Greetings } from './Components/Greetings/greetings.js';
import { getUserProfile } from './Assets/Utils/userProfile.js';
import { getActiveTasks } from './Assets/Utils/activeTasks.js';
import { getPriorityTag } from "./Assets/Utils/priorityTag.js";
import { TaskCard } from "./Components/Task-card/task.js";


// To register custom elements once for the app
if (!customElements.get('my-button')) {
  customElements.define('my-button', Button);
}

if (!customElements.get('side-bar')) {
  customElements.define('side-bar', SideBar);
}

if (!customElements.get('app-card')) {
  customElements.define('app-card', Card);
}

if (!customElements.get('greetings-message')) {
  customElements.define('greetings-message', Greetings);
}

if (!customElements.get('task-card')) {
  customElements.define('task-card', TaskCard);
}


//For generating initials to display in the sidebar
function getInitials(fullName) {
  if (!fullName) return '';

  //To split the name
  const parts = fullName.trim().split(/\s+/);

  //To take the first letter
  let initials = parts[0][0];

  //But if there is more than one part/initial, we'll take the first letter of the last 
  if (parts.length > 1) {
    initials += parts[parts.length - 1][0];
  }
  return initials.toUpperCase();
}


//To set up user info in sidebar and greetings
document.addEventListener('DOMContentLoaded', () => {
  const username = localStorage.getItem('username') || 'User';
  const greetingsElement = document.createElement('greetings-message');
  greetingsElement.setAttribute('data-name', username);
  document.getElementById('header-title').prepend(greetingsElement);

  const sidebarElement = document.querySelector('side-bar');
  if (sidebarElement) {
    const { username: profileUsername, userEmail } = getUserProfile();
    sidebarElement.setAttribute('username', profileUsername);
    sidebarElement.setAttribute('user-email', userEmail);

    //To update the user icon with initials
      const initials = getInitials(profileUsername);
      sidebarElement.updateUserIcon(initials);
  }//Think I made a mistake somewhere here. Review and correct
});


//To set up active task count in dashboard card
document.addEventListener('DOMContentLoaded', () => {
    const tasks = getActiveTasks();
    const activeTaskCount = tasks.length;
    const activeTasksElement = document.querySelector('.card-text-large'); 
    if (activeTasksElement) {
        activeTasksElement.textContent = activeTaskCount;
    }
});

//To set up priority tag in task card
document.addEventListener('DOMContentLoaded', () => {
  const tasks = getActiveTasks();
  tasks.forEach(task => {
    const taskCard = document.querySelector(`task-card[data-title="${task.title}"]`);
    if (taskCard) {
      const priorityTag = getPriorityTag(task.priority);
      const prioritySlot = document.createElement('div');
      prioritySlot.setAttribute('slot', 'priority');
      prioritySlot.innerHTML = priorityTag;
      taskCard.appendChild(prioritySlot);
    }
  });
});


//The last function I wrote kept refreshing the page
 //Testing out a new one

 //For redirecting pages/tabs
function loadView(path) {
  const container = document.getElementById('dashboard-container');
  if (!container) {
    console.error('Dashboard container not found!');
    return;
  }
  
  //Not exactly needed - but it clears existing content
  container.innerHTML = '<h1>Loading...</h1>'; 

  //To determine the path to fetch
  fetch(path)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Failed to load view: ${response.statusText}`);
      }
      return response.text();
    })
    .then(html => {
      //To inject new content
      container.innerHTML = html;
      
      // To load/re-load any scripts needed by the new page
      document.dispatchEvent(new CustomEvent('viewLoaded', { detail: { path } }));
    })
    .catch(error => {
      container.innerHTML = `<h1>Error Loading Content</h1><p>${error.message}</p>`;
      console.error('View loading error:', error);
    });
}


//For navigation from the sidebar
document.addEventListener('navigate', (event) => {
 const targetPath = event.detail?.path;
  console.log(`Navigation requested to: ${targetPath}`);
 
  if (targetPath && targetPath !== '#') {
    
    //Hope this works
    //This makes the Back/Forward buttons work and changes the URL that's shown
    window.history.pushState({}, '', targetPath);
    
    //To load new content into the main container
    loadView(targetPath);
 }
});

//Using the popstate to handle navigation/history
//What interesting things I'm learning so far
window.addEventListener('popstate', () => {
    //To get the current URL pathname
    const currentPath = window.location.pathname;
    
    //To load the view that corresponds to the new history state
    loadView(currentPath);
});//Something's wrong somewhere. I have two sidebars when I click on dashboard. Review and fix

//For the logout event
document.addEventListener('logout', (event) => {
  const username = event.detail?.username;
  console.log(`${username || 'User'} has logged out.`);
  // Navigate to sign-in page
  window.location.href = '../Signup-sign-in/index.html';
});