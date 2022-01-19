const mongoose = require('mongoose')
const path = require('path')
const productImageBasePath = 'uploads/productImages'

//create a schema
const productSchema = new mongoose.Schema({
    sku: {
        type: Number, required: true, unique: true
    },
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

productSchema.virtual('productImagePath').get(function() {
    if (this.productImageFile != null) {
        return path.join('/', productImageBasePath, this.productImageFile)
    }
})

module.exports = mongoose.model('Product', productSchema)
module.exports.productImageBasePath = productImageBasePath