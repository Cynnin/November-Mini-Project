//Global js for the Completer app

import { Button } from '../Signup-sign-in/Components/Button/button.js';
import { SideBar } from "./Patterns/Sidebar/sidebar.js";
import { Card } from "./Components/Cards/cards.js";
import { Greetings } from './Components/Greetings/greetings.js';
import { getUserProfile, requireAuth, logoutUser } from './Assets/Utils/userProfile.js';
import { addActiveTask, completeTask, deleteCompletedTask, getActiveTaskCount, getActiveTasks, getCompletedTaskCount, getCompletedTasks, deleteActiveTask } from './Assets/Utils/activeTasks.js';
import { getPriorityTag } from "./Assets/Utils/priorityTag.js";
import { TaskCard } from "./Components/Task-card/task.js";
import { Navigation } from './Assets/Utils/navigation.js';
import { Input } from '../Signup-sign-in/Components/Text-Fields/input.js';
import { Tab } from '../Signup-sign-in/Patterns/Tab/tab.js';
import { TaskForm } from './Patterns/Form/task-form.js';
import { TaskModal } from './Patterns/Task-modal/task-modal.js';
import { AISummaryResult } from './Components/AI-Mock-Generate/AI-Summary-Results.js';
import { addSummaryToHistory, getSummaryHistory } from './Components/AI-Mock-Generate/AI-History.js';
import { displayPost } from './Assets/Utils/communitypost.js';
import { formatTimeAgo } from './Assets/Utils/timestamp.js';

// --- Component Registration ---
if (!customElements.get('my-button')) customElements.define('my-button', Button);
if (!customElements.get('side-bar')) customElements.define('side-bar', SideBar);
if (!customElements.get('app-card')) customElements.define('app-card', Card);
if (!customElements.get('greetings-message')) customElements.define('greetings-message', Greetings);
if (!customElements.get('task-card')) customElements.define('task-card', TaskCard);
if (!customElements.get('nav-component')) customElements.define('nav-component', Navigation);
if (!customElements.get('my-input')) customElements.define('my-input', Input);
if (!customElements.get('tab-content')) customElements.define('tab-content', Tab);
if (!customElements.get('task-form')) customElements.define('task-form', TaskForm);
if (!customElements.get('task-modal')) customElements.define('task-modal', TaskModal);
if (!customElements.get('ai-summary-result'))
    customElements.define('ai-summary-result', AISummaryResult);

// --- Global Variables ---
let pendingTaskToDelete = null; 

// --- Utility Functions ---

function getInitials(fullName) {
    if (!fullName) return '';
    const parts = fullName.trim().split(/\s+/);
    let initials = parts[0][0];
    if (parts.length > 1) {
        initials += parts[parts.length - 1][0];
    }
    return initials.toUpperCase();
}


  //To create a task-card custom element with necessary attributes and slotted content.

function createTaskCardElement(data, isDashboard = false) {
    
    const taskCard = document.createElement('task-card');

    if (data.id) {
        taskCard.setAttribute('data-task-id', data.id);
    }

    taskCard.setAttribute('data-title', data.title || 'Untitled Task');
    taskCard.setAttribute('data-description', data.description || 'No description');
    taskCard.setAttribute('data-due-date', data.dueDate || 'N/A');
    taskCard.setAttribute('data-variant', isDashboard ? 'dashboard' : 'default');

    
    const priorityHTML = getPriorityTag(data.priority, isDashboard);
    const prioritySlot = document.createElement('div');
    prioritySlot.setAttribute('slot', 'priority');
    prioritySlot.innerHTML = priorityHTML;
    taskCard.appendChild(prioritySlot);

    const discardSlot = document.createElement('div');
    discardSlot.setAttribute('slot', 'discard');
    discardSlot.innerHTML = `<my-button data-variant="icon-danger" class="discard-btn"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trash-2"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg></my-button>`;
    taskCard.appendChild(discardSlot);

    return taskCard;
}


  //To toggle the visibility of the Completed Tasks section based on the count.
 
function updateCompletedSectionVisibility() {
    const completedTasksSection = document.getElementById('completed-tasks-section');
    const completedCount = getCompletedTaskCount();

    if (completedTasksSection) {
        if (completedCount === 0) {
            completedTasksSection.style.display = 'none';
        } else {
            completedTasksSection.style.display = 'block'; 
        }
    }
}

