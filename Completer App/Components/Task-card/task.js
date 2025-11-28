//Card for when a task is displayed/created
export class TaskCard extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }

    connectedCallback() {
        const title = this.getAttribute("data-title") || "Task Title";
        const description = this.getAttribute("data-description") || "";
        const dueDate = this.getAttribute("data-due-date") || "No due date set";
        const variant = this.getAttribute("data-variant") || "default";



        this.shadowRoot.innerHTML = `
        <link rel="stylesheet" href="./Components/Task-card/task.css"/>
        <div class="task-card task-card--${variant}">
        <slot name ="icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-circle h-5 w-5 text-gray-400 flex-shrink-0" aria-hidden="true"><circle cx="12" cy="12" r="10"></circle></svg>
        </slot>
        <div class="task-content">
            <h3 class="task-title">${title}</h3>
            ${description ? `<p class="task-description">${description}</p>` : ''}
            <p class="task-due-date">Due: ${dueDate}</p>
            </div>
            <slot name="priority"></slot>
            <slot name="discard"></slot>
        </div>
        `;
    }   
}


//Priority tag will be slotted into task card from global.js
//No description needed for dashboard. Rectify that or set data-variant