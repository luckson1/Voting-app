const expressAsyncHandler = require('express-async-handler');
require('dotenv').config() 
const generateToken = require('../../middlewear/generateTokens');
const User = require('../../models/users/user');
const { sendEmail } = require('../../utils/sendEmail');




const sendVerificationEmail = expressAsyncHandler(async (user, req, res) => {
    try {

        // generate token using mongoose method
        const token = user.createAccountVerificationToken();

        // Save the verification token
        // await token.save();

        let subject = "Account Verification Token";
        let to = user?.email;
        let from = process.env.FROM_EMAIL;
        let link = "http://" + req?.headers?.host + "/api/auth/verify/" + token.token;
        let html = `<p>Hi ${user?.username}<p><br><p>Please click on the following <a href="${link}">link</a> to verify your account.</p> 
                  <br><p>If you did not request this, please ignore this email.</p>`;

        sendEmail({ to, from, subject, html });

        res.status(200).json({ message: 'A verification email has been sent to ' + user.email + '.' });
    } catch (error) {
        res.status(500).json({ message: error?.message })
    }
}
)

// registering a user

const registerUserCtrl = expressAsyncHandler(async (req, res) => {
const {email}= req?.body

    try {
        //find if a user exists

        const userExists = await User.findOne({ email });
        if (userExists) throw new Error('User already exists')

        // if new, create one
        const user = await User.create({ ...req.body,  })

        // save user
        user.save()

        // // send verification email
        sendVerificationEmail(user, req, res);
        
        
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
        sendVerificationEmail(user, req, res);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}
);

// login user
const loginUserCtrl = expressAsyncHandler(async (req, res) => {
    const { email, password } = req?.body
try {
    // check if user exists

    const user = await User.findOne({ email });

        if (!user) return res.status(401).json({msg: 'The email address ' + email + ' is not associated with any account. Double-check your email address and try again.'});

        //validate password
        if (!user.isPasswordMatched(password)) return res.status(401).json({message: 'Invalid email or password'});

        // Make sure the user has been verified
        if (!user.isVerified) return res.status(401).json({ type: 'not-verified', message: 'Your account has not been verified.' });

        // Login successful, write token, and send back user
            res.status(200).json({
                token: generateToken(user),user:user
            });
        } catch (error) {
        res.status(500).json({ message: error.message });
    }



});

module.exports = { registerUserCtrl, loginUserCtrl, emailVerificationCtrl, resendEmailVerificationCtrl }

