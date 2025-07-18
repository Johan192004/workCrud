import { getUsersQuerry, getCompaniesQuerry, authLogin } from "../../Router.js"

export function viewLogin(){

    if(!authLogin()){
        const appContainer = document.getElementById("app")
        appContainer.innerHTML = `
            <div class="row mt-5">
            <div class="col-md-4 offset-md-4">
                <div class="card">
                    <h1 class="card-title text-center">Login</h1>
                    <div class="card-body">
                        <form action="" id="formLogin">
                            <label for="email">Email</label>
                            <input type="email" class="form-control" id="email" name="email" required>
                            <label for="password" class="mt-2">Password</label>
                            <input type="password" name="password" id="password" class="form-control" required>
                            <button type="submit" class="btn btn-primary w-100 mt-5">Login</button>
                        </form>
                        <div class="d-flex flex-row gap-5 justify-content-center mt-3" >
                            <a id="linkRegisterUser" class="btn">Register user</a>
                            <a id="linkRegisterCompany" class="btn">Register company</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>`


        scriptLogin()
    }
    

}


function verifyLogin(){
    // const user = await getUsersQuerry(``)

    

    const emailField = document.getElementById("email")
    const passwordField = document.getElementById("password")

    const formLogin = document.getElementById("formLogin")

    formLogin.addEventListener("submit", async(e)=>{
        e.preventDefault()

        const emailValue = emailField.value
        
        let userChosen = await getUsersQuerry(`email=${emailValue}`)
        
        if(userChosen.length != 0){

            const passwordValue = passwordField.value

            userChosen = userChosen[0]

            if(passwordValue == userChosen.password){

                console.log("iniciar sesion user")
                window.sessionStorage.setItem("role","user")
                window.sessionStorage.setItem("auth","true")


            }

        } else {

            let companyChosen = await getCompaniesQuerry(`email=${emailValue}`)

            if(companyChosen.length != 0){

                const passwordValue = passwordField.value

                companyChosen = companyChosen[0]

                if(passwordValue == companyChosen.password){

                    console.log("iniciar sesion company")

                    window.sessionStorage.setItem("auth","true")
                    window.sessionStorage.setItem("role","company")
                    window.sessionStorage.setItem("companyName",`${companyChosen.name}`)
                    window.sessionStorage.setItem("companyId",companyChosen.id)
                    window.location.hash = "#/dashboard"

                }else {
                    console.log("contraseña incorrecta company")
                }

            } else {
                alert(`No se encontro un usuario con el gmail : ${emailValue}`)
            }

        }
    })

}

function scriptLogin(){
    verifyLogin()

    const aRegisterUser = document.getElementById("linkRegisterUser")
    aRegisterUser.addEventListener("click",(e)=>{

        e.preventDefault()

        window.location.hash = "#/registerUser"

    })
    const aRegisterCompany = document.getElementById("linkRegisterCompany")
    aRegisterCompany.addEventListener("click",(e)=>{

        e.preventDefault()

        window.location.hash = "#/registerCompany"

    })
}


