
import express from 'express';
import mongoose from 'mongoose'
const app = express();
import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js'


//connecting database
mongoose.connect("mongodb://localhost:27017/kagaz").then(()=>{
    console.log("Database connected successfully")
}).catch((e)=>{
    console.log("Error connecting database" , e)
})

//parsing body
app.use(express.json())

//routes
app.use('/api/user' , userRouter);
app.use('/api/auth' , authRouter)

//routes
app.get("/" ,(req,res)=>{
    res.status(200).json({
        "message" : "hello from home"
    })
})



//listening on port
app.listen(4000 , ()=>{
    console.log("Server running on port number 4000")
})