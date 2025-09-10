const API_URL = "https://japceibal.github.io/emercado-api/cats_products/102.json"

// Crear card HTML
function crearCard(product) {
    console.log("creando card")
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



// Renderizar
function renderizar(data) {
    console.log("renderizando lista", data)
    const grid = document.querySelector('.productos-grid');
    
    if (!grid) {
        console.error("no se encontró producto grid");
        return;
    }
    
    // data.products es el array de productos
    grid.innerHTML = data.products.map(crearCard).join('');
}

// Fetch
function cargarProductos() {
    console.log("iniciando fetch")
    fetch(API_URL)
        .then(res => {
            console.log("response", res)
            if (!res.ok) {
                throw new Error("Error al cargar");
            }
            return res.json();
        })
        .then(data => {
            console.log("json", data);
            renderizar(data);
        })
        .catch(error => {
            console.error("Error al cargar productos:", error);
        });
}

// Ejecutar cuando esté el DOM
document.addEventListener('DOMContentLoaded', cargarProductos);



