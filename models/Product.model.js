const mongoose = require('mongoose')

const Schema = mongoose.Schema

const productSchema = new Schema({
    name: { type: String, required: false },

    materijali: { type: String, required: true },

    kategorija: { type: String, required: true },

    slike: { type: Array, required: true },

    opis: { type: String, required: true },


}, {
    timestamps: true
})

const Products = mongoose.model('Products', productSchema)

module.exports = Products 