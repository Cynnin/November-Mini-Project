class TaskForm extends HTMLElement {
    constructor() {
        super();
        //To use Shadow DOM for encapsulation
        this.attachShadow({ mode: 'open' });
        this.render();
    }


    render() {
        this.shadowRoot.innerHTML = `
            <style>
                @import url('./global.css'); 
                
                .input-label {
                    display: block;
                    font-size: var(--text-lg);
                    font-weight: var(--font-weight-medium);
                    color: var(--color-gray-700);
                    margin-bottom: calc(var(--spacing) * 2);
                    line-height: 1;
                }
                
                .custom-textarea {
                    width: 100%;
                    min-height: 80px;
                    padding: calc(var(--spacing) * 3);
                    border: 1px solid var(--border);
                    border-radius: var(--radius);
                    font-family: inherit;
                    font-size: var(--text-base);
                    color: var(--foreground);
                    background-color: var(--input-background);
                    resize: vertical;
                    outline: none;
                    transition: border-color 0.15s ease;
                    margin-bottom: calc(var(--spacing) * 4);
                }
                
                .custom-textarea:focus {
                    border-color: var(--ring);
                    box-shadow: 0 0 0 2px var(--color-blue-200);
                }

                .form-row {
                    display: flex;
                    gap: calc(var(--spacing) * 4);
                    margin-top: calc(var(--spacing) * 4);
                }

                .form-group {
                    flex: 1;
                }

                .custom-select {
                    width: 100%;
                    padding: calc(var(--spacing) * 3);
                    border: 1px solid var(--border);
                    border-radius: var(--radius);
                    background-color: var(--input-background);
                    font-family: inherit;
                    font-size: var(--text-base);
                    color: var(--foreground);
                    appearance: none;
                    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%2364748b' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E");
                    background-repeat: no-repeat;
                    background-position: right calc(var(--spacing) * 3) center;
                    cursor: pointer;
                    outline: none;
                    transition: border-color 0.15s ease;
                }
                
                .custom-select:focus {
                    border-color: var(--ring, #2563eb);
                    box-shadow: 0 0 0 2px var(--color-blue-200);
                }
                .mt-4 { margin-top: calc(var(--spacing) * 4); }

                .input-with-button {
            display: flex; 
            align-items: center; 
            gap: 8px; 
        }
        .input-with-button my-input {
            flex-grow: 1; 
        }
        .add-icon-button {
            background: var(--color-gray-100);
            border: 1px solid var(--border);
            border-radius: var(--radius);
            padding: 8px; 
            cursor: pointer;
            transition: background-color 0.15s ease;
            display: flex;
            align-items: center;
        }
        .add-icon-button:hover {
            background-color: var(--color-gray-200);
        }
        .add-icon-button svg {
            color: var(--color-gray-500);
            width: 18px; 
            height: 18px; 
        }
                
            </style>
            
            <form id="taskForm">
                <label for="task-title" class="input-label">Title</label>
                <div class="input-with-button">
                <my-input id="task-title" name="title" data-placeholder="Enter task title" data-type="text"></my-input>

                <button type="button" class="add-icon-button" id="add-detail-btn" aria-label="Add detail">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-sparkles h-5 w-5 text-blue-600" aria-hidden="true"><path d="M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z"/><path d="M20 2v4"/><path d="M22 4h-4"/><circle cx="4" cy="20" r="2"/><g class="modal-title-icon-path"/></svg>
                </svg>
            </button>
        </div>
                
                <label for="task-description" class="input-label mt-4">Description</label>
                <textarea id="task-description" name="description" class="custom-textarea" placeholder="Add task details..."></textarea>

                <div class="form-row">
                    <div class="form-group">
                        <label for="task-priority" class="input-label">Priority</label>
                        <select id="task-priority" name="priority" class="custom-select">
                            <option value="high">High</option>
                            <option value="medium" selected>Medium</option>
                            <option value="low">Low</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="task-due-date" class="input-label">Due Date</label>
                        <my-input id="task-due-date" name="dueDate" data-placeholder="dd/mm/yyyy" data-type="date" data-icon="calendar-days"></my-input>
                    </div>
                </div>
                <button type="submit" style="display: none;"></button>
            </form>
        `;
        
        this.setupSubmission();
    }
    
    connectedCallback() {
       
        const titleInput = this.shadowRoot.getElementById('task-title');
        const dueDateInput = this.shadowRoot.getElementById('task-due-date');

        if(titleInput) titleInput.addEventListener('input', this.updateData.bind(this));
        if(dueDateInput) dueDateInput.addEventListener('input', this.updateData.bind(this));
    }

   
    updateData() {
        
    }

    getFormData() {
        const data = {};
        
        data.description = this.shadowRoot.getElementById('task-description').value.trim();
        data.priority = this.shadowRoot.getElementById('task-priority').value;
        
        const titleElement = this.shadowRoot.getElementById('task-title');
        const dueDateElement = this.shadowRoot.getElementById('task-due-date');

        data.title = titleElement.value || titleElement.getAttribute('value');
        data.dueDate = dueDateElement.value || dueDateElement.getAttribute('value');
        
        //For basic validation
        if (!data.title || data.title.trim() === '') {
            alert("Task Title is required.");
           
            return null;
        }

        return data;
    }

  
    resetForm() {
        const form = this.shadowRoot.getElementById('taskForm');
        
        form.reset(); 

        this.shadowRoot.getElementById('task-title').value = '';
        this.shadowRoot.getElementById('task-due-date').value = '';

        this.shadowRoot.getElementById('task-priority').value = 'medium';
    }

 
    setupSubmission() {
        const form = this.shadowRoot.getElementById('taskForm');
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const taskData = this.getFormData();
            
            if (taskData) {
                //To dispatch a custom event with the task data
                this.dispatchEvent(new CustomEvent('taskSubmitted', {
                    detail: taskData,
                    bubbles: true,
                    composed: true
                }));
                
                this.resetForm(); 
                
               
                document.dispatchEvent(new CustomEvent('closeModal', { 
                    bubbles: true 
                }));
            }
        });
    }
}

export { TaskForm };