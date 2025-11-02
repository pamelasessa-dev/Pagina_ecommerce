// cart.js
document.addEventListener("DOMContentLoaded", () => {
  const contenedor = document.getElementById("contenedorCarrito");
  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  if (carrito.length === 0) {
    contenedor.innerHTML = `
      <p class="text-muted">Tu carrito está vacío.</p>
      <p class="text-muted"> Descubrí <a href="categories.html" class="text-primary">nuevos productos</a>.</p>
    `;
    return;
  }

  contenedor.innerHTML = carrito.map((producto, index) => `
    <div class="card mb-3 d-flex align-items-center justify-content-between">
      <div class="row w-100">
        <div class="col-md-3">
          <img src="${producto.imagen}" class="img-fluid rounded-start" alt="${producto.nombre}">
        </div>
        <div class="col-md-6">
          <div class="card-body">
            <h5 class="card-title">${producto.nombre}</h5>
            <p class="card-text">${producto.moneda} ${producto.costo}</p>
            <label for="cantidad-${index}">Cantidad:</label>
            <input type="number" id="cantidad-${index}" value="${producto.cantidad}" min="1" class="form-control w-25 d-inline-block ms-2">
            <p id="subtotal-${index}" class="mt-3 fw-bold">
              Subtotal: ${producto.moneda} ${producto.subtotal.toFixed(2)}
            </p>
          </div>
        </div>
        <div class="col-md-3 text-end">
          <button class="btn btn-transparent" onclick="eliminarProducto(${index})">
            <i class="fas fa-trash-alt"></i>
          </button>
        </div>
      </div>
    </div>
  `).join("");

  // Asociar el evento de actualización de subtotal a cada campo de cantidad
  carrito.forEach((producto, index) => {
    const cantidadInput = document.getElementById(`cantidad-${index}`);
    const subtotalP = document.getElementById(`subtotal-${index}`);
    cantidadInput.addEventListener('input', () => {
      const cantidad = parseInt(cantidadInput.value, 10);
      const costo = parseFloat(producto.costo);
      const subtotal = cantidad * costo;
      subtotalP.textContent = `Subtotal: ${producto.moneda} ${subtotal.toFixed(2)}`;
      producto.cantidad = cantidad;
      producto.subtotal = subtotal;
      localStorage.setItem("carrito", JSON.stringify(carrito));
    });
  });
});

// Función para eliminar un producto del carrito
function eliminarProducto(index) {
  const carrito = JSON.parse(localStorage.getItem("carrito"));
  carrito.splice(index, 1);
  localStorage.setItem("carrito", JSON.stringify(carrito));
  location.reload(); // Recarga la página para actualizar el carrito
}