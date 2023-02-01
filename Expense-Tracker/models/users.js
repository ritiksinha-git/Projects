const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const User = sequelize.define('User', {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false
        },
        ispremiumuser: Sequelize.BOOLEAN
});

module.exports = User;
