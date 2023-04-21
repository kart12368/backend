import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

// Register User

export const register = async(req,res)=>{
    try {
        const{
            email,
            fullname,
            password,
            accessLevel
        } = req.body;

        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password,salt)

        const newUser = new User ({
            email,
            fullname,
            password:passwordHash,
            accessLevel

        })
        const savedUser = await newUser.save();
        res.status(201).render("index");
            
        
    } catch (err) {
        res.status(500).json({error: err.message});
    }
};

// LOGGING IN
import session from 'express-session';
export const login = async (req,res) =>{
    try {
        const{ email,password } = req.body;
        const user = await User.findOne({email:email});
        if(!user) return res.status(400).json({msg:"User does not exist."});

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) return res.status(400).json({msg:"Invalid Credentials."});

        req.session.userId = user._id;
        req.session.isLoggedIn = true;


        const token = jwt.sign({ id:user._id}, process.env.JWT_SECRET);
        delete user.password;
        // Redirect the user to their dashboard
        if (user.accessLevel === 'counselor') {
            res.render("counselorlog");
        } else if (user.accessLevel === 'student') {
            res.render("studentlog");
        } else {
            res.sendStatus(500);
        }
    
        // res.status(200).render("loggedin");

        
    } catch (err) {
        res.status(500).json({error: err.message});
    }
}