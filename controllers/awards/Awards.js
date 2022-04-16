const Award = require("../../models/awards/awards");
const expressAsyncHandler = require('express-async-handler');
require('dotenv').config() 


//create award

const createAwardCtrl= expressAsyncHandler(async (req, res) => {
    
    const user= req?.user?._id
    try {
        const award= await Award.create({...req?.body, user})
        res.json({award})
    } catch (error) {
        res.json({error}) 
    }
});

// fetch all awardS

const fetchAllAwardsCtrl= expressAsyncHandler(async (req, res) => {
    try {
        const awards=await Award.find({})
        res.json({awards})
    } catch (error) {
        res.json({error}) 
    }
});



// fetch one award

const fetchOneAWardCtrl = expressAsyncHandler(async (req, res) => {
    const {id}=req?.params
    try {
        const award= await Award.findById({id}).populate("categories")
        res.json({award})
    } catch (error) {
        res.json({error}) 
    }
});

// filter  awardsby dates

const filterAwardCtrl= expressAsyncHandler(async (req, res) => {
    const {start_date, end_date, id}=req.params

    try {
        const award=await Award.find( 
            { categories: { $elemMatch: { end_date: {$gte: start_date}, end_date: {$lte: end_date} },  } }).populate("categories")
        res.json({award})
    } catch (error) {
        res.json({error}) 
    }
})
//updates award

const updateAwardctrl = expressAsyncHandler(async (req, res) => {
    const { id } = req.params
        try {
        const award = await Award.findByIdAndUpdate(id, ...req?.body, { new: true })
        res.json(award)
    } catch (error) {

        res.json(error)
    }
});

//delete award

const deleteAwardctrl = expressAsyncHandler(async (req, res) => {
    const { id } = req.params
    try {
        const award = await Award.findByIdAndDelete (id)
        res.json(award)
    } catch (error) {

        res.json(error)
    }
});

module.exports ={createAwardCtrl, fetchOneAWardCtrl, fetchAllAwardsCtrl, updateAwardctrl, deleteAwardctrl, filterAwardCtrl}
