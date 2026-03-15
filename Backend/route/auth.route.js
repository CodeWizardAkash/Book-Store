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
        // const newUser = new User(req.body);
        const {name, email, password} = req.body;

        if(!name || !email || !password){
            return res.status(400).json({message: "All fields required"});
        }

        const existingUser = await User.findOne({email: email.toLowerCase()});
        if(existingUser){
            return res.status(400).json({message: "Email already registered"});
        }
        const hassedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            name,
            email,
            password: hassedPassword
        })       
        
        await newUser.save();

        const token = jwt.sign(
            {
                id:newUser._id,
                role: newUser.role
            },
            process.env.JWT_SECRET,
            {expiresIn: "1d"}
        )
        res.status(201).json({
            message: "user registered successfully",
            token,
            user:{
                _id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                role: newUser.role,
                avatar: newUser.avatar || ""
            }
        });
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
            {
                id: user._id,
                role: user.role
            },
            process.env.JWT_SECRET,
            {expiresIn: "1d"}
        );
        res.json({
            message: "Login successful",
            token,
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                avatar: user.avatar || ""
            }
        });
    }catch(err){
        res.status(500).json({message: err.message});
    }
})

export default router;