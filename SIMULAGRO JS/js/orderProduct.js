// ================== USUARIO ACTUAL ==================
// Obtener el usuario logueado desde localStorage y convertirlo a objeto JS
const local = JSON.parse(localStorage.getItem('currentUser'));

// Obtener elementos del DOM donde mostraremos información del usuario
const nameUser = document.getElementById("nameUser");
const emailUser = document.getElementById("email");

// ================== PROTECCIÓN DE PÁGINA ==================
// Si no hay usuario logueado, redirigir a la página de login
if (!local) {
  window.location.href = 'index.html';
}

// Si el elemento para el nombre existe, mostrar el nombre del usuario
if (nameUser) {
  nameUser.textContent = local.name;
}

// Si el elemento para el correo existe, mostrar el email del usuario
if (emailUser) {
  emailUser.textContent = local.email;
}

// ================== FUNCIONES REUTILIZABLES ==================

// Devuelve el usuario actual desde localStorage
function getCurrentUser() {
  return JSON.parse(localStorage.getItem("currentUser"));
}

// Devuelve todas las órdenes desde localStorage, o un arreglo vacío si no hay
function getOrders() {
  return JSON.parse(localStorage.getItem("orders")) || [];
}

// Devuelve el color de Bootstrap según el estado de la orden
function getStatusColor(status) {
  if (status === "pending") return "warning";   // Amarillo
  if (status === "delivered") return "success"; // Verde
  if (status === "cancelled") return "danger";  // Rojo
  return "secondary";                           // Gris para otros estados
}

// ================== MOSTRAR ÓRDENES DEL USUARIO ==================
document.addEventListener("DOMContentLoaded", () => {
  const user = getCurrentUser(); // Obtener usuario actual
  const ordersContainer = document.getElementById("ordersContainer"); // Contenedor de órdenes

  // Si no hay usuario logueado, alertar y redirigir
  if (!user) {
    alert("You must be logged in");
    window.location.href = "../index.html";
    return;
  }

  // Filtrar órdenes que pertenecen al usuario actual
  const myOrders = getOrders().filter(o => o.userId === user.id);

  // Si no hay órdenes, mostrar mensaje y salir
  if (myOrders.length === 0) {
    ordersContainer.innerHTML = `<p class="text-muted">No orders yet</p>`;
    return;
  }

  // Limpiar contenedor antes de agregar tarjetas
  ordersContainer.innerHTML = "";

  // Recorrer las órdenes de la más reciente a la más antigua
  myOrders.reverse().forEach(order => {
    // Insertar cada orden como tarjeta con información
    ordersContainer.insertAdjacentHTML("beforeend", `
      <div class="card mb-3">
        <div class="card-body">
          <div class="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">

            <div class="d-flex align-items-center gap-3">
              <img src="./assets/image/icons8-frying-pan-50.png" width="30">
              <div>
                <h5>#${order.id}</h5>
                <p>${new Date(order.createdAt).toLocaleDateString()} - ${order.items.length} Items</p>
              </div>
            </div>

            <div class="text-md-end">
              <div class="d-flex justify-content-md-end align-items-center gap-3 mb-2">
                <h5>$${order.total.toFixed(2)}</h5>
                <span class="btn btn-outline-${getStatusColor(order.status)} btn-sm">
                  ${order.status}
                </span>
              </div>
            </div>

          </div>
        </div>
      </div>
    `);
  });
});
