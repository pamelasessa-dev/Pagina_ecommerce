const catID = localStorage.getItem("catID") || "101";
const API_URL = `https://japceibal.github.io/emercado-api/cats_products/${catID}.json`;

let products = []; // Todos los productos
let productosVisibles = []; // con filtros y orden 

// Product card 
function crearCard(product) {
    return `
    <div class="product-card" onclick="seleccionarProducto(${product.id})" style="cursor: pointer;">
        <img src="${product.image}" alt="${product.name}" class="card-img-top">
        <div class="card-body">
            <h5 class="card-title">${product.name}</h5>
            <p class="card-text">${product.description}</p>
            <p class="card-text">${product.cost} ${product.currency}</p>
            <p class="card-text">${product.soldCount} vendidos</p>
            <button class="btn btn-primary" onclick="event.stopPropagation(); seleccionarProducto(${product.id})">Agregar al carrito</button>
        </div>
    </div>`;
}
// Renderizar lista
function renderizar(lista) {
    const grid = document.querySelector('.productos-grid');
    if (!grid) return;
    grid.innerHTML = lista.map(crearCard).join('');
    productosVisibles = lista; // actualizar estado
}

// Cargar productos de la API
function cargarProductos() {
    fetch(API_URL)
        .then(res => {
            if (!res.ok) throw new Error("Error al cargar productos");
            return res.json();
        })
        .then(data => {
            products = data.products;
            renderizar(products);
        })
        .catch(error => {
            console.error("Error al cargar productos:", error);
        });
}

// Filtrado, orden y buscador
document.addEventListener('DOMContentLoaded', () => {
    cargarProductos();

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

    document.getElementById("ordenAsc").addEventListener("click", () => {
        const ordenados = [...productosVisibles].sort((a, b) => a.cost - b.cost);
        renderizar(ordenados);
    });

    document.getElementById("ordenDesc").addEventListener("click", () => {
        const ordenados = [...productosVisibles].sort((a, b) => b.cost - a.cost);
        renderizar(ordenados);
    });

    document.getElementById("ordenRel").addEventListener("click", () => {
        const ordenados = [...productosVisibles].sort((a, b) => b.soldCount - a.soldCount);
        renderizar(ordenados);
    });

    document.getElementById("buscador").addEventListener("input", () => {
        const texto = document.getElementById("buscador").value.toLowerCase();
        const filtrados = products.filter(p =>
            p.name.toLowerCase().includes(texto) ||
            p.description.toLowerCase().includes(texto)
        );
        renderizar(filtrados);
    });
});
// Seleccionar producto
function seleccionarProducto(productId) {
    try {
        if (!productId) {
            console.error('No se proporcionó un ID de producto válido');
            return;
        }
        
        // Guardar el ID del producto en localStorage
        localStorage.setItem('selectedProductId', productId);
        console.log('Producto seleccionado, ID:', productId);
        
        // Redirigir a la página de detalles del producto
        window.location.href = 'product-info.html';
    } catch (error) {
        console.error('Error al seleccionar el producto:', error);
        // Mostrar mensaje de error al usuario
        alert('Ocurrió un error al cargar el producto. Por favor, intente nuevamente.');
    }
}

// Asegurarse de que la función esté disponible globalmente
window.seleccionarProducto = seleccionarProducto;