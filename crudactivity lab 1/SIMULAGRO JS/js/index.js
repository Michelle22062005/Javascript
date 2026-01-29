import * as Storage from './storage.js';
const registerForm = document.getElementById('registerForm');
if (registerForm) {
    registerForm.addEventListener("submit", registerUser)
}
//document.addEventListener('DOMContentLoaded', () => {
function registerUser(e) {
    e.preventDefault();
    // Select Data
    const userName = document.getElementById('nameRegister').value.trim();
    const emailRegister = document.getElementById('emailRegister').value.trim();
    //const btnRegister = document.getElementById("btnRegister")
    const passwordRegister = document.getElementById("passwordRegister").value;
    const confirmPasswordRegister = document.getElementById("confirmPasswordRegister")
    const message = document.getElementById('login-message');
    message.innerText = '';
    message.style.color = '';

    //validacion the password
    if (passwordRegister !== confirmPasswordRegister) {
        message.innerText = 'Passwords do not match';
        message.style.color = 'red';
        return;
    }
    const users = Storage.getUsers

    //validation user exists
    if (users.some((u) => u.emailRegister.toLowerCase() === emailRegister.toLowerCase())) {
        message.innerHTML = 'The user already exists';
        message.style.color = 'red'
    }
    const newUser = {
        name:userName,
        email:emailRegister,
        passwordRegister
    }
    console.log(newUser)
    Storage.saveUser(newUser);
    Storage.setCurrentUser(newUser)

    message.innerText = 'Account created successfully!';
    message.style.color = '#10b981';

    setTimeout(() =>{
        window.location.href='../menuProduct.html';
    }, 2000)
}

// Login
const loginForm = document.getElementById('loginForm');

if(loginForm){
    loginForm.addEventListener('submit', loginUser);
}
function loginUser(e){
    e.preventDefault();
    // Select Data
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;
  const message = document.getElementById('login-message');

  const user = Storage.findUser(email, password);



}
// let form = JSON.parse(localStorage.getItem("loginForm")) || [];
//btnRegister.addEventListener("submit", function (e) {
//e.preventDefault();
//})




//evitar duplicados


//localStorage.setItem("loginForm", JSON.stringify(newUser));


//})