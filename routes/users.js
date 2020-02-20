const express = require('express')
const router = express.Router()
const { User } = require('../sequelize')
const LibraryController = require('../controllers/libraries')


/*
router.post('/', (req, res) => {
    res.status(200).json({
        message: 'Handling POST requests to /users'
    })
})
*/
module.exports = router