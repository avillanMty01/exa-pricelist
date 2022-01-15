const mongoose = require('mongoose')
const productImageBasePath = 'uploads/productImages'

//create a schema
const productSchema = new mongoose.Schema({
    product: {
        type: String, required: true
    },
    price: {
        type: Number, required: false
    },
    supplier: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Supplier'
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Category'
    },
    productImageFile: {
        type: String
    },
    comments: {
        type: String
    },
})

module.exports = mongoose.model('Product', productSchema)
module.exports.productImageBasePath = productImageBasePath