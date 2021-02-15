const router = require('express').Router()
const fs = require('fs')
const multer = require('multer')
const upload = multer({ dest: './uploads/' })
const cloudinary = require('../cloudinary')
const Products = require('../models/Product.model')
const cloudinar = require('cloudinary')




router.route('/').post((req, res) => {
  Products.find( { "kategorija": req.body.query })
      .then(product => {
        console.log(product)
        res.json(product)
      })
      .catch(err => res.status(400).json('Error:' + err))
})



router.route('/findone').post((req, res) => {
  Products.findById(req.body.query)
      .then(product => {
        console.log(product)
        res.json(product)
      })
      .catch(err => res.status(400).json('Error:' + err))
})










router.route('/delete').post((req, res) => {
  Products.findById(req.body.query)
  .then(product => {
    product.slike.map(prod => {
      try{
        cloudinar.v2.uploader.destroy(prod.id, async(err, res) => {
          console.log('asdasd')
          console.log(res)
        });
      }catch(err){
        console.log(err)
      }

      })
      Products.findByIdAndDelete(req.body.query)
      .then(product => {
        Products.find()
          .then(product => {
            console.log(product)
            res.json(product)
      })
      .catch(err => res.status(400).json('Error:' + err))
      })
      .catch(err => res.status(400).json('Error:' + err))
    })
    .catch(err => res.status(400).json('Error:' + err))
})





// router.route('/delete').post((req, res) => {
//   Products.findByIdAndDelete(req.body.query)
//       .then(product => {
//         Products.find()
//           .then(product => {
//             console.log(product)
//             res.json(product)
//       })
//       .catch(err => res.status(400).json('Error:' + err))
//       })
//       .catch(err => res.status(400).json('Error:' + err))
// })









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
                urls.push({path:newPath.secure_url, id:newPath.public_id})
                
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