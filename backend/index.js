const express = require("express");
const app  = express();
const signupRoute = require("./source/routers/signup")
const admincreation = require("./source/scripts/admin")
const loginroute  = require("./source/routers/login");
const userRoute = require("./source/routers/user");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
app.use(express.json());
app.use(cors());
const PORT = process.env.PORT || 5000;
const connectDB = async() =>{
    await mongoose.connect(process.env.URL).then(()=>{
        console.log("Database connection is successfull");
        app.listen(PORT,()=>{
            console.log(`Server is running on ${PORT}`);
        })
    }).catch((error)=>{
        console.log(error);
    })
}
connectDB();
admincreation.createAdmin();
app.use('/user',signupRoute);
app.use('/auth',loginroute);
app.use('/api',userRoute);