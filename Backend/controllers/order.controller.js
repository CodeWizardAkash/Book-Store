import Order from "../models/order.model.js";
import Cart from "../models/cart.model.js";

export const createOrder = async (req, res) => {
    try{
        const userId = req.user.id

        const cart = await Cart.findOne({user: userId}).populate("items.book");

        if(!cart || cart.items.length === 0){
            return res.status(400).json({message: "Cart is Empty"});
        }
        //calculate total
        const total = cart.items.reduce(
            (acc, item) => acc+ item.book.price * item.quantity,
            0
        )
        //create order
        const order = new Order({
            user: userId,
            items: cart.items,
            total,
        })
        
        await order.save();

        //clear cart
        cart.items = [];
        await cart.save();

        res.status(201).json({
            message: "Order placed successfully",
            order,
        });                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         
    }catch(err){
        res.status(500).json({message: err.message});
    }
}

export const getMyOrders = async (req, res)=>{
    try{
        const orders = await Order.find({user: req.user.id})
            .populate("items.book")
            .sort({createdAt: -1 })
        res.json(orders)    
    }catch(err){
        res.status(500).json({message: err.message});
    }
}