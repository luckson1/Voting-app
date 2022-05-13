const express= require('express');
const { contestantProfileRejectCtrl, contestantProfileUpdateCtrl, contestantProfileCtrl, registerContestant, fetchAllCtrl, deleteContestant}=require('../../controllers/contestants/contestants');
const Multer = require('../../utils/multer');

const upload = Multer.single('image');
const contestantRoute=express.Router()

contestantRoute.post("/register", upload, registerContestant);
contestantRoute.get("/:id", contestantProfileCtrl);
contestantRoute.get("/", fetchAllCtrl);
contestantRoute.put("/approve/:id", contestantProfileUpdateCtrl);
contestantRoute.put("/reject/:id", contestantProfileRejectCtrl);
contestantRoute.delete("/:id", deleteContestant)

module.exports =contestantRoute;