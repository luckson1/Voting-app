const express= require('express')
const { addManualVotesCtrl } = require('../../controllers/ManualVoting/ManualVoting')


const manualVotesRoute=express.Router()

manualVotesRoute.post('/', addManualVotesCtrl)

module.exports = manualVotesRoute;
