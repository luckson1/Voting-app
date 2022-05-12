const express= require('express');
const { contestantProfileUpdateCtrl, contestantProfileCtrl, registerContestant, fetchAllCtrl, deleteContestant}=require('../../controllers/contestants/contestants');
const Multer = require('../../utils/multer');

const upload = Multer.single('image');
const contestantRoute=express.Router()

contestantRoute.post("/register", upload, registerContestant);
contestantRoute.get("/:id", contestantProfileCtrl);
contestantRoute.get("/", fetchAllCtrl);
contestantRoute.put("/:id", contestantProfileUpdateCtrl);
contestantRoute.delete("/:id", deleteContestant)

module.exports =contestantRoute;