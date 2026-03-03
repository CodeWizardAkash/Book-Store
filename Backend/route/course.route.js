import express from "express";
import Course from "../models/course.model.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Add new course
router.post("/", async(req, res)=>{
    try{
        const newCourse = new Course(req.body);
        const savedCourse = await newCourse.save();
        res.status(201).json(savedCourse);
    }
    catch(err){
        res.status(400).json({message: err.message});
    }
})

// get all courses
router.get("/", authMiddleware, async(req, res)=>{
    try {
        const courses = await Course.find();
        res.status(200).json(courses);
    } catch (err) {
        res.status(500).json({message: err.message});
    }
})

export default router;