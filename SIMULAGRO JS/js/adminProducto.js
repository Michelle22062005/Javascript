// ================== GLOBAL ==================
// Variable que guardará la orden seleccionada actualmente
let selectedOrder = null;

// Variable que guarda el ID de la orden seleccionada
let selectedOrderId = null;

// Traemos todas las órdenes desde localStorage, si no existen ponemos un array vacío
let orders = JSON.parse(localStorage.getItem("orders")) || [];

// Traemos el usuario actual desde localStorage
const local = JSON.parse(localStorage.getItem("currentUser"));

// Si no hay usuario logueado, redirige a la página de login
if (!local) window.location.href = "index.html";

// Elemento tbody de la tabla donde mostraremos las órdenes
const infoTable = document.getElementById("info");

// ================== COLORES DE ESTADO ==================
// Función para asignar colores de Bootstrap según el estado de la orden
function getStatusColor(status) {
  if (status === "pending") return "warning";   // amarillo
  if (status === "preparing") return "info";    // azul claro
  if (status === "ready") return "primary";     // azul
  if (status === "delivered") return "success"; // verde
  return "secondary";                           // gris por defecto
}

// ================== RENDER TABLA ==================
// Función para dibujar todas las órdenes en la tabla
function renderOrders() {
  // Limpiamos la tabla antes de pintar
  infoTable.innerHTML = "";

  // Filtramos solo las órdenes del usuario logueado
  const myOrders = orders.filter(o => o.userId === local.id);

  // Si no hay órdenes, mostramos mensaje
  if (myOrders.length === 0) {
    infoTable.innerHTML = `<tr><td colspan="6" class="text-center text-muted">No orders yet</td></tr>`;
    return;
  }

  // Recorremos las órdenes en orden inverso (las más recientes primero)
  myOrders.reverse().forEach(order => {
    // Si la orden coincide con la seleccionada, aplicamos la clase 'table-active' para resaltarla
    const isActive = order.id === selectedOrderId ? "table-active" : "";
    
    // Creamos un elemento <tr> para la fila
    const tr = document.createElement("tr");
    tr.className = `order-row ${isActive}`;
    tr.setAttribute("data-order-id", order.id); // guardamos ID como atributo de la fila
    tr.style.cursor = "pointer";               // hacemos que el cursor sea de tipo "pointer" para indicar que es clickeable
    
    // Pintamos las celdas de la fila
    tr.innerHTML = `
      <td>${order.id}</td>
      <td>${order.userName}</td>
      <td>${new Date(order.createdAt).toLocaleDateString()}</td>
      <td><span class="badge bg-${getStatusColor(order.status)}">${order.status}</span></td>
      <td>$${order.total}</td>
      <td>
        <button type="button" class="btn btn-sm btn-outline-primary">
          View
        </button>
      </td>
    `;
    
    // Agregamos la fila al tbody
    infoTable.appendChild(tr);
  });
}

// ================== MOSTRAR DETALLES ==================
// Función para mostrar los detalles de una orden en el panel derecho
function showOrderDetails(order) {
  if (!order) {
    // Si no hay orden seleccionada, mostramos valores por defecto
    document.getElementById("orderIdTitle").textContent = "Select an order";
    document.getElementById("nameUser").textContent = "-";
    document.getElementById("email").textContent = "-";
    document.getElementById("total").textContent = "$0";
    document.getElementById("subtotal").textContent = "$0";
    document.getElementById("iva").textContent = "$0";
    document.getElementById("statusBtn").textContent = "-";
    document.getElementById("statusBtn").className = "btn btn-sm btn-outline-secondary";
    return;
  }

  // Guardamos la orden y su ID seleccionada
  selectedOrderId = order.id;
  selectedOrder = order;

  // Actualizamos el panel derecho con los datos de la orden
  document.getElementById("orderIdTitle").textContent = `${order.id}`;
  document.getElementById("nameUser").textContent = order.userName || local.name;
  document.getElementById("email").textContent = order.userEmail || local.email;
  
  // Calculamos subtotal e IVA
  const subtotal = order.total / 1.08; // 8% de IVA
  const iva = order.total - subtotal;
  
  document.getElementById("subtotal").textContent = `$${subtotal.toFixed(2)}`;
  document.getElementById("iva").textContent = `$${iva.toFixed(2)}`;
  document.getElementById("total").textContent = `$${order.total}`;

  // Seleccionamos el estado en el select
  const statusSelect = document.querySelector(".order-status");
  statusSelect.value = order.status;

  // Actualizamos el botón de estado
  const statusBtn = document.getElementById("statusBtn");
  statusBtn.textContent = order.status.toUpperCase();
  statusBtn.className = `btn btn-sm btn-outline-${getStatusColor(order.status)}`;

  // Volvemos a renderizar la tabla para resaltar la fila seleccionada
  renderOrders();
}

// ================== EVENTO CLICK EN TODA LA FILA ==================
// Detectamos cuando el usuario hace click en una fila de la tabla
infoTable.addEventListener("click", (e) => {
  const row = e.target.closest(".order-row"); // Buscamos el <tr> más cercano
  if (row) {
    // Obtenemos el ID de la orden desde el atributo de la fila
    const orderId = row.getAttribute("data-order-id");
    console.log("🆔 ID capturado:", orderId);
    
    // Buscamos la orden en el array de órdenes
    const order = orders.find(o => o.id === orderId);
    console.log("📦 Orden encontrada:", order);
    
    if (order) {
      // Mostramos detalles de la orden seleccionada
      showOrderDetails(order);
    } else {
      console.error("❌ Orden no encontrada con ID:", orderId);
    }
  }
});

// ================== BOTÓN UPDATE ==================
// Evento para actualizar el estado de la orden seleccionada
document.querySelector(".btn-update").addEventListener("click", () => {
  if (!selectedOrderId) {
    alert("Please select an order first");
    return;
  }

  // Obtenemos el nuevo estado seleccionado en el select
  const newStatus = document.querySelector(".order-status").value;
  
  // Buscamos el índice de la orden seleccionada
  const orderIndex = orders.findIndex(o => o.id === selectedOrderId);
  if (orderIndex === -1) {
    alert("Order not found");
    return;
  }

  // Actualizamos el estado en el array y en localStorage
  orders[orderIndex].status = newStatus;
  localStorage.setItem("orders", JSON.stringify(orders));

  // Actualizamos el panel derecho con la orden actualizada
  selectedOrder = orders[orderIndex];
  showOrderDetails(selectedOrder);

  alert(`Order #${selectedOrderId} status updated to: ${newStatus.toUpperCase()}`);
});

// ================== INICIO ==================
// Renderizamos la tabla al cargar la página
renderOrders();

// Mostramos panel vacío hasta que se seleccione alguna orden
showOrderDetails(null);
