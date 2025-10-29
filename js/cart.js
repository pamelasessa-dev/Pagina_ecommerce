
document.addEventListener("DOMContentLoaded", () => {
  const contenedor = document.getElementById("contenedorCarrito");
  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  if (carrito.length === 0) {
    contenedor.innerHTML = `<p class="text-muted">Tu carrito está vacío.</p>`;
    return;
  }

  contenedor.innerHTML = carrito.map((producto, index) => `
    <div class="card mb-3">
      <div class="row g-0 align-items-center">
        <div class="col-md-3">
          <img src="${producto.imagen}" class="img-fluid rounded-start" alt="${producto.nombre}">
        </div>
        <div class="col-md-9">
          <div class="card-body">
            <h5 class="card-title">${producto.nombre}</h5>
            <p class="card-text">${producto.moneda} ${producto.costo}</p>
            <label for="cantidad-${index}">Cantidad:</label>
            <input type="number" id="cantidad-${index}" value="${producto.cantidad}" min="1" class="form-control w-25 d-inline-block ms-2">
            <p id="subtotal-${index}" class="mt-3 fw-bold">
              Subtotal: ${producto.moneda} ${producto.subtotal}
            </p>
          </div>
        </div>
      </div>
    </div>
  `).join("");



      // Se guarda el cambio en localStorage
      localStorage.setItem("carrito", JSON.stringify(carrito));
    });
