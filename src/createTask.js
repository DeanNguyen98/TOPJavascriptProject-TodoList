import { projectlist , activeId, saveToLocalStorage} from "./createProject";

function CreateNewTask (name) {
    return {name: name, id: Date.now().toString(),}
}

const TaskEventListener =  () => {
    const newTaskform = document.querySelector("[data-create-task-form]");
    newTaskform.addEventListener("submit", (processTaskInput));

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
    renderTask(activeProject);
    saveToLocalStorage();
}

function createTasktemplate (task) {
    const taskcontainer = document.createElement("div");
    taskcontainer.classList.add("tasks-container");
    const taskbox = document.createElement("div");
    taskbox.classList.add("tasks");
    const taskcheckbox = document.createElement("input");
    taskcheckbox.type = "checkbox";
    taskcheckbox.id = task.id;
    const tasklabel = document.createElement("label");
    tasklabel.htmlFor = task.id;
    tasklabel.textContent = task.name;
    taskcontainer.appendChild(taskbox);
    taskbox.appendChild(taskcheckbox);
    taskbox.appendChild(tasklabel);
    return taskcontainer;
}

function renderTask (activeProject) {
    const taskbody = document.querySelector(".task-body");
    taskbody.innerText = "";
    activeProject.tasks.forEach(task => {
        createTasktemplate(task);
        taskbody.appendChild(createTasktemplate(task));
    })
}



export {TaskEventListener, renderTask};