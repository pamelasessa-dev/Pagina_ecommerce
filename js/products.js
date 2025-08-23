
document.addEventListener("DOMContentLoaded", () => {

const API_URL = "https://japceibal.github.io/emercado-api/cats_products/101.json"

const imgProduct = document.getElementById("img-product");
const productTitle = document.getElementById("product-title");
const productDescription = document.getElementById("product-description");
const productPrice = document.getElementById("product-price");


fetch(API_URL)
.then(response => response.json())
.then(data => {
    const products = data.products;
    showProducts(products);
    
})
.catch(error => {
    console.error("Error", error);
});


})








