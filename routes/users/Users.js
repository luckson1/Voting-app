const express= require('express')
const {fetchOneUserCtrl, fetchAllUsersCtrl, userProfileCtrl, createUserctrl, updateUserctrl}= require('../../controllers/users/Users')

userRoutes=express.Router()
const multer = require('multer');

// req.file is the `image` file
  // req.body will hold the text fields, if there were any
const upload = multer().single('image');
userRoutes.get("/:id", fetchOneUserCtrl)
userRoutes.get("/", fetchAllUsersCtrl)
userRoutes.get("/profile/:id", userProfileCtrl)
userRoutes.post("/create", createUserctrl)
userRoutes.put("/update-profile/:id", upload, updateUserctrl)

module.exports = userRoutes




