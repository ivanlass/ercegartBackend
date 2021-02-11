const router = require('express').Router()
const fs = require('fs')
const multer = require('multer')
const upload = require('../multer')
const cloudinary = require('../cloudinary')


const storage = multer.diskStorage({
    destination: function(req, file, callback) {
      callback(null, '/uploads');
    },
    filename: function (req, file, callback) {
      callback(null, file.fieldname);
    }
  });



router.route('/add', upload.array('image')).post(async(req, res) => {

    console.log(req.files.image[0])



    // const uploader = async(path) => await cloudinary.uploads(path, 'images')
    // const urls =[]
    // const files = req.files.image
    // for(const file of files) {
    //     const {path} = file
    //     const newPath = await uploader(path)
    //     urls.push(newPath)
    //     fs.unlinkSync(path)

    // }

    // setTimeout(() => {
    //     console.log(urls)
    // }, 5000);
    // res.status(200).json({message:"valjaa "})
})











module.exports = router