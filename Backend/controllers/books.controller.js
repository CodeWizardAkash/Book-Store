import Book from "../models/book.model.js";

//get all books
export const getBooks = async (req, res)=>{
    try{
        const books = await Book.find();
        res.status(200).json(books);
    }catch(err){
        res.status(500).json({message: err.message});
    }
}

// get free books
export const getFreeBooks = async (req, res)=>{
    try{
        const books = await Book.find({price: 0});
        res.status(200).json(books);
    }
    catch(err){
        res.status(500).json({message: err.message});
    }
}

//Get single
export const getBooksById = async (req, res) =>{
    try{
        const book = await Book.findById(req.params.id);
        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }
        res.json(book);
    }catch(err){
        res.status(500).json({message: err.message});
    }
};

// Add Book
export const addBook = async (req, res)=>{
    try{
        const book = new Book(req.body);
        const savedBook = await book.save();

        res.status(201).json(savedBook);
    }catch(err){
        res.status(400).json({message: err.message});
    }
};

//Update Book
export const updateBook = async (req, res) =>{
    try{
        const book = await Book.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new: true}
        )
        res.json(book);
    }catch (err){
        res.status(400).json({message: err.message});
    }
};

export const deleteBook = async (req, res) =>{
    try{
        await Book.findByIdAndDelete(req.params.id);
        res.json({ message: "Book deleted successfully" });
    }catch(err){
        res.status(500).json({message: err.message});
    }
}