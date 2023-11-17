import { projectlist , activeId, saveToLocalStorage} from "./createProject";
import {format} from "date-fns";
function CreateNewTask (name, date) {
    return {name: name, id: Date.now().toString(), complete: false, date: date}
}

const processTaskInput = (e) => {
    const taskinput = document.querySelector("[data-create-task-input]");
    const taskdateinput = document.querySelector("[data-create-task-date]")
    e.preventDefault();
    if (taskinput.value === "") {
        alert("Task input cannot be empty");
        return;
    }

    if (taskdateinput.value === "") {
        alert("Task due date cannot be empty");
        return;
    }

    //format the date template using date-fns for easy reference
    const newTask = CreateNewTask(taskinput.value, format(new Date(taskdateinput.value), "dd/MM/yyyy"));
    //
    const activeProject = projectlist.find(project => project.id === activeId);
    if (activeProject === undefined) {
        alert("Please choose a project to add your task");
        return;
    }
    activeProject.tasks.push(newTask);
    taskinput.value = null;
    taskdateinput.value = null;
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
    const taskdescription = document.createElement("div");
    taskdescription.classList.add("task-description")
    taskdescription.textContent = task.date;
    taskcontainer.appendChild(taskdescription);
    return taskcontainer;
}

function renderTask (tasks) {
    const taskbody = document.querySelector(".task-body");
    taskbody.innerText = "";
    tasks.forEach(task => {
        const taskcontent = createTasktemplate(task, false);
        taskbody.appendChild(taskcontent);
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