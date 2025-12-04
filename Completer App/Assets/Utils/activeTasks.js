

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
    let activeTasks = getActiveTasks();
    const taskIndex = activeTasks.findIndex(task => task.id === taskId);

    //Remove from active tasks
    if (taskIndex !== -1) {
        const taskToComplete = activeTasks.splice(taskIndex, 1)[0];
    
    localStorage.setItem('activeTasks', JSON.stringify(activeTasks));

    //Add to completed tasks
    const completedTasks = getCompletedTasks();
    completedTasks.push(taskToComplete);
    localStorage.setItem('completedTasks', JSON.stringify(completedTasks));
}
}

//To delete an active task
export function deleteActiveTask(taskId) {
let tasks = getActiveTasks();

    //To filter out the task with the matching ID
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

export function deleteCompletedTask(taskId) {
    let completedTasks = getCompletedTasks();
    completedTasks = completedTasks.filter(task => task.id !== taskId);
    localStorage.setItem('completedTasks', JSON.stringify(completedTasks));
}