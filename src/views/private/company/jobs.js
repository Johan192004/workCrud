import { getJobs, auth, deleteJob, getJobId, patchJob } from "../../../Router.js"
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

        const editButton = card.querySelector(`[data-action="${currentId}edit"]`);
        editButton.addEventListener("click", (e) => {
            e.preventDefault();
            editJobDiv(currentId)
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

function createEditButton(currentId,container){

    let editButton = document.querySelector(`[data-action="${currentId}edit"]`)
    editButton.addEventListener("click",()=>{

    })

}


async function editJobDiv(aimId){
    let aimUser = await getJobId(aimId)

    if(aimId.length != 0){

        console.log(aimUser)

        // aimUser = aimUser[0]

        let appContainer = document.getElementById("dashboardField")

        console.log(aimUser)
    
        appContainer.innerHTML = `<div class="col-md-4 offset-md-4 mt-5">
            <div class="card">
                <h1 class="card-title text-center border-bottom p-2">Edit job</h1>
                <div class="card-body">
                    <form action="" id="submitChangesForm">
                        <label for="title">Title</label>
                        <input type="text" name="title" id="title" class="form-control" value="${aimUser.title}">
                        <label for="description">Description</label>
                        <textarea name="description" id="description" class="form-control">${aimUser.description}</textarea>
                        <label for="requirements">Requirements</label>
                        <textarea name="requirements" id="requirements" class="form-control">${aimUser.requirements}</textarea>
                        <label for="salary">Salary</label>
                        <input type="number" name="salary" id="salary" class="form-control" value="${aimUser.salary}">
                        <label for="modality">Modality</label>
                        <select name="modality" id="modality" class="form-control">
                            <option value="in-person">in-person</option>
                            <option value="virtual">virtual</option>
                            <option value="hybrid">hybrid</option>
                        </select>
                        <button type="submit" class="btn btn-primary w-100 mt-4">Submit changes</button>
                    </form>
                </div>
            </div>
        </div>`

        document.getElementById('modality').value = `${aimUser.mode}`;

        const submitChangesForm = document.getElementById("submitChangesForm")
        submitChangesForm.addEventListener("submit",async(e)=>{


            const titleJob = document.getElementById("title")
            const descriptionJob = document.getElementById("description")
            const requirementsJob = document.getElementById("requirements")
            const salaryJob = document.getElementById("salary")
            const modeJob = document.getAnimations("modality")

            const titleValue = titleJob.value
            const descriptionValue = descriptionJob.value
            const requirementsValue = requirementsJob.value
            const salaryValue = salaryJob.value
            const modeValue = modeJob.value

            e.preventDefault()

            let sentJob = await patchJob(aimId,titleValue,descriptionValue,salaryValue,requirementsValue,modeValue)

            viewJobs()



        })
    } else {

        console.error("Error no esperado")
    }

    


    

}