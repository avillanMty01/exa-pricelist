const express = require('express')
const router = express.Router()
const Supplier = require('../models/supplier')

// All suppliers route
router.get('/', async (req, res) => {
    let searchOptions = {}
    if (req.query.supplier != null && req.query.supplier !== '') {
        searchOptions.supplier = new RegExp(req.query.supplier, 'i')
    }
    try {
        const suppliers = await Supplier.find(searchOptions).sort({"supplier": 1})
        res.render('suppliers/index', { suppliers: suppliers,
                                        searchOptions: req.query
        })
    } catch {
        res.redirect('/')
    }
})

// New supplier route (for displaying the form)
router.get('/new', (req, res) => {
    res.render('suppliers/new', { supplier: new Supplier() })
})

// Create (Saving) the new supplier (post)
router.post('/', async (req, res) => {
    //we go one by one field to make sure we save what we want
    const supplier = new Supplier({
        supplier: req.body.supplier,
        docType: "supplier",
        supStatus: "active",
        createdBy: "avillanMty01@gmail.com"
    })
    try {
        const newSupplier = await supplier.save()
        // res.redirect(`suppliers/${newSupplier.id}`)
        res.redirect(`suppliers`)
    } catch {
        res.render('suppliers/new', {
            supplier: supplier.supplier,
            docType: supplier.docType,
            supStatus: supplier.supStatus,
            createdBy: supplier.createdBy,
            errorMessage: 'Error saving supplier'
        })
    }    
})

module.exports = router