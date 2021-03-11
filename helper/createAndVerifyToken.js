const jwt = require("jsonwebtoken")

function createToken(payload) {
    return jwt.sign(payload, process.env.SECRET)
}

function verifyToken(encoded) {
    const result = jwt.verify(encoded, process.env.SECRET)
    return result
}

module.exports = {
    createToken,
    verifyToken
}