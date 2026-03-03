import express from "express";
import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

// register new user
router.post("/register", async(req, res)=>{
    try{
        const newUser = new User(req.body);
        const existingUser = await User.findOne({ email: newUser.email});
        if(existingUser){
            return res.status(400).json({message: "User already exists"});
        }
        const hassedPassword = await bcrypt.hash(newUser.password, 10);
        newUser.password = hassedPassword;
        const savedUser = await newUser.save();
        res.status(201).json({message: "user registered successfully"});
    }
    catch(err){
        res.status(400).json({message: err.message});
    }
})

// Login user
router.post("/login", async(req, res)=>{
    try{
        const {email, password} = req.body;
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({message: "Invalid email or password"});
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(!isPasswordValid){
            return res.status(400).json({message: "Invalid email or password"});
        }

        const token = jwt.sign(
            {id: user._id},
            process.env.JWT_SECRET,
            {expiresIn: "1d"}
        );
        res.json({
            message: "Login successful",
            token
        });
    }catch(err){
        res.status(500).json({message: err.message});
    }
})

export default router;