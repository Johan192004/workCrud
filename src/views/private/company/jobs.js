import { getJobs, auth, deleteJob } from "../../../Router.js"
import { viewDashboard } from "../dashboard.js"

export function viewJobs(){
    if(auth()){
        if(document.getElementById("dashboardField")){
            if(window.sessionStorage.getItem("location") == "jobs"){
                console.log("Ya habia cargado antes")
                viewJobsComplete()
            } else {
                viewJobsComplete()
                console.log("Ya habia cargado")
            }
            
        } else {
            viewDashboard()
            viewJobsComplete()
            console.log("No habia cargado")

        }
    }



async function viewJobsComplete(){


    console.log("Entre al view jobs")
    let appContainer = document.getElementById("dashboardField")
    

    const jobs = await getJobs()
    appContainer.innerHTML = "" 

    

    jobs.forEach(element => {
        let currentId = element.id

        const card = document.createElement("div");
        card.className = "card card-job";
        card.innerHTML = `
        <div class="card-body">
            <h5 class="card-title">${element.title}</h5>
            <p class="card-text text-truncate">${element.description}</p>
            <p class="card-text">Salario $<span>${element.salary}</span></p>
            <div class="d-flex flex-row gap-2">
            <button class="btn btn-secondary" data-action="${currentId}details">Ver detalles</button>
            <button class="btn btn-warning" data-action="${currentId}edit">Editar</button>
            <button class="btn btn-danger" data-action="${currentId}delete">Eliminar</button>
            </div>
        </div>
        `
            
        const deleteJobButton = card.querySelector(`[data-action="${currentId}delete"]`);
        deleteJobButton.addEventListener("click", (e) => {
        e.preventDefault();
        deleteJob(currentId);
        window.location.hash = "#/dashboard"
        window.location.hash = "#/dashboard/jobs"; 

        });
            
        appContainer.appendChild(card)
    
    })

    window.sessionStorage.setItem("location","jobs")

    
        
}}


function createDeleteButton(currentId){
    let deleteJobButton = document.querySelector(`[data-action="${currentId}delete"]`)
        console.log(deleteJobButton)
            
        deleteJobButton.addEventListener("click",(e)=>{
            e.preventDefault()
            deleteJob(currentId)
            window.location.hash = window.location.hash

        })
}