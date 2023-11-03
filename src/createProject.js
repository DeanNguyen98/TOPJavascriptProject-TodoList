import { renderTask } from "./createTask";

let defaultProjectList=[];
let projectlist = localStorage.getItem("myProjectList");
    projectlist = JSON.parse(projectlist || JSON.stringify(defaultProjectList));
let activeId;

function saveToLocalStorage(){
    localStorage.setItem("myProjectList", JSON.stringify(projectlist));
}

function CreatenewProject (name) {
    return {name: name, id: Date.now().toString(), tasks: []};
}

const removeProject = () => {
    projectlist = projectlist.filter(project => project.id !== activeId);
    renderProject(projectlist);
    const taskbody = document.querySelector(".task-body");
    taskbody.innerText = "";
    saveToLocalStorage(); 
    }


const processProjectInput = (e) => {
    const projectInput = document.querySelector("[data-new-project-input]");
        e.preventDefault();
        if (projectInput.value === "") {
            alert("project name cannot be empty")
            return
        };
        const newProject = CreatenewProject(projectInput.value);
        projectlist.push(newProject);
        renderProject(projectlist);
        console.log(projectlist);
        saveToLocalStorage();
        projectInput.value = null;
}

const createProjecttemplate = (project) => {
    const projectButton = document.createElement("button");
    projectButton.classList.add("button-nav");
    projectButton.innerText = project.name;
    projectButton.dataset.listId = project.id;
    return projectButton;
}

const renderProject = (projectlist) => {
    const projectContainer = document.getElementById("project-list");
    projectContainer.innerText = "";
    projectlist.forEach(project => {
        const projectbutton = createProjecttemplate(project);
        projectContainer.appendChild(projectbutton);

        //Adding the renderTask function to render the task when click;
        
        projectbutton.addEventListener("click", () => {
            renderTask(project.tasks);
            const projectTitle = document.querySelector(".todo-title");
            projectTitle.innerText = project.name;
            console.log(project.tasks)
        })
    })
}

const getActiveProject = (e) => {
    const projectButton = document.querySelectorAll(".button-nav");
    projectButton.forEach(button => {
        button.classList.remove("active");
    })
    if (e.target.tagName.toLowerCase() === "button") {
        e.target.classList.add("active");
        activeId = e.target.dataset.listId;
        console.log(activeId);

        //disable delete project button for all Task and today Button on navbar
        if (e.target.classList.contains("All-task") || e.target.classList.contains("today-task")) {
            const deleteProjectBtn = document.querySelector("[data-project-delete]");
            deleteProjectBtn.innerText = "";
        } else {
            const deleteProjectBtn = document.querySelector("[data-project-delete]");
            deleteProjectBtn.innerText = "Delete Project";
        }
    }

}

export {getActiveProject, removeProject, processProjectInput, projectlist, activeId, saveToLocalStorage, renderProject};