require("dotenv").config();
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
  cloud_name: process.env.CLOUDINARY_NAME,
  secure: true,
});

module.exports = cloudinary;
