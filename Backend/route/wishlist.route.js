import express from "express";
import verifyToken from "../middleware/authMiddleware.js"
import{
    toggleWishlist,
    getWishlist
} from "../controllers/wishlist.controller.js"

const router = express.Router();

router.post("/toggle", verifyToken, toggleWishlist);
router.get("/", verifyToken, getWishlist);

export default router;