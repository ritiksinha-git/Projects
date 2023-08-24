const sequelize=require('../Chat-App/Backend/util/db');
const express=require('express');
const app=express();

const dotenv = require('dotenv');
dotenv.config();

const bodyparser=require('body-parser');
const path=require('path');
const cors=require('cors')

const usertable = require('../Chat-App/Backend/models/usertable')
const userRouter = require('../Chat-App/Backend/routes/user')

app.use(cors());
app.use(bodyparser.urlencoded({extended:true}));
app.use(bodyparser.json());
app.use(userRouter);

sequelize.sync()
.then(()=>{
    app.listen(3000);
}).catch(err=>{
    console.log(err);
})