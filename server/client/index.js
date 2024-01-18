//signup
// function openForm() {
//     document.getElementById("signup-form").style.display = "block";
// }



// const form = document.querySelector('form');
// const login_email = document.querySelector('#login-uname')
// const login_password = document.querySelector('#login-pass')
//make new ones for the creating user function

function signupSubmit(event) {
event.preventDefault()

const form = document.querySelector("signup-form")
const signup_email = document.querySelector('#signup-email')
const signup_pass = document.querySelector('#signup-pass')

    
    let body = {
        email: signup_email.value,
        password: signup_pass.value
    }
    console.log(body);

axios.post('http://localhost:3000/register', body)
.then(() => {
});

}

const registerButton = document.querySelector(".register-btn")

registerButton.addEventListener("click", signupSubmit);



// function handleSubmit(event) {


// }

// let userInfo = document.querySelector()

// let body = {
//     email: email.value, 
//     password: password.value,
// }