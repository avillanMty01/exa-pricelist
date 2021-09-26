const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    res.render('index') //views/layouts/layout.ejs
})

module.exports = router