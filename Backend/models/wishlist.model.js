import mongoose, {Schema} from "mongoose";

const wishlist = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    books: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Book",
        },
    ],
}, {timestamps: true})

export default mongoose.model("Wishlist", wishlist);