const express= require('express');
const { contestantProfileUpdateCtrl, contestantProfileCtrl, registerContestant, fetchAllCtrl, deleteContestant}=require('../../controllers/contestants/contestants')


const contestantRoute=express.Router()

contestantRoute.post("/register", registerContestant);
contestantRoute.get("/:id", contestantProfileCtrl);
contestantRoute.get("/", fetchAllCtrl);
contestantRoute.put("/:id", contestantProfileUpdateCtrl);
contestantRoute.delete("/:id", deleteContestant)

module.exports =contestantRoute;