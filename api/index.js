
import express from 'express';
import mongoose from 'mongoose'
const app = express();
// import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js'
import userRouter from './routes/user.route.js'
import cookieParser from 'cookie-parser';

//connecting database
mongoose.connect("mongodb://localhost:27017/kagaz").then(()=>{
    console.log("Database connected successfully")
}).catch((e)=>{
    console.log("Error connecting database" , e)
})

//parsing body
app.use(express.json())

//parcing cookie
app.use(cookieParser());

//routes
app.use('/api/user' , userRouter);
app.use('/api/auth' , authRouter)

//routes
app.get("/helloworld" ,(req,res)=>{
    res.status(200).send("Hello world")
})

//error handling middleware
app.use((err , req , res , next)=>{
    const statusCode = err.statusCode || 500;
    const message = err.message || "internal server error";
    return res.status(statusCode).json({
        success : false,
        statusCode,
        message
    })
})

//listening on port
app.listen(4000 , ()=>{
    console.log("Server running on port number 4000")
})