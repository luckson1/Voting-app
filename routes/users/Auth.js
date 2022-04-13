const express= require('express')
const {registerUserCtrl, loginUserCtrl, emailVerificationCtrl, resendEmailVerificationCtrl}= require("../../controllers/users/Auth")


authRoutes= express.Router()

authRoutes.post('/register', registerUserCtrl);


module.exports = authRoutes
