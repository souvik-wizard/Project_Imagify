require('dotenv').config();
const mongoose = require('mongoose');

let dobbyDB = async () => {
    await mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log("Connected to DB");
}

module.exports=dobbyDB;
