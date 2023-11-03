import {getActiveProject, projectlist, removeProject, processProjectInput, renderProject } from "./createProject";
import { processTaskInput, renderTask, changeTaskcondition, clearCompletedTask } from "./createTask";
const ProjectEventListener = () => {
    const addprojectform = document.querySelector("[data-new-project-form]");
    addprojectform.addEventListener("submit" , (processProjectInput));

    const navbarcontainer = document.querySelector(".navbar");
    navbarcontainer.addEventListener("click", (getActiveProject));

    const deleteProjectBtn = document.querySelector("[data-project-delete]");
    deleteProjectBtn.addEventListener("click", (removeProject));
    renderProject(projectlist);
}

const TaskEventListener =  () => {
    const newTaskform = document.querySelector("[data-create-task-form]");
    newTaskform.addEventListener("submit", (processTaskInput));
    const taskbody = document.querySelector(".task-body");
    taskbody.addEventListener("click", (changeTaskcondition));
    const clearCompletedTaskBtn = document.querySelector("[data-task-clear]");
    clearCompletedTaskBtn.addEventListener("click", (clearCompletedTask));
}

const navbarEventListener = () => {
    const allTaskButton = document.querySelector("[data-all-task]");
    allTaskButton.addEventListener("click", DisplayAllTask);
}


const DisplayAllTask = () => {
    
    let AllTask = [];
    projectlist.forEach(project => {
        AllTask = AllTask.concat(project.tasks)
        renderTask(AllTask);
    })
}

export {ProjectEventListener, TaskEventListener, navbarEventListener };