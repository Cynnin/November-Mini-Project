//Priority tag for task importance
export function getPriorityTag(priority) {
    let tag = '';
    switch (priority) {
        case 'high':
            tag = '<span class="priority-tag high">High Priority</span>';
            break;
        case 'medium':
            tag = '<span class="priority-tag medium">Medium Priority</span>';
            break;
        case 'low':
            tag = '<span class="priority-tag low">Low Priority</span>';
            break;
        default:
            tag = '<span class="priority-tag none">No Priority</span>';
    }
    return tag;
}
export function setPriorityTag(element, priority) {
    const tagHTML = getPriorityTag(priority);
    element.innerHTML = tagHTML;
}

