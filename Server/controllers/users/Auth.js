const expressAsyncHandler = require('express-async-handler');
require('dotenv').config()
const generateToken = require('../../middlewear/generateTokens');
const User = require('../../models/users/user');
const nodemailer = require('nodemailer');
const cloudinary = require('../../utils/cloudinary');






// const sendVerificationEmail = expressAsyncHandler(async (user, req, res) => {
//     try {

//         // generate token using mongoose method
//         const token = await user.createAccountVerificationToken();

//         // Save the verification token
//         await token.save();

//         let subject = "Account Verification Token";
//         let email = user?.email;
//         let link = "http://" + req?.headers?.host + "/api/auth/verify/" + token.token;
//         let text = `<p>Hi ${user?.username}<p><br><p>Please click on the following <a href="${link}">link</a> to verify your account.</p> 
//                   <br><p>If you did not request this, please ignore this email.</p>`;

//                   sendEmail( email, subject, text );
// console.log("hi")
//         res.status(200).json({ message: 'A verification email has been sent to ' + user.email + '.' });
//     } catch (error) {
//         res.status(500).json({ message: error?.message })
//     }
// }
// )

// registering a user

const registerUserCtrl = expressAsyncHandler(async (req, res) => {
    const { email } = req?.body
    const filePath=req?.file?.path

    //find if a user exists
    
    const userExists = await User.findOne({ email });
    if (userExists) throw new Error('User already exists')


    try {
                
        // Upload image to cloudinary
        const result = await cloudinary.uploader.upload(filePath)

        // if new, create one
        const user = await User.create({ image: result.secure_url, ...req.body })
       



        // // send verification email
        // generate token using mongoose method
        // const token = await user.createAccountVerificationToken();
        // // res.send("An Email sent to your account please verify");
        // return user
        res.json({ user })


    } catch (error) {
        res.json({ error })
      
    }
});

// ===EMAIL VERIFICATION

// @desc Verify token
// @access Public
const emailVerificationCtrl = expressAsyncHandler(async (req, res) => {


    // If we found a token, find a matching user
    const user = await User.findOne({ accountVerificationToken: req?.params?.token, accountVerificationTokenExpires: { $gt: Date.now() } });
    try {
        // check if user has a valid token that has not expired yet
        if (!user) return res.status(401).json({ message: 'Verification token is invalid or has expired.' });

        if (user?.isVerified) return res.status(400).json({ message: 'This user has already been verified.' });

        // Verify and save the user
        user.isVerified = true;
        user.save(function (err) {
            if (err) return res.status(500).json({ message: err.message });

            res.status(200).send("The account has been verified. Please log in.");
        });

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}
);
// @route POST api/resend
// @desc Resend Verification Token
// @access Public
const resendEmailVerificationCtrl = expressAsyncHandler(async (req, res) => {
    try {
        const { email } = req?.body;

        const user = await User.findOne({ email });
        /// check if user exists

        if (!user) return res.status(401).json({ message: 'The email address ' + req.body.email + ' is not associated with any account. Double-check your email address and try again.' });

        // check if user is already vrified
        if (user?.isVerified) return res.status(400).json({ message: 'This account has already been verified. Please log in.' });


        // send verification email
        // sendVerificationEmail(user, req, res);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}
);

// login user
const loginUserCtrl = expressAsyncHandler(async (req, res) => {
    const { email, password } = req.body;
    //check if user exists
    const userFound = await User.findOne({ email });
    //Check if password is match
    if (userFound && (await userFound?.isPasswordMatch (password))) {
      res.json({
       
        token: generateToken(userFound?._id), userFound
      });
    } else {
      res.status(401);
      throw new Error("Invalid Login Credentials");
    }
  });

module.exports = { registerUserCtrl, loginUserCtrl, emailVerificationCtrl, resendEmailVerificationCtrl }

