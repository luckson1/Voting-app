
const nodemailer = require('nodemailer');
require('dotenv').config()



// const sendEmail = async (email, subject, text) => {
//     try {
        // initialize nodemailer
        const transporter = nodemailer.createTransport({

            // host: process.env.HOST,
            service: 'gmail',           
            // port: 465,
            // secure: true,
            auth: {
                user: 'developerbatian@gmail.com',
                pass: 'developerbatian@22'
            },
        });

//         transporter.sendMail(
//         //     {
//         //     // from: process.env.USER,
//         //     // to: email,
//         //     // subject: subject,
//         //     // text: text,
//         // }
//         );
//         console.log("email sent sucessfully");
//     } catch (error) {
//         console.log("email not sent");
//         console.log(error);
//     }
// };

module.exports = transporter;

