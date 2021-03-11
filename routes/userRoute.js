const express = require("express")
const route = express.Router()
const UserController = require("../controllers/userCntroller")
const authentication = require("../middlewares/authentication")

route.post("/login", UserController.userLogin)
route.post("/register", UserController.userRegister)
route.post("/find", UserController.findUserName)
route.post("/hero", UserController.hitRequestThirdAPI)

route.use(authentication)
route.put("/update", UserController.updateDataUser)
route.post("/information", UserController.getInformationWithAccesRefferalode)


module.exports = route