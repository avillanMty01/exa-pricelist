const mongoose = require('mongoose')

//create a schema
const productSchema = new mongoose.Schema({
    product: {
        type: String, required: true
    },
    price: {
        type: Number, required: false
    }
})

module.exports = mongoose.model('Product', productSchema)