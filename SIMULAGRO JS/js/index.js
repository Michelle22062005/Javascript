// URL base de la API creada por json-server
const API_URL = "http://localhost:3000/users";

//  Este import ya NO es necesario si usas json-server
// import * as Storage from './storage.js';

// ================== REGISTRO ==================

// Capturamos el formulario de registro
const registerForm = document.getElementById("registerForm");

// Verificamos que el formulario exista antes de usarlo
if (registerForm) {
  registerForm.addEventListener("submit", registerUser);
}

// Función que maneja el registro de usuarios
function registerUser(e) {
  e.preventDefault(); // Evita que el formulario recargue la página

  // ===== Obtener datos del formulario =====
  const userName = document.getElementById("nameRegister").value.trim();
  const emailRegister = document.getElementById("emailRegister").value.trim();
  const roles = document.getElementById("roles").value;
  const passwordRegister = document.getElementById("passwordRegister").value;
  const confirmPasswordRegister = document.getElementById(
    "confirmPasswordRegister",
  ).value;

  // Elemento para mostrar mensajes al usuario
  const message = document.getElementById("message");
  message.innerText = "";
  message.style.color = "";

  // ===== Validar que las contraseñas coincidan =====
  if (passwordRegister !== confirmPasswordRegister) {
    message.innerText = "Passwords do not match";
    message.style.color = "red";
    return;
  }

  // Objeto usuario que se enviará al backend
  const newUser = {
    name: userName,
    email: emailRegister,
    rol: roles,
    openToWork: roles === "user" ? false : true,
    password: passwordRegister,
  };

  // ===== VALIDAR SI EL USUARIO YA EXISTE =====
  // Se consulta la API filtrando por email
  fetch(`${API_URL}?email=${emailRegister}`)
    .then((res) => res.json())
    .then((users) => {
      // ⚠️ ERROR CORREGIDO:
      // antes usabas "users" de localStorage y aquí debe ser
      // el array que devuelve la API
      if (users.length > 0) {
        message.innerText = "The user already exists";
        message.style.color = "red";
        return;
      }

      // ===== CREAR USUARIO (POST) =====
      return fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });
    })
    .then((res) => {
      if (!res) return; // Evita errores si el usuario ya existía
      return res.json();
    })
    .then((user) => {
      if (!user) return;

      // Guardar sesión del usuario
      localStorage.setItem("currentUser", JSON.stringify(user));

      message.innerText = "Account created successfully!";
      message.style.color = "#10b981";

      // Redirigir después de 1 segundo
      setTimeout(() => {
        window.location.href = "../menuProduct.html";
      }, 1000);
    })
    .catch((err) => {
      console.error(err);
      message.innerText = "Server error";
      message.style.color = "red";
    });
}

// ================== LOGIN ==================

// Capturamos el formulario de login
const loginForm = document.getElementById("loginForm");

if (loginForm) {
  loginForm.addEventListener("submit", loginUser);
}

// Función que maneja el login
function loginUser(e) {
  e.preventDefault();

  // Obtener credenciales
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("passwordLogin").value;
  const message = document.getElementById("message");

  // Consultar usuario por email y password
  fetch(`${API_URL}?email=${email}&password=${password}`)
    .then((res) => res.json())
    .then((users) => {
      //  ERROR CORREGIDO:
      // json-server devuelve un ARRAY, no un objeto
      if (users.length === 1) {
        const loggedUser = users[0];
        //Guarda session
        localStorage.setItem("currentUser", JSON.stringify(loggedUser));
        alert(`Welcome ${loggedUser.name}`);
        window.location.href =
          loggedUser.rol === "admin"
            ? "adminProduct.html"
            : "../menuProduct.html";
      } else {
        message.innerText = "Incorrect email or password";
        message.style.color = "red";
      }
    })
    .catch((err) => {
      console.error(err);
      message.innerText = "Server error";
      message.style.color = "red";
    });
}
