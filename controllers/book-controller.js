const express = require('express')
const book = express.Router()
const Books = require('../models/books.js')

const bodyParser = require('body-parser')

const jsonParser = bodyParser.json()



//get
book.get('/', (req, res) => {
    Books.find()
        .then((books) => {
            res.json(202, { books })
        })
        .catch(err => {
            console.log('get error', err)
        })

})

//post
book.post('/', (req, res) => {
    console.log('got it'
    )
    Books.create(req.body)
        .then(res.json('New Book Added!'))
        .catch(err => {
            console.log('get error', err)
        })
})



book.get('/:id', (req, res) => {
    Books.findById(req.params.id)
        .then(book => {
            res.json(202, { book })
        })
        .catch(err => {
            console.log('show.id err', err)
            res.render('error404')
        })
})


//patch
book.patch('/:id', (req, res) => {
    Books.findOneAndUpdate(req.params.id, req.body, { new: true })
        .then(book => {
            res.json(202, { book })
        })
        .catch(err => {
            res.render('error404').send(err)
        })
})


//delete
book.delete('/:id', (req, res) => {
    Books.findByIdAndDelete(req.params.id)
        .then(res.send('Delete Successful!'))
        .catch(err => {
            console.log('get error', err)
        })

})





module.exports = book