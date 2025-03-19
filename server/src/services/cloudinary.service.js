const { v2: cloudinary } = require('cloudinary');
const config = require('../config/config')

// ✅ Configure Cloudinary
const connectCloudinary = async () =>{
    cloudinary.config({
        cloud_name: config.CLOUDINARY_NAME,
        api_key: config.CLOUDINARY_API_KEY,
        api_secret: config.CLOUDINARY_SECRET_KEY
    });
}

module.exports = connectCloudinary;
