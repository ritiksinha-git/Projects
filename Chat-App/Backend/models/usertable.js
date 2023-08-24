const sequelize=require('sequelize');
const Sequelize=require('../util/db');

const usertable=Sequelize.define('userdetail',{
    id:{
        type:sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true,
    },
    username:sequelize.STRING,
    email:sequelize.STRING,
    mobile:sequelize.STRING,
    password:sequelize.STRING

});

module.exports=usertable;