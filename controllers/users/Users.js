const expressAsyncHandler = require('express-async-handler');
const generateToken = require('../../middlewear/generateTokens');
const User = require('../../models/users/user')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)
const sgMail = require('@sendgrid/mail');
const { uploader } = require('../../utils/Uploader');


const sendVerificationEmail = expressAsyncHandler(async (user, req, res) => {
    try {

        // generate token using mongoose method
        const token = user.createAccountVerificationToken();

        // Save the verification token
        await token.save();

        let subject = "Account Verification Token";
        let to = user?.email;
        let from = process.env.FROM_EMAIL;
        let link = "http://" + req?.headers?.host + "/api/auth/verify/" + token.token;
        let html = `<p>Hi ${user?.username}<p><br><p>Please click on the following <a href="${link}">link</a> to verify your account.</p> 
                  <br><p>If you did not request this, please ignore this email.</p>`;

        await sendEmail({ to, from, subject, html });

        res.status(200).json({ message: 'A verification email has been sent to ' + user.email + '.' });
    } catch (error) {
        res.status(500).json({ message: error?.message })
    }
}
)

// registering/creating a user

const registerUserCtrl = expressAsyncHandler(async (req, res) => {
    //find if a user exists
    const { email, firstname, lastname, password, image, phonenumber, companyUrlSlug, companyTitle } = req?.body
    const userExists = await User.findOne({ email });
    if (userExists) throw new Error('User already exists')

    // if new, create one


    try {
        const user = await User.create({ email, firstname, lastname, image, phonenumber, companyUrlSlug, companyTitle })
        
        // save user
        user.save()

        // send verification email
        sendVerificationEmail(user, req, res);
        res.json({ user })
    } catch (error) {
        res.json({ error })
    }
});

// ===EMAIL VERIFICATION

// @desc Verify token
// @access Public
emailverificationCtrl = expressAsyncHandler(async (req, res) => {


    // If we found a token, find a matching user
    const user = await User.findOne({ accountVerificationToken: req?.params?.token, accountVerificationTokenExpires: { $gt: Date.now() } });
    try {
        // check if user has a valid token that has not expired yet
        if (!user) return res.status(401).json({ message: 'Verification token is invalid or has expired.' });

        if (user?.isVerified) return res.status(400).json({ message: 'This user has already been verified.' });

        // Verify and save the user
        user?.isVerified = true;
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
resendEmailVerificationCtrl = expressAsyncHandler(async (req, res) => {
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

    // check if user exists

    const userFound = await User.findOne({ email })
try {
    // check if password match
    if (userFound && (await userFound?.isPasswordMatch(password))) {
        // check if user is verified
        
        if (!userFound.isVerified) return res.status(401).json({ type: 'not-verified', message: 'Your account has not been verified.' });
        
        res.json({
            _id: userFound?._id,
            firstName: userFound?.firstName,
            lastName: userFound?.lastName,
            email: userFound?.email,
            image: userFound?.image,
            companyTitle: userFound?.companyTitle,
            companyUrlSlug: userFound?.companyUrlSlug,
            phoneNumber: userFound?.phoneNumber,
            isAdmin: userFound?.isAdmin,
            isAccountVerified: userFound?.isAccountVerified,
            token: generateToken(userFound?._id),
        });
    } 

} catch (error) {
    res.status(500).json({message: error.message});
}
    


});

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
    const id = req?.params
    try {
        const profile = await User.findById(req?.user?._id)

        res.json(profile);
    } catch (error) {
        res.json({ error });
    }
});


// recover password
// user enters email to receive a link for password reset

const recoverPasswordCtrl = expressAsyncHandler(async (req, res) => {

    // define variables 
    const user = await User.findOne({ email: req?.body?.email });
    let link = "http://" + req.headers.host + "/api/auth/reset/" + user?.isAccountVerified?.resetPasswordToken;
    const mailOptions = {
        to: user?.email,
        from: process.env.FROM_EMAIL,
        subject: "Password change request",
        text: `Hi ${user.username} \n 
    Please click on the following link ${link} to reset your password. \n\n 
    If you did not request this, please ignore this email and your password will remain unchanged.\n`,
    };
    try {

        // check if user exists
        if (!user) return res.status(401).json({ message: 'The email address ' + req.body.email + ' is not associated with any account. Double-check your email address and try again.' });

        //Generate and set password reset token, then save new user object
        user.createPasswordResetToken();
        user.save();

        // send email
        sgMail.send(mailOptions);


    } catch (error) {
        res.status(500).json({ message: err.message })
    }
});

// Reset Password - Generates token and Sends password reset email

const resetPasswordCtrl = expressAsyncHandler(async (req, res) => {
    const mailOptions = {
        to: user.email,
        from: process.env.FROM_EMAIL,
        subject: "Your password has been changed",
        text: `Hi ${user.username} \n 
        This is a confirmation that the password for your account ${user.email} has just been changed.\n`
    };
    const user = await User.findOne({ resetPasswordToken: req?.params?.token, resetPasswordExpires: { $gt: Date.now() } });

    // check if user has a valid token that has not expired yet
    if (!user) return res.status(401).json({ message: 'The email address ' + req.body.email + ' is not associated with any account. Double-check your email address and try again.' });


    //Set the new password
    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    user?.isVerified = true;

    // Save the updated user object
    await user.save();

    //send email confirmation form
    await sgMail.send(mailOptions)

});


// create a new account by admin
createUserctrl = expressAsyncHandler(async (req, res) => {
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
    const id = req.params.id;
    try {

        const user = await User.findById(id);
        // check if user exist

        if (!user) return res.status(401).json({ message: 'User does not exist' });

        res.status(200).json({ user });
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
});

// update user details

updateUserctrl = expressAsyncHandler(async (req, res) => {
    const update = req?.body;
    const id = req?.params.id;
    const _Id = req?.user?._id;
    try {
        //Make sure the passed id is that of the logged in user
        if (_Id.toString() !== id.toString()) return res.status(401).json({ message: "Sorry, you don't have the permission to upd this data." });

        const user = await User.findByIdAndUpdate(id, { $set: update }, { new: true });

        //if there is no image, return success message
        if (!req.file) return res.status(200).json({ user, message: 'User has been updated' });

        //Attempt to upload to cloudinary
        const result = await uploader(req);
        const user_ = await User.findByIdAndUpdate(id, { $set: update }, { $set: { profileImage: result.url } }, { new: true });

        if (!req.file) return res.status(200).json({ user: user_, message: 'User has been updated' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})






