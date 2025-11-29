const express = require("express"); // Utilizo el framework

const app = express(); // Instancia de express

const puerto = 3000; // Indico en qué puerto voy a escuchar
 
const cors = require("cors");  

app.use(cors());

// Importar middleware de autenticación
const verifyToken = require('./middleware/verifyToken');

const authRoutes = require('./routes/auth');

app.use('/api', authRoutes);

const authRoutes = require('./routes/auth');
app.use('/auth', authRoutes);


// Middleware para permitir JSON
app.use(express.json());

// 🔐 RUTAS PROTEGIDAS (requieren token JWT)

// ruta a carrito
const cartRoute = require("./routes/cartRoute");
app.use("/cart", verifyToken, cartRoute);

// ruta de categorías
const catsRoute = require("./routes/catsRoute");
//Uso la ruta (/cats)
app.use("/cats", verifyToken, catsRoute);

// ruta hacia archivo JSON que contiene las categorías con sus productos
const catsProductsRoute = require("./routes/catsProductsRoute");
app.use("/cats", verifyToken, catsProductsRoute);

//  ruta a comentarios de los productos
const productCommentsRoute = require("./routes/productCommentsRoute");
app.use("/products", verifyToken, productCommentsRoute);

//  ruta de productos
const productsRouter = require("./routes/productsRoute");

// Uso la ruta (prefijo /products)
app.use("/products", verifyToken, productsRouter);

// ruta a sell
const sellRoute = require("./routes/sellRoute");
app.use("/sell", verifyToken, sellRoute);

// ruta user_cart
const userCartRoute = require("./routes/userCartRoute");
app.use("/user_cart", verifyToken, userCartRoute);


// Ruta principal
app.get("/", (req, res) => {
  res.send("Servidor funcionando correctamente");
});

// Levanto el servidor
app.listen(puerto, () => {
  console.log(`Servidor escuchando en http://localhost:${puerto}`);
});
