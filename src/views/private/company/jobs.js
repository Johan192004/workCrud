import { getJobs, preChargeDashboard } from "../../../Router.js"

export async function viewJobs(){
    if(document.getElementById("dashboardField")){
        viewJobsComplete()
        console.log("Ya habia cargado")
    } else {
        preChargeDashboard()
        viewJobsComplete()
        console.log("No habia cargado")

    }
}

function scriptJobs(){



}

async function viewJobsComplete(){
    let appContainer;

    appContainer = document.getElementById("dashboardField")
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
}