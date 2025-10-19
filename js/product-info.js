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
});

// parte 2 entrega 4

const selectedProductId = localStorage.getItem("selectedProductId");
const API_URL = `https://japceibal.github.io/emercado-api/products_comments/${selectedProductId}.json`;


// PASO 2: EJECUTAR LA ACCIÓN (FETCH) CON ESAS VARIABLES
fetch(API_URL)
    .then(response => {
        if (!response.ok) {
            throw new Error('La respuesta no fue exitosa');
        }
        return response.json();
    })
    .then(data => {
        // PASO 3: TRABAJAR CON LOS DATOS RECIBIDOS
        console.log(data);
        const  commentscontainer = document.getElementById("comment-list-container"); 

        for (const comentario of data) {
            const estrellasHTML = getStarHTML(comentario.score);

            commentscontainer.innerHTML = `
                <div class="list-group-item">
                    <p class="mb-1"><strong>${comentario.user}</strong> - <small>${comentario.dateTime}</small></p>
                    <div>${estrellasHTML}</div>
                    <p class="mb-1">${comentario.description}</p>
                </div>
            `;
        }
    })
    .catch(error => console.error('Error:', error));

function getStarHTML(score) {
    let estrellas = '';
    for (let i = 1; i <= 5; i++) {
        if (i <= score) {
            estrellas += `<span class="fa fa-star checked"></span>`;
        } else {
            estrellas += `<span class="fa fa-star"></span>`;
        }
    }
    return estrellas;
}