const express = require('express')
const router = express.Router()
const multer = require('multer')
const path = require('path')
const Product = require('../models/product')
const Supplier = require('../models/supplier')
const Category = require('../models/category')
const req = require('express/lib/request')
const uploadPath = path.join('public', Product.productImageBasePath)
const imageMimeTypes = ['image/jpeg', 'image/png', 'image/gif']

const upload = multer({
    dest: uploadPath,
    fileFilter: (req, file, callback) => {
        callback(null, imageMimeTypes.includes(file.mimetype))
    }
})


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
router.get('/new', async (req, res) => {
    renderNewPage(res, new Product())
})

// Create (Saving) the new product (post)
router.post('/', upload.single('productImageFile'), async (req, res) => {
    //we go one by one field to make sure we save what we want
    const fileName = req.file != null ? req.file.filename : null
    const product = new Product({
        product: req.body.product,
        price: req.body.price,
        supplier: req.body.supplier,
        category: req.body.category,
        productImageFile: fileName,
        comments: req.body.comments
    })
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


module.exports = router