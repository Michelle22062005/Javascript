# 📘 Métodos en JavaScript

En JavaScript, un **método** es una **función que pertenece a un objeto**. Se utiliza para realizar acciones sobre los datos del objeto o sobre estructuras propias del lenguaje como arrays, strings, el DOM, etc.

---

## 1️⃣ Métodos de Objetos
Son funciones definidas dentro de un objeto.

```js
const user = {
  name: "Carlos",
  greet() {
    console.log(`Hola, soy ${this.name}`);
  }
};

user.greet();
```

📌 `this` hace referencia al objeto que ejecuta el método.

---

## 2️⃣ Métodos de Arrays
Sirven para recorrer, buscar o transformar arreglos.

### 🔹 forEach()
Recorre el array sin devolver uno nuevo.

```js
users.forEach(user => console.log(user.name));
```

---

### 🔹 map()
Crea un nuevo array transformado.

```js
const names = users.map(user => user.name);
```

---

### 🔹 filter()
Filtra elementos que cumplan una condición.

```js
const adults = users.filter(user => user.age >= 18);
```

---

### 🔹 find()
Busca el primer elemento que cumpla la condición.

```js
const user = users.find(u => u.email === "test@mail.com");
```

---

### 🔹 some() / every()

```js
users.some(u => u.active);   // true si al menos uno cumple
users.every(u => u.active); // true si todos cumplen
```

---

## 3️⃣ Métodos de Strings
Manipulan texto.

```js
const text = " Hola Mundo ";
```

| Método | Descripción |
|------|------------|
| trim() | Elimina espacios |
| toUpperCase() | Mayúsculas |
| toLowerCase() | Minúsculas |
| includes() | Verifica contenido |
| replace() | Reemplaza texto |

```js
text.trim().toUpperCase();
```

---

## 4️⃣ Métodos Math (Números)
Se usan para cálculos matemáticos.

```js
Math.round(4.6);  // 5
Math.floor(4.9); // 4
Math.ceil(4.1);  // 5
Math.random();   // número entre 0 y 1
```

---

## 5️⃣ Métodos de Funciones
Permiten controlar el contexto `this`.

### 🔹 call(), apply(), bind()

```js
function greet() {
  console.log(this.name);
}

const user = { name: "Ana" };

greet.call(user);
```

---

## 6️⃣ Métodos de Clases
Usados en Programación Orientada a Objetos.

```js
class User {
  constructor(name) {
    this.name = name;
  }

  greet() {
    console.log("Hola " + this.name);
  }
}

const u1 = new User("Luis");
u1.greet();
```

---

## 7️⃣ Métodos del DOM
Permiten interactuar con HTML.

```js
document.getElementById("btn");
document.querySelector(".card");

element.addEventListener("click", () => {
  alert("Click");
});
```

---

## 8️⃣ Métodos de Almacenamiento
Para guardar información en el navegador.

```js
localStorage.setItem("user", "Carlos");
localStorage.getItem("user");
localStorage.removeItem("user");
```

---

## 🧠 Diferencia entre Función y Método

```js
function hello() {}   // Función
user.hello();         // Método
```

✔ Función: independiente
✔ Método: pertenece a un objeto

---

## 📌 Conclusión
Los métodos hacen que JavaScript sea **potente, limpio y organizado**, permitiendo trabajar fácilmente con datos, objetos, formularios y el navegador.

---

✍️ Documento en formato **Markdown (.md)**
Ideal para estudio, GitHub o proyectos personales.

