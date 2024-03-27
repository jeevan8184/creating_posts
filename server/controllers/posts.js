
import mongoose from "mongoose";

import newMessages from "../models/newMessages.js"

export const getPostsBySearch=async(req,res)=> {
    const {searchQuery,tags}=req.query;
    try {
        const title=new RegExp(searchQuery,"i");
        const posts=await newMessages.find({$or:[{title},{tags:{$in:tags?.split(',')}}]});
        res.status(200).json({data:posts});
    } catch (error) {
        console.log(error);
        res.status(404).json({message:error.message});
    }
}

export const getPosts=async(req,res)=> {
    const {page}=req.query;
    try {
        const LIMIT=3;
        const skipAmt=(Number(page)-1)*LIMIT;
        const total=await newMessages.countDocuments({});
        const posts=await newMessages.find().sort({_id:-1}).skip(skipAmt).limit(LIMIT);
        res.status(200).json({data:posts,currentPage:Number(page),numberOfPages:Math.ceil(total/LIMIT)})
    } catch (error) {
        res.status(404).json({message:error.message})
    }
}

export const getPost=async(req,res)=> {
    const {id}=req.params;
    try {
        const post=await newMessages.findById(id);
        res.status(200).json(post);
    } catch (error) {
        res.status(404).json({message:error.message});
    }
}

export const createPost=async(req,res)=> {
    const post=req.body
    const newPost= newMessages({...post,createdAt:new Date().toISOString(),creator:req.userId});
    try {
        await newPost.save();
        res.status(201).json(newPost);
    } catch (error) {
        res.status(409).json({message:error.message})
    }
}

export const updatePost=async(req,res)=> {
    const {id}=req.params;
    const {creator,title,message,selectedFile,tags}=req.body;

       if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with this id');
       const updatedPost={creator,title,message,selectedFile,tags,_id:id}

       await newMessages.findByIdAndUpdate(id,updatedPost,{new:true});
       res.json(updatedPost);
        
}

export const deletePost=async(req,res)=> {
    const {id}=req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with this id');
    await newMessages.findByIdAndDelete(id);

    res.json({message:'Post deleted Successfully'});

}

export const likePost=async(req,res)=> {
    const {id}=req.params;
    if(!req.userId) return res.json({message:'unauthenticated!...'});

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with this id');
    const post=await newMessages.findById(id);

    const index=post.likes.findIndex((id)=>id===String(req.userId));

    if(index===-1) { //like
        post.likes.push(req.userId);
    } else { //dislike
        post.likes=post.likes.filter((id)=> id !== String(req.userId));
    }
    
    const updatedPost=await newMessages.findByIdAndUpdate(id,post,{new:true});

    res.json(updatedPost);
    
}

export const commentPost=async(req,res)=> {
    const {id}=req.params;
    const {value}=req.body;

    try {
        const post=await newMessages.findById(id);
        post.comments.push(value);
        const updatedPost=await newMessages.findByIdAndUpdate(id,post,{new:true});
        res.json(updatedPost);
    } catch (error) {
        res.json({message:error.message})
    }
}