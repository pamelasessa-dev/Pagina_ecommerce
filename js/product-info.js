document.addEventListener('DOMContentLoaded', function () {
   
    document.getElementById('loading').style.display = 'block';
    document.getElementById('product-container').style.display = 'none';
    document.getElementById('error-message').style.display = 'none';

    // trae el id del producto desde localStorage

    const productId = localStorage.getItem("selectedProductId");

    if (!productId) {
        showError("No se seleccionó ningún producto.");
        setTimeout(() => window.location.href = "index.html", 2000);
        return;
    }

    
    // URL a la API según el producto
  
    const API_URL = `https://japceibal.github.io/emercado-api/products/${productId}.json`;

  
    // Fetch para obtener los datos del producto principal
   
    fetch(API_URL)
        .then(res => {
            if (!res.ok) throw new Error(`Error HTTP: ${res.status}`);
            return res.json();
        })
        .then(product => {
            console.log("Datos del producto:", product);

            //  Actualizar la vista del producto principal
            updateProductUI(product);

            // Mostrar productos relacionados
            RelatedProducts(product.relatedProducts || []);
        })
        .catch(error => {
            console.error("Error al cargar el producto:", error);
            showError(`Error al cargar el producto: ${error.message}`);
        });

  
    // Función para actualizar la vista del producto
  
    function updateProductUI(product) {
        try {
            document.getElementById("product-name").textContent = product.name || 'Sin nombre';
            document.getElementById("product-cost").textContent = product.cost || '0';
            document.getElementById("product-currency").textContent = product.currency || 'USD';
            document.getElementById("product-description").textContent = product.description || 'Sin descripción';
            document.getElementById("sold-count").textContent = `Vendidos: ${product.soldCount || 0}`;
            document.getElementById("product-category").textContent = product.category || 'Sin categoría';
            document.getElementById("category-name").textContent = product.category || 'Producto';

            // Actualizar imágenes del carrusel
            updateCarousel(product.images || []);

            // Ocultar loading y mostrar contenido
            document.getElementById('loading').style.display = 'none';
            document.getElementById('product-container').style.display = 'block';
        } catch (error) {
            console.error("Error al actualizar la UI:", error);
            throw new Error("Error al procesar los datos del producto");
        }
    }

    // Función para actualizar el carrusel de imágenes
  
    function updateCarousel(images) {
        const carouselInner = document.querySelector("#productCarousel .carousel-inner");
        const thumbnailsContainer = document.getElementById("thumbnails-container");

        // Limpiar carrusel y miniaturas
        carouselInner.innerHTML = '';
        thumbnailsContainer.innerHTML = '';

        if (images.length === 0) {
            const defaultImage = 'img/no-image.jpg';
            carouselInner.innerHTML = `
                <div class="carousel-item active">
                    <img src="${defaultImage}" class="d-block w-100" alt="Imagen no disponible">
                </div>`;
            thumbnailsContainer.innerHTML = `
                <div class="thumbnail-item active" data-bs-target="#productCarousel" data-bs-slide-to="0" aria-current="true">
                    <img src="${defaultImage}" alt="Miniatura" class="img-fluid">
                </div>`;
            return;
        }

        images.forEach((img, index) => {
            const isActive = index === 0 ? 'active' : '';
            carouselInner.innerHTML += `
                <div class="carousel-item ${isActive}">
                    <img src="${img}" class="d-block w-100" alt="Imagen ${index + 1} del producto">
                </div>`;
            thumbnailsContainer.innerHTML += `
                <div class="thumbnail-item ${isActive}" data-bs-target="#productCarousel" data-bs-slide-to="${index}" ${isActive ? 'aria-current="true"' : ''}>
                    <img src="${img}" alt="Miniatura ${index + 1}" class="img-fluid">
                </div>`;
        });
    }

    // Función para mostrar errores
 
    function showError(message) {
        document.getElementById('loading').style.display = 'none';
        document.getElementById('error-message').style.display = 'block';
        document.getElementById('error-text').textContent = message;
        document.getElementById('product-container').style.display = 'none';
    }

  
    // Mostrar/ocultar formulario de comentario
    
    document.getElementById("add-comment").addEventListener("click", function () {
        const form = document.getElementById("calificacion-form");
        form.style.display = (form.style.display === "none" || form.style.display === "") ? "block" : "none";
    });

});

