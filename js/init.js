const CATEGORIES_URL = "https://japceibal.github.io/emercado-api/cats/cat.json";
const PUBLISH_PRODUCT_URL = "https://japceibal.github.io/emercado-api/sell/publish.json";
const PRODUCTS_URL = "https://japceibal.github.io/emercado-api/cats_products/";
const PRODUCT_INFO_URL = "https://japceibal.github.io/emercado-api/products/";
const PRODUCT_INFO_COMMENTS_URL = "https://japceibal.github.io/emercado-api/products_comments/";
const CART_INFO_URL = "https://japceibal.github.io/emercado-api/user_cart/";
const CART_BUY_URL = "https://japceibal.github.io/emercado-api/cart/buy.json";
const EXT_TYPE = ".json";

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
    // ... Otras inicializaciones de init.js ...
    updateCartBadge();
});