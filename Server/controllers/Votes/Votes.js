const expressAsyncHandler = require('express-async-handler')
const Votes=require('../../models/Votes/Votes')

const createVotesCtrl=expressAsyncHandler(async (req, res) => {

    //check if voter exists a
    const {email}=req?.body
    const vote = await Votes.findOne({ email });

    if (vote) throw new Error({ message: 'The email address you have entered is already associated with another voter.' });

    try {
        const vote= await Votes.create( {...req?.body})
    res.json({vote})
    } catch (error) {
        res.json({err})
    }
})


module.exports= {createVotesCtrl}
