const mongoose = require('mongoose')

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
    }
})

module.exports = mongoose.model('Product', productSchema)