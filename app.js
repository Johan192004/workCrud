import { routesFunction } from "./src/Router.js"
// const appContainer = document.getElementById("app")

window.addEventListener("hashchange",()=>{
    console.log("haschange")
    let path = window.location.hash;
    routesFunction(path)();
})

document.addEventListener("DOMContentLoaded",()=>{

        console.log("DOMLoaded")
        let path = window.location.hash;
        console.log(path)
        routesFunction(path)();
    
})

// window.addEventListener("popstate",()=>{
//     console.log("popstate")
//     let path = window.location.hash;
//     routesFunction(path)();
// })

