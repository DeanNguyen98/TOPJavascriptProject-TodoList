let defaultProjectList=[];
let projectlist = localStorage.getItem("myProjectList");
    projectlist = JSON.parse(projectlist || JSON.stringify(defaultProjectList));
let activeId;
const ProjectEventListener = () => {
    const addprojectform = document.querySelector("[data-new-project-form]");
    addprojectform.addEventListener("submit" , (processProjectInput));

    const projectcontainer = document.getElementById("project-list");
    projectcontainer.addEventListener("click", (getActiveProject));

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
        console.log(projectlist);
        renderProject(projectlist);
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
        createProjecttemplate(project);
        projectContainer.appendChild(createProjecttemplate(project));
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

export {ProjectEventListener, renderProject};