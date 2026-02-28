import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
        name:{
            type: String,
            required: true,
        },
        title:{
            type: String,
            required: true,
        },
        price:{
            type: Number,
            required: true,
        },
        category: {
            type: String,
            required: true, // free / paid
        },
        img_url: {
            type: String,
            required: true,
        },
    },
    {timestamps: true}
);

const Course = mongoose.model("Course", courseSchema);
export default Course;