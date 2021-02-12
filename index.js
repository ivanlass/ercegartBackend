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
app.use(express.static(__dirname + '/uploads'));



const port = process.env.PORT || 5000


const uri = "mongodb+srv://ercegart:ercegart@ercegartdb.d6hl4.mongodb.net/<dbname>?retryWrites=true&w=majority"
mongoose.connect(uri, { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true })
const connection = mongoose.connection
connection.once('open', () => {
    console.log('mongo konekcija ok')
})





const uploadProduct = require('./routes/UploadProduct.router')


app.use('/products', uploadProduct)

app.listen(port, () => {
    console.log(`port je ${port}`)
})