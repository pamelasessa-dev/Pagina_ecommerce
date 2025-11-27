const CATEGORIES_URL = "http://localhost:3000/cats";        // catsRoute
const PUBLISH_PRODUCT_URL = "http://localhost:3000/sell/publish"; // sellRoute
const PRODUCTS_URL = "http://localhost:3000/products/";          // productsRoute
const PRODUCT_INFO_URL = "http://localhost:3000/products/";      // productsRoute
const PRODUCT_INFO_COMMENTS_URL = "http://localhost:3000/products/comments/"; // productCommentsRoute
const CART_INFO_URL = "http://localhost:3000/user_cart/";        // userCartRoute
const CART_BUY_URL = "http://localhost:3000/cart/buy";           // cartRoute
const EXT_TYPE = "";

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