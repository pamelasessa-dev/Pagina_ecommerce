const API_URL = "https://japceibal.github.io/emercado-api/cats_products/101.json";

let products = [];

// Product Card
function crearCard(product) {
  return `
    <div class="product-card">
        <img src="${product.image}" alt="Imagen del producto">
        <h5 class="card-title">${product.name}</h5>
        <p class="description">${product.description}</p>
        <p class="price">${product.cost} ${product.currency}</p>
        <p class="sold">${product.soldCount} vendidos</p>
        <button>Agregar al carrito</button>
    </div>
  `;
}

// Renderizar 
function renderizar(lista) {
  const grid = document.querySelector(".productos-grid");
  grid.innerHTML = lista.map(crearCard).join("");
}

// Fetch productos
function cargarProductos() {
  fetch(API_URL)
    .then(res => res.json())
    .then(data => {
      products = data.products; 
      renderizar(products);
    })
    .catch(error => console.error("Error al cargar productos:", error));
}

document.addEventListener("DOMContentLoaded", () => {
  cargarProductos();

  // Filtros
  document.getElementById("btnFiltrar").addEventListener("click", () => {
    const min = parseInt(document.getElementById("precioMinimo").value) || 0;
    const max = parseInt(document.getElementById("precioMaximo").value) || Infinity;

    const filtrados = products.filter(p => p.cost >= min && p.cost <= max);
    renderizar(filtrados);
  });

  document.getElementById("btnLimpiar").addEventListener("click", () => {
    document.getElementById("precioMinimo").value = "";
    document.getElementById("precioMaximo").value = "";
    renderizar(products);
  });

  // Ordenar
  document.getElementById("ordenAsc").addEventListener("click", () => {
    const ordenados = [...products].sort((a, b) => a.cost - b.cost);
    renderizar(ordenados);
  });

  document.getElementById("ordenDesc").addEventListener("click", () => {
    const ordenados = [...products].sort((a, b) => b.cost - a.cost);
    renderizar(ordenados);
  });

  document.getElementById("ordenRel").addEventListener("click", () => {
    const ordenados = [...products].sort((a, b) => b.soldCount - a.soldCount);
    renderizar(ordenados);
  });
});