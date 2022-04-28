const express= require('express');
const {createAwardCategoryCtrl, fetchOneAwardCategoryCtrl, fetchAllAwardCategory, updateAwardCategoryctrl, deleteAwardCategoryctrl, filterAwardCategoryCtrl}=require('../../controllers/awardCategory/awardCategory')


const awardCategoryRoute=express.Router()

awardCategoryRoute.post("/create", createAwardCategoryCtrl);
awardCategoryRoute.get("/:id", fetchOneAwardCategoryCtrl);
awardCategoryRoute.get("/", fetchAllAwardCategory);
awardCategoryRoute.put("/:id", updateAwardCategoryctrl);
awardCategoryRoute.delete("/:id", deleteAwardCategoryctrl)

module.exports =awardCategoryRoute;