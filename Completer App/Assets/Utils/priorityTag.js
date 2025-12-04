//Priority tag for task importance
export function getPriorityTag(priority, isDashboard = false) {
   
    const p = (priority && priority.toLowerCase()) || 'none';
    
    let className;

    switch (p) {
        case 'high':
            className = 'high';
            break;
        case 'medium':
            className = 'medium';
            break;
        case 'low':
            className = 'low';
            break;
        default:
            className = 'none';
            content = 'None'; 
    }
    
    const dashboardClass = isDashboard ? ' priority-tag--dashboard' : '';
    
    const tagHTML = `<span class="priority-tag ${className}${dashboardClass}">${p}</span>`;

    return tagHTML;
}

export function setPriorityTag(element, priority) {
    const tagHTML = getPriorityTag(priority);
    element.innerHTML = tagHTML;
}

