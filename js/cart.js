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