// Modificar la solicitud realizada en la carga del listado de productos para que 
// utilice ese identificador en lugar de 101 como esta actualmente.

const catID = localStorage.getItem("catID") || "102";
const API_URL = `https://japceibal.github.io/emercado-api/cats_products/${catID}.json`;

// Crear card HTML
function crearCard(product) {
  return `
  <div class="products-container">
    <div class="product-card" id="product-card">
      <img src="${product.image}" alt="Imagen del producto" class="card-img-top" id="img-product">
      <div class="card-body">
        <h5 class="card-title" id="product-title">${product.name}</h5>
        <p class="card-text" id="product-description">${product.description}</p>
        <p class="card-text" id="product-price">${product.cost} ${product.currency}</p>
        <button class="btn" id="add-to-cart">Agregar al carrito</button>
      </div>
    </div>
  </div>`;
}

// Renderizar múltiples productos
function renderizar(lista) {
  const grid = document.querySelector('.productos-grid');
  if (!grid) {
    console.error("No se encontró producto grid");
    return;
  }

  grid.innerHTML = lista.map(crearCard).join(''); //uso de map y join
}

// Fetch modificado
function cargarProductos() {
    
  fetch(API_URL)
    .then(res => {
      if (!res.ok) throw new Error("Error al cargar");
      return res.json();
    })
    .then(data => {
      renderizar(data.products); 
    })
    .catch(error => {
      console.error("Error al cargar productos:", error);
    });
}

// Ejecutar cuando esté el DOM
document.addEventListener('DOMContentLoaded', cargarProductos);