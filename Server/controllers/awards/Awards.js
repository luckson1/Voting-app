const Award = require("../../models/awards/awards");
const expressAsyncHandler = require('express-async-handler');
const cloudinary = require("../../utils/cloudinary");
require('dotenv').config()


//create award

const createAwardCtrl = expressAsyncHandler(async (req, res) => {

    const filePath = req?.file?.path
    const user = req?.user?._id

    try {
        // Upload image to cloudinary

        const result = await cloudinary.uploader.upload(filePath)
        const award = await Award.create({
            image: result?.secure_url,
            user: user,
            title: req?.body?.title,
            description: req?.body?.description

        });

        res.json({ award });


    } catch (error) {
        res.json({ error });
    }
});

// fetch all awardS

const fetchAllAwardsCtrl = expressAsyncHandler(async (req, res) => {
    try {
        const awards = await Award.find({}).populate(["categories", 'contestants'])
        res.json({ awards })
    } catch (error) {
        res.json({ error })
    }
});


//fetch all user Awards

const fetchUserAwardsCtrl = expressAsyncHandler(async (req, res) => {
    const id= req?.user?.id
console.log(id)
    try {
        const awards = await Award.find({ user: id }).populate(["categories", 'contestants'])
        res.json({ awards })
    } catch (error) {
        res.json({ error })
    }
});



// fetch one award

const fetchOneAWardCtrl = expressAsyncHandler(async (req, res) => {
    const { id } = req?.params
    try {
        const award = await Award.findById({ id }).populate("categories")
        res.json({ award })
    } catch (error) {
        res.json({ error })
    }
});

// filter  awardsby dates

const filterAwardCtrl = expressAsyncHandler(async (req, res) => {
    const { start_date, end_date, id } = req.body

    try {
        const award = await Award.find(
            { categories: { $elemMatch: { end_date: { $gte: start_date }, end_date: { $lte: end_date } }, } }).populate("categories")
        res.json({ award })
    } catch (error) {
        res.json({ error })
    }
})
//updates award

const updateAwardctrl = expressAsyncHandler(async (req, res) => {
    const { id } = req.params
    const { title, description } = req?.body
    try {
        const award = await Award.findByIdAndUpdate(id, { title, description }, { new: true })
        res.json(award)
    } catch (error) {

        res.json(error)
    }
});

// publish award 
const publishAwardctrl = expressAsyncHandler(async (req, res) => {
    const { id } = req?.params

    try {
        const award = await Award.findByIdAndUpdate(id, { published: true }, { new: true })

        res.json(award)
    } catch (error) {

        res.json(error)
    }
});
// close award 
const closeAwardctrl = expressAsyncHandler(async (req, res) => {
    const { id } = req?.params

    try {
        const award = await Award.findByIdAndUpdate(id, { hasExpired: true }, { new: true })

        res.json(award)
    } catch (error) {

        res.json(error)
    }
});

//delete award

const deleteAwardctrl = expressAsyncHandler(async (req, res) => {
    const { id } = req.params

    try {
        const award = await Award.findByIdAndDelete(id)
        res.json(award)
    } catch (error) {

        res.json(error)
    }
});

module.exports = { fetchUserAwardsCtrl, publishAwardctrl, closeAwardctrl, createAwardCtrl, fetchOneAWardCtrl, fetchAllAwardsCtrl, updateAwardctrl, deleteAwardctrl, filterAwardCtrl }
