import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import generateTokenAndSetCookie from "../utils/generateToken.js";

export const login = async (req, res) => {
    try{
        const {username,password}=req.body
        const user=await User.findOne({username})
        const isPasswordCorrect = await bcrypt.compare(password,user?.password||"")
        if(!user || !isPasswordCorrect){
            return res.status(400).json({error:"Invalid Username or Password"})
        }
        generateTokenAndSetCookie(user._id,res)

        res.status(201).json({
            _id: user._id,
            fullname: user.fullname,
            username: user.username
        })
        console.log('logged in')
    }
    catch(error){
        res.status(500).json({error:"Internal Server Error"})
        console.log(error)
    }
};

export const logout = async (req, res) => {
   try{
    res.cookie("jwt","",{maxAge:0});
    res.status(200).json({message:"Logged out"})
    console.log("Logged out")
   }
   catch(error){
    console.log("error in logout")
    return res.status(500).json({error:"Internal Server Error"})
   }
};

export const signup = async (req, res) => {
    try {
        const { fullname, username, password, confirmpassword } = req.body;
        if (!fullname || !username || !password || !confirmpassword) {
            return res.status(400).json({ error: "All fields are required" });
        }
        
        if (password !== confirmpassword) {
            return res.status(400).json({ error: "Passwords do not match" });
        }

        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt)
        const newUser = new User({
            fullname,
            username,
            password: hashedPassword
        });

        if(newUser){
            generateTokenAndSetCookie(newUser._id,res)
            await newUser.save()
            res.status(201).json({
                _id:newUser._id,
                fullname:newUser.fullname,
                username:newUser.username
            })
        }

    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
        console.error(error);
    }
};
