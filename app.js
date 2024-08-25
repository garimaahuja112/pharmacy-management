const express=require("express");
const mongoose=require("mongoose");
const NodeCache=require('node-cache');
const bodyParser=require('body-parser')
const {body, validationResult}=require('express-validator');
const helmet=require('helmet');
const User=require("./model/user");
const Pharmacy=require("./model/pharmacy");
const Medicine=require("./model/medicine");


const app=express();
app.use(helmet());
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));

require('dotenv').config();
const MONGODB_URI=process.env.MONGODB_URI;
const PORT=process.env.PORT

mongoose.connect(MONGODB_URI)
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

app.get("/",async(req,res) => res.send("Welcome!"));

const userRegistrationRouter = require('./controllers/userRegistration');
app.use(userRegistrationRouter);

const userLoginRouter = require('./controllers/userLogin');
app.use(userLoginRouter);

const pharmacyRouter = require('./controllers/pharmacies');
app.use(pharmacyRouter);

const medicineRouter = require('./controllers/medicines');
app.use(medicineRouter);

const authenticationRouter = require('./middleware/authentication');
app.use(authenticationRouter);

app.listen(PORT,() => console.log("server started on port 3000"))

module.exports = app;