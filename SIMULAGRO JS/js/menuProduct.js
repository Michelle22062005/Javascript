/***********************
 * AUTH – Autenticación
 ***********************/

// Verifica si hay un usuario logueado en localStorage
function isLoggedIn() {
  return localStorage.getItem("currentUser") !== null;
}

// Devuelve el usuario actual como objeto JS
function getCurrentUser() {
  return JSON.parse(localStorage.getItem("currentUser"));
}

// ================== PROTEGER PÁGINA ==================
// Si no hay usuario logueado, alertar y redirigir
if (!isLoggedIn()) {
  alert("You must be logged in");
  window.location.href = "../index.html";
}

/***********************
 * FILTER – Filtrar productos por categoría
 ***********************/

const filterBtns = document.querySelectorAll(".filter-btn");

// Agregar evento click a cada botón de filtro
filterBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    // Obtener categoría seleccionada (convertir a minúsculas)
    const categorySelected = btn.textContent.trim().toLowerCase();
    const cards = document.querySelectorAll(".card"); // Todas las tarjetas de productos
    let found = false; // Bandera para saber si hay resultados

    // Mostrar u ocultar tarjetas según la categoría
    cards.forEach(card => {
      const category = card.dataset.category; // Leer categoría de data-attribute

      if (category === categorySelected || categorySelected === "all") {
        card.style.display = ""; // Mostrar tarjeta
        found = true;
      } else {
        card.style.display = "none"; // Ocultar tarjeta
      }
    });

    if (!found) {
      alert("No items found in this category"); // Mensaje si no hay productos
    }
  });
});

/***********************
 * CART STORAGE – Almacenamiento del carrito
 ***********************/

// Devuelve el carrito desde localStorage, o arreglo vacío si no existe
function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

// Guarda el carrito en localStorage como JSON string
function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

/***********************
 * ADD TO CART – Agregar productos al carrito
 ***********************/

const btnAdd = document.querySelectorAll(".btnAdd");

// Recorrer cada botón "Agregar" y asignar evento click
btnAdd.forEach(btn => {
  btn.addEventListener("click", () => {
    const card = btn.closest(".card"); // Obtener tarjeta del producto

    // Obtener precio y convertir a número
    const rawPrice = card.querySelector(".priceFood").innerText;
    const price = parseFloat(rawPrice.replace("$", ""));

    // Crear objeto producto
    const product = {
      id: card.dataset.id,
      title: card.querySelector(".titleFood").innerText.trim(),
      text: card.querySelector(".textFood").innerText,
      price,
      img: card.querySelector(".imgFood").src,
      quantity: 1
    };

    // Obtener carrito y verificar si el producto ya existe
    let cart = getCart();
    const existing = cart.find(item => item.id === product.id);

    if (existing) {
      existing.quantity++; // Si existe, aumentar cantidad
    } else {
      cart.push(product); // Si no, agregar al carrito
    }

    // Guardar carrito actualizado y renderizarlo
    saveCart(cart);
    renderCart();
    renderTotals();
  });
});

/***********************
 * RENDER CART – Mostrar carrito en el DOM
 ***********************/

const cardInfo = document.querySelector(".card-info");

// Función para renderizar carrito
function renderCart() {
  if (!cardInfo) return; // Si no hay contenedor, salir

  const cart = getCart();
  cardInfo.innerHTML = ""; // Limpiar contenedor

  cart.forEach(item => {
    // Insertar HTML de cada producto en el carrito
    cardInfo.insertAdjacentHTML(
      "beforeend",
      `
      <div class="d-flex justify-content-between align-items-start mb-2">
        <div class="d-flex gap-2">
          <img src="${item.img}" width="70" height="70" style="border-radius:10px;">
          <div>
            <h6>${item.title}</h6>
            <p class="mb-1">${item.text}</p>
            <div class="d-flex gap-2 align-items-center">
              <button class="btn btn-outline-secondary btn-sm btn-decrease" data-id="${item.id}">-</button>
              <span>${item.quantity}</span>
              <button class="btn btn-outline-secondary btn-sm btn-increase" data-id="${item.id}">+</button>
              <span class="text-danger btn-remove" data-id="${item.id}" style="cursor:pointer;">Remove</span>
            </div>
          </div>
        </div>
        <h6>$${(item.price * item.quantity).toFixed(2)}</h6>
      </div>
      `
    );
  });
}

