const { User } = require("../models")
const refferalCodeGenerator = require("referral-code-generator")
const bcrypt = require("bcryptjs")
const { createToken } = require("../helper/createAndVerifyToken")
const { Op } = require("sequelize")
const fetch = require("node-fetch")
const Redis = require("ioredis")
const redis = new Redis


class UserController {

    static userRegister(req, res) {
        let inputUser = {
            userName: req.body.userName,
            password: req.body.password,
            name: req.body.name,
            email: req.body.email,
            referralCode: refferalCodeGenerator.alphaNumeric("lowercase", 2, 2)
        }

        User.create(inputUser)
            .then(data => {
                res.status(201).json({ userName: data.userName, name: data.name, email: data.email })
            })
            .catch(err => {
                res.status(500).json(err.message)
            })

    }

    static userLogin(req, res) {
        let inputUser = {
            userName: req.body.userName,
            password: req.body.password
        }

        // console.log(inputUser);

        User.findOne({
            where: {
                userName: inputUser.userName
            }
        })
            .then(data => {
                if(data) {
                    let passwordInDatabase = data.password
                    if(bcrypt.compareSync(inputUser.password, passwordInDatabase)) {
                        let access_token = createToken({id: data.id, Username: data.userName, Name: data.name, email: data.email, ReferralCode: data.referralCode})
                        console.log(access_token);
                        res.status(200).json(access_token)
                    }else {
                        res.status(400).json({ message: "Password/Email Ivalid"})
                    }
                }else {
                    res.status(400).json({ message: "Password/Email Ivalid"})
                }
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }

    static updateDataUser(req, res) {
        // res.status(200).json("masuuuk")
        let userId = req.dataUser.id
       
        let inputUser = {
            userName: req.body.userName,
            password: req.body.password,
            name: req.body.name,
            email: req.body.email
        }

        User.update(inputUser, {
            where: {
                id: userId
            },
            returning: true
        })
            .then(data => {
                res.status(200).json(data)
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }

    static getInformationWithAccesRefferalode(req, res) {
        
        const inputUser = req.body.referralCode
        const codeRefferal = req.dataUser

        if(inputUser === codeRefferal.ReferralCode) {
            User.findByPk(codeRefferal.id)
                .then(data => {
                    res.status(200).json(data)
                })
                .catch(err => {
                    res.status(500).json(err)
                })
        }else {
            res.status(400).json({ message: "Code Refferal Invalid"})
        }

    }

    static findUserName(req, res) {
        const inputUser = req.body.input
        User.findAll({
            where: {
                name: {
                    [Op.iLike] : `%${inputUser}%`
                }
            }
        })
            .then(data => {
                res.status(200).json(data)
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }

    static hitRequestThirdAPI(req, res) {
        const inputUser = req.body.input

        fetch('https://ddragon.leagueoflegends.com/cdn/6.24.1/data/en_US/champion.json')
        .then(response => response.json())
        .then(data => {
            // console.log(data);
            return data.data
        })
        .then(data => {
                let temp = [] 

                for(const key in data) {
                    if(key.toLowerCase().includes(inputUser.toLowerCase())) {
                        temp.push(data[key])
                    }
                }
                
                res.status(200).json({data: temp})
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }
}

module.exports = UserController