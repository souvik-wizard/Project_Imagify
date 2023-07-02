const mongoose = require("mongoose");
const validator= require('validator');
const bcrypt = require('bcrypt');

let UserSchema = new mongoose.Schema(
  {
      firstname: {
          type: String,
          required: true,
          match: [/^[a-zA-Z0-9]+$/, "is invalid"]
      },
      lastname: {
          type: String,
          required: true,
          match: [/^[a-zA-Z0-9]+$/, "is invalid"]
      },
      email: {
          type: String,
          required: true,
      },
      password: {
          type: String,
          required: true,
      },
      images: [{ type: mongoose.Schema.Types.ObjectId, ref: "Image" }],
  }
);

UserSchema.statics.signUp = async function (firstname,lastname,email,password){
    if(!firstname || !lastname || !email || !password){
        throw new Error('All fields are required');
    }
    if(!validator.isEmail(email)){
        throw new Error('Invalid Email');
    }
    if(!validator.isStrongPassword(password)){
        throw new Error('Password must contain at least 1 lowercase, 1 uppercase, 1 number, and 1 symbol');
    }

    const exist = await this.findOne({email});
    if(exist){
        throw new Error('Email already exists');
    }
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    const user = new this({firstname,lastname,email,password:hash});
    await user.save();
    return user;

}

UserSchema.statics.login = async function (email,password){
    if(!email || !password){
        throw new Error('All fields are required');
    }
    if(!validator.isEmail(email)){
        throw new Error('Invalid Email');
    }
    const user = this.findOne({email});

    if(!user){
        throw new Error('Email does not exist');
    }

    const match = bcrypt.compare(password, user.password);
    if(!match){
        throw new Error('Incorrect password');
    }
    return user;

}



module.exports = mongoose.model("User", UserSchema);
