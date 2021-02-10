const router = require('express').Router()
const cloudinary = require('cloudinary').v2;
const fs = require('fs')
const multer = require('multer')



const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        console.log(file)
        cb(null, file.originalname)
    }
})

cloudinary.config({
    cloud_name: 'dwejxcshz',
    api_key: '524956264897297',
    api_secret: 'A15W2TnmhGgMnfrqAE-KyW44PSY'
});



router.route('/add').post((req, res) => {
    const imagesNames = []

    for (let index = 0; index < req.files.images.length; index++) {
        imagesNames.push(req.files.images[index].name)
        req.files.images.index.mv('photos/' + req.files.images[index].name, function (error) {
            if (error) {
                console.log("photo cant upload")
            } else { console.log('Success') }
        })
        cloudinary.uploader.upload(req.files.images[index].originalFilename, function (error, result) { console.log(result); console.log(error) });

    }




    // cloudinary.uploader.upload(req.files.images[0].originalFilename, function (error, result) { console.log(result, error) });
})










module.exports = router