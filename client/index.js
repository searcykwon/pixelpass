//signup
// function openForm() {
//     document.getElementById("signup-form").style.display = "block";
// }



// const form = document.querySelector('form');
// const login_email = document.querySelector('#login-uname')
// const login_password = document.querySelector('#login-pass')
//make new ones for the creating user function
function openForm() {
    document.getElementById('openSignup').style.display = "block";
  }
  
  function closeForm() {
    document.getElementById('closePopup').style.display = "none";
  }
  

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

function userLogin(event) {
    event.preventDefault(); 
    
    const loginEmail = document.querySelector('#login-uname')
    const loginPass = document.querySelector('#login-pass')

    let body = {
        email: loginEmail.value, 
        password: loginPass.value
    }
 //if the response is 200 send them to manager page if not error message.
axios.post('http://localhost:3000/login', body)
.then(response => {
    if (response.status === 200) {
        window.location.href = 'http://localhost:3000/manager.html'
    } else {
        alert('Incorrect email or password!');
    }
}).catch(err => {
    alert('Incorrect email or password!');
})
}
const loginButton = document.querySelector('.login-btn')

loginButton.addEventListener('click', userLogin)


// MANAGER CODE


//when page loads will need axios request and server will need to know which user
//cookies will tell the server that the user logged in
//will tell which user made request and get their passwrds 
//login will set cookie and then verify which user is logging in.