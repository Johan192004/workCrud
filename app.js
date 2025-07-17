import { routes } from "./src/Router.js"
const appContainer = document.getElementById("app")


function verifyHash(){
    let currentHash = window.location.hash
    if(currentHash == ""){
        window.location.hash = "#/"
    }
}



window.addEventListener("hashchange",()=>{
    let path = window.location.hash;
    routes[path]();
})

document.addEventListener("DOMContentLoaded",()=>{
    let path = window.location.hash;
    routes[path]();
})

window.addEventListener("popstate",()=>{
    let path = window.location.hash;
    routes[path]();
})