//To toggle the empty state container in tasks view
function toggleEmptyState() {
  const activeTaskListContainer = document.getElementById('active-tasks-list');

  if (!activeTaskListContainer) return;

  const emptyStateContainer = activeTaskListContainer.closest('app-card')?.querySelector('.svg-background');

  if (emptyStateContainer) {
    const activeCount = getActiveTaskCount();

    if (activeCount === 0) {
      emptyStateContainer.style.display = "block";
    } else {
      emptyStateContainer.style.display = "none";
    }
  }
}


  //To handle the logic for deleting a task from the UI and storage.
 
function deleteTask(taskId, taskCardElement) {

    const activeTaskListContainer = document.getElementById('active-tasks-list');
    
    
    //To check if the element is already removed
    if (!taskCardElement || !taskCardElement.parentElement) {
        console.warn(`Task ${taskId} not found in the DOM, aborting deletion.`);
        updateAllTaskCounts(); 
        updateCompletedSectionVisibility();

        toggleEmptyState();
        return;
    }
        
    const isTaskActive = activeTaskListContainer && activeTaskListContainer.contains(taskCardElement);
    
    if (isTaskActive) {
        deleteActiveTask(taskId);
    } else {
        deleteCompletedTask(taskId);
    }

    taskCardElement.remove();
    console.log(`Task ${taskId} removed.`);
    
    //To update active count display on the dashboard and task page
    updateAllTaskCounts();
    updateCompletedSectionVisibility();

    //To show empty state after deletion
   
    toggleEmptyState();
}



 //To update the task count for active and completed, and calculate the completion rate.
 
function updateAllTaskCounts() {
    
    const activeTaskCount = getActiveTaskCount();
    const completedTaskCount = getCompletedTaskCount();
    
    //To update dashboard active task
    const dashboardActiveTasksElement = document.querySelector('.card-text-large');
    if (dashboardActiveTasksElement) {
        dashboardActiveTasksElement.textContent = activeTaskCount;
    }
    
    //To update dashboard completed task 
    const dashboardCompletedElement = document.getElementById('dashboard-completed-count');
    if (dashboardCompletedElement) {
        dashboardCompletedElement.textContent = `${completedTaskCount} completed`;
    }

    //For the task page counts 
    //Active count
    const activeTaskCountElement = document.querySelector('#mytasks .task-counter .task-count:not(.grn)');
    if (activeTaskCountElement) {
        activeTaskCountElement.textContent = activeTaskCount;
    }
    //For the completed counter
    const completedTaskCountElement = document.querySelector('#mytasks .task-counter .task-count.grn');
    if (completedTaskCountElement) {
        completedTaskCountElement.textContent = completedTaskCount;
    }

    //To calculate and update completion rate 
    const totalTasks = activeTaskCount + completedTaskCount;
    let completionRate = 0;

    if (totalTasks > 0) {
        //To calculate the rate and round to the nearest whole number
        completionRate = Math.round((completedTaskCount / totalTasks) * 100);
    }
    
    //For the Completion Rate card 
    const completionRateElement = document.querySelector('.smallcards-container .card:last-child .card-text-large');
    
    if (completionRateElement) {
        completionRateElement.textContent = `${completionRate}%`;
    }
}

//For the post timestamps
function updateAllPostTimes() {
    const posts = document.querySelectorAll('.community-post-item');
    
    posts.forEach(post => {
        const timestamp = post.getAttribute('data-timestamp');
        const timeDisplayElement = post.querySelector('[data-timestamp-display]');
        
        if (timestamp && timeDisplayElement) {
            //To use the imported utility
            const timeAgo = formatTimeAgo(timestamp); 
            timeDisplayElement.textContent = timeAgo;
        }
    });
}

function startPostTimeUpdater() {
    
    updateAllPostTimes(); 
    
    setInterval(updateAllPostTimes, 60000); 
}

// --- AI Summary Functions ---

function generateMockAISummaryData() { 
    
    const activeTasks = getActiveTasks(); 
    const completedTasks = getCompletedTasks(); 

    const highPriorityActive = activeTasks.filter(t => t.priority && (t.priority.toLowerCase() === 'high'));
    const lowPriorityCount = activeTasks.filter(t => t.priority && (t.priority.toLowerCase() === 'low')).length;

    const timestamp = `${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}`;

    const nowInMs = Date.now();

    return {
       
        activeTasks: activeTasks.map(t => ({ title: t.title, dueDate: t.dueDate })),
        completedCount: completedTasks.length, 
        highPriorityActive: highPriorityActive.map(t => ({ title: t.title, dueDate: t.dueDate })),
        lowPriorityCount: lowPriorityCount,
        timestamp: nowInMs
    };
}

