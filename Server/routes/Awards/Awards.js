const express= require('express');
const {createAwardCtrl, fetchOneAWardCtrl, fetchAllAwardsCtrl, updateAwardctrl, deleteAwardctrl, filterAwardCtrl, publishAwardctrl}=require('../../controllers/awards/Awards');
const authentication = require('../../middlewear/authentication');
const Multer = require('../../utils/multer');

const upload = Multer.single('image');
const awardsRoute=express.Router();

awardsRoute.post("/", authentication, upload,  createAwardCtrl);
awardsRoute.get("/:id", authentication,fetchOneAWardCtrl);
awardsRoute.get("/", authentication, fetchAllAwardsCtrl);
awardsRoute.get("/", authentication,filterAwardCtrl);
awardsRoute.put("/:id", authentication,updateAwardctrl);
awardsRoute.put("/:id", authentication,publishAwardctrl);
awardsRoute.delete("/:id", authentication,deleteAwardctrl)

module.exports =awardsRoute;