const express = require("express");//add express

const app = express();//run express
const mongoose = require("mongoose");//add mongoose
mongoose.set("strictQuery", false);//run mongoose


const dotenv = require("dotenv").config();
const port = process.env.PORT || 3000;

const cors = require('cors'); //add cors
const cookieParser = require('cookie-parser');//add cookie-parser
app.use(cookieParser());

app.use(cors({
    origin: 'http://127.0.0.1:5173',
    credentials: true
}));


app.use(express.urlencoded({ extended: true }));//know body in sending requst
app.use(express.json());

app.use("/Users", require("./Route/UserRoute"));


const start = async () => {
    await mongoose.connect(process.env.CONNICTION);
    app.listen(port, () => { console.log(`run in port ${port}`); })
}

start();

module.exports = app;