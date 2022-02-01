const express = require('express')
const router = express.Router()
const Product = require('../models/product')

// All products route
router.get('/', async (req, res) => {
    let query = Product.find()
    //let searchOptions = {}
    if (req.query.sku != null && req.query.sku !== '') {
        query = query.find({'sku': req.query.sku})
    }
    try {
        //const products = await Product.find(searchOptions).sort({"sku": 1})
        const products = await query.limit(10).sort({'sku': -1})
            .populate('category')
            .populate('supplier')
            .exec()
        res.render('index', { products: products,
                                        searchOptions: req.query
         })
    } catch (err) {
        console.error(err)
        res.redirect('/')
    }
})

module.exports = router