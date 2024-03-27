
import mongoose, { Schema } from "mongoose";

const UserSchema=mongoose.Schema({
    name:{type:String},
    email:{type:String},
    password:{type:String},
    id:{type:String},
})

const newUser=mongoose.model('newUser',UserSchema);
export default newUser;