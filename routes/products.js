const express = require('express')
const router = express.Router()
const Product = require('../models/product')
const Supplier = require('../models/supplier')
const Category = require('../models/category')
const req = require('express/lib/request')
const imageMimeTypes = ['image/jpeg', 'image/png', 'image/gif']


// All products route
router.get('/', async (req, res) => {
    //let query = Product.find().collation({locale: "en" }).sort({'sku': 1})
    let query = Product.find().sort({'sku': 1})
    //let searchOptions = {}
    if (req.query.sku != null && req.query.sku !== '') {
        query = query.find({'sku': req.query.sku})
    }
    if (req.query.product != null && req.query.product !== '') {
        query = query.regex('product', new RegExp(req.query.product, 'i'))
    }
    try {
        //const products = await Product.find(searchOptions).sort({"sku": 1})
        const products = await query.exec()
        res.render('products/index', { products: products,
                                        searchOptions: req.query
         })
    } catch (err) {
        console.error(err)
        res.redirect('/')
    }
})



// New product route (for displaying the form)
router.get('/new', async (req, res) => {
    renderNewPage(res, new Product())
})

// Create (Saving) the new product (post)
router.post('/', async (req, res) => {
    //we go one by one field to make sure we save what we want
    const product = new Product({
        sku: req.body.sku,
        product: req.body.product,
        price: req.body.price,
        supplier: req.body.supplier,
        category: req.body.category,
        comments: req.body.comments
    })
    saveProductImage(product, req.body.productImageFile)

    try {
        const newProduct = await product.save()
        // res.redirect(`categories/${newCategory.id}`)
        res.redirect(`products`)
    } catch (err) {
        console.error(err)
        renderNewPage(res, product, true)
    }    
})

async function renderNewPage(res, product, hasError = false) {
    try {
        const suppliers = await Supplier.find({}).sort({supplier: 1})
        const categories = await Category.find({}).sort({category: 1})
        const params = {
            suppliers: suppliers,
            categories: categories,
            product: product
        }
        if (hasError) params.errorMessage = 'Error saving product'
        res.render('products/new', params)
    } catch (err){
        console.error(err)  // DEBUG LINE
        res.redirect('/products')
    }
}

function saveProductImage(product, imageEncoded) {
    if (imageEncoded == null) return
    const image = JSON.parse(imageEncoded)
    if (image != null && imageMimeTypes.includes(image.type)) {
        product.productImage = new Buffer.from(image.data, 'base64')
        product.productImageType = image.type
    }
}

//-----------------------------final routes for CRUD
// OPEN a Product
router.get('/:id', (req, res) => {
    res.send('Show Product ' + req.params.id)
})

// EDIT a Product
router.get('/:id/edit', async (req, res) => {
    try {
        const suppliers = await Supplier.find({}).sort({supplier: 1})
        const categories = await Category.find({}).sort({category: 1})
        const product = await Product.findById(req.params.id)
        res.render('products/edit', { product: product, suppliers: suppliers, categories: categories })
    } catch (err) {
        console.error(err)
        res.redirect('/products')
    }
})


// browsers only do get  post
// we install a different library to use put and delete requests
//method-override

// UPDATE a product (save changes)
router.put('/:id', (req, res) => {
    res.send('Update Product ' + req.params.id)
})

// DELETE a Product
router.delete('/:id', async (req, res) => {
    let product
    try {
        product = await Product.findById(req.params.id)
        await product.remove()
        res.redirect('/products')
    } catch {
        if (product == null) {
            res.redirect('/')
        } else {
            res.redirect(`/products/${product.id}`)
            }
    }
})


module.exports = router