const express= require('express')
const {registerUserCtrl, loginUserCtrl, emailVerificationCtrl, resendEmailVerificationCtrl}= require("../../controllers/users/Auth")


authRoutes= express.Router()

authRoutes.post('/register', registerUserCtrl);
authRoutes.post('/login', loginUserCtrl);
authRoutes.get('/verification/:token', emailVerificationCtrl);
authRoutes.post('/resend', resendEmailVerificationCtrl);


module.exports = authRoutes