// --- Handler Functions ---


  //For the custom 'taskSubmitted' event from the task-form.
 
const handleTaskSubmission = (event) => {
    const activeTaskListContainer = document.getElementById('active-tasks-list');
   
    const taskData = event.detail;

    const newTask = {
        ...taskData, id: Date.now().toString(), status: 'active'
    };

    addActiveTask(newTask);

    const isDashboard = false;
    const newTaskCard = createTaskCardElement(newTask, isDashboard);

   toggleEmptyState();

    if (activeTaskListContainer) {
        activeTaskListContainer.prepend(newTaskCard);
    }

    updateAllTaskCounts();

};

//To handle the click event for the Generate New button.

const handleGenerateSummary = (event) => {
    const button = event.currentTarget;
    const latestTabContent = document.querySelector('[data-tab="latest"] .card-content');
    
    if (button.hasAttribute('data-disabled')) {
        return; 
    }

    //To disable button and show loading state
    button.setAttribute('data-disabled', '');
    button.querySelector('.text-wrapper').textContent = 'Generating...';
    
    //To show loading state 
    latestTabContent.innerHTML = `<div class="ai-summary-empty-state loading-state">
                                    <div class="ai-icon-wrapper"><svg class="lucide lucide-bar-chart-3" viewBox="0 0 24 24"><path d="M3 3v18h18"/><path d="M18 17V9"/><path d="M13 17V5"/><path d="M8 17v-3"/></svg></div>
                                    <p class="empty-message">Analyzing tasks, please wait...</p>
                                  </div>`;

    //To simulate network/AI processing delay (3 seconds)
    setTimeout(() => {
        const summaryData = generateMockAISummaryData(); 

        addSummaryToHistory(summaryData);
        
        const summaryComponent = document.createElement('ai-summary-result');
        summaryComponent.setAttribute('summary-json', JSON.stringify(summaryData));

        //To replace the loading state with the new component
        latestTabContent.innerHTML = '';
        latestTabContent.appendChild(summaryComponent);
        
        //To re-enable the button
        button.removeAttribute('data-disabled');
        button.querySelector('.text-wrapper').textContent = 'Generate New';
        
    }, 3000);
}


// --- View Initialization Logic ---


  //To initialize the dashboard view by rendering counts and preview of tasks
 
function initializeDashboardView() {
    updateAllTaskCounts();
    
    const dashboardTaskList = document.querySelector('#task-view');
    const activeTasks = getActiveTasks();
    const completedTasks = getCompletedTasks();

    //To combine and sort all tasks by id (most recent first)
    const allTasks = [...activeTasks, ...completedTasks];
    allTasks.sort((a, b) => b.id - a.id);

    //To show only the first 3 tasks
    const tasksToDisplay = allTasks.slice(0, 3);

    if (dashboardTaskList) {
        dashboardTaskList.innerHTML = '';

        if (tasksToDisplay.length > 0) {
            tasksToDisplay.forEach(task => {
                const isDashboard = true;
                const taskCard = createTaskCardElement(task, isDashboard);

                const isCompleted = completedTasks.some(t => t.id === task.id);

                if (isCompleted) {
                    taskCard.setAttribute('data-status', 'completed');
                }
                dashboardTaskList.appendChild(taskCard);

            });
        } 
    }
}


  //To set up event listeners for the tab component navigation.
 
function setupTabs() {
    document.querySelectorAll(".button").forEach(button => {
        button.addEventListener("click", (e) => {
            const mutedBar = button.parentElement;
            const innerContainer = mutedBar.parentElement;
            const tabName = button.dataset.forTab;
            const tabToActivate = innerContainer.querySelector(`.tab[data-tab="${tabName}"]`);

            if (!tabToActivate) return;

            //To deactivate all
            mutedBar.querySelectorAll(".button").forEach(btn => btn.classList.remove("button--active"));
            innerContainer.querySelectorAll(".tab").forEach(tab => tab.classList.remove("tab--active"));

            //To activate target
            button.classList.add("button--active");
            tabToActivate.classList.add("tab--active");
        });
    });
}


  //To initialize the Tasks view by rendering active and completed lists
 
