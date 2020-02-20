const express = require('express')
const router = express.Router()
const { Library } = require('../sequelize')
const LibraryController = require('../controllers/libraries')

router.get('/all', LibraryController.getMyLibrary)
router.get('/add/:id', LibraryController.addToLibrary)
router.get('/delete/:id', LibraryController.deleteBook)

module.exports = router