
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import newUser from '../models/newUser.js';

export const signin=async(req,res)=> {
    const {email,password}=req.body;

    try {
        const existUser=await newUser.findOne({email});
        if(!existUser) return res.status(404).json({message:"user does not exists"});
        const checkPass=await bcrypt.compare(password,existUser.password);
        if(!checkPass) return res.status(400).json({message:'incorrect credentials'});
        
        const token=jwt.sign({email:existUser.email,id:existUser._id},'test',{expiresIn:'1h'});
        res.status(200).json({result:existUser,token});
        
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

export const signup=async(req,res)=> {
    const {firstName,lastName,email,password,confirmPassword}=req.body;

    try {
        const existUser=await newUser.findOne({email});
        if(existUser) return res.status(404).json({message:"user exists signin"});
        if(password !== confirmPassword) return res.status(400).json({message:'passwords does not match'});
        const haspass=await bcrypt.hash(password,12);
        const result=await newUser.create({email,password:haspass,name:`${firstName} ${lastName}`});
        const token=jwt.sign({email:result.email,id:result._id},'test',{expiresIn:'1h'});

        res.status(200).json({result,token});
        
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}