function initializeTasksView() {
    setupTabs();

    //To activate the first tab 
    document.querySelector(".mute .button")?.click();

    initializeAISummaryView();

    const taskModal = document.querySelector('task-modal');
    const addTaskButton = document.getElementById('add-task');
    const activeTaskListContainer = document.getElementById('active-tasks-list');
    const completedTaskListContainer = document.getElementById('completed-tasks-list');
    
    //To ensure containers exist before proceeding
    if (!activeTaskListContainer || !completedTaskListContainer) return;

    const emptyStateContainer = activeTaskListContainer.closest('app-card').querySelector('.svg-background');

    //--- To render tasks on load ---
    const activeTasks = getActiveTasks();
    const completedTasks = getCompletedTasks();

    activeTaskListContainer.innerHTML = '';
    completedTaskListContainer.innerHTML = '';

    //To render active tasks
    activeTasks.forEach(task => {
        const taskCard = createTaskCardElement(task);
        activeTaskListContainer.appendChild(taskCard);
    });

    //To render completed tasks
    completedTasks.forEach(task => {
        const taskCard = createTaskCardElement(task);
        taskCard.setAttribute('data-status', 'completed');
        completedTaskListContainer.appendChild(taskCard);
    });

    //To update counts and visibility
    updateAllTaskCounts();
    updateCompletedSectionVisibility();

    // To handle empty state visibility
    
    toggleEmptyState();

    // For the modal open button
    if (addTaskButton && taskModal) {
        addTaskButton.addEventListener('click', () => {
            taskModal.setAttribute('open', '');
        });
    }

    //For task submission (ensure only one listener is active)
    document.removeEventListener('taskSubmitted', handleTaskSubmission);
    document.addEventListener('taskSubmitted', handleTaskSubmission);
}

//To Initialize the AI Summary
 
function initializeAISummaryView() {
    setupTabs();
   
    document.querySelector('[data-for-tab="latest"]')?.click();

    
    const generateButton = document.getElementById('add-summary'); 
    
    if (generateButton) {
        
        generateButton.removeEventListener('click', handleGenerateSummary); 
        generateButton.addEventListener('click', handleGenerateSummary);
        
        
        generateButton.removeAttribute('data-disabled'); 
    }

    renderSummaryHistory();

    document.removeEventListener('summaryHistoryUpdated', renderSummaryHistory);

    document.addEventListener('summaryHistoryUpdated', renderSummaryHistory);

    const historyTabButton = document.querySelector('[data-for-tab-history]');
    if (historyTabButton) {

        historyTabButton.addEventListener('click', renderSummaryHistory);
    }
}

//To initialize the AI Summary history
function renderSummaryHistory() {
    const historyListContainer = document.getElementById('ai-history-list');
    if (!historyListContainer) return;

    const history = getSummaryHistory();
    historyListContainer.innerHTML = ''; 

    if (history.length === 0) {
        //To show history empty state
        historyListContainer.innerHTML = `
            <div class="ai-history-empty-state">
                <p class="empty-message">No history available</p>
                <p class="empty-prompt">Generate your first AI Summary in the **Latest Summary** tab.</p>
            </div>
        `;
        return;
    }

    //To render each history item
    history.forEach((summaryData) => {
        
        const historyCard = document.createElement('div');
        historyCard.classList.add('ai-history-card');
        historyCard.setAttribute('data-summary-id', summaryData.id);

        const activeCount = summaryData.activeTasks?.length || 0;
        const completedCount = summaryData.completedCount || 0;
        const totalTasks = activeCount + completedCount;

        const displayTime = formatTimeAgo(summaryData.timestamp);

        historyCard.innerHTML = `
            <div class="history-meta">
                <span class="history-title">Summary Generated</span>
                <span class="history-timestamp">${displayTime}</span>
            </div>
            <div class="history-stats">
                <span class="stat-item active-stat">
                    ${activeCount} Active Task${activeCount !== 1 ? 's' : ''}
                </span>
                <span class="stat-item completed-stat">
                    ${completedCount} Completed Task${completedCount !== 1 ? 's' : ''}
                </span>
                <span class="stat-item rate-stat">
                    ${totalTasks > 0 ? Math.round((completedCount / totalTasks) * 100) : 0}% Completion
                </span>
            </div>
            <my-button data-variant="icon-only" class="view-history-detail">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-external-link"><path d="M15 3h6v6"/><path d="M10 14L21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/></svg>
            </my-button>
        `;
        historyListContainer.appendChild(historyCard);
    });
}

  //To initialize the Community view.

