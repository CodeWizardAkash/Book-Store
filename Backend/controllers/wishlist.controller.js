import Wishlist from "../models/wishlist.model.js";

export const toggleWishlist = async (req, res) =>{
    try{
        const {bookId} = req.body;
        const userId = req.user.id;

        let wishlist = await Wishlist.findOne({user: userId});
        
        if(!wishlist){
            wishlist = new Wishlist({
                user: userId,
                books: [bookId],
            });
        }else{
            // const exists = wishlist.books.includes(bookId);
            if(!wishlist.books){
                wishlist.books = [];
            }
            const exists = wishlist.books?.some(
                (b) => b.toString() === bookId
            )

            if(exists) {
                wishlist.books = wishlist.books.filter(
                    (b) => b.toString() !== bookId
                )
            }else{
                wishlist.books.push(bookId);
            }
        }

        await wishlist.save();
        res.json(wishlist);

    }catch(err){
        console.log("WISHLIST ERROR:", err);
        res.status(500).json({ message: err.message });
    }
}

export const getWishlist = async (req, res) =>{
    try{
        const wishlist = await Wishlist
            .findOne({user: req.user.id})
            .populate("books");

        if(!wishlist){
            return res.json({books: []});
        }
        res.json({books: wishlist.books});
    }catch(err){
        res.status(500).json({message: err.message});
    }
}