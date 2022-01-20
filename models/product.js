const mongoose = require('mongoose')

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
    productImage: {
        type: Buffer
    },
    productImageType: {
        type: String
    },
    comments: {
        type: String
    },
})


// virtual property, not actual in MongoDB
// we use normal function to have access to 'this.'
productSchema.virtual('productImageFile').get(function() {
    if (this.productImage != null && this.productImageType != null) {
        return `data:${this.productImageType};charset=utf-8;base64,${this.productImage.toString('base64')}`
    }
})

module.exports = mongoose.model('Product', productSchema)
