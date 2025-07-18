import { viewLogin } from "./views/public/login.js"
import { viewWelcome } from "./views/public/welcome.js"
import { URL_DB } from "./config.js"
import { viewRegisterCompany } from "./views/public/registerCompany.js"
import { viewRegisterUser } from "./views/public/registerUser.js"
import { viewDashboard } from "./views/private/dashboard.js"
import { viewJobs } from "./views/private/company/jobs.js"
import { viewNotFound } from "./views/public/not-found.js"

// export const routes = {
//     "":viewWelcome,
//     "#/login": viewLogin ,
//     "#/registerCompany":viewRegisterCompany,
//     "#/registerUser":viewRegisterUser,
//     "#/dashboard":viewDashboard,
//     "#/dashboard/jobs": viewJobs
// }

export function routesFunction(url){
    switch (url){
        case "":
            return viewWelcome;
        case "#/login":
            return viewLogin;
        case "#/registerCompany":
            return viewRegisterCompany;
        case "#/registerUser":
            return viewRegisterUser;
        case "#/dashboard":
            return viewDashboard;
        case "#/dashboard/jobs":
            return viewJobs;
        case "#/notFound":
            return viewNotFound
        default:
            return notFound
    }


}

export async function getUsers() {
    let res = await fetch(URL_DB + "/users")
    let resJson = await res.json()
    return resJson
}

export async function getUserId(id) {
    let res = await fetch(URL_DB + "/users/" + `${id}`)
    let resJson = await res.json()
    return resJson
}

export async function getUsersQuerry(querry) {
    let res = await fetch(URL_DB + "/users/" + `?${querry}`)
    let resJson = await res.json()
    return resJson
}

export async function getCompanies() {
    let res = await fetch(URL_DB + "/companies")
    let resJson = await res.json()
    return resJson
}

export async function getCompanyId(id) {
    let res = await fetch(URL_DB + "/companies/" + `${id}`)
    let resJson = await res.json()
    return resJson
}

export async function getCompaniesQuerry(querry) {
    let res = await fetch(URL_DB + "/companies/" + `?${querry}`)
    let resJson = await res.json()
    return resJson
}

export function postUser(nameP,emailP,passwordP){
    fetch(URL_DB + "/users",{
        "method":"POST",
        "headers":{
            "Content-Type":"application/json"
        },
        "body":JSON.stringify({
            name:nameP,
            email:emailP,
            password:passwordP,
            cv:"",
            skills: [],
            jobExperience:[]
        })
    })
}

export function postCompany(nameP,fieldP,emailP,passwordP){
    fetch(URL_DB + "/companies",{
        "method":"POST",
        "headers":{
            "Content-Type":"application/json"
        },
        "body":JSON.stringify({
            name:nameP,
            logo:"",
            field:fieldP,
            description:"",
            email:emailP,
            password:passwordP
        })
    })

}


export async function getJobs(){
    let res = await fetch(URL_DB + "/jobs")
    let resJson = await res.json()
    return resJson
}



export async function getJobId(id){
    let res = await fetch(URL_DB + "/jobs" + `/${id}`)
    let resJson = await res.json()
    return resJson
}

export async function getJobsQuerry(querry){
    let res = await fetch(URL_DB + "/jobs" + `/?${querry}`)
    let resJson = await res.json()
    return resJson
}

function notFound(){

    window.location.hash = "#/notFound"

}

export function auth(){

    if((window.sessionStorage.getItem("auth") == "true")){

        return true
    } else {
        window.location.hash = ""
        return false
    }

}

export function authLogin(){

    if(window.sessionStorage.getItem("auth") == "true"){

        window.location.hash = "#/dashboard"
        return true

    } else {
        return false
    }

}

export function deleteJob(id){

    fetch(`${URL_DB}/jobs/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        }
      });
      

}

export async function patchJob(idP,titleP,descriptionP,salaryP,requirementsP,modeP){
    console.log(idP,titleP,descriptionP,salaryP,requirementsP,modeP)

    let res = await fetch(URL_DB + "/jobs/" + `${idP}`,{
        "method":"PATCH",
        "headers":{
            "Content-Type":"application/json"
        },
        "body":JSON.stringify({
            title:titleP,
            description:descriptionP,
            salary:salaryP,
            requirements:requirementsP,
            mode:modeP
        })

    })

}

export async function postJob(titleP,descriptionP,salaryP,requirementsP,modeP,companyIdP){

    let res = await fetch(URL_DB + "/jobs",{
        "method":"POST",
        "headers":{
            "Content-Type":"application/json"
        },
        "body":JSON.stringify({
            title:titleP,
            description:descriptionP,
            salary:salaryP,
            requirements:requirementsP,
            mode:modeP,
            companyId:companyIdP
        })

    })
    return res

}