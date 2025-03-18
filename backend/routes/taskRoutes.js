const express = require("express");
const Task = require("../models/Task");
const User = require("../models/User");

const router = express.Router();

router.post("/register", async (req, res) =>{
    
    try{
        const {name, email, deviceToken} = req.body;

        let user = await User.findOne({email});
        if(!user){
            user = new User({name, email, deviceToken});
            await user.save();
        }

        res.status(200).json({success: true, user});
    } catch(error){
        res.status(500).json({success: false, message: error.message});

    }
});

router.post("/tasks", async (req, res) =>{
    try{
        const {userId, title, description, location, radius} = req.body;
        const user = await User.findById(userId);

        if(!user){
            return res.status(404).json({success: false, message: "User not found"});
        }

        const task = new Task({user: userId, title, description, location, radius});
        await task.save();

        res.status(201).json({success: true, task});
    } catch(error){
        res.status(500).json({success: false, message:error.message});

    }
});

router.get("/tasks/:userId", async (req,res) =>{
    try{
        const tasks = await Task.find({user: req.params.userId});
        res.status(200).json({success: true, tasks});
    } catch (error){
        res.status(500).json({success: false, message: error.message});
    }
});

router.put("/tasks/:taskId/complete", async(req,res) => {
    try{
        const task = await Task.findById(req.params.taskId);
        if(!task){
            return res.status(404).json({success: false, message: "Task not found"});

        }

        task.isCompleted = true;
        await task.save();

        res.status(200).json({success: true, message: "Task marked as completed", task});
    } catch(error){
        res.status(500).json({success: false, message: error.message});
    }
});

module.exports = router;