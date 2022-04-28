const express= require('express')
const {registerUserCtrl, loginUserCtrl, emailVerificationCtrl, resendEmailVerificationCtrl}= require("../../controllers/users/Auth")
;
const authentication = require('../../middlewear/authentication');
const multer = require('../../utils/multer');
authRoutes= express.Router()



// req.file is the `image` file
  // req.body will hold the text fields, if there were any
const upload = multer.single('image');

authRoutes.post('/register', upload, registerUserCtrl);
authRoutes.post('/login', loginUserCtrl);
authRoutes.get('/verification/:token', emailVerificationCtrl);
authRoutes.post('/resend', resendEmailVerificationCtrl);


module.exports = authRoutes
