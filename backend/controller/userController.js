const jwt=require('jsonwebtoken')
const User = require('../models/user')

const createToken=(id)=>{
    return jwt.sign({id},process.env.JWT_SECRET,{
        expiresIn:3*24*60*60
    })
}

const signupController= async (req,res)=>{
    const {firstname,lastname,email,password}=req.body;
    try{
        const user = await User.signUp(firstname,lastname,email,password);
        const token = createToken(user._id);
        console.log(token)
        res.cookie("token",token,{
            httpOnly:true,
            secure:true,
            sameSite:"none",
            maxAge:3*24*60*60*1000
        })
        res.json({id:user._id,firstname:firstname,lastname:lastname,email:email,images:[],})
    } catch(err){
        res.status(400).json({err:err.message})
    }
}

const loginController=(req,res)=>{
    const {email,password}=req.body;
    try{
        const user = User.login(email,password);
        const token = createToken(user._id);
        res.cookie('jwt',token,{httpOnly:true,secure:true,maxAge:3*24*60*60*1000});
        res.status(201).json({user:{
            id:user._id,
            firstname:user.firstname,
            lastname:user.lastname,
            email:user.email,
        }});
    } catch(err){
        res.status(400).json({err:err.message})
    }
}

module.exports={signupController,loginController}