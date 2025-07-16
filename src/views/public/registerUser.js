import { getUsersQuerry } from "../../Router.js"
export function viewRegisterUser() {
    const appContainer = document.getElementById("app")
    appContainer.innerHTML = `<div class="row mt-5">
        <div class="col-md-4 offset-md-4">
            <div class="card">
                <h1 class="card-title text-center">Register User</h1>
                <div class="card-body">
                    <form action="" id="formRegister">
                        <label for="email">Email</label>
                        <input type="email" class="form-control" id="email" name="email" required>
                        <label for="name">Full name</label>
                        <input type="text" class="form-control" id="name" name="name" required>
                        <label for="password" class="mt-2">Password</label>
                        <input type="password" name="password" id="password" class="form-control" required>
                        <label for="password2" class="mt-2">Confirm password</label>
                        <input type="password" name="password2" id="password2" class="form-control" required>
                        <button type="submit" class="btn btn-primary w-100 mt-5">Register</button>
                    </form>
                </div>
            </div>
        </div>
    </div>`
}


function scriptRegisterUser() {

    const emailField = document.getElementById("email")
    const nameField = document.getElementById("name")
    const passwordField = document.getElementById("password")
    const passwordRepeatField = document.getElementById("password2")

    const formRegister = document.getElementById("formRegister")
    formRegister.addEventListener("submit", async(e) => {
        e.preventDefault()

        const emailValue = emailField.value
        const nameValue = nameField.value
        const passwordValue = passwordField.value
        const passwordRepeatValue = passwordRepeatField.value

        let userChosen = await getUsersQuerry(`email=${emailValue}`)
        let companyChosen = await getUsersQuerry(`email=${emailValue}`)
         

        if (userChosen.length == 0 && companyChosen.length == 0) {



        } else {

            alert(`The email ${emailValue} is already in use`)

        }

    })

}

