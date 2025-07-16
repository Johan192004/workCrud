import { routes } from "./src/Router.js"
const appContainer = document.getElementById("app")

document.addEventListener("DOMContentLoaded",()=>{




})


function verifyHash(){
    let currentHash = window.location.hash
    if(currentHash == ""){
        window.location.hash = "#/"
    }
}



window.addEventListener("hashchange",()=>{
    let currentHash = window.location.hash
    routes[currentHash]()
})

document.addEventListener("DOMContentLoaded",()=>{
    let path = window.location.hash;
    routes[path]();
})

window.addEventListener("popstate",()=>{
    let path = window.location.hash;
    console.log(path)
    routes[path]();
    console.log("hola")
})