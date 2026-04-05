import mongoose, {Schema} from "mongoose"

const orderSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true
    },
    items: [
        {
            books: {
                type: mongoose.Schema.ObjectId,
                ref: "Book",
            },
            quantity: {
                type: Number,
                default: 1,
            },
        }
    ],
    total: {
        type: Number,
        required: true
    },
},{timestamps: true});

export default mongoose.model("Order", orderSchema);