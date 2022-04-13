const expressAsyncHandler = require('express-async-handler');
const User = require('../../models/users/user');
const { sendEmail } = require('../../utils/sendEmail');



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
       await  sendEmail(mailOptions);


    } catch (error) {
        res.status(500).json({ message: err.message })
    }
});

// // @desc Reset Password - Validate password reset token and shows the password reset view

const resetCtrl= expressAsyncHandler(async (req, res) => {
    const user = await User.findOne({ resetPasswordToken: req?.params?.token, resetPasswordExpires: { $gt: Date.now() } });
    try {
        // check if user has a valid token that has not expired yet
    if (!user) return res.status(401).json({ message: 'The email address ' + req.body.email + ' is not associated with any account. Double-check your email address and try again.' });
   

    //Redirect user to password reset page
    res.render('reset', {user});
    } catch (error) {
        res.status(500).json({message: error.message})
    }
    
    
})


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

    try {
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
    await sendEmail(mailOptions)
    } catch (error) {
      res.json({error})  
    }

});


modules.exports= {recoverPasswordCtrl, resetCtrl, resetPasswordCtrl}