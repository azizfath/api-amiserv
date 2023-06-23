const express = require('express');
const router = express.Router();
const statusController = require('../controllers/status.controller');

router.get('/',statusController.get)
router.get('/:id',statusController.getById)
router.post('/',statusController.post)
router.put('/:id',statusController.editById)
router.delete('/:id',statusController.deleteById)

module.exports = router