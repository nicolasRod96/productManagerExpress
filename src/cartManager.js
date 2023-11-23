import fs from "fs";

class cartManager {
  constructor(path) {
    this.path = path;
    if (fs.existsSync(path)) {
      try {
        this.carts = JSON.parse(fs.readFileSync(path, "utf-8"));
      } catch (error) {
        this.carts = [];
      }
    } else {
      this.carts = [];
      this.path = "./src/cart.json";
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

  getCartById(path, idCart) {
    try {
      let cart = JSON.parse(fs.readFileSync(path, "utf-8"));
      const carts = cart.find((c) => c.id === Number(idCart));

      if (carts) {
        return carts;
      } else {
        console.log("Id not Found");
      }
    } catch (error) {
      this.cart = [];
    }
  }

  async addCart(cart) {
    if (this.carts.length === 0) {
      cart.id = 1;
    } else {        
      cart.id = Number(this.carts[this.carts.length - 1].id + 1);
      console.log(typeof(cart.id));
      console.log(cart.id);
    }
    if (cart.id === 1) {
      this.carts.push(cart);

      const respuesta = await this.saveFile(this.carts);

      if (respuesta) {
        console.log("carrito agregado correctamente");
      } else {
        console.log("Hubo un error");
      }
    } else if (cart.id > 1) {
      this.carts.push(cart);

      const respuesta = await this.saveFile(this.carts);

      if (respuesta) {
        //mostrar que el producto se agregó
        console.log("Producto agregado correctamente");
      } else {
        console.log("Hubo un error");
      }
    }
  }
}

export default cartManager;
