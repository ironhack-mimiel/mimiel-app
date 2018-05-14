require("dotenv").config();

const cloudinary = require('cloudinary');
const cloudinaryStorage = require('multer-storage-cloudinary');
const multer = require('multer');
const bcrypt = require("bcryptjs");
const saltRounds = 10;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET
});

var storage = cloudinaryStorage({
  cloudinary: cloudinary,
  folder: 'mimiel',
  allowedFormats: ['jpg', 'png'],
  filename: function (req, file, cb) {
    console.log("AQUI")
    cb(null, Date.now());
  }
});

const uploadCloud = multer({ storage: storage });
module.exports = uploadCloud;