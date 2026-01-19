import { generateToken } from "../lib/utils.js";
import User from "../models/User.js";
import bcrypt from "bcryptjs";

export const register = async (req,res) => {

    const {name, email, password} = req.body;

    try {

        if(!name || !email || !password){
            return res.json({success: false, message: "Credentials Missing"});
        }

        const user = await User.findOne({email});

        if(user){
            return res.json({success: false, message: "Email already Existing"});
        }

        // Password Encryption

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(String(password), salt);

        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
        })

        const token = generateToken(newUser._id);
        res.status(200).json({success: true, userData: newUser, token, message: "Account created successfully" });


        
    } catch (error) {
        console.log(error);
        res.json({success: false, message: error.message});

    }
}

export const login = async (req,res) => {

    try {

        const {email, password} = req.body;

        if(!email || !password){
            return res.json({success: false, message: "Credentials Missing"});
        }

        const userData = await User.findOne({email});
        const isPasswordCorrect = await bcrypt.compare(password, userData.password);

        if (!userData) {
            return res.status(401).json({ success: false, message: "Invalid Credentials" });
        }

        if(!isPasswordCorrect){
            return res.json({success: false, message: "Invalid Credentials"});
        }

        const token = generateToken(userData._id);
        return res.status(200).json({success: true, userData: userData, token, message: "Login Successfully"});
        
    } catch (error) {
        console.log(error);
        res.json({success: false, message: error.message});
    }
}