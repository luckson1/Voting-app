// const Datauri = require('datauri');
const cloudinary = require('cloudinary').v2;
require('dotenv').config()
// const path=require('path')
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
});
//  const uploader = (req) => {
//     return new Promise((resolve, reject) => {
//         // const dUri = ew Datauri();
//         // let image = dUri.format(path.extname(req.file.originalname).toString(), req.file.buffer);

//         cloudinary.uploader.upload(req?.file?.path, (err, url) => {
//             if (err) return reject(err);
//             return resolve(url);
//         })
//     });
// }

module.exports = cloudinary;