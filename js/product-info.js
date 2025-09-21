document.addEventListener('DOMContentLoaded', function () {
    // Mostrar indicador de carga
    document.getElementById('loading').style.display = 'block';
    document.getElementById('product-container').style.display = 'none';
    document.getElementById('error-message').style.display = 'none';

    const productId = localStorage.getItem("selectedProductId");

    if (!productId) {
        showError("No se seleccionó ningún producto.");
        setTimeout(() => window.location.href = "index.html", 2000);
        return;
    }

    const API_URL = `https://japceibal.github.io/emercado-api/products/${productId}.json`;

    fetch(API_URL)
        .then(res => {
            if (!res.ok) {
                throw new Error(`Error HTTP: ${res.status}`);
            }
            return res.json();
        })
        .then(product => {
            console.log("Datos del producto:", product);
            updateProductUI(product);
        })
        .catch(error => {
            console.error("Error al cargar el producto:", error);
            showError(`Error al cargar el producto: ${error.message}`);
        });

    function updateProductUI(product) {
        try {
            // Actualizar información básica
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

    function updateCarousel(images) {
        const carouselInner = document.querySelector("#productCarousel .carousel-inner");
        const thumbnailsContainer = document.getElementById("thumbnails-container");
        
        // Limpiar carrusel y miniaturas
        carouselInner.innerHTML = '';
        thumbnailsContainer.innerHTML = '';

        if (images.length === 0) {
            // Si no hay imágenes, mostrar una imagen por defecto
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

        // Actualizar carrusel con las imágenes del producto
        images.forEach((img, index) => {
            const isActive = index === 0 ? 'active' : '';
            const carouselItem = `
                <div class="carousel-item ${isActive}">
                    <img src="${img}" class="d-block w-100" alt="Imagen ${index + 1} del producto">
                </div>`;
            carouselInner.innerHTML += carouselItem;

            const thumbnailItem = `
                <div class="thumbnail-item ${isActive}" data-bs-target="#productCarousel" data-bs-slide-to="${index}" ${isActive ? 'aria-current="true"' : ''}>
                    <img src="${img}" alt="Miniatura ${index + 1}" class="img-fluid">
                </div>`;
            thumbnailsContainer.innerHTML += thumbnailItem;
        });
    }

    function showError(message) {
        document.getElementById('loading').style.display = 'none';
        document.getElementById('error-message').style.display = 'block';
        document.getElementById('error-text').textContent = message;
        document.getElementById('product-container').style.display = 'none';
    }
});