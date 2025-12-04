class TaskModal extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        
        //To bind event handlers
        this.closeModal = this.closeModal.bind(this);
        this.handleOverlayClick = this.handleOverlayClick.bind(this);
        this.handleCreateTask = this.handleCreateTask.bind(this);
        this.handleConfirmDelete = this.handleConfirmDelete.bind(this);

        this.render(); 
        this.setCreationMode(); //To set initial mode to 'Creation'
    }

    // --- Web Component Lifecycle Methods ---

    static get observedAttributes() {
        return ['open'];
    }
    
    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'open' && oldValue !== newValue) {
            this.toggleModal(newValue !== null);
        }
    }

    connectedCallback() {
        //To attach static listeners 
        const shadowRoot = this.shadowRoot;
        shadowRoot.querySelector('.modal-close-button').addEventListener('click', this.closeModal);
        shadowRoot.querySelector('.modal-overlay').addEventListener('click', this.handleOverlayClick);
        
        //To listen globally for success signal from the form (task-form.js)
        document.addEventListener('closeModal', this.closeModal);
    }

    disconnectedCallback() {
        const shadowRoot = this.shadowRoot;
        shadowRoot.querySelector('.modal-close-button').removeEventListener('click', this.closeModal);
        shadowRoot.querySelector('.modal-overlay').removeEventListener('click', this.handleOverlayClick);
        document.removeEventListener('closeModal', this.closeModal);
        
        //To clean up dynamic listeners
        this.cleanupDynamicListeners();
    }
    
    //To remove event listeners from dynamic content
    cleanupDynamicListeners() {
        const shadowRoot = this.shadowRoot;
        const createButton = shadowRoot.querySelector('.modal-create-button');
        const cancelButton = shadowRoot.querySelector('.modal-cancel-button');
        const confirmButton = shadowRoot.querySelector('.modal-confirm-button');

        if (createButton) createButton.removeEventListener('click', this.handleCreateTask);
        if (cancelButton) cancelButton.removeEventListener('click', this.closeModal);
        if (confirmButton) confirmButton.removeEventListener('click', this.handleConfirmDelete);
    }
    
    // --- Modal Control Functions ---
    
    toggleModal(isOpen) {
        const overlay = this.shadowRoot.querySelector('.modal-overlay');
        if (isOpen) {
            overlay.classList.add('show');
            document.body.style.overflow = 'hidden'; 
        } else {
            overlay.classList.remove('show');
            document.body.style.overflow = '';
        }
    }
    
    closeModal() {
        this.removeAttribute('open');
        //To reset to default mode after closing
        this.setCreationMode(); 
    }
    
    handleOverlayClick(event) {
        if (event.target === this.shadowRoot.querySelector('.modal-overlay')) {
            this.closeModal();
        }
    }
    
    // --- MODE: Task Creation ---
    
    //To trigger the inner form submission 
    handleCreateTask() {
        const taskForm = this.shadowRoot.querySelector('task-form');
        if (taskForm && taskForm.shadowRoot) {
            const submitButton = taskForm.shadowRoot.querySelector('button[type="submit"]');
            if (submitButton) {
                //To trigger the submission handler inside task-form
                submitButton.click(); 
            }
        }
    }

    setCreationMode() {
        this.cleanupDynamicListeners(); //To remove delete listeners first
        const shadowRoot = this.shadowRoot;
        
        //To reset Header
        shadowRoot.querySelector('.modal-title').textContent = 'Create New Task';
        shadowRoot.querySelector('.modal-subtitle').textContent = 'Add a new task to your productivity list'; 
        shadowRoot.querySelector('.modal-title-icon-path').innerHTML = 
            `<path d="M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z"/><path d="M20 2v4"/><path d="M22 4h-4"/><circle cx="4" cy="20" r="2"/>`; 
        
        //To reset the body
        shadowRoot.querySelector('.modal-body').innerHTML = '<task-form></task-form>';
        
        //To reset the footer
        const footerContainer = shadowRoot.querySelector('.modal-footer');
        footerContainer.innerHTML = `
            <my-button data-variant="secondary" class="modal-cancel-button">Cancel</my-button>
            <my-button data-variant="primary" class="modal-create-button">Create Task</my-button>
        `;
        
        //To attach creation listeners
        footerContainer.querySelector('.modal-cancel-button').addEventListener('click', this.closeModal);
        footerContainer.querySelector('.modal-create-button').addEventListener('click', this.handleCreateTask);
    }

    // --- MODE: Delete Confirmation ---
    
    setConfirmationMode(title, messageHtml) {
        this.cleanupDynamicListeners(); 
        const shadowRoot = this.shadowRoot;
        
        //To update header title and icon
        shadowRoot.querySelector('.modal-title').textContent = title;
        shadowRoot.querySelector('.modal-subtitle').textContent = 'This action is permanent and cannot be reversed.'; 
        shadowRoot.querySelector('.modal-title-icon-path').innerHTML = 
            `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="#000000" height="20px" width="20px" version="1.1" id="Layer_1" viewBox="0 0 512 512" xml:space="preserve"><g><g><g><path d="M255.967,384c-17.643,0-32,14.357-32,32c0,17.643,14.357,32,32,32s32-14.357,32-32     C287.967,398.357,273.61,384,255.967,384z M255.967,426.667c-5.888,0-10.667-4.8-10.667-10.667     c0-5.867,4.779-10.667,10.667-10.667c5.888,0,10.667,4.8,10.667,10.667C266.634,421.867,261.855,426.667,255.967,426.667z"/><path d="M481.823,402.368L321.524,38.912C308.234,14.549,283.722,0,255.967,0S203.7,14.549,190.026,39.723L30.303,401.984     c-12.523,23.275-11.947,50.709,1.557,73.472C45.45,498.325,69.45,512,96.074,512h319.808c26.603,0,50.624-13.675,64.192-36.544     C493.663,452.565,494.175,424.939,481.823,402.368z M461.727,464.576c-9.707,16.363-26.859,26.112-45.867,26.112H96.052     c-19.008,0-36.16-9.749-45.867-26.112c-9.707-16.363-10.069-36.096-0.96-52.779c0.149-0.256,0.277-0.512,0.405-0.789     L209.14,49.131c9.493-17.408,27.008-27.797,46.827-27.797s37.333,10.389,46.421,27.008l160.299,363.456     C471.796,428.501,471.434,448.213,461.727,464.576z"/><path d="M226.57,141.035c-7.509,8.299-11.157,19.413-10.048,30.528l18.155,181.504c0.555,5.461,5.141,9.6,10.624,9.6h21.333     c5.483,0,10.069-4.139,10.603-9.6l18.155-181.504c1.109-11.115-2.539-22.229-10.048-30.528     C270.346,124.459,241.567,124.459,226.57,141.035z M274.186,169.429l-17.195,171.904h-2.027l-17.152-171.904     c-0.533-5.205,1.109-10.197,4.629-14.08c7.019-7.744,20.096-7.744,27.115,0C273.055,159.211,274.698,164.224,274.186,169.429z"/></g></g></g></svg>`; 
        
        //For the confirmation message
        shadowRoot.querySelector('.modal-body').innerHTML = messageHtml; 
        
        //To inject confirmation footer buttons
        const footerContainer = shadowRoot.querySelector('.modal-footer');
        footerContainer.innerHTML = `
            <my-button data-variant="secondary" class="modal-cancel-button">Cancel</my-button>
            <my-button data-variant="danger" class="modal-confirm-button">Delete</my-button>
        `;
        
        //To attach confirmation listeners
        footerContainer.querySelector('.modal-cancel-button').addEventListener('click', this.closeModal);
        footerContainer.querySelector('.modal-confirm-button').addEventListener('click', this.handleConfirmDelete);
    }
    
    handleConfirmDelete() {
        this.removeAttribute('open'); // To close modal immediately
        this.setCreationMode(); //To reset content immediately
        //To dispatch the global event for the deletion logic in global.js
        document.dispatchEvent(new CustomEvent('deletionConfirmed', { bubbles: true }));
    }

    // --- Render Method (Static Structure) ---
    render() {
        this.shadowRoot.innerHTML = `
            <style>
                @import url('./global.css'); 
                   .modal-overlay {
                    position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
                    background-color: rgba(0, 0, 0, 0.4); 
                    display: flex;
                    justify-content: center; 
                    align-items: center; z-index: 1000;
                    visibility: hidden; opacity: 0;
                    transition: visibility 0.2s, opacity 0.2s ease-in-out;
                }
                .modal-overlay.show { visibility: visible; opacity: 1; }
                .modal-content {
                    background-color: var(--color-white, #ffffff); 
                    border-radius: var(--radius-2xl, 0.75rem);
                    padding: calc(var(--spacing, 0.25rem) * 8); 
                    width: 100%; 
                    max-width: 450px;
                    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
                }
                /* Header and Title styles */
                .modal-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: calc(var(--spacing, 0.25rem) * 2); }
                .modal-title-group { display: flex; align-items: center; }
                .modal-title { font-size: var(--text-xl, 1.25rem); font-weight: var(--font-weight-semibold, 600); color: var(--color-gray-900, #111827); margin: 0; }
                .modal-header svg { color: var(--color-blue-600, #2563eb); margin-right: calc(var(--spacing, 0.25rem) * 2); }
                .modal-close-button { background: none; border: none; color: var(--color-gray-500, #6b7280); cursor: pointer; padding: calc(var(--spacing, 0.25rem) * 2); border-radius: var(--radius, 0.375rem); }
                .modal-close-button:hover { background-color: var(--color-gray-100, #f3f4f6); color: var(--color-gray-700, #4b5563); }
                .modal-subtitle { font-size: var(--text-sm, 0.875rem); color: var(--muted-foreground, #6b7280); margin-bottom: calc(var(--spacing, 0.25rem) * 6); }
                /* Footer and Button styles */
                .modal-footer { 
                    display: flex; 
                    justify-content: flex-end; 
                    gap: calc(var(--spacing, 0.25rem) * 3); 
                    padding-top: calc(var(--spacing, 0.25rem) * 4); 
                    
                }  
            </style>
            
            <div class="modal-overlay">
                <div class="modal-content">
                    <div class="modal-header">
                        <div class="modal-title-group">
                           <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-sparkles h-5 w-5 text-blue-600" aria-hidden="true"><g class="modal-title-icon-path"/></svg>
                            <h3 class="modal-title"></h3>
                        </div>
                        <button class="modal-close-button" aria-label="Close modal">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x h-5 w-5" aria-hidden="true"><path d="M18 6 6 18"></path><path d="m6 6 12 12"></path></svg>
                        </button>
                    </div>

                    <p class="modal-subtitle"></p>

                    <div class="modal-body"></div>
                    <div class="modal-footer"></div>
                </div>
            </div>
        `;
    }
}

export { TaskModal };