import User from "../models/user.model.js";
import bcrypt from 'bcrypt';

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