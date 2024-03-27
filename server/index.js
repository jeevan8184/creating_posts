
import mongoose from "mongoose";
import bodyParser from "body-parser";
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import postRoutes from './routes/posts.js';
import authRoutes from './routes/auth.js';

dotenv.config()
const app=express();

app.use(bodyParser.json({limit:'30mb',extended:true}));
app.use(bodyParser.urlencoded({limit:"30mb",extended:true}));
app.use(cors());

app.use('/newPosts',postRoutes);
app.use('/newUsers',authRoutes);

const PORT=process.env.PORT;

mongoose.connect(process.env.CONNECTION_URL)
    .then(()=> app.listen(PORT,()=> console.log(`server running on port : ${PORT}`)))
    .catch((error)=>console.log(error))