function initializeCommunityView() {
    console.log("Community Page Initialized!"); 

    //To retrieve user data
     const { username: profileUsername} = getUserProfile();
     const userInitials = getInitials(profileUsername);

     //To set initials on the icon
      const userIconInput = document.getElementById('user-icon');
    if (userIconInput) {
        userIconInput.textContent = userInitials;
    }

    const inputField = document.getElementById('chat-message-input');
    const sendButton = document.getElementById('send-message-btn');

    //To prevent duplicate listeners
    if (sendButton && !sendButton.hasAttribute('data-listener-attached')) {

        startPostTimeUpdater();
        
        const handlePostMessage = (e) => {
            e.preventDefault(); 
            const message = inputField.value.trim();
            if (message === '') return;

            //To display user's message using imported utility
            displayPost(profileUsername, message, userInitials); 

            updateAllPostTimes();
            
           
            inputField.value = '';
            
            //Mock AI Response
            //To check for the mention @comsq to trigger the mock AI response
            if (message.toLowerCase().includes('@comsq')) {
                setTimeout(() => {
                    displayPost('Comsq AI', 'Hello! I am monitoring your requests. How can I help with your tasks today?', 'AI', true);

          updateAllPostTimes();

                }, 1500);
            }
        };

        sendButton.addEventListener('click', handlePostMessage);
        
        //To allow posting by pressing Ctrl+Enter or Cmd+Enter key
        inputField.addEventListener('keydown', (e) => {
            
            if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
                e.preventDefault(); 
                handlePostMessage(e);
            }
        });

        sendButton.setAttribute('data-listener-attached', 'true');
    }
}


// --- SPA Navigation Logic ---

function loadView(path) {
    const fetchPath = path.includes('.html') ? path.split('#')[0] : './dashboardpage.html';
    const container = document.getElementById('dashboard-container');
    if (!container) return;

    container.innerHTML = '<h1>Loading...</h1>';

    fetch(fetchPath)
        .then(response => {
            if (!response.ok) throw new Error(`Failed to load view: ${response.statusText}`);
            return response.text();
        })
        .then(html => {
            container.innerHTML = html;

            //To get shared data
           const { username } = getUserProfile();

           console.log('User profile received:', username);
            //To re-initialize the Greetings component
            const greetingsElement = container.querySelector('greetings-message');
            if (greetingsElement) {
                greetingsElement.setAttribute('data-name', username || 'User');
            }

            //To call view-specific initialization
            if (fetchPath.includes('taskpage.html')) {
                initializeTasksView();
            } else if (fetchPath.includes('dashboardpage.html')) {
                initializeDashboardView(); 
            } else if (fetchPath.includes('communitypage.html')) {
               
                initializeCommunityView();
            }

            document.dispatchEvent(new CustomEvent('viewLoaded', { detail: { path } }));
        })
        .catch(error => {
            container.innerHTML = `<h1>Error Loading Content</h1><p>${error.message}</p>`;
            console.error('View loading error:', error);
        });
}


// --- Event Listeners ---

//Fixed Navigate Listener
document.addEventListener('navigate', (event) => {
    let targetPath = event.detail?.path;
    let filePathToLoad = targetPath;

    if (targetPath) {
        //To normalize paths for content loading
        if (targetPath === '#' || targetPath.includes('dashboardpage')) {
            filePathToLoad = './dashboardpage.html';
        } else if (targetPath.includes('taskpage')) {
            filePathToLoad = './taskpage.html';
        } else if (targetPath.includes('communitypage')) {
            filePathToLoad = './communitypage.html';
        }

        //To update history
        const baseUrl = window.location.pathname.split('/').slice(0, -1).join('/') + '/index.html#';
        window.history.pushState(null, '', baseUrl + filePathToLoad);

        //To load Content
        loadView(filePathToLoad);
    }
});

//Listener for discard button click 
document.addEventListener('click', (event) => {
    const discardButton = event.target.closest('.discard-btn');
    const taskModal = document.querySelector('task-modal'); // Get modal reference here

    if (discardButton) {
        const taskCard = discardButton.closest('task-card');

        if (taskCard) {
            const taskId = taskCard.getAttribute('data-task-id');
            const taskTitle = taskCard.getAttribute('data-title');
            
            if (taskModal && typeof taskModal.setConfirmationMode === 'function') {
                //To store the task details needed for deletion after confirmation
                pendingTaskToDelete = { taskId, taskCardElement: taskCard, title: taskTitle };
                taskModal.setConfirmationMode(
                    'Confirm Deletion',
                    `
                        <div class="confirmation-message">
                            <p>Are you sure you want to delete the following task?</p>
                            <p style="font-weight: bold; margin: 10px 0;">"${taskTitle}"</p>
                            <p style="color: var(--color-red-600, #dc2626);">This action cannot be undone.</p>
                        </div>
                    `
                );
                taskModal.setAttribute('open', '');
            } else {
                //Fallback 
                if (window.confirm(`Are you sure you want to permanently discard "${taskTitle}"?`)) {
                    deleteTask(taskId, taskCard);
                }
            }
        }
    }
});


