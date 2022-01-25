const mongoose = require('mongoose')
const Product = require('./product')

//create a schema
const categorySchema = new mongoose.Schema({
    category: {
        type: String, required: true
    },
    c_ClaveProdServ: {
        type: Number, required: true
    },
    docType: {
        type: String, required: true
    },
    catStatus: {
        type: String, required: true
    },
    createdBy: {
        type: String, required: false
    }
})

// PREVENT deletion of category if has 'products' with this 
categorySchema.pre('remove', function(next) {
    Product.find({ category: this.id }, (err, products) => {
        if (err) {
            next(err)
        } else if (products.length > 0) {
            next(new Error('This category has products still.'))
        } else {
            next()
        }
    })
})

module.exports = mongoose.model('Category', categorySchema)