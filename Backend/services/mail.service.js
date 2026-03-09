import dotenv, { config } from "dotenv"
import { text } from "express";
import nodemailer from "nodemailer";

dotenv.config();

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth:{
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});


export const sendContactEmail = async ({name, email, message}) =>{
    try{
        const adminMail = {
            from:  process.env.EMAIL_USER,
            to: process.env.EMAIL_USER,
            subject: "[BookStore] New Message",
            text:`You resived a new message from your website (BookStore)
                Name: ${name}
                Email: ${email}
                Message: ${message}
            `,
        };

        const userMail = {
            from: `"Book Store Support" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: "We received your message!",
            text: `
            Hi ${name},

            Thank you for contacting BookStore.

            We have received your message and will get back to you as soon as possible.

            Your message:
            "${message}"

            Best regards,
            BookStore Team
            `
        };
        
        transporter.sendMail(adminMail),

        console.log("Emails sent successfully");
    }catch (error){
        console.error("Email sending failed:", error.message); 
    };
};