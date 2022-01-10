const express = require('express')
const router = express.Router()
const Product = require('../models/product')

// All products route
router.get('/', async (req, res) => {
    let searchOptions = {}
    if (req.query.product != null && req.query.product !== '') {
        searchOptions.product = new RegExp(req.query.product, 'i')
    }
    try {
        const products = await Product.find(searchOptions).sort({"product": 1})
        res.render('products/index', { products: products,
                                        searchOptions: req.query
         })
    } catch {
        res.redirect('/')
    }
})



// New product route (for displaying the form)
router.get('/new', (req, res) => {
    res.render('products/new', { product: new Product() })
})

// Create (Saving) the new product (post)
router.post('/', async (req, res) => {
    //we go one by one field to make sure we save what we want
    const product = new Product({
        product: req.body.product,
        price: req.body.price
    })
    try {
        const newProduct = await product.save()
        // res.redirect(`categories/${newCategory.id}`)
        res.redirect(`products`)
    } catch {
        res.render('products/new', {
            product: product.product,
            price: product.price,
            errorMessage: 'Error saving product'
        })
    }    
})

module.exports = router