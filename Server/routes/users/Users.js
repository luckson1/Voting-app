const express= require('express')
const {fetchOneUserCtrl, fetchAllUsersCtrl, userProfileCtrl, createUserctrl, updateUserctrl}= require('../../controllers/users/Users')

userRoutes=express.Router()
const multer = require('../../utils/multer');
const authentication = require('../../middlewear/authentication');

// req.file is the `image` file
  // req.body will hold the text fields, if there were any
// const upload = multer.single('image');
userRoutes.get("/:_Id", authentication, fetchOneUserCtrl)
userRoutes.get("/", authentication, fetchAllUsersCtrl)
userRoutes.get("/profile", authentication,userProfileCtrl)
userRoutes.post("/create", authentication, createUserctrl)
userRoutes.put("/", authentication, updateUserctrl)

module.exports = userRoutes




