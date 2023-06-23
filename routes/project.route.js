const express = require('express');
const router = express.Router();
const projectController = require('../controllers/project.controller');

router.get('/',projectController.get)
router.get('/:id',projectController.getById)
router.post('/add',projectController.add)
router.put('/edit/:id', projectController.editById)
router.put('/edit/status/:id', projectController.editStatusById)
router.delete('/:id',projectController.deleteById)

module.exports = router