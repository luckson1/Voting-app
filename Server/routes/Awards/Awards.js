const express= require('express');
const {createAwardCtrl, fetchOneAWardCtrl, fetchAllAwardsCtrl, updateAwardctrl, deleteAwardctrl, filterAwardCtrl, publishAwardctrl, closeAwardctrl}=require('../../controllers/awards/Awards');
const authentication = require('../../middlewear/authentication');
const Multer = require('../../utils/multer');

const upload = Multer.single('image');
const awardsRoute=express.Router();

awardsRoute.post("/", authentication, upload,  createAwardCtrl);
awardsRoute.get("/:id", authentication,fetchOneAWardCtrl);
awardsRoute.get("/", fetchAllAwardsCtrl);
awardsRoute.get("/", authentication,filterAwardCtrl);
awardsRoute.put("/:id", authentication,updateAwardctrl);
awardsRoute.put("/publish/:id", authentication,publishAwardctrl);
awardsRoute.put("/close/:id", authentication,closeAwardctrl);
awardsRoute.delete("/:id", authentication ,deleteAwardctrl)

module.exports =awardsRoute;