//user schema with email, password, and name
const mongoose = require("mongoose");

const votesSchema = new mongoose.Schema(
  {
   
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
    email: {
      type: String,
      
      required: true,
    },
   
   
  },
  {
    timestamps: true,
  }
);

//create the model for users and expose it to our app
const Votes = mongoose.model("Vote", votesSchema);
module.exports = Votes;