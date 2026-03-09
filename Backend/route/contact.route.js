import express from "express";
import Contact from "../models/contact.model.js";
import {sendContactEmail} from "../services/mail.service.js";

const router = express.Router();

router.post("/", async(req, res)=>{
    try{
        const {name, email, message} = req.body;

        if(!name  || !email || !message){
            return res.status(400).json({message: "all field is required!!"});
        }

        const newContact  = new Contact({
            name,
            email,
            message
        })
        await sendContactEmail({
            name,
            email,
            message
        })
        await newContact.save();  
        res.status(201).json({message : "Message send Sucessfully !!"});      
    }
    catch(err){
        res.status(400).json({message: err.message});
    }
})

export default router;
