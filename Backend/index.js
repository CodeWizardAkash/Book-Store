import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import bookRoute from "./route/book.route.js";
import courseRoute from "./route/course.route.js";
import authRoute from "./route/auth.route.js";
import ContactRoute from "./route/contact.route.js";
import { createAdmin } from "./utils/createAdmin.js";

dotenv.config();

const app = express();


// middleware
app.use(cors());
app.use(express.json());

//mognoDB connection
mongoose
    .connect(process.env.Mongodb_url)
    .then(async () =>{
        console.log("MongoDB connected ✅");

        await createAdmin();
    })
    .catch((err) => console.log("MongoDB error ❌", err));

// admin creation   

// routes
app.use("/api/books", bookRoute);
app.use("/api/courses", courseRoute); 
app.use("/api/auth", authRoute); 
app.use("/api/contact", ContactRoute)
//test route
app.get("/", (req, res)=>{
    res.send("Hello World");
})

//server setup
const PORT = process.env.PORT || 3001;;
app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
});