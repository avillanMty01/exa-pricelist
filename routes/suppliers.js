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
        res.redirect(`suppliers/${newSupplier.id}`)
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


//-----------------------------final routes for CRUD
// OPEN a supplier
router.get('/:id', async (req, res) => {
    try {
        const supplier = await Supplier.findById(req.params.id)
        res.render('suppliers/show', { supplier: supplier })
    } catch {
        res.redirect('/suppliers')
    }
})

// EDIT a supplier
router.get('/:id/edit', async (req, res) => {
    try {
        const supplier = await Supplier.findById(req.params.id)
        res.render('suppliers/edit', { supplier: supplier })
    } catch {
        res.redirect('/suppliers')
    }
})


// browsers only do get  post
// we install a different library to use put and delete requests
//method-override

// UPDATE a supplier (save changes)
router.put('/:id', async (req, res) => {
    let supplier
    try {
        supplier = await Supplier.findById(req.params.id)
            supplier.supplier = req.body.supplier
            supplier.supStatus = req.body.supStatus
        await supplier.save()
        res.redirect(`/suppliers/${supplier.id}`)
        } catch (err) {
            console.error(err)
            if (supplier == null) {
                res.redirect('/')
            } else {
                res.render('suppliers/edit', {
                    supplier: supplier,
                    errorMessage: 'Error updating Supplier'
                })
            }
        } 
})

// DELETE a supplier
router.delete('/:id', async (req, res) => {
    let supplier
    try {
        supplier = await Supplier.findById(req.params.id)
        await supplier.remove()
        res.redirect('/suppliers')
    } catch {
        if (supplier == null) {
            res.redirect('/')
        } else {
            res.redirect(`/suppliers/${supplier.id}`)
            }
    }
})


module.exports = router