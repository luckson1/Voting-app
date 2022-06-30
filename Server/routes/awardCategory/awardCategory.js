const express= require('express');
const {fetchUserAwardCategory, publishAwardCategoryctrl, createAwardCategoryCtrl, fetchOneAwardCategoryCtrl, fetchAllAwardCategory, updateAwardCategoryctrl, deleteAwardCategoryctrl, filterAwardCategoryCtrl}=require('../../controllers/awardCategory/awardCategory');
const authentication = require('../../middlewear/authentication');


const awardCategoryRoute=express.Router()

awardCategoryRoute.post("/", authentication, createAwardCategoryCtrl);
awardCategoryRoute.get("/:id", fetchOneAwardCategoryCtrl);
awardCategoryRoute.get("/all", fetchAllAwardCategory);
awardCategoryRoute.get('/', authentication, fetchUserAwardCategory);
awardCategoryRoute.put("/:id", authentication, updateAwardCategoryctrl);
awardCategoryRoute.put("/publish/:id", authentication, publishAwardCategoryctrl);
awardCategoryRoute.delete("/:id", authentication, deleteAwardCategoryctrl)

module.exports =awardCategoryRoute;