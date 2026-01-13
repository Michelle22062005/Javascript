let user;
let age;
let number_courses;
function registrarUsuario(){
    user= prompt("Ingrese su nombre: ");
    age = Number(prompt("Ingrese su edad: "));
    number_courses = Number(prompt("Ingrese la cantidad de cursos inscritos: "));
    if (user.trim() === "" || isNaN(age) || number_courses < 0) {
    alert("Información no válida");
    }else{
    console.log("Información registrada correctamente.");
}

}
function mostrarInformacion(){

    if (age >18){
        alert(`${user} Eres mayor de edad`);
    }else{
        alert(` ${user} Eres menor de edad`);
    }
        alert("Nombre: " + user + " Edad: " + age + " Cantidad de cursos inscritos: " + number_courses);
       
    }

function simularEvaluacion() {
    let a = Number(prompt("Ingrese su nota final: "));
    let b = Number(prompt("Ingrese su nota final: ")); 
    let c = Number(prompt("Ingrese su nota final: "));
    
    let promedio = (a + b + c) / 3;

        if (promedio >= 5) {
            alert("Aprobó con excelencia con " + Math.round(promedio) + ".");
        } else if (promedio >= 3.5) {
            alert("Aprobó. con " + Math.round(promedio) + ".");
        } else {
            alert("Reprobó. con " + Math.round(promedio) + ".");
        }      
    }

let option;
do {
    opcion = prompt("Bienvenido al menu Principal.\nSeleccione una opción:\n1. Registrar Usuario\n2. Mostrar Información\n3. Simular Evaluación\n4. Salir ");

     if (opcion === "1") {
        alert(`Opción 1: ${registrarUsuario()}`);
        continue;
    } 
    else if (opcion === "2") {
        alert(`Opción 2: ${mostrarInformacion()}`);
        continue;
    } 
    else if (opcion === "3") {
        alert(`Opción 3: ${simularEvaluacion()}`);
        continue;
    } 
    else if (opcion === "4") {
        alert("Saliendo del sistema...");
        continue;
    } 
    else {
        alert("Opción no válida");
    }

} while (opcion !== "4");

    