// Función para mostrar productos relacionados

function RelatedProducts(relatedProducts) {
    const relProd = document.getElementById("related-products");
    relProd.innerHTML = '';

    if (relatedProducts.length === 0) {
        relProd.innerHTML = '<p>No hay productos relacionados.</p>';
        return;
    }

    
        // Iterar sobre cada producto relacionado
    relatedProducts.forEach(rp => {
        const card = document.createElement("div");
        card.className = "col-12 col-sm-6 col-md-4 col-lg-3";
        card.innerHTML = `
            <div class="card h-100 related-card" style="cursor:pointer">
                <img src="${rp.image}" class="card-img-top" alt="${rp.name}" style="height:150px;object-fit:cover;">
                <div class="card-body text-center">
                    <h6 class="card-title">${rp.name}</h6>
                </div>
            </div>
        `;

        // Hacer clic en el producto relacionado para ir a su detalle
        card.addEventListener("click", () => {
            localStorage.setItem("selectedProductId", rp.id);
            window.location.href = "product-info.html";
        });

        // Agregar la card al contenedor
        relProd.appendChild(card);
    });
}

document.addEventListener("DOMContentLoaded", function () {
  const productId = localStorage.getItem("selectedProductId");

  if (!productId) {
    showError("No se seleccionó ningún producto.");
    setTimeout(() => window.location.href = "index.html", 2000);
    return;
  }

  
  //  Traer lista de comentarios
 
  const selectedProductId = localStorage.getItem("selectedProductId");
  const API_URL = `https://japceibal.github.io/emercado-api/products_comments/${selectedProductId}.json`;

// fetch 

fetch(API_URL)
  .then(response => {
    if (!response.ok) {
      throw new Error('La respuesta no fue exitosa');
    }
    return response.json();
  }) 

  .then(comments => {
    console.log(comments);

    const container = document.getElementById("comments-container"); 
    container.innerHTML = ""; 
    
    //mensaje si no hay comentarios
    if (comments.length === 0) {
      document.getElementById("no-comments").style.display = "block";
      return;
    }

    // forEach 
    comments.forEach(c => {
      const card = document.createElement("div");
      card.className = "card mb-3";
      card.innerHTML = `
        <div class="card-body">
          <div class="d-flex align-items-center mb-2">
            <div class="user-avatar bg-primary text-white rounded-circle d-flex align-items-center justify-content-center me-3"
                 style="width: 40px; height: 40px;">
              ${c.user.charAt(0).toUpperCase()}
            </div>
            <div>
              <h6 class="mb-0">${c.user}</h6>
              <div class="text-warning">${renderStars(c.score)}</div>
            </div>
            <small class="text-muted ms-auto">${c.dateTime}</small>
          </div>
          <p class="card-text mt-2">${c.description}</p>
        </div>
      `;     
      container.appendChild(card);
    });
  })
  .catch(error => console.error('Error:', error));

// Función de estrellas 
function renderStars(score) {
  let stars = '';
  for (let i = 1; i <= 5; i++) {
    stars += i <= score
      ? '<i class="fas fa-star text-warning"></i>'
      : '<i class="far fa-star text-warning"></i>';
  }
  return stars;
}

})

let calificacion = 0;

