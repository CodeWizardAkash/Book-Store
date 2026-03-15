import express from "express";
import bcrypt from "bcrypt"
import User from "../models/user.model.js"
import dotenv from "dotenv";

dotenv.config();

export const createAdmin = async ()=>{
    try{
        const adminExist = await User.findOne({role: "admin"});

        if(adminExist){
            console.log("Admin already exists");
            console.log(adminExist);
            return;
        }

        
        const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);

        const admin = new User({
            name: "Admin",
            email: process.env.ADMIN_EMAIL,
            password: hashedPassword,
            role: "admin",
        });
        await admin.save();

        console.log("admin created sucessfully");

    }catch(err){
        console.error("Admin creation error :", err.message);
    }
};