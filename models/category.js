const mongoose = require('mongoose')

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

module.exports = mongoose.model('Category', categorySchema)