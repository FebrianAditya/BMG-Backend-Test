const { User } = require("../models")
const refferalCodeGenerator = require("referral-code-generator")
const { createToken } = require("../helper/createAndVerifyToken")
const bcrypt = require("bcryptjs")
const { Op } = require("sequelize")
const fetch = require("node-fetch")
const Redis = require("ioredis")
const redis = new Redis()

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
                if(err.errors.length !== 0) {
                    res.status(400).json({errors: err.message})
                    console.log(err.message);
                } else {
                    res.status(500).json(err)
                }
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
                        res.status(200).json({access_token: access_token})
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

    static async updateDataUser(req, res) {
        let userId = req.dataUser.id
        let inputUser = {
            userName: req.body.userName,
            name: req.body.name,
            email: req.body.email
        }
        
        try {
            let user = JSON.parse(await redis.get("user"))
            User.update(inputUser, {
                where: {
                    id: userId
                },
                returning: true
            })
                .then(data => {
                    res.status(200).json({id: data[1][0].id, userName: data[1][0].userName, name: data[1][0].name, email: data[1][0].email, referralCode: data[1][0].referralCode})
                    redis.del("user")
                    if(user) {
                        redis.set("user", JSON.stringify(user))
                    }
                })
                .catch(err => {
                    let tampErr = []
                    for(let i = 0; i < err.errors.length; i++) {
                        tampErr.push(err.errors[i].message)
                    }
                    res.status(400).json({ error: tampErr })
                })
        } catch {
            res.status(500).json(err)
        }

        
    }

    static async getInformationWithAccesRefferalode(req, res) {
        
        try {
            redis.del("user")
            const user = JSON.parse(await redis.get("user"))
            
            if(user) {
                res.status(200).json(user)
            }else {
                const inputUser = req.body.referralCode
                const codeRefferal = req.dataUser
                
                if(inputUser === codeRefferal.ReferralCode) {
                    User.findByPk(codeRefferal.id)
                        .then(data => {
                            res.status(200).json(data)
                            redis.set("user", JSON.stringify(data))
                        })
                        .catch(err => {
                            res.status(500).json(err)
                        })
                }else {
                    res.status(400).json({ message: "Code Refferal Invalid"})
                }
            }
        } catch {
            res.status(500).json({ message: "Error "})
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

    static async hitRequestThirdAPI(req, res) {   
        try {
            const inputUser = req.body.input
            fetch('https://ddragon.leagueoflegends.com/cdn/6.24.1/data/en_US/champion.json')
                .then(response => response.json())
                .then(data => {
                    return data.data
                })
                .then(data => {
                    let temp = []
                    if(temp.length !== 0) {
                        res.status(200).json({data: temp})
                    }else {
                        for(const key in data) {
                            if(key.toLowerCase().includes(inputUser.toLowerCase())) {
                                temp.push(data[key])
                            }
                        }
                        res.status(200).json({data: temp})
                        redis.set("hero", JSON.stringify({data: temp}))
                    }

                })
                .catch(err => {
                    res.status(500).json(err)
                })
        } catch {
            res.status(500).json(err)
        }       
    }
}

module.exports = UserController