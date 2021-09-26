const mongoose = require('mongoose')

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

module.exports = mongoose.model('Supplier', supplierSchema)