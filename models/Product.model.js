const mongoose = require('mongoose')

const Schema = mongoose.Schema

const productSchema = new Schema({
    name: { type: Object, required: false },

    materijali: { type: Object, required: true },

    kategorija: { type: String, required: true },

    slike: { type: Array, required: true },

    opis: { type: Object, required: true },


}, {
    timestamps: true
})

const Products = mongoose.model('Products', productSchema)

module.exports = Products 