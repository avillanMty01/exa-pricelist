const express = require('express')
const router = express.Router()

// All categories route
router.get('/', (req, res) => {
    res.render('categories/index')
})

// New category route (for displaying the form)
router.get('/new', (req, res) => {
    res.render('categories/new')
})

// Create (Saving) the new category (post)
router.post('/', (req, res) => {
    res.send('Create save category')
})

module.exports = router