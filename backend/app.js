const express = require("express"); // Utilizo el framework

const app = express(); // Instancia de express

const puerto = 3000; // Indico en qué puerto voy a escuchar
 
const cors = require("cors");  

app.use(cors());

// Middleware para permitir JSON
app.use(express.json());

// ruta a carrito
const cartRoute = require("./routes/cartRoute");
app.use("/cart", cartRoute);

// ruta de categorías
const catsRoute = require("./routes/catsRoute");
//Uso la ruta (/cats)
app.use("/cats", catsRoute);

// ruta hacia archivo JSON que contiene las categorías con sus productos
const catsProductsRoute = require("./routes/catsProductsRoute");
app.use("/cats", catsProductsRoute);

//  ruta a comentarios de los productos
const productCommentsRoute = require("./routes/productCommentsRoute");
app.use("/products", productCommentsRoute);

//  ruta de productos
const productsRouter = require("./routes/productsRoute");

// Uso la ruta (prefijo /products)
app.use("/products", productsRouter);

// ruta a sell
const sellRoute = require("./routes/sellRoute");
app.use("/sell", sellRoute);

// ruta user_cart
const userCartRoute = require("./routes/userCartRoute");
app.use("/user_cart", userCartRoute);


// Ruta principal
app.get("/", (req, res) => {
  res.send("Servidor funcionando correctamente");
});

// Levanto el servidor
app.listen(puerto, () => {
  console.log(`Servidor escuchando en http://localhost:${puerto}`);
});
