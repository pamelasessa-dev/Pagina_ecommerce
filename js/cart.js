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

document.addEventListener("DOMContentLoaded", () => {
  const btnComprar = document.getElementById("buy-now");
  const btnAgregar = document.getElementById("add-to-cart");
  
  function guardarProducto(){
  
      // obtener datos del producto
      const nombre = document.getElementById("product-name").textContent.trim();
      const costo = parseFloat(document.getElementById("product-cost").textContent) || 0;
      const moneda = document.getElementById("product-currency").textContent.trim() || "USD";

      // Trae la primera imagen visible del carrusel
      const imagenEl = document.querySelector("#productCarousel .carousel-item.active img");
      const imagen = imagenEl ? imagenEl.src : "img/no-image.jpg";

      // array de producto que se mostrará en localStorage

      const producto = {
        nombre: nombre,
        costo: costo,
        moneda: moneda,
        cantidad: 1,
        imagen: imagen,
        subtotal: costo * 1
      };

      // Guardado en localStorage
      localStorage.setItem("productoCarrito", JSON.stringify(producto));
    }

    if (btnComprar) {
    btnComprar.addEventListener("click", () => {
      guardarProducto();
       // Redirigir a cart.html
      window.location.href = "cart.html";
    });
  }
  if (btnAgregar) {
    btnAgregar.addEventListener("click", () => {
      guardarProducto();
      alert("Producto agregado al carrito");
    });
  }
});