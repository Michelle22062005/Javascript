//Pedir el nombre al usuario
let name =prompt("Ingrese su nombre");
//Pedir la edad al usuario
let age =prompt("Ingrese su edad");

//Aqui estamos verificando en es un numero el valor ingresado
if (!isNaN(age) && age !== ""){
    console.log('Is a number')
}else{
    console.error("Error: Por favor, ingresa una edad válida en números.")
}

if (age < 18){
    alert(`Hola ${name}, eres menor de edad. ¡Sigue aprendiendo y disfrutando del código!`)
}else if(age >= 18){
    alert(`Hola ${name}, eres mayor de edad. ¡Prepárate para grandes oportunidades en el mundo de la programación!`)
}