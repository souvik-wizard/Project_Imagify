const jwt = require("jsonwebtoken");
require("dotenv").config();
const User=require('../models/user')

const checkAuth = async (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
        const {id}=jwt.verify(token, process.env.JWT_SECRET) 
        const existingUser=await User.findById(id).select('_id')
        if(existingUser){
            next();
        }else{
            res.redirect("/login");
        }
    } else {
        res.redirect("/login");
    }
}



module.exports = checkAuth;