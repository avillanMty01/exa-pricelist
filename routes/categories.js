const express = require('express')
const router = express.Router()
const Category = require('../models/category')

// All categories route
router.get('/', async (req, res) => {
    try {
        const categories = await Category.find({}).sort({"category": 1})
        res.render('categories/index', { categories: categories })
    } catch {
        res.redirect('/')
    }
})

// New category route (for displaying the form)
router.get('/new', (req, res) => {
    res.render('categories/new', { category: new Category() })
})

// Create (Saving) the new category (post)
router.post('/', async (req, res) => {
    //we go one by one field to make sure we save what we want
    const category = new Category({
        category: req.body.category,
        c_ClaveProdServ: req.body.c_ClaveProdServ,
        docType: "category",
        catStatus: "active",
        createdBy: "avillanMty01@gmail.com"
    })
    try {
        const newCategory = await category.save()
        // res.redirect(`categories/${newCategory.id}`)
        res.redirect(`categories`)
    } catch {
        res.render('categories/new', {
            category: category.category,
            c_ClaveProdServ: category.c_ClaveProdServ,
            docType: category.docType,
            catStatus: category.catStatus,
            createdBy: category.createdB,
            errorMessage: 'Error saving category'
        })
    }    
})

module.exports = router