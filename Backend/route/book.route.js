import express from "express";
import verifyToken from "../middleware/authMiddleware.js";
import {isAdmin} from "../middleware/adminMiddleware.js";
import {
  getBooks,
  getFreeBooks,
  getBooksById,
  addBook,
  updateBook,
  deleteBook
} from "../controllers/books.controller.js";

const router = express.Router();

router.get("/", getBooks);
router.get("/free", getFreeBooks);
router.get("/:id", getBooksById)

// Admin Only
router.post("/",verifyToken, isAdmin, addBook);
router.put("/:id",verifyToken, isAdmin, updateBook)
router.delete("/:id",verifyToken, isAdmin, deleteBook);

export default router;