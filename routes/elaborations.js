const express = require('express')
const router = express.Router()
const { Elaboration } = require('../sequelize')
const ElaborationController = require('../controllers/elaborations')

router.get('/all', ElaborationController.getElaborations)
router.get('/all/:id', ElaborationController.getElaborationById)
router.get('/create', ElaborationController.getElaborationsToDo)
router.get('/create/:id', ElaborationController.getElaborationToDoById)
router.get('/update', ElaborationController.getElaborations)
router.get('/update/:id', ElaborationController.getElaborationById)
router.post('/update/updateElaboration', ElaborationController.updateElaboration)
router.post('/create/createElaboration', ElaborationController.createElaboration)
router.post('/searchElaborations', ElaborationController.searchElaborations)

module.exports = router