// Selección de estrellas
document.querySelectorAll('#estrellas .fa').forEach(star => {
    star.addEventListener('click', () => {
        calificacion = parseInt(star.dataset.value);

        // Resetear todas las estrellas
        document.querySelectorAll('#estrellas .fa').forEach(s => s.classList.remove('checked'));

        // Marcar hasta la seleccionada
        for (let i = 0; i < calificacion; i++) {
            document.querySelectorAll('#estrellas .fa')[i].classList.add('checked');
        }
    });
});

// Enviar comentario
document.getElementById('btnEnviar').addEventListener('click', () => {
    const comentarioTexto = document.getElementById('comentario').value.trim();

    if (calificacion === 0 || comentarioTexto === "") {
        alert("Por favor selecciona una calificación y escribe un comentario.");
        return;
    }

    const nuevoComentario = document.createElement('div');
    nuevoComentario.classList.add('card', 'mb-3');
    nuevoComentario.innerHTML = `
        <div class="card-body">
            <div class="d-flex align-items-center mb-2">
                <div class="user-avatar bg-secondary text-white rounded-circle d-flex align-items-center justify-content-center me-3" style="width: 40px; height: 40px;">T</div>
                <div>
                    <h6 class="mb-0">Tú</h6>
                    <div class="text-warning">
                        ${'<i class="fas fa-star"></i>'.repeat(calificacion)}
                        ${'<i class="far fa-star"></i>'.repeat(5 - calificacion)}
                    </div>
                </div>
                <small class="text-muted ms-auto">Ahora</small>
            </div>
            <p class="card-text mt-2">${comentarioTexto}</p>
        </div>
    `;

    document.getElementById('comments-container').appendChild(nuevoComentario);

    // Resetear formulario
   
    document.getElementById('comentario').value = "";
    document.querySelectorAll('#estrellas .fa').forEach(s => s.classList.remove('checked'));
    calificacion = 0;

    // Ocultar mensaje "sin comentarios"
    document.getElementById('no-comments').style.display = "none";
    
});

document.addEventListener("DOMContentLoaded", () => {
  const btnComprar = document.getElementById("buy-now");
  const btnAgregar = document.getElementById("add-to-cart");

  // Función para obtener los datos del producto
  function obtenerProducto() {
    const nombre = document.getElementById("product-name").textContent.trim();
    const costo = parseFloat(document.getElementById("product-cost").textContent) || 0;
    const moneda = document.getElementById("product-currency").textContent.trim() || "USD";

    // Obtiene la imagen activa del carrusel
    const imagenEl = document.querySelector("#productCarousel .carousel-item.active img");
    const imagen = imagenEl ? imagenEl.src : "img/no-image.jpg";

    return {
      nombre,
      costo,
      moneda,
      cantidad: 1,
      imagen,
      subtotal: costo
    };
  }

  // Función para guardar el producto en el localStorage (maneja varios productos)
  function agregarProductoAlCarrito(producto) {
    // Recupera el carrito existente o crea uno nuevo
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    // Verificar si el producto ya existe (por nombre)
    const existente = carrito.find(item => item.nombre === producto.nombre);

    if (existente) {
      // Si ya está en el carrito, incrementa la cantidad
      existente.cantidad += 1;
      existente.subtotal = existente.cantidad * existente.costo;
    } else {
      // Si no está, lo agrega
      carrito.push(producto);
    }

    // Guarda el carrito actualizado
    localStorage.setItem("carrito", JSON.stringify(carrito));
  }

  // Botón "Comprar ahora": guarda y redirige al carrito
  if (btnComprar) {
    btnComprar.addEventListener("click", () => {
      const producto = obtenerProducto();
      agregarProductoAlCarrito(producto);
      window.location.href = "cart.html"; // Redirige al carrito
    });
  }

  // Botón "Agregar al carrito": guarda pero NO redirige
  if (btnAgregar) {
    btnAgregar.addEventListener("click", () => {
      const producto = obtenerProducto();
      agregarProductoAlCarrito(producto);

      // Mostrar un alert al usuario
      alert("Producto agregado al carrito");
    });

}

});
  


