import { Router } from "express";
import productManager from "../productsManager.js";

const router = Router();
const path = "./src/products.json";
const newInstance = new productManager(path);

function validateData(req, res, next) {
  const { title, description, price, code, stock, thumbnail, category } =
    req.body;
  if (
    //validar que ingresaron todos los datos necesarios
    title == undefined ||
    description == undefined ||
    price == undefined ||
    code == undefined ||
    stock == undefined ||
    thumbnail == undefined ||
    category == undefined
  ) {
    //si un dato no es ingresado mostrar que faltan datos
    return console.log("Faltan datos");
  }
  next();
}

router.get("/", (req, res) => {
  if (req.query.limit) {
    let products = newInstance.getProducts();
    if (products) {
      if (req.query.limit) {
        return res.json(products.slice(0, req.query.limit));
      } else {
        res.json(products);
      }
    } else {
      return console.log("No hay productos en la lista");
    }
  }

  let products = newInstance.getProducts();
  if (products) {
    return res.send(products);
  }
  return console.log("No hay productos en la lista");
});

router.get("/:product_id", (req, res) => {
  const { product_id } = req.params;
  const product = newInstance.getProductById(path, product_id);

  if (product) {
    return res.json(product);
  }
  return res.json({ error: "Producto no encontrado" });
});

router.post("/",validateData, async (req, res) => {
  const {
    title,
    description,
    price,
    code,
    stock,
    thumbnail,
    category,
    boolean,
  } = req.body;

  try {
    if (boolean == false) {
      await newInstance.addProduct({
        title,
        description,
        price,
        code,
        stock,
        thumbnail,
        category,
        boolean: false,
      });
    } else {
      await newInstance.addProduct({
        title,
        description,
        price,
        code,
        stock,
        thumbnail,
        category,
        boolean: true,
      });
    }

    res.json({
      title,
      description,
      price,
      code,
      stock,
      thumbnail,
      category,
      boolean,
    });
  } catch (error) {
    console.log(error);
  }
});

router.put("/:product_id", validateData, async (req, res) => {
  const {
    title,
    description,
    price,
    code,
    stock,
    thumbnail,
    category,
    boolean,
  } = req.body;

  const { product_id } = req.params;
  
  await newInstance.updateProduct(path, product_id, {
    title,
    description,
    price,
    code,
    stock,
    thumbnail,
    category,
    boolean
  });

  res.json({
    message: "Producto Modificado"
  })
  
});

router.delete("/:product_id", async (req, res) => {

  const { product_id } = req.params;

  await newInstance.deleteProduct(path, product_id);


})


export default router;
