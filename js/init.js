const CATEGORIES_URL = "http://localhost:3000/cats";        // catsRoute
const PUBLISH_PRODUCT_URL = "http://localhost:3000/sell/publish"; // sellRoute
const PRODUCTS_URL = "http://localhost:3000/products/";          // productsRoute
const PRODUCT_INFO_URL = "http://localhost:3000/products/";      // productsRoute
const PRODUCT_INFO_COMMENTS_URL = "http://localhost:3000/products/comments/"; // productCommentsRoute
const CART_INFO_URL = "http://localhost:3000/user_cart/";        // userCartRoute
const CART_BUY_URL = "http://localhost:3000/cart/buy";           // cartRoute
const EXT_TYPE = " ";

let showSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "block";
}

let hideSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "none";
}

let getJSONData = function(url){
    let result = {};
    showSpinner();
    return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }else{
        throw Error(response.statusText);
      }
    })
    .then(function(response) {
          result.status = 'ok';
          result.data = response;
          hideSpinner();
          return result;
    })
    .catch(function(error) {
        result.status = 'error';
        result.data = error;
        hideSpinner();
        return result;
    });
}

function updateCartBadge() {
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    
    // Suma las cantidades de todos los productos
    let totalItems = 0;
    carrito.forEach(producto => {
        totalItems += parseInt(producto.cantidad) || 0;
    });

    const cartBadge = document.getElementById("cart-count");

    if (cartBadge) {
        cartBadge.textContent = totalItems;

        // Mostrar u ocultar el badge
        if (totalItems > 0) {
            cartBadge.classList.remove("d-none");
        } else {
            cartBadge.classList.add("d-none");
        }
    }
}

// Llama a la función al cargar el DOM en todas las páginas para asegurar que el badge esté actualizado
document.addEventListener("DOMContentLoaded", () => {
    updateCartBadge();
});

document.addEventListener("DOMContentLoaded", () => {
  const nombreNav = document.getElementById("nombreDeUsuario");
  const imagenNav = document.getElementById("imagenPerfilNav");

  const saved = localStorage.getItem("userProfile");
  if (saved) {
    const data = JSON.parse(saved);
    if (data.firstName && data.lastName) {
      nombreNav.textContent = `${data.firstName} ${data.lastName}`;
    } else if (data.firstName) {
      nombreNav.textContent = data.firstName;
    }

    if (data.photo) {
      imagenNav.src = data.photo;
      imagenNav.style.display = "inline-block";
    }
  }
});