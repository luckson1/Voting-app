const expressAsyncHandler = require("express-async-handler");
const MannualVoting = require("../../models/manualVoting/ManualVoting");

const addManualVotesCtrl = expressAsyncHandler(async (req, res) => {
   
    try {
      const manualVotes = await MannualVoting.create({ ...req?.body });
      res.json({manualVotes});
    } catch (error) {
      res.json(error);
    }
  });

  module.exports = {addManualVotesCtrl}