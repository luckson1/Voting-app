const expressAsyncHandler = require('express-async-handler');
const User = require('../../models/users/user');
const { sendEmail } = require('../../utils/sendEmail');
const cloudinary = require('../../utils/cloudinary');




// fetch all Users
const fetchAllUsersCtrl = expressAsyncHandler(async (req, res) => {
    try {
        const users = User.find({})
        res.json({ users })
    } catch (error) {
        res.json({ error })
    }
});


// fetch user profile

const userProfileCtrl = expressAsyncHandler(async (req, res) => {
    const id=req?.user?._Id
   
    try {
        
        const profile = await User.findById(id).populate(['awards'])

        res.json(profile);
    } catch (error) {
        res.json({ error });
    }
});




// create a new account by admin
const createUserctrl = expressAsyncHandler(async (req, res) => {
    try {
        const { email } = req.body;

        // Make sure this account doesn't already exist
        const user = await User.findOne({ email });

        if (user) return res.status(401).json({ message: 'The email address you have entered is already associated with another account. You can change this users role instead.' });

        // generate a randomised passoword for the user
        const password = '_' + Math.random().toString(36).substr(2, 9); //generate a random password
        
        //create and save user
        const newUser = new User({ ...req?.body, password });
        const user_ = await newUser.save();

        //Generate and set password reset token
        user_.generatePasswordReset();

        // Save the updated user object
        await user_.save();

        //Get mail options
        let domain = "http://" + req.headers.host;
        let subject = "New Account Created";
        let to = user?.email;
        let from = process.env.FROM_EMAIL;
        let link = "http://" + req.headers.host + "/api/auth/reset/" + user.resetPasswordToken;
        let html = `<p>Hi ${user.username}<p><br><p>A new account has been created for you on ${domain}. Please click on the following <a href="${link}">link</a> to set your password and login.</p> 
                  <br><p>If you did not request this, please ignore this email.</p>`

        await sendEmail({ to, from, subject, html });

        res.status(200).json({ message: 'An email has been sent to ' + user.email + '.' });

    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
});


// fetch a single user
const fetchOneUserCtrl = expressAsyncHandler(async (req, res) => {
    const id=req?.user?._id

  try {
    const profile = await User.findById(req?.user?._id)

    res.json({profile});
  } catch (error) {
    res.json(error);
  }
});

// update user details

const updateUserctrl = expressAsyncHandler(async (req, res) => {
    const  id=req?.user?._id
    
    try {
       
        const profile= await User.findByIdAndUpdate(id, 
            {firstname: req?.body?.firstname,
                lastname: req?.body?.lastname,
                companyTitle: req?.body?.companyTitle}, {new:true,
            runValidators: true})
            
          res.json ({profile})
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

module.exports = { fetchOneUserCtrl, fetchAllUsersCtrl, userProfileCtrl, createUserctrl, updateUserctrl,  }



