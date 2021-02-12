const router = require('express').Router()
const fs = require('fs')
const multer = require('multer')
const upload = multer({ dest: './uploads/' })
const cloudinary = require('../cloudinary')
const Products = require('../models/Product.model')


router.route('/add', upload.array('image')).post(async(req, res) => {
  const imgs = req.files.image
  const {name, materijali, opis, kategorija} = req.body

  console.log(kategorija)
  const urls =[]
  const uploader = async(path) => await cloudinary.uploads(path, 'images')


   for(const img of imgs) {
    fs.readFile(img.path, function (err, data) {
          fs.writeFile(img.originalFilename, data, async function (err) {
            const newPath = await uploader(img.path)
                urls.push(newPath.secure_url)
                
              });
            });
          }
          

setTimeout(() => {
  console.log(urls)
  const newProduct = new Products({ name, materijali, kategorija, slike:urls, opis })
    newProduct.save()
        .then(() => {
            Products.find()
                .then(products => {
                    res.json(products)
                })
        })
        .catch(err => res.status(400).json('Error' + err))
}, 5000);


})











module.exports = router