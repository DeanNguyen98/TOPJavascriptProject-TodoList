import {getActiveProject, projectlist, removeProject, processProjectInput, renderProject } from "./createProject";
import { processTaskInput, renderTask, changeTaskcondition, clearCompletedTask } from "./createTask";
import {format} from "date-fns"
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
    const TodayTaskButton = document.querySelector("[data-today-task]");
    TodayTaskButton.addEventListener("click", displayTodayTask);
}


const DisplayAllTask = () => {
    
    let AllTask = [];
    projectlist.forEach(project => {
        AllTask = AllTask.concat(project.tasks)
        renderTask(AllTask);
    })
}

const displayTodayTask = () => {
    let todayTask = [];
    projectlist.forEach(project => {
        const todayDate = new Date();
        const formatedTodayDate = format(todayDate, "dd/MM/yyyy");
        project.tasks.forEach(task => {
            if (task.date === formatedTodayDate) {
                todayTask.push(task);
                renderTask(todayTask);
            }
        })
    })
}

export {ProjectEventListener, TaskEventListener, navbarEventListener };