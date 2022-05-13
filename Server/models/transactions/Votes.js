//user schema with email, password, and name
const mongoose = require("mongoose");

const votesSchema = new mongoose.Schema(
  {
   
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    awardCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "AwardCategory",
      required: true,
    },
    
    contestantVotingFor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Contestants",
      required: true,
    },
   
   
  },
  {
    timestamps: true,
  }
);

//create the model for users and expose it to our app
const Vote = mongoose.model("Vote", votesSchema);
module.exports = Vote;