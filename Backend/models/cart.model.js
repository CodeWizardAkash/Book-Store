import mongoose, { Schema } from "mongoose";

const cartSchema = new Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    items: [
        {
            book:{
                type: mongoose.Schema.Types.ObjectId,
                ref: "Book"
            },
            quantity: {
                type: Number,
                default: 1
            }
        }
    ]
},{timestamps: true}
)

export default mongoose.model("Cart", cartSchema);