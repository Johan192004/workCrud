import { getJobs } from "../../../Router.js"
import { viewDashboard } from "../dashboard.js"

export function viewJobs(){
    if(document.getElementById("dashboardField")){
        if(window.sessionStorage.getItem("location") == "jobs"){
            console.log("Ya habia cargado antes")
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
    appContainer.innerHTML = ""

    const jobs = await getJobs()
        
    jobs.forEach(element => {
        appContainer.innerHTML += `<div class="card card-job">
                    <div class="card-body">
                        <h5 class="card-title">${element.title}</h5>
                        <p class="card-text text-truncate">${element.description}</p>
                        <p class="card-text">Salario $<span>${element.salary}</span></p>
                        <div class="d-flex flex-row gap-2">
                        <a href="#" class="btn btn-secondary">Ver detalles</a>
                        <a href="#" class="btn btn-warning">Editar</a>
                        <a href="#" class="btn btn-danger">Eliminar</a>
                        </div>
                    </div>
                </div>`})

    window.sessionStorage.setItem("location","jobs")
}