//Crear un objeto producto
let producto={
    prod1:{id: 1234, nombre: "Camisa", precio: 30},
    prod2:{id: 5678, nombre: "Pantalón", precio: 50},
    prod3:{id: 9101, nombre: "Zapatos", precio: 80}
}

//Crear un set con una lista de números
let listaNumeros= new Set();
listaNumeros.add(10);
listaNumeros.add(20);
listaNumeros.add(30); 
listaNumeros.add(20);

//Imprimir el set
console.log(listaNumeros);
//Agregar un número al set 
listaNumeros.add(40);
console.log(listaNumeros);
//verificar si existe un número en el set
console.log(listaNumeros.has(10));
//Eliminar un número del set
listaNumeros.delete(30);
console.log(listaNumeros);
//Recorrer el set
for (let numero of listaNumeros){
    console.log(numero);
}

//crear un mapa
let mapaProducto= new Map();
mapaProducto.set("Algodón", "camisa");
mapaProducto.set("Lino", "pantalón");
console.log(mapaProducto);

//Mostrar la lista de un objeto usando for...in
console.log("----- Listar propiedades del objeto -----");
for(let lista in producto){
    console.log(lista, producto[lista]);
}
//Recorrer el Set usando for...of
console.log("----- Recorrer Set -----");
for (let numero of listaNumeros){
    console.log(numero);
}
//Usa forEach() para recorrer el Map y mostrar claves y valores de forma descriptiva.
mapaProducto.forEach((valor, clave) => {
    console.log(`El material ${clave} es usado para fabricar ${valor}`);
})

console.log("----- Validar datos del producto -----");
//Validar los datos de un objeto producto
if (isNaN(producto.prod1.id) || producto.prod1.nombre ==="" || producto.prod1.precio <= 0 ) {
    console.log("Error: El producto tiene datos inválidos.");
}else{
    console.log("El producto es válido.");
}
console.log("----- Lista completa de productos (objetos) -----");
//Mostrar la lista completa de producto (objeto)
console.log(producto)
//Mostrar las claves, valores y entradas del objeto producto
console.log("Object.keys del objeto producto:");
console.log(Object.keys(producto));
console.log("Object.values del objeto producto:");
console.log(Object.values(producto));
console.log("Object.entries del objeto producto:");
console.log(Object.entries(producto));

//Mostrar la lista completa de números (Set)
console.log("----- Lista completa de números (Set) -----");
console.log(listaNumeros);

//Mostrar la lista completa de productos (Map)
console.log("----- Lista completa de productos (Map) -----");
 console.log(mapaProducto);