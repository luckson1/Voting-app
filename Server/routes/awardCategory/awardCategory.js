const express= require('express');
const {publishAwardCategoryctrl, createAwardCategoryCtrl, fetchOneAwardCategoryCtrl, fetchAllAwardCategory, updateAwardCategoryctrl, deleteAwardCategoryctrl, filterAwardCategoryCtrl}=require('../../controllers/awardCategory/awardCategory')


const awardCategoryRoute=express.Router()

awardCategoryRoute.post("/", createAwardCategoryCtrl);
awardCategoryRoute.get("/:id", fetchOneAwardCategoryCtrl);
awardCategoryRoute.get("/", fetchAllAwardCategory);
awardCategoryRoute.put("/:id", updateAwardCategoryctrl);
awardCategoryRoute.put("/publish/:id", publishAwardCategoryctrl);
awardCategoryRoute.delete("/:id", deleteAwardCategoryctrl)

module.exports =awardCategoryRoute;