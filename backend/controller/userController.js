const User= require('../models/userModel')
const asyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')


const registerNewUser = asyncHandler(async(req,res)=>{
    const{username,email,password} = req.body
    console.log(username,email,password)
    if(!username || !email || !password){
        return res.status(400).json({msg:"Kindly fill all the fields"})
    }
    const userExists = await User.findOne({email})

    if(userExists){
        return res.status(400).json({msg:"Email already registered"})
    }

    const hashedPassword = await bcrypt.hash(password,10)

    const user = await User.create({
        username,
        password : hashedPassword,
        email
    })

    if(!user){
        return res.status(400).json({msg: "user data is not valid"})
    }else{
        return res.status(200).json({id: user._id,email : email})
    }
})

const loginUser = asyncHandler(async(req,res)=>{
    const{email,password} = req.body
    if(!email || !password){
        res.status(400).json({msg:"Kindly fill all the fields"})
    }
    const userExists = await User.findOne({email})

    if(userExists && await bcrypt.compare(password,userExists.password)){
        const token = jwt.sign({
            user:{
                username : userExists.username,
                email : email,
                password : password
            }
        },
        process.env.JWT_SECRET,
        {expiresIn : "1h"}
    ) 
        console.log(token)
       res.cookie('token', token, {
  httpOnly: true,
  secure: true, // Required for cookies in cross-origin requests
  sameSite: 'None', // Required for cross-origin cookies
});
        res.status(200).json({token})
    }else{
        res.status(400).json({msg: "email and password not valid"})
    }


})

// controller/userController.js

const logoutUser = asyncHandler(async (req, res) => {
   
    res.clearCookie('token', { path: '/' });
    console.log("nireesh")
    res.status(200).json({ msg: "Successfully logged out" });
});


module.exports ={registerNewUser ,loginUser , logoutUser}
