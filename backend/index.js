require('dotenv').config();

const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const router = require('./routes/router');
const dobbyDB = require('./config/dbConnection');
const User = require('./models/user');

const app = express();

const path = require("path");
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.set("view engine", "ejs");

(async () => {
    await dobbyDB();
    app.listen(5000, () => {
        console.log(`Server is running on port 80`);
    });
})();

app.use("/", router);

app.get('/logout', (req, res, next) => {
    res.clearCookie('jwt');
    res.redirect('/login');
});

app.get("*", (req, res) => {
    res.redirect("/");
});
