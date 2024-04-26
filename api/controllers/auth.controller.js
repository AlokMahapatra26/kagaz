import User from "../models/user.model.js";
import bcrypt from 'bcrypt';
import {errorHandler} from '../utils/error.js'
import jwt from 'jsonwebtoken'

export const signup = async (req,res ,next) => {
    
    try{
        const {username , email , password} = req.body;
        const hasedPassword = bcrypt.hashSync(password , 10);
        const newUser = new User({username , email , password:hasedPassword});
        await newUser.save();
        res.status(201).send({
            "message" : "User created succesfully",
            newUser
        })
    }catch(e){
        next(e);
    }
    
}

export const signin = async (req,res,next) => {
    try{
        const {email , password} = req.body;
        const validUser = await User.findOne({email})

        if(!validUser) return next(errorHandler(404 , 'User not found'));

        const validPassword = bcrypt.compareSync(password , validUser.password);

        if(!validPassword) return next(errorHandler(401 , 'Invalid password'))

        const token = jwt.sign({id : validUser._id , email : validUser.email , password : validUser.password }, "xoxo")

        const {password : pass , ...rest} = validUser._doc;

        res.cookie('access_token' , token , {httpOnly : true }).status(200).json(rest);
    }catch(e){
        next(e);
    }
}

export const google = async (req, res , next)=>{
    try{
        const user = await User.findOne({email : req.body.email})
        if(user){
            const token = jwt.sign({id : user.id} , "xoxo")
            const {password:pass , ...rest} = user._doc;
            res.cookie('access_token' , token , {httpOnly : true}).status(200).json(rest);
        } else {
            const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
            const hashedPassword = bcrypt.hashSync(generatedPassword , 10)
            const newUser = new User({username : req.body.name.split(" ").join("").toLowerCase() + Math.random().toString(36).slice(-4) , email : req.body.email , password : hashedPassword , avatar : req.body.photo})
            await newUser.save();
            const token = jwt.sign({id : newUser._id} , "xoxo");
            const {password:pass , ...rest} = newUser._doc;
            res.cookie("access_token" , token , {httpOnly : true}).status(200).json(rest);
        }
    }catch(e){
        next(e)
    }
}