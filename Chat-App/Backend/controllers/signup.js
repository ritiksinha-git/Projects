const Usertable = require('../models/usertable');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.signup = async (req, res) => {
    try {
        const saltRounds = 10;
        const password = req.body.password;
        const isEmailExist = await Usertable.findOne({ where: { email: req.body.email } });

        if (isEmailExist === null) {
            bcrypt.hash(password, saltRounds, async (err, hashpwd) => {
                try {
                    const response = await Usertable.create({
                        username: req.body.name,
                        email: req.body.email,
                        mobile: req.body.phonenumber,
                        password: hashpwd
                    });
                    res.send({ success: true, msg: "Insert successfully" });
                } catch (error) {
                    throw new Error("Something went wrong in insert data");
                }
            });
        } else {
            res.send({ success: false, msg: "Email-id Exist!!" });
        }
    } catch (error) {
        res.status(400).send({ success: false, msg: error });
    }
};

function generateToken(id, name) {
    return jwt.sign({ userid: id, username: name }, 'secretkey');
}

exports.login = async (req, res) => {
    try {
        const data = await Usertable.findOne({ where: { email: req.body.email } });

        if (data === null) {
            res.send({ success: false, msg: "Email_id does not exist" });
        } else {
            bcrypt.compare(req.body.password, data.password, async (err, response) => {
                if (err) {
                    throw new Error("Something went wrong in password");
                }
                if (response === true) {
                    res.send({ success: true, msg: "Login Successfully", userdata: generateToken(data.id, data.username) });
                } else {
                    res.send({ success: false, msg: "Password does not match" });
                }
            });
        }
    } catch (error) {
        console.log(error);
    }
};
