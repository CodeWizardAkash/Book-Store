import { json } from "express";
import Books from "../models/book.model.js";

export const getBooks = async(req, res)=>{
    try {
        const books = await Books.find();
        res.status(200).json(books);
    } catch (error) {
        console.log("Error: ", error);
        res.status(500).json(error);
    }
};