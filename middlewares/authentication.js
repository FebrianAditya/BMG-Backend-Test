const { verifyToken } = require("../helper/createAndVerifyToken")
const { User } = require("../models")

function authentication(req, res, next) {
    let access_token = req.headers.access_token
    
    try {
        let decoded = verifyToken(access_token)
        // console.log(decoded, "--------");
        // {
        //     id: 1,
        //     Username: 'febrianAditya',
        //     Name: 'FebrianAditya',
        //     email: 'febrian.aksen@gmail.com',
        //     ReferralCode: 's86o01',
        //     iat: 1615401992
        // }
        if(!decoded) {
            throw({
                status: 401,
                message: 'please login first'
              })
        }else {
            let email = decoded.email
            let id = decoded.id
            req.dataUser = decoded
            
            User.findOne({
                where: {
                    email,
                    id
                }
            })
                .then(data => {
                    if(data) {
                        next()
                    }else {
                        res.status(401).json({ error: "You must have account" })
                    }
                })
                .catch(err => {
                    res.status(500).json(err)
                })
        }
    }
    catch {
        res.status(401).json({ message: "Please login first"})
    }

}

module.exports = authentication