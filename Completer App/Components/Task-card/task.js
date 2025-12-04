//Card for when a task is displayed/created
export class TaskCard extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        
        //For binding methods to 'this'
        this.render = this.render.bind(this);
        this.addEventListeners = this.addEventListeners.bind(this);
        this.updateStatusVisuals = this.updateStatusVisuals.bind(this);
        this.handleCompletion = this.handleCompletion.bind(this); 
    }

    static get observedAttributes() {
        
        return ['data-title', 'data-description', 'data-due-date', 'data-variant', 'data-status', 'data-task-id']; 
    }

    connectedCallback() {
        this.render();          
        this.addEventListeners(); 
    }
    
    disconnectedCallback() {
        
        const completeButton = this.shadowRoot.querySelector('.complete-circle');
        if (completeButton) {
            completeButton.removeEventListener('click', this.handleCompletion);
        }
    }

    handleCompletion() {
        const taskId = this.getAttribute('data-task-id');
        
        console.log("Task marked as complete:", taskId); 

        //To dispatch the custom event globally
        this.dispatchEvent(new CustomEvent('taskCompleted', {
            bubbles: true,
            composed: true,
            detail: {
                taskId: taskId
            }
        }));
    }

    addEventListeners() {
        const completeButton = this.shadowRoot.querySelector('.complete-circle');

        if (completeButton) {
          
            completeButton.addEventListener('click', this.handleCompletion);
        }
    }

    
    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue === newValue) return;

        const shadowRoot = this.shadowRoot;

       
        if (name === 'data-status') {
            this.updateStatusVisuals(newValue);
            return;
        }

        
        
        if (name === 'data-title') {
            const titleElement = shadowRoot.querySelector('.task-title');
            if (titleElement) titleElement.textContent = newValue;
            
        } else if (name === 'data-description') {
            const descElement = shadowRoot.querySelector('.task-description');
            if (descElement) descElement.textContent = newValue;
            
        } else if (name === 'data-due-date') {
            const dateElement = shadowRoot.querySelector('.task-due-date');
            if (dateElement) dateElement.textContent = `Due: ${newValue}`;
            
        } else if (name === 'data-variant') {
            const cardElement = shadowRoot.querySelector('.task-card');
            if (cardElement) {
                
                cardElement.classList.remove(`task-card--${oldValue}`);
                cardElement.classList.add(`task-card--${newValue}`);
            }
        }
        
       
    }

   
    render() {
       
        const title = this.getAttribute("data-title") || "Untitled Task";
        const description = this.getAttribute("data-description") || "No description provided.";
        const dueDate = this.getAttribute("data-due-date") || "N/A";
        const variant = this.getAttribute("data-variant") || "default";
        const status = this.getAttribute("data-status") || "active"; 

        this.shadowRoot.innerHTML = `
        <link rel="stylesheet" href="./Components/Task-card/task.css"/>
        <div class="task-card task-card--${variant}">
            <slot name ="icon">
                <button class="complete-circle" aria-label="Mark task as complete">
            <svg class="icon-empty" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-circle"><circle cx="12" cy="12" r="10"/></svg>
            
            <svg class="icon-checked" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check-circle-2"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="M9 12l2 2 4-4"/></svg>
        </button>
            </slot>
            <div class="task-content">
                <h3 class="task-title">${title}</h3>
                <p class="task-description">${description}</p>
                <p class="task-due-date">Due: ${dueDate}</p>
                </div>
                <slot name="priority"></slot>
                <slot name="discard"></slot>
            </div>
        `;
        
       
        this.updateStatusVisuals(status);
    } 
    
   
    updateStatusVisuals(status) {
        const taskCardElement = this.shadowRoot.querySelector('.task-card');
        if (taskCardElement) {
            if (status === 'completed') {
                taskCardElement.classList.add('task-card--completed');
            } else {
                taskCardElement.classList.remove('task-card--completed');
            }
        }
    }
}



