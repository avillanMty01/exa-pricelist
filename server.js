if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config({path:'.env'});
}
// node knows the process environment, so if we're not in
// production we can safely use out secret key.


const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')

app.use(express.json())   // replaces bodyParser which was deprecated express 4.16+
app.use(express.urlencoded({ extended: false, limit: '10Mb' }))  // also bodyParser
            // place this lines before the routes

const indexRouter = require('./routes/index')
const categoriesRouter = require('./routes/categories')
const suppliersRouter = require('./routes/suppliers')
const productsRouter = require('./routes/products')

app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')
app.use(expressLayouts)
app.use(express.static('public'))

const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_URL, { 
    useNewUrlParser: true,
    autoIndex: true //get error if using UNIQUE in schemas, if not, it will duplicate entries
 })
const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', () => console.log('alf: Connected to mongodb'))


app.use('/', indexRouter)
app.use('/categories', categoriesRouter)
app.use('/suppliers', suppliersRouter)
app.use('/products', productsRouter)

app.listen(process.env.PORT || 3000)