/***********************
 * CART ACTIONS – Acciones de incremento, decremento y eliminar
 ***********************/

if (cardInfo) {
  cardInfo.addEventListener("click", e => {
    let cart = getCart();
    const id = e.target.dataset.id;

    // Aumentar cantidad
    if (e.target.classList.contains("btn-increase")) {
      cart.find(p => p.id === id).quantity++;
    }

    // Disminuir cantidad
    if (e.target.classList.contains("btn-decrease")) {
      const item = cart.find(p => p.id === id);
      item.quantity--;
      if (item.quantity === 0) {
        cart = cart.filter(p => p.id !== id); // Eliminar si cantidad llega a 0
      }
    }

    // Eliminar producto
    if (e.target.classList.contains("btn-remove")) {
      cart = cart.filter(p => p.id !== id);
    }

    // Guardar cambios y actualizar render
    saveCart(cart);
    renderCart();
    renderTotals();
  });
}

/***********************
 * TOTALS – Cálculo de subtotal, IVA y total
 ***********************/

function calculateTotals(cart) {
  const subtotal = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const iva = subtotal * 0.08; // 8% IVA
  const total = subtotal + iva;

  return { subtotal, iva, total };
}

// Renderizar totales en el DOM y guardar en localStorage
function renderTotals() {
  const cart = getCart();
  const { subtotal, iva, total } = calculateTotals(cart);

  const elSubtotal = document.getElementById("subtotal");
  const elIva = document.getElementById("iva");
  const elTotal = document.getElementById("total");

  if (elSubtotal && elIva && elTotal) {
    elSubtotal.innerText = `$${subtotal.toFixed(2)}`;
    elIva.innerText = `$${iva.toFixed(2)}`;
    elTotal.innerText = `$${total.toFixed(2)}`;
  }

  // Guardar totales en localStorage para crear orden después
  localStorage.setItem(
    "orderTotals",
    JSON.stringify({ subtotal, iva, total })
  );
}

/***********************
 * ORDERS – Crear y guardar órdenes
 ***********************/

function getOrders() {
  return JSON.parse(localStorage.getItem("orders")) || [];
}

function saveOrders(orders) {
  localStorage.setItem("orders", JSON.stringify(orders));
}

function createOrder() {
  if (!isLoggedIn()) {
    alert("Please login to continue");
    return;
  }

  const user = getCurrentUser();
  const cart = getCart();
  const totals = JSON.parse(localStorage.getItem("orderTotals"));

  if (cart.length === 0) {
    alert("Cart is empty");
    return;
  }

  const newOrder = {
    id: `ORD-${Date.now()}`,
    userId: user.id,
    userName: user.name,
    userEmail: user.email,
    items: cart,
    subtotal: totals.subtotal,
    iva: totals.iva,
    total: totals.total,
    status: "pending",
    createdAt: new Date().toISOString()
  };

  const orders = getOrders();
  orders.push(newOrder);
  saveOrders(orders);

  // Limpiar carrito y totales
  localStorage.removeItem("cart");
  localStorage.removeItem("orderTotals");

  alert("Order created successfully!");
  window.location.href = "../orderProduct.html";
}

const btnCreateOrder = document.getElementById("btnCreateOrder");
if (btnCreateOrder) {
  btnCreateOrder.addEventListener("click", createOrder);
}

/***********************
 * INIT – Inicialización al cargar la página
 ***********************/
document.addEventListener("DOMContentLoaded", () => {
  renderCart();   // Mostrar carrito
  renderTotals(); // Mostrar totales
});
