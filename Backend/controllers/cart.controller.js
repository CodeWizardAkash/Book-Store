import Cart from "../models/cart.model.js";

export const addItem = async(req, res) =>{
    try{
        const {bookId}= req.body;
        const userId = req.user.id;
    
        let cart  = await Cart.findOne({user:userId});
    
        if(!cart){
            cart = new Cart({
                user: userId,
                items: [{book:bookId, quantity:1}]
            });
        }else{
            const itemIndex = cart.items.findIndex(
                item => item.book.toString() === bookId
            );
            if(itemIndex>-1){
                cart.items[itemIndex].quantity+=1;
            }else{
                cart.items.push({book: bookId, quantity:1});
             }
        }
        await cart.save();
    
        res.json({message:"Book added to cart", cart});
    }
        catch (err){
        res.status(500).json({message:err.message});
    }
}

export const getCart = async(req, res) =>{
    try{
        const cart = await Cart.findOne({user: req.user.id}).populate("items.book");

        if(!cart){
            return res.json({items: []});
        }

        res.json(cart);
    }
    catch(err){
        res.status(500).json({message:err.message});
    }
}

export const removeItem = async(req, res)=>{
    try{
        const cart = await Cart.findOne({user: req.user.id});
        cart.items = cart.items.filter(
            items => items.book.toString() !== req.params.bookId
        );

        await cart.save();
        res.json(cart);

    }catch(err){
        res.status(500).json({message:err.message});
    }
}

export const updateQuantity = async(req, res)=>{
    try{
        const {bookId, quantity} = req.body;

        console.log("BODY: ", req.body);//debug
        console.log("USER: ", req.user);

        if(!bookId || quantity===undefined){
            return res.status(400).json({message: "Invalid data"});
        }

        const cart = await Cart.findOne({user: req.user.id});

        if(!cart){
            return res.status(404).json({message:"Cart not Found"});
        }

        const itemIndex = cart.items.findIndex(
            (item)=> item.book.toString()===bookId
        );

        if(itemIndex === -1){
            return res.status(404).json({message: "Item not found"});
        }

        if(quantity<=0){
            cart.items.splice(itemIndex, 1);
        }else{
            cart.items[itemIndex].quantity = quantity;
        }

        await cart.save();
        res.json(cart);

    }catch(err){
        console.log("UPDATE CART ERROR:", err);
        res.status(500).json({message: err.message});
    }
};