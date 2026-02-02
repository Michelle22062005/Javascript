const URL_API_USER ="http://localhost:3000/usuario"
const form =document.getElementById("formulario")
form.addEventListener("submit", async(evento) =>{
  evento.preventDefault()

  const nombre =document.getElementById("name").value.trim();
  const edad =document.getElementById("edad").value
  
  await crearUsuario(nombre,edad)
})
async function crearUsuario(nombre,edad) {
  try{
    const respuesta =await fetch(URL_API_USER, {
      method:  "POST",
      headers :{
        "Conten-Type":"application/json"
      },
      body: JSON.stringify({
        nombre: nombre,
        edad:Number(edad)
      })
    });
    const nuevoUser= await respuesta.json();
    console.log("usuario creado", nuevoUser)
  }catch(error){
    console.log("Error al crear usuario", error)
  };
  
  }