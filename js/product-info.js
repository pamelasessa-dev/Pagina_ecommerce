
// FUNCIÓN: Mostrar errores en pantalla

function showError(message) {
    document.getElementById('loading').style.display = 'none';
    document.getElementById('error-message').style.display = 'block';
    document.getElementById('error-text').textContent = message;
    document.getElementById('product-container').style.display = 'none';
}

// FUNCIÓN: Obtener comentarios guardados en localStorage por producto

function obtenerComentarios(productId) {
    return JSON.parse(localStorage.getItem(`comentarios_${productId}`)) || [];
}

// FUNCIÓN: Guardar comentarios en localStorage

function guardarComentarios(productId, comentarios) {
    localStorage.setItem(`comentarios_${productId}`, JSON.stringify(comentarios));
}


// FUNCIÓN: Renderizar estrellas para comentarios

function renderStars(score) {
    let stars = '';
    for (let i = 1; i <= 5; i++) {
        stars += i <= score
            ? '<i class="fas fa-star text-warning"></i>'
            : '<i class="far fa-star text-warning"></i>';
    }
    return stars;
}


// FUNCIÓN: Agregar comentario nuevo a la vista sin recargar

function pintarNuevoComentario(c) {
    const container = document.getElementById("comments-container");

    const card = document.createElement("div");
    card.className = "card mb-3";

    card.innerHTML = `
      <div class="card-body">
        <div class="d-flex align-items-center mb-2">
          <div class="user-avatar bg-secondary text-white rounded-circle d-flex align-items-center justify-content-center me-3"
              style="width: 40px; height: 40px;">T</div>
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
}


// FUNCIÓN: Actualizar carrusel de imágenes

function updateCarousel(images) {
    const carouselInner = document.querySelector("#productCarousel .carousel-inner");
    const thumbnailsContainer = document.getElementById("thumbnails-container");

    carouselInner.innerHTML = '';
    thumbnailsContainer.innerHTML = '';

    // Si no hay imágenes - usar genérica
    if (images.length === 0) {
        const defaultImage = 'img/no-image.jpg';

        carouselInner.innerHTML = `
            <div class="carousel-item active">
                <img src="${defaultImage}" class="d-block w-100" alt="Imagen no disponible">
            </div>`;

        thumbnailsContainer.innerHTML = `
            <div class="thumbnail-item active" data-bs-slide-to="0">
                <img src="${defaultImage}" class="img-fluid">
            </div>`;

        return;
    }

    // Si hay imágenes - llenar carrusel
    images.forEach((img, index) => {
        const isActive = index === 0 ? 'active' : '';

        carouselInner.innerHTML += `
            <div class="carousel-item ${isActive}">
                <img src="${img}" class="d-block w-100" alt="Imagen ${index + 1}">
            </div>`;

        thumbnailsContainer.innerHTML += `
            <div class="thumbnail-item ${isActive}" data-bs-slide-to="${index}">
                <img src="${img}" class="img-fluid">
            </div>`;
    });
}


// FUNCIÓN: Mostrar productos relacionados

function RelatedProducts(relatedProducts) {
    const relProd = document.getElementById("related-products");
    relProd.innerHTML = '';

    if (relatedProducts.length === 0) {
        relProd.innerHTML = '<p>No hay productos relacionados.</p>';
        return;
    }

    relatedProducts.forEach(rp => {
        const card = document.createElement("div");
        card.className = "col-12 col-sm-6 col-md-4 col-lg-3";

        card.innerHTML = `
            <div class="card h-100 related-card" style="cursor:pointer">
                <img src="${rp.image}" class="card-img-top" alt="${rp.name}" style="height:150px;object-fit:cover;">
                <div class="card-body text-center">
                    <h6 class="card-title">${rp.name}</h6>
                </div>
            </div>`;

        // Click para cargar el producto relacionado
        card.addEventListener("click", () => {
            localStorage.setItem("selectedProductId", rp.id);
            window.location.href = "product-info.html";
        });

        relProd.appendChild(card);
    });
}


// CÓDIGO PRINCIPAL

document.addEventListener("DOMContentLoaded", function () {

    
    // Mostrar loading mientras se obtiene la info del producto
    
    document.getElementById('loading').style.display = 'block';
    document.getElementById('product-container').style.display = 'none';
    document.getElementById('error-message').style.display = 'none';

    // Obtener ID de producto desde localStorage
    const productId = localStorage.getItem("selectedProductId");

    if (!productId) {
        showError("No se seleccionó ningún producto.");
        setTimeout(() => window.location.href = "index.html", 2000);
        return;
    }

    const API_URL = `https://japceibal.github.io/emercado-api/products/${productId}.json`;

    
    // FETCH: Obtener datos del producto
    
    fetch(API_URL)
        .then(res => res.json())
        .then(product => {

            // Actualizar datos principales en la UI

            document.getElementById("product-name").textContent = product.name;
            document.getElementById("product-cost").textContent = product.cost;
            document.getElementById("product-currency").textContent = product.currency;
            document.getElementById("product-description").textContent = product.description;
            document.getElementById("sold-count").textContent = `Vendidos: ${product.soldCount}`;
            document.getElementById("product-category").textContent = product.category;

            updateCarousel(product.images);
            RelatedProducts(product.relatedProducts);

            document.getElementById('loading').style.display = 'none';
            document.getElementById('product-container').style.display = 'block';

        })
        .catch(err => showError("Error al cargar el producto: " + err.message));

    
    // FETCH: Traer comentarios + combinarlos con los guardados localmente
    
    const COMMENTS_URL = `https://japceibal.github.io/emercado-api/products_comments/${productId}.json`;

    fetch(COMMENTS_URL)
        .then(r => r.json())
        .then(comments => {

            const container = document.getElementById("comments-container");
            container.innerHTML = "";

            const saved = obtenerComentarios(productId);
            const allComments = [...comments, ...saved];

            if (allComments.length === 0) {
                document.getElementById("no-comments").style.display = "block";
                return;
            }

            allComments.forEach(c => {
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

        });

    
    // MANEJO DE ENVÍO DE NUEVO COMENTARIO
    
    let calificacion = 0;

    // Selección de estrellas
    document.querySelectorAll('#estrellas .fa').forEach(star => {
        star.addEventListener('click', () => {
            calificacion = parseInt(star.dataset.value);

            document.querySelectorAll('#estrellas .fa')
                .forEach(s => s.classList.remove('checked'));

            for (let i = 0; i < calificacion; i++) {
                document.querySelectorAll('#estrellas .fa')[i].classList.add('checked');
            }
        });
    });

    // Botón enviar comentario
    document.getElementById('btnEnviar').addEventListener('click', () => {
        const comentarioTexto = document.getElementById('comentario').value.trim();

        if (calificacion === 0 || comentarioTexto === "") {
            alert("Por favor selecciona una calificación y escribe un comentario.");
            return;
        }

        const nuevoComentario = {
            user: "Tú",
            description: comentarioTexto,
            score: calificacion,
            dateTime: new Date().toLocaleString()
        };

        const comentariosGuardados = obtenerComentarios(productId);
        comentariosGuardados.push(nuevoComentario);
        guardarComentarios(productId, comentariosGuardados);

        pintarNuevoComentario(nuevoComentario);

        document.getElementById('comentario').value = "";
        document.querySelectorAll('#estrellas .fa').forEach(s => s.classList.remove('checked'));
        calificacion = 0;

        document.getElementById('no-comments').style.display = "none";
    });

    
    // MANEJO DEL CARRITO (Comprar ahora / Agregar al carrito)
   
    const btnComprar = document.getElementById("buy-now");
    const btnAgregar = document.getElementById("add-to-cart");

    // Obtener datos del producto mostrado
    function obtenerProducto() {
        const nombre = document.getElementById("product-name").textContent.trim();
        const costo = parseFloat(document.getElementById("product-cost").textContent);
        const moneda = document.getElementById("product-currency").textContent.trim();

        const img = document.querySelector("#productCarousel .carousel-item.active img");
        const imagen = img ? img.src : "img/no-image.jpg";

        return {
            nombre,
            costo,
            moneda,
            cantidad: 1,
            imagen,
            subtotal: costo
        };
    }

    // Guardar producto en el carrito
    function agregarProductoAlCarrito(producto) {
        let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

        const existente = carrito.find(item => item.nombre === producto.nombre);

        if (existente) {
            existente.cantidad++;
            existente.subtotal = existente.cantidad * existente.costo;
        } else {
            carrito.push(producto);
        }

        localStorage.setItem("carrito", JSON.stringify(carrito));

        if (typeof updateCartBadge === 'function') {
            updateCartBadge();
        }
    }

    // Comprar ahora - va directo a carrito.html
    if (btnComprar) {
        btnComprar.addEventListener("click", () => {
            agregarProductoAlCarrito(obtenerProducto());
            window.location.href = "cart.html";
        });
    }

    // Agregar al carrito - solo guarda no redirecciona
    if (btnAgregar) {
        btnAgregar.addEventListener("click", () => {
            agregarProductoAlCarrito(obtenerProducto());
            alert("Producto agregado al carrito");
        });
    }

});
