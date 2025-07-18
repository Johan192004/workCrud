import { getJobs, auth, deleteJob, getJobId, patchJob, getJobsQuerry, postUser, postJob } from "../../../Router.js"
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
    
    const companyId = window.sessionStorage.getItem("companyId")

    const jobs = await getJobsQuerry(`companyId=${companyId}`)


    appContainer.innerHTML=`<div class="d-flex justify-content-end w-100">
            <button id="addJobButton" class="btn btn-primary">Add job</button>
        </div>`

    const addJobButton = document.getElementById("addJobButton")
    addJobButton.addEventListener("click",()=>{
        addJobDiv()
    })

    

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
    let aimJob = await getJobId(aimId)

    if(aimId.length != 0){

        console.log(aimJob)

        let modeJob = aimJob.mode

        let in_person = ""
        let virtual = ""
        let hybrid = ""

        if(modeJob == "in-person"){
            in_person = "selected"
        } else if (modeJob == "virtual"){
            virtual = "selected"
        } else if (modeJob == "hybrid"){
            hybrid = "selected"
        }

        // aimJob = aimJob[0]

        let appContainer = document.getElementById("dashboardField")

        console.log(aimJob)
    
        appContainer.innerHTML = `<div class="col-md-4 offset-md-4 mt-5">
            <div class="card">
                <h1 class="card-title text-center border-bottom p-2">Edit job</h1>
                <div class="card-body">
                    <form action="" id="submitChangesForm">
                        <label for="title">Title</label>
                        <input type="text" name="title" id="title" class="form-control" value="${aimJob.title}" required>
                        <label for="description">Description</label>
                        <textarea name="description" id="description" class="form-control" required>${aimJob.description}</textarea>
                        <label for="requirements">Requirements</label>
                        <textarea name="requirements" id="requirements" class="form-control" required>${aimJob.requirements}</textarea>
                        <label for="salary">Salary</label>
                        <input type="number" name="salary" id="salary" class="form-control" value="${aimJob.salary}" required>
                        <label for="modality">Modality</label>
                        <select name="modality" id="modality" class="form-control" required>
                            <option value="in-person" ${in_person}>in-person</option>
                            <option value="virtual" ${virtual}>virtual</option>
                            <option value="hybrid" ${hybrid}>hybrid</option>
                        </select>
                        <button type="submit" class="btn btn-primary w-100 mt-4">Submit changes</button>
                    </form>
                </div>
            </div>
        </div>`


        const submitChangesForm = document.getElementById("submitChangesForm")
        submitChangesForm.addEventListener("submit",async(e)=>{


            const titleJob = document.getElementById("title")
            const descriptionJob = document.getElementById("description")
            const requirementsJob = document.getElementById("requirements")
            const salaryJob = document.getElementById("salary")
            const modeJob = document.getElementById("modality")

            console.log(modeJob)

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


async function addJobDiv() {
    let appContainer = document.getElementById("dashboardField")
    const companyId = window.sessionStorage.getItem("companyId")


    appContainer.innerHTML=`<div class="col-md-4 offset-md-4 mt-5">
            <div class="card">
                <h1 class="card-title text-center border-bottom p-2">Add job</h1>
                <div class="card-body">
                    <form action="" id="addJobForm">
                        <label for="title">Title</label>
                        <input type="text" name="title" id="title" class="form-control" required>
                        <label for="description">Description</label>
                        <textarea name="description" id="description" class="form-control" required></textarea>
                        <label for="requirements">Requirements</label>
                        <textarea name="requirements" id="requirements" class="form-control" required></textarea>
                        <label for="salary">Salary</label>
                        <input type="number" name="salary" id="salary" class="form-control" required>
                        <label for="modality">Modality</label>
                        <select name="modality" id="modality" class="form-control" required>
                            <option value="in-person">in-person</option>
                            <option value="virtual">virtual</option>
                            <option value="hybrid">hybrid</option>
                        </select>
                        <button type="submit" class="btn btn-primary w-100 mt-4">Post job</button>
                    </form>
                </div>
            </div>
        </div>`

    const addJobForm = document.getElementById("addJobForm")
    addJobForm.addEventListener("submit",async(e)=>{
        e.preventDefault()
        const titleJob = document.getElementById("title")
        const descriptionJob = document.getElementById("description")
        const requirementsJob = document.getElementById("requirements")
        const salaryJob = document.getElementById("salary")
        const modeJob = document.getElementById("modality")

        console.log(modeJob)

        const titleValue = titleJob.value
        const descriptionValue = descriptionJob.value
        const requirementsValue = requirementsJob.value
        const salaryValue = salaryJob.value
        const modeValue = modeJob.value


        if(checkSalary(salaryValue)){

            let res = await postJob(titleValue,descriptionValue,salaryValue, requirementsValue,modeValue,companyId)
            window.location.hash = "#/dashboard"
            setTimeout(()=>{
                window.location.hash = "#/dashboard/jobs"
            },200)

        } else {
            alert("The salary is not positive")
        }
    })

    
    
}


function checkSalary(salary){
    if(salary>= 0){
        return true
    } else {
        return false
    }
}