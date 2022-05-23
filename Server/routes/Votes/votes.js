const express= require('express');
const {createVotesCtrl}=require('../../controllers/Votes/Votes')


const votesRoute=express.Router()

votesRoute.post("/", createVotesCtrl);

module.exports= votesRoute;
