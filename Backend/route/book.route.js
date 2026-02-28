import express from "express";
import Book from "../models/book.model.js";
import { get } from "mongoose";

const router = express.Router();

// Add new book
router.post("/", async(req, res)=>{
  try{
    const newBook = new Book(req.body);
    const savedBook = await newBook.save();
    res.status(201).json(savedBook);
  }catch(err){
    res.status(400).json({message: err.message});
  }
  
})

//get all books
router.get("/", async(req, res)=>{
    try {
        const books = await Book.find();
        res.status(200).json(books);
    }catch (err) {
        res.status(500).json({message: err.message});
    }
});

// get free books
router.get("/free", async (req, res) => {
  try {
    const freeBooks = await Book.find({ category: "free" });
    res.status(200).json(freeBooks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


export default router;