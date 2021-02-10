const express = require('express')
const cors = require('cors')
const formData = require("express-form-data");
const mongoose = require('mongoose')
var bodyParser = require('body-parser');


const app = express()
app.use(express.json())
app.use(cors())
app.use(bodyParser.json());
// in latest body-parser use like below.
app.use(bodyParser.urlencoded({ extended: true }));
app.use(formData.parse());

const port = process.env.PORT || 5000

const uploadProduct = require('./routes/UploadProduct.router')


app.use('/products', uploadProduct)

app.listen(port, () => {
    console.log(`port je ${port}`)
})