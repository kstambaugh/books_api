//dependencies
const express = require('express')
const mongoose = require('mongoose')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')



//config
require('dotenv').config()
const PORT = process.env.PORT
const methodOverride = require('method-override')
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true },
    () => { console.log('connected to mongo: ', process.env.MONGO_URI) })


//middleware
app.use(methodOverride('_method'))
app.use(bodyParser.json())
app.use(express.urlencoded({ extended: true }))
const booksController = require('./controllers/book-controller.js')
app.use(cors())


app.get('/products/:id', function (req, res, next) {
    res.json({ msg: 'This is CORS-enabled for all origins!' })
})

app.listen(80, function () {
    console.log('CORS-enabled web server listening on port 80')
})



//ROUTES
app.get('/', (req, res) => {
    res.send('book api')
})

app.use('/books', booksController)


app.get('*', (req, res) => {
    res.send('404')
})

app.listen(PORT, () => {
    console.log('listening on port: ', PORT)
})