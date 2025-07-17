import { getJobs } from "../../Router.js"


export function viewDashboard(){
    const appContainer = document.getElementById("app")

    if(window.sessionStorage.getItem("role") == "company"){
        appContainer.innerHTML = `<div class="row">
                <aside class="col-md-3 vh-100 d-flex align-items-center justify-content-between flex-column sticky-top">
                    <div class="d-flex justify-content-start flex-column text-center flex-grow-1">
                        <div class="dropdown">
                            <img src="https://static.vecteezy.com/system/resources/previews/046/593/914/non_2x/creative-logo-design-for-real-estate-company-vector.jpg" alt="Imagen de la empresa" class="img-fluid" id="companyImage">
                            <a class="btn btn-secondary dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Dropdown link
                            </a>
                        
                            <ul class="dropdown-menu">
                            <li><a class="dropdown-item" href="#">Perfil</a></li>
                            </ul>
                        </div>
                    </div>
                    <div class="d-flex justify-content-start flex-grow-1">
                        <ul class="list-group">
                            <li class="list-group-item">
                                <a href="/jobs" class="text-decoration-none" id="jobsA" data-link>Empleos</a>
                            </li>
                        </ul>
                    </div>
                </aside>
                <div id="dashboardField" class="col-md-9 min-vh-100 bg-dark d-flex justify-content-center align-content-start p-5 flex-wrap gap-5">

            </div>`
    }

    scriptDashboardCompany()

}


async function scriptDashboardCompany(){

    // const appContainer = document.getElementById("dashboardField")
    
    // const jobs = await getJobs()
    
    
    const jobsA = document.getElementById("jobsA")
    jobsA.addEventListener("click",(e)=>{
        e.preventDefault()

        let path = jobsA.getAttribute("href")
        let currentHash = window.location.hash
        if(currentHash != "/jobs"){
            path = currentHash + path
            window.location.hash = path
        }
    })




}