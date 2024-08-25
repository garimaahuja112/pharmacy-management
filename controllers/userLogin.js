const express=require('express');
const mongoose=require('mongoose');
const bodyParser=require('body-parser')
const User=require("../model/user");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router=express.Router();
const {body, validationResult}=require('express-validator');

const userLogin=async(req,res) => {
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        res.status(400).json({errors:errors.array()});
    }
    try{
        const user=await User.findOne({username:req.body.username});
        if (!user){
            res.status(400).json({message:'Invalid username or password'});
        }
  
        const isMatch=await user.comparePassword(req.body.password);
        if(!isMatch){
            res.status(400).json({message:'Invalid username or password'});
        }
  
        const token=jwt.sign({id:user._id}, process.env.JWT_SECRET, {expiresIn: '1h'});
        res.status(200).json({token: token});
    } 
    catch(error){
        res.status(500).json({message:error.message});
    }
};

router.post('/login',[body('username').isLength({min: 3}).trim().escape(),body('password').isLength({min: 8})], userLogin);

module.exports=router;
  