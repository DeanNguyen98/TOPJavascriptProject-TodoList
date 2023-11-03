import { renderTask } from "./createTask";

let defaultProjectList=[];
let projectlist = localStorage.getItem("myProjectList");
    projectlist = JSON.parse(projectlist || JSON.stringify(defaultProjectList));
let activeId;

const ProjectEventListener = () => {
    const addprojectform = document.querySelector("[data-new-project-form]");
    addprojectform.addEventListener("submit" , (processProjectInput));

    const navbarcontainer = document.querySelector(".navbar");
    navbarcontainer.addEventListener("click", (getActiveProject));

    const deleteProjectBtn = document.querySelector("[data-project-delete]");
    deleteProjectBtn.addEventListener("click", (removeProject));
    renderProject(projectlist);
}

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
            renderTask(project);
            const projectTitle = document.querySelector(".todo-title");
            projectTitle.innerText = project.name;
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
    }

}

export {ProjectEventListener, projectlist, activeId, saveToLocalStorage};