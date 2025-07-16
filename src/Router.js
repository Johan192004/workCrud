import { viewLogin } from "./views/public/login.js"
import { viewWelcome } from "./views/public/welcome.js"
import { URL_DB } from "./config.js"
import { viewRegisterCompany } from "./views/public/registerCompany.js"
import { viewRegisterUser } from "./views/public/registerUser.js"

export const routes = {
    "":viewWelcome,
    "#/login": viewLogin ,
    "#/registerCompany":viewRegisterCompany,
    "#/registerUser":viewRegisterUser
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