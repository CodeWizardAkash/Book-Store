import express from "express";
import verifyToken from "../middleware/authMiddleware.js";
import {
    addItem,
    getCart,
    removeItem,
    updateQuantity
} from "../controllers/cart.controller.js"

const router = express.Router();


router.post("/add", verifyToken, addItem);
router.get("/", verifyToken, getCart);
router.delete("/remove/:bookId", verifyToken, removeItem);
router.put("/update", verifyToken, updateQuantity);

export default router;