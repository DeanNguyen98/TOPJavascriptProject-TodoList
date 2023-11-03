import { projectlist , activeId, saveToLocalStorage} from "./createProject";

function CreateNewTask (name, complete) {
    return {name: name, id: Date.now().toString(), complete: false}
}

const processTaskInput = (e) => {
    const taskinput = document.querySelector("[data-create-task-input]");
    e.preventDefault();
    if (taskinput.value === "") {
        alert("Task input cannot be empty");
        return;
    }
    const newTask = CreateNewTask(taskinput.value);
    const activeProject = projectlist.find(project => project.id === activeId);
    if (activeProject === undefined) {
        alert("Please choose a project to add your task");
        return;
    }
    activeProject.tasks.push(newTask);
    taskinput.value = null;
    renderTask(activeProject.tasks);
    saveToLocalStorage();
}

function createTasktemplate (task) {
    const taskcontainer = document.createElement("div");
    taskcontainer.classList.add("tasks-container");
    taskcontainer.id = `${task.id} + container`;
    const taskbox = document.createElement("div");
    taskbox.classList.add("tasks");
    const taskcheckbox = document.createElement("input");
    taskcheckbox.type = "checkbox";
    taskcheckbox.id = task.id;
    taskcheckbox.checked = task.complete;
    const tasklabel = document.createElement("label");
    tasklabel.htmlFor = task.id;
    tasklabel.textContent = task.name;
    taskcontainer.appendChild(taskbox);
    taskbox.appendChild(taskcheckbox);
    taskbox.appendChild(tasklabel);
    return taskcontainer;
}

function renderTask (tasks) {
    const taskbody = document.querySelector(".task-body");
    taskbody.innerText = "";
    tasks.forEach(task => {
        createTasktemplate(task, false);
        taskbody.appendChild(createTasktemplate(task));
    })
}

const changeTaskcondition = (e) => {
    if (e.target.tagName.toLowerCase() === "input") {
        const activeProject = projectlist.find(project => project.id === activeId);
        const activeTask = activeProject.tasks.find(task => task.id === e.target.id);
        activeTask.complete = e.target.checked;
        saveToLocalStorage();
    }
}

const clearCompletedTask = () => {
    const activeProject = projectlist.find(project => project.id === activeId);
    const completedTasks = activeProject.tasks.filter(task => task.complete);
    completedTasks.forEach(task => {
        const taskElement = document.getElementById(`${task.id} + container`);
        taskElement.classList.add("fade-out");
    });
    setTimeout(() => {
        activeProject.tasks = activeProject.tasks.filter(task => !task.complete);
        renderTask(activeProject.tasks);
        saveToLocalStorage();
    }, 500); 
    //setting the delay to render the taskList to be the same as the fadeout transition for completedTask.
}


export {renderTask, processTaskInput, changeTaskcondition, clearCompletedTask};