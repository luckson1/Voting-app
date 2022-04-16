const express= require('express');
const {createAwardCtrl, fetchOneAWardCtrl, fetchAllAwardsCtrl, updateAwardctrl, deleteAwardctrl, filterAwardCtrl}=require('../../controllers/awards/Awards')


const awardsRoute=express.Router()

awardsRoute.post("/create", createAwardCtrl);
awardsRoute.get("/:id", fetchOneAWardCtrl);
awardsRoute.get("/", fetchAllAwardsCtrl);
awardsRoute.get("/", filterAwardCtrl);
awardsRoute.put("/:id", updateAwardctrl);
awardsRoute.delete("/:id", deleteAwardctrl)

module.exports =awardsRoute;