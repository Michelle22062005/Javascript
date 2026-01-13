// Solicitar información al usuario
const nombre=prompt("Ingrese su nombre");
let edad=Number(prompt("Ingrese su edad"));
const correo_electronico=prompt("Ingrese su correo electrónico");
let estado_civil=prompt("Ingrese su estado civil")==="true";//(true: casado, false: soltero)

// Mostrar toda la información y tipos de datos en un solo console.log
console.log(
  "Nombre:", nombre, "- Tipo:", typeof nombre,
  "| Edad:", edad, "- Tipo:", typeof edad,
  "| Correo:", correo_electronico, "- Tipo:", typeof correo_electronico,
  "| Estado activo:", estado_civil, "- Tipo:", typeof estado_civil
);

// Condicionales para verificar edad y estado civil
if (edad >= 18 && estado_civil === true) {
  alert("Eres mayor de edad y estás casado");
} else if (edad >= 18 && estado_civil === false) {
  alert("Eres mayor de edad y estás soltero.");
} else if (edad < 18 || estado_civil === false) {
  alert("Eres menor de edad o estás soltero.");
}else {
  alert("Informacion no valida");
}

// Bucle para solicitar contraseña hasta 3 intentos
const password="marte123";
for (let i = 0; i < 3; i++) {
  let intento=prompt("Ingrese su contraseña");
  if (intento === password) {
    alert("Contraseña correcta");
    break;
  } else {
    console.error("Contraseña incorrecta");
  }
}

