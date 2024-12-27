const express = require('express')
const{registerNewUser, loginUser ,logoutUser} = require('../controller/userController')
const router = express.Router()


router.post("/signup",registerNewUser)

router.post("/login",loginUser)

router.get("/logout",logoutUser)

module.exports = router