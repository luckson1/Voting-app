//create schema
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const awardCategorySchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId, //this represent the company
      ref: "User",
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },

    
    mainAward: {
      type: Schema.Types.ObjectId,
      ref: "Award",
      required: true,
    },
    contestantsRegistered: [
      { type: Schema.Types.ObjectId, ref: "Contestants" },
    ],

    votingHistory: [
      {
        type: Schema.Types.ObjectId,
        ref: "Contestants",
      },
    ],
    amountEarned: {
      type: Number,
      default: 0,
    },
    totalVotes: {
      type: Number,
      default: 0,
    },

    subAccountCode: {
      type: String,
      default: "",
    },
    subAccountName: {
      type: String,
      default: "",
    },

    optForNotification: {
      type: String,
      required: true,
      enum: ["Text", "Email", "None"],
    },

    showResults: {
      type: Boolean,
      default: false,
    },
    published: {
      type: Boolean,
      default: false,
    },

    isVotingClosed: {
      type: Boolean,
      default: false,
    },
    isApplicationClosed: {
      type: Boolean,
      default: true,
    },
    applicationStatus: {
      type: String,
      enum: ["Closed", "Opened"],
      default: "Closed",
    },
    platFormOwnerName: {
      type: String,
      default: "Luckson",
    },
  },

  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
  }
);

// //check if votingStartDate is before votingEndDate
awardCategorySchema.pre("validate", function (next) {
  if (this.votingStartDate > this.votingEndDate) {
    next(new Error("Voting start date cannot be after voting end date"));
  } else {
    next();
  }
});

//check if applicationStartDate is less than applicationEndDate
awardCategorySchema.pre("validate", function (next) {
  if (this.start_date >= this.end_date) {
    next(new Error("Start date cannot be greater or equal to  end date"));
  } else {
    next();
  }
});

//calculate days left based on start date and end date
awardCategorySchema.virtual("daysLeft").get(function () {
  const today = new Date();
  const startDate = new Date(this.startDate);
  const endDate = new Date(this.endDate);
  const timeDiff = Math.abs(endDate.getTime() - startDate.getTime());
  const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
  const daysLeft =
    diffDays -
    Math.ceil(today.getTime() - startDate.getTime()) / (1000 * 3600 * 24);
  //convirt to nearest integer
  return Math.round(daysLeft);
});


// virtuals 

// awardCategorySchema.virtual("votes", {
//   ref: "Vote",
//   localField: "_id",
//   foreignField: "AwardCategory",
// });

awardCategorySchema.virtual("contestants", {
  ref: "Contestants",
  localField: "_id",
  foreignField: "awardCategory",
});
//check if applicationStartDate is before votingStartDate
awardCategorySchema.pre("validate", function (next) {
  if (this.applicationStartDate > this.votingStartDate) {
    next(new Error("Application start date cannot be after voting start date"));
  } else {
    next();
  }
});

//validate if start date is before end date
awardCategorySchema.pre("validate", function (next) {
  if (this.applicationEndDate < this.applicationStartDate) {
    next(
      new Error("Application end date cannot be before application start date")
    );
  } else {
    next();
  }
});

//check if votingEndDate is after applicationEndDate
awardCategorySchema.pre("validate", function (next) {
  if (this.votingEndDate < this.applicationEndDate) {
    next(new Error("Voting end date cannot be before application end date"));
  } else {
    next();
  }
});

// //add virtuals methods to check if application has ended
awardCategorySchema.virtual("isApplicationEnded").get(function () {
  if (this.applicationEndDate < Date.now()) {
    return true;
  } else {
    return false;
  }
});


// //add virtuals methods to check if voting has ended
awardCategorySchema.virtual("isVotingEnded").get(function () {
  if (this.votingEndDate < Date.now()) {
    return true;
  } else {
    return false;
  }
});

//create model
const AwardCategory = mongoose.model("AwardCategory", awardCategorySchema);

//export model
module.exports = AwardCategory;