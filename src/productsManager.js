import fs from "fs";

class productManager {
  constructor(path) {
    this.path = path;
    if (fs.existsSync(path)) {
      try {
        this.products = JSON.parse(fs.readFileSync(path, "utf-8"));
      } catch (error) {
        this.products = [];
      }
    } else {
      this.products = [];
      this.path = "./src/products.json";
    }
  }

  async saveFile(data) {
    try {
      await fs.promises.writeFile(this.path, JSON.stringify(data, null, "\t"));
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  getProducts() {
    return this.products;
  }

  async addProduct(product) {
    if (this.products.length === 0) {
      product.id = 1;
    } else {
      product.id = this.products[this.products.length - 1].id + 1;
    }

    if (product.id === 1) {
      this.products.push(product);

      const respuesta = await this.saveFile(this.products);

      if (respuesta) {
        console.log("Producto agregado correctamente");
      } else {
        console.log("Hubo un error");
      }
    } else if (product.id > 1) {
      const getCode = product.code;

      const code = this.products.some((code) => code.code === getCode);

      if (code) {
        //si se repite el code mostrar que está duplicado
        console.log("Codigo Duplicado");
      } else {
        this.products.push(product);

        const respuesta = await this.saveFile(this.products);

        if (respuesta) {
          //mostrar que el producto se agregó
          console.log("Producto agregado correctamente");
        } else {
          console.log("Hubo un error");
        }
      }
    }
  }
  getProductById(path, idProducto) {
    try {
      let products = JSON.parse(fs.readFileSync(path, "utf-8"));
      const product = products.find((prod) => prod.id === Number(idProducto));

      if (product) {
        return product;
      } else {
        console.log("Id not Found");
      }
    } catch (error) {
      this.products = [];
    }
  }

  async deleteProduct(path, idProducto) {
    try {
      let products = JSON.parse(fs.readFileSync(path, "utf-8"));
      const producto = products.find((prod) => prod.id === Number(idProducto));

      if (!producto) {
        console.log("Id not Found");
      } else {
        const index = this.products.findIndex((n) => n.id === Number(idProducto));
        this.products.splice(index, 1);

        await this.saveFile(this.products);
        return true;
      }
    } catch (error) {
      console.log(error);
    }
    }
  

  async updateProduct(path, idProducto, product) {
    try {
      let products = JSON.parse(fs.readFileSync(path, "utf-8"));
      const producto = products.find((prod) => prod.id === Number(idProducto));

      if (!producto) {
        console.log("Id not Found");
      } else {
        const index = this.products.findIndex((n) => n.id === Number(idProducto));
        this.products.splice(index, 1, product);
        product.id = Number(idProducto);
        await this.saveFile(this.products);
        return true;
      }
    } catch (error) {
      console.log(error);
    }
    
  }
}

export default productManager;

// class product {
//   constructor(title, description, price, thumbnail, code, stock) {
//     this.title = title;
//     this.description = description;
//     this.price = price;
//     this.thumbnail = thumbnail;
//     this.code = code;
//     this.stock = stock;
//   }
// }

// const productoNuevo = new productManager("./src/products.json");

// const producto1 = new product(
//   "Mouse",
//   "Mouse Gaming",
//   "$25",
//   "mouse.png",
//   "AA1",
//   10
// );
// const producto2 = new product(
//   "Teclado",
//   "Teclado Gaming",
//   "$50",
//   "teclado.png",
//   "AA2",
//   7
// );
// const producto3 = new product(
//   "Monitor",
//   "Monitor 144hz",
//   "$250",
//   "monitor.png",
//   "AA3",
//   5
// );

// const producto4 = new product(
//   "Monitor",
//   "Monitor 240hz",
//   "$450",
//   "monitor240.png",
//   "AA4",
//   5
// );

// // Producto de prueba para ver que rechaza por falta de datos (no tiene stock)
// const producto5 = new product(
//   "Monitor",
//   "Monitor 144hz",
//   "$250",
//   "monitor144.png",
//   "AA5"
// );

// // Producto de prueba con el mismo codigo que producto1 para probar que rechaza
// const producto6 = new product(
//   "Mouse",
//   "Mouse Generico",
//   "$15",
//   "mouse.png",
//   "AA1",
//   10
// );

// // productoNuevo.addProduct(producto1);
// // productoNuevo.addProduct(producto2);
// // productoNuevo.addProduct(producto3);
// // productoNuevo.addProduct(producto4);
// // productoNuevo.addProduct(producto5);

// console.log("Productos en el JSON: ");
// console.log(productoNuevo.getProducts());

// console.log("Buscando producto por el Id");
// console.log(productoNuevo.getProductById(2));

// // console.log("Eliminando producto");
// // productoNuevo.deleteProduct(4);

// console.log("Modificando un producto");
// productoNuevo.updateProduct(1, new product("Mouse Logitech","Mouse Gaming", "$30","mouse.png", "AA6", 23));

// console.log("Lista de Productos Finales: ");
// console.log(productoNuevo.getProducts());
