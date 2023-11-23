import { Router } from "express";
import cartManager from "../cartManager.js";

const router = Router();
const path = "./src/cart.json";
const newCart = new cartManager(path);


router.post("/", async (req, res) => {
    const { product } = req.body;
    await newCart.addCart(product);
  
});

router.get("/:cid", (req, res) =>{
    const { cid } = req.params;

    let cart = newCart.getCartById(path, cid);

    if(cart){
        res.json(cart);
    } else {
        res.json({
            message: 'No existe el carrito con ese id'
        })
    }


})

export default router;