//Popstate Listener for browser history navigation
window.addEventListener('popstate', () => {
    const currentHash = window.location.hash.slice(1);
    
    //To load the path from the hash, or default to dashboard
    loadView(currentHash || './dashboardpage.html');
});


//For confirmation from the custom modal
document.addEventListener('deletionConfirmed', () => {
    if (pendingTaskToDelete) {
        deleteTask(pendingTaskToDelete.taskId, pendingTaskToDelete.taskCardElement);
        
        // To clear the pending task
        pendingTaskToDelete = null;
    }
});


//For Shadow DOM task completion
document.addEventListener('taskCompleted', (event) => {
    console.log("Task completion success!");
    
    const taskCard = event.target; 
    const taskId = event.detail.taskId; 

    const activeTaskListContainer = document.getElementById('active-tasks-list');
    const completedTaskListContainer = document.getElementById('completed-tasks-list');


    //To go forward only if the task card is in the active container
    if (activeTaskListContainer && activeTaskListContainer.contains(taskCard) && taskId) {

        //To update data in LocalStorage (Moves task from Active to Completed utility list)
        completeTask(taskId); 

        //To set status attribute (triggers TaskCard visual update)
        taskCard.setAttribute('data-status', 'completed'); 

        if (completedTaskListContainer) {
            completedTaskListContainer.prepend(taskCard); 
        }

        console.log(`Task ${taskId} marked as completed and moved.`);
        updateAllTaskCounts();
        updateCompletedSectionVisibility();

       toggleEmptyState();  

    } 
});

//For the history detail view ---

document.addEventListener('click', (event) => {
    const viewDetailButton = event.target.closest('.view-history-detail');
    
    if (viewDetailButton) {
        const historyCard = viewDetailButton.closest('.ai-history-card');
        if (!historyCard) return;

        const summaryId = historyCard.getAttribute('data-summary-id');
        
        //To retrieve all history data
        const history = getSummaryHistory();
        
        //To find the specific summary data
        const summaryData = history.find(s => s.id === summaryId);

        if (summaryData) {
            //To get the containers for rendering
            const latestTabButton = document.querySelector('[data-for-tab="latest"]');
            const latestTabContent = document.querySelector('[data-tab="latest"] .card-content');
            
            //To create the AI Summary component
            const summaryComponent = document.createElement('ai-summary-result');
            summaryComponent.setAttribute('summary-json', JSON.stringify(summaryData));

            //To switch to the Latest Summary tab
            if (latestTabButton) {
                latestTabButton.click();
            }

            //To render the historical summary data
            if (latestTabContent) {
                latestTabContent.innerHTML = ''; 
                latestTabContent.appendChild(summaryComponent);
            }
        } else {
            console.error(`Summary with ID ${summaryId} not found in history.`);
        }
    }
});


//To handle logout
document.addEventListener('logout', (event) => {
    const username = event.detail?.username;
    console.log(`${username || 'User'} has logged out.`);
    window.location.href = '../Signup-sign-in/index.html';
});


// --- Main Initialization Function ---
const initializeApp = (profileUsername, userEmail) => {
    try {
   
        //To setup sidebar
        const sidebarElement = document.querySelector('side-bar');
        if (sidebarElement) {
            sidebarElement.setAttribute('username', profileUsername);
            sidebarElement.setAttribute('user-email', userEmail);
            
           
            const initials = getInitials(profileUsername);
            if (sidebarElement.updateUserIcon) {
                sidebarElement.updateUserIcon(initials);
            }
        }

        //To load initial view 
        const currentHash = window.location.hash.slice(1);
        let initialPathToLoad = currentHash || './dashboardpage.html';

        loadView(initialPathToLoad);

    } catch (error) {
        console.error('Error during app initialization:', error);
    }
}

//Main Initialization Trigger
document.addEventListener('DOMContentLoaded', () => {
    if (!requireAuth()) {
        return;
    }

    const {username: profileUsername, userEmail} = getUserProfile();

    initializeApp(profileUsername, userEmail);
});