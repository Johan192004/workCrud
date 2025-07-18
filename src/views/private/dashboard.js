import { getJobs, auth } from "../../Router.js"


export function viewDashboard(){
    if(auth()){
        const appContainer = document.getElementById("app")

       

        if(window.sessionStorage.getItem("role") == "company"){
             const companyName = window.sessionStorage.getItem("companyName")

            appContainer.innerHTML = `<div class="row">
                    <aside class="col-md-3 vh-100 d-flex align-items-center justify-content-between flex-column sticky-top">
                        <div class="d-flex justify-content-start flex-column text-center flex-grow-1">
                            <div class="dropdown">
                                <img src="https://static.vecteezy.com/system/resources/previews/046/593/914/non_2x/creative-logo-design-for-real-estate-company-vector.jpg" alt="Imagen de la empresa" class="img-fluid" id="companyImage">
                                <a class="btn btn-secondary dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                   ${companyName}
                                </a>
                            
                                <ul class="dropdown-menu">
                                <li><a class="dropdown-item" href="#">Perfil</a></li>
                                <li><a class="dropdown-item" href="#" id="logOut">Cerrar sesion</a></li>
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

            scriptDashboardCompany()
        } else if(window.sessionStorage.getItem("role") == "user"){
            console.log("Nada")
            //Aqui poner en codigo html para la vista de usuario
        }
    
    }
    

    

}


async function scriptDashboardCompany(){

    // const appContainer = document.getElementById("dashboardField")
    
    // const jobs = await getJobs()

    window.sessionStorage.setItem("location","dashboard")

    
    const jobsA = document.getElementById("jobsA")
    jobsA.addEventListener("click",(e)=>{
        e.preventDefault()

        let path = jobsA.getAttribute("href")
        let currentHash = window.location.hash
        let lastHashSlash = currentHash.split("/")
        lastHashSlash = lastHashSlash[lastHashSlash.length - 1]
        console.log(lastHashSlash)
        window.location.hash = "#/dashboard"
        setTimeout(() => {
            window.location.hash = "#/dashboard/jobs"
        }, 100);
        // if(lastHashSlash != "jobs"){
        //     path = currentHash + path
        //     window.location.hash = path
        // }
    })


    const logOutA = document.getElementById("logOut")
    logOutA.addEventListener("click",(event)=>{

        event.preventDefault()
        window.sessionStorage.clear()

        window.location.hash = ""

    })







}