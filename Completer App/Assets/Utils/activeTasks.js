//To set and update active and completed tasks in localStorage
export function getActiveTasks() {
    const tasks = JSON.parse(localStorage.getItem('activeTasks')) || [];
    return tasks;
}
export function addActiveTask(task) {
    const tasks = getActiveTasks();
    tasks.push(task);
    localStorage.setItem('activeTasks', JSON.stringify(tasks));
}
export function completeTask(taskId) {
    let tasks = getActiveTasks();
    tasks = tasks.filter(task => task.id !== taskId);
    localStorage.setItem('activeTasks', JSON.stringify(tasks));
}
export function clearActiveTasks() {
    localStorage.removeItem('activeTasks');
}
export function getCompletedTasks() {
    const tasks = JSON.parse(localStorage.getItem('completedTasks')) || [];
    return tasks;
}
export function addCompletedTask(task) {
    const tasks = getCompletedTasks();
    tasks.push(task);
    localStorage.setItem('completedTasks', JSON.stringify(tasks));
}
export function clearCompletedTasks() {
    localStorage.removeItem('completedTasks');
}

export function completeAndArchiveTask(taskId) {
    let activeTasks = getActiveTasks();
    const taskToComplete = activeTasks.find(task => task.id === taskId);
    if (taskToComplete) {
        // Remove from active tasks
        activeTasks = activeTasks.filter(task => task.id !== taskId);
        localStorage.setItem('activeTasks', JSON.stringify(activeTasks));
        // Add to completed tasks
        const completedTasks = getCompletedTasks();
        completedTasks.push(taskToComplete);
        localStorage.setItem('completedTasks', JSON.stringify(completedTasks));
    }
}


export function clearAllTasks() {
    clearActiveTasks();
    clearCompletedTasks();
}


//To show active task count on dashboard
export function getActiveTaskCount() {
    const tasks = getActiveTasks();
    return tasks.length;
}
export function getCompletedTaskCount() {
    const tasks = getCompletedTasks();
    return tasks.length;
}