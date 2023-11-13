import express from "express";
import productManager from "../productsManager.js";


const app = express();
const PORT = 5000;
const newInstance = new productManager();

app.get("/", (req, res) => {
  res.end("<h1>Pagina de inicio de Productos</h1>");
});

app.get("/products", (req, res) => {  

  if(req.query.limit){
    let products = newInstance.getProducts();
    products.length = Number(req.query.limit);
    return res.send(products);    
  }

  let products = newInstance.getProducts();
  if (products) {
    return res.send(products);
  }
  return console.log("No hay productos en la lista");
});

app.get("/products/:product_id", (req, res) => {
  const { product_id } = req.params;
  const product = newInstance.getProductById(product_id);

  if (product) {
    return res.json(product);
  }
  return res.json({ error: "Producto no encontrado" });
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
