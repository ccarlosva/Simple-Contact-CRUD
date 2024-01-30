const asyncHandler = require("express-async-handler")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const mongoose = require("mongoose")
const User = require("../models/userModel")

//@desc Create User
//@route Post /api/user/register
//@access private
const createUser = asyncHandler(async (req, res) => {
    const { userName, email, password } = req.body
    if (!userName || !email || !password) {
        res.status(400);
        throw new Error("All fields are mandatory")
    }
    const userAvailable = await User.findOne({email});
    if (userAvailable){
        res.status(400);
        throw new Error("Existing User")
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
        userName,
        email,
        password: hashedPassword,
    })
    if (user) {
        res.status(201).json({ _id: user.id, email: user.email })
    }else{
        res.status(400);
        throw new Error("User data is not valid")
    }
    // console.log(`User created succesfully\n ${user.userName}\n ${user.email}`)
    
});

//@desc Create login
//@route Post /api/user/login
//@access public
const createLogin = asyncHandler(async (req,res)=>{
    const{email, password} = req.body;

    if(!email || !password){
        res.status(400);
        throw new Error("All fields are mandatory")
    }

    const user = await User.findOne({email})

    // Compare password with hashed password

    if(user && (await bcrypt.compare(password, user.password))){
        accessToken = jwt.sign({
            user: {
                userName: user.userName,
                email: user.email,
                id: user.id
            }
        },process.env.ACCESS_TOKEN_SECRET, 
        {expiresIn: "15m"});
        res.status(200).json({accessToken});
        console.log("login Successful")
    }else{
        res.status(401)
        throw new Error("Incorrect credentials")
    }

});


//@desc Create login
//@route Post /api/user/login
//@access private
const getCurrentUser = asyncHandler(async (req,res)=>{
    res.json(req.user);
});


module.exports = { createUser,createLogin,getCurrentUser }