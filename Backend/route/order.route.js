import express from "express";
import verifyToken from "../middleware/authMiddleware.js";
import {
  createOrder,
  getMyOrders,
} from "../controllers/order.controller.js";

const router = express.Router();

router.post("/", verifyToken, createOrder);
router.get("/my", verifyToken, getMyOrders);

export default router;