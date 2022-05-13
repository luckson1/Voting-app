const expressAsyncHandler=require('express-async-handler');
const Contestants = require('../../models/contestants/Contenstants');
const cloudinary = require('../../utils/cloudinary');


//contestant apply 
const registerContestant = expressAsyncHandler(async (req, res) => {
   console.log(req?.file)
   const filePath=req?.file?.path
  
  try {
    // Upload image to cloudinary
    const result = await cloudinary.uploader.upload(filePath)

    const contestant = await Contestants.create({  image: result.secure_url,...req?.body });
    res.json({contestant});
  } catch (error) {
    res.json(error);
  }
});



//fetch all contestants

const fetchAllCtrl= expressAsyncHandler( async (req, res)=> {
    try { const contestants= await Contestants.find({});
        res.json({contestants})
        
    } catch (error) {
        res.json({error})
        
    }
});


// profile of contestant/fetch one

const contestantProfileCtrl = expressAsyncHandler(async (req, res) => {
  const {id}=req?.params
  try {
    const profile = await Contestants.findById(req?.contestant?._id).populate("comments");

    res.json(profile);
  } catch (error) {
    res.json(error);
  }
});


// approve contestants

const contestantProfileUpdateCtrl = expressAsyncHandler(async (req, res) => {
    const {id}=req?.params
    
      try {
    const profile = await Contestants.findByIdAndUpdate(id, {status: "Approved"}, { new: true });
    
        res.json(profile);
      } catch (error) {
        res.json(error);
      }
    });

    // reject contestants

const contestantProfileRejectCtrl = expressAsyncHandler(async (req, res) => {
  const {id}=req?.params
  
    try {
  const profile = await Contestants.findByIdAndUpdate(id, {status: "Rejected"}, { new: true });
  
      res.json(profile);
    } catch (error) {
      res.json(error);
    }
  });



    // delete contestant
    const deleteContestant = expressAsyncHandler(async (req, res) => {
      const { id } = req.params
      try {
          const contestant = await Contestants.findByIdAndDelete (id)
          res.json(contestant)
      } catch (error) {
  
          res.json(error)
      }
  })

    module.exports= {contestantProfileRejectCtrl, contestantProfileUpdateCtrl, contestantProfileCtrl, registerContestant, fetchAllCtrl, deleteContestant}