(()=>{"use strict";const e=e=>{const t=document.querySelector("[data-create-task-input]");if(e.preventDefault(),""===t.value)return void alert("Task input cannot be empty");const n={name:t.value,id:Date.now().toString(),complete:!1},o=r.find((e=>e.id===c));void 0!==o?(o.tasks.push(n),t.value=null,a(o.tasks),s()):alert("Please choose a project to add your task")};function t(e){const t=document.createElement("div");t.classList.add("tasks-container"),t.id=`${e.id} + container`;const a=document.createElement("div");a.classList.add("tasks");const n=document.createElement("input");n.type="checkbox",n.id=e.id,n.checked=e.complete;const o=document.createElement("label");return o.htmlFor=e.id,o.textContent=e.name,t.appendChild(a),a.appendChild(n),a.appendChild(o),t}function a(e){const a=document.querySelector(".task-body");a.innerText="",e.forEach((e=>{t(e),a.appendChild(t(e))}))}const n=e=>{"input"===e.target.tagName.toLowerCase()&&(r.find((e=>e.id===c)).tasks.find((t=>t.id===e.target.id)).complete=e.target.checked,s())},o=()=>{const e=r.find((e=>e.id===c));e.tasks.filter((e=>e.complete)).forEach((e=>{document.getElementById(`${e.id} + container`).classList.add("fade-out")})),setTimeout((()=>{e.tasks=e.tasks.filter((e=>!e.complete)),a(e.tasks),s()}),500)};let c,r=localStorage.getItem("myProjectList");function s(){localStorage.setItem("myProjectList",JSON.stringify(r))}r=JSON.parse(r||JSON.stringify([]));const d=()=>{r=r.filter((e=>e.id!==c)),i(r),document.querySelector(".task-body").innerText="",s()},l=e=>{const t=document.querySelector("[data-new-project-input]");if(e.preventDefault(),""===t.value)return void alert("project name cannot be empty");const a={name:t.value,id:Date.now().toString(),tasks:[]};r.push(a),i(r),console.log(r),s(),t.value=null},i=e=>{const t=document.getElementById("project-list");t.innerText="",e.forEach((e=>{const n=(e=>{const t=document.createElement("button");return t.classList.add("button-nav"),t.innerText=e.name,t.dataset.listId=e.id,t})(e);t.appendChild(n),n.addEventListener("click",(()=>{a(e.tasks),document.querySelector(".todo-title").innerText=e.name,console.log(e.tasks)}))}))},u=e=>{document.querySelectorAll(".button-nav").forEach((e=>{e.classList.remove("active")})),"button"===e.target.tagName.toLowerCase()&&(e.target.classList.add("active"),c=e.target.dataset.listId,console.log(c),e.target.classList.contains("All-task")||e.target.classList.contains("today-task")?document.querySelector("[data-project-delete]").innerText="":document.querySelector("[data-project-delete]").innerText="Delete Project")};document.querySelector("[data-new-project-form]").addEventListener("submit",l),document.querySelector(".navbar").addEventListener("click",u),document.querySelector("[data-project-delete]").addEventListener("click",d),i(r),document.querySelector("[data-create-task-form]").addEventListener("submit",e),document.querySelector(".task-body").addEventListener("click",n),document.querySelector("[data-task-clear]").addEventListener("click",o),document.querySelector("[data-all-task]").addEventListener("click",(()=>{let e=[];r.forEach((t=>{e=e.concat(t.tasks),a(e)}))}))})();