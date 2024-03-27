
import mongoose from "mongoose";

const MessageSchema=new mongoose.Schema({
    creator:String,
    title:String,
    selectedFile:String,
    message:String,

    tags:{type:[String],default:[]},
    createdAt:{type:Date,default:Date.now()},
    likes:{type:[String],default:[]},
    comments:{type:[String],default:[]}
})

const newMessages=mongoose.model('newMessages',MessageSchema);

export default newMessages;