const mongoose = require('mongoose')
const Product = require('./product')

//create a schema
const supplierSchema = new mongoose.Schema({
    supplier: {
        type: String, required: true
    },
    docType: {
        type: String, required: true
    },
    supStatus: {
        type: String, required: true
    },
    createdBy: {
        type: String, required: false
    }
})

// PREVENT deletion of supplier if has 'products' with this 
supplierSchema.pre('remove', function(next) {
    Product.find({ supplier: this.id }, (err, products) => {
        if (err) {
            next(err)
        } else if (products.length > 0) {
            next(new Error('This supplier has products still.'))
        } else {
            next()
        }
    })
})

module.exports = mongoose.model('Supplier', supplierSchema)