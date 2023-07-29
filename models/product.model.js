const { Schema } = require('mongoose')
const mongoose = require('mongoose')

const productSchema = new Schema({
    "id": Number,
    "image": String,
    "name": String,
    "description": String,
    "price": Number,
    "color": String
})

const productModel = mongoose.model('Product', productSchema)

module.exports = productModel

