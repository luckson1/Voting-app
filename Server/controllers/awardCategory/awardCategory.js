const expressAsyncHandler = require('express-async-handler');
const AwardCategory = require('../../models/awardCategory/AwardCategory');
require('dotenv').config() 


//create award

const createAwardCategoryCtrl= expressAsyncHandler(async (req, res) => {
    
    const user= req?.user?._id
    console.log(req)
    try {
        const awardCategory= await AwardCategory.create({...req?.body})
   
        res.json({awardCategory})
    } catch (error) {
        res.json({error}) 
    }
});

// fetch all awardCategory

const fetchAllAwardCategory= expressAsyncHandler(async (req, res) => {
    try {
        const awardCategory=await AwardCategory.find({})
        res.json({awardCategory})
    } catch (error) {
        res.json({error}) 
    }
});



// fetch one awardCategory

const fetchOneAwardCategoryCtrl = expressAsyncHandler(async (req, res) => {
    const {id}=req?.params
    try {
        const awardCategory= await AwardCategory.findById({id})
        res.json({awardCategory})
    } catch (error) {
        res.json({error}) 
    }
});

//updates awardCategory

const updateAwardCategoryctrl = expressAsyncHandler(async (req, res) => {
    const { id } = req.params
        try {
        const awardCategory = await AwardCategory.findByIdAndUpdate(id, ...req?.body, { new: true })
        res.json(awardCategory)
    } catch (error) {

        res.json(error)
    }
});

//delete awardCategory

const deleteAwardCategoryctrl = expressAsyncHandler(async (req, res) => {
    const { id } = req.params
    try {
        const awardCategory = await AwardCategory.findByIdAndDelete (id)
        res.json(awardCategory)
    } catch (error) {

        res.json(error)
    }
})

module.exports ={createAwardCategoryCtrl, fetchOneAwardCategoryCtrl, fetchAllAwardCategory, updateAwardCategoryctrl, deleteAwardCategoryctrl}