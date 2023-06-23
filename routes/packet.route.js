const express = require('express');
const router = express.Router();
const packetController = require('../controllers/packet.controller');

router.get('/',packetController.get)
router.get('/:id',packetController.getById)
router.post('/',packetController.post)
router.put('/:id',packetController.editById)
router.delete('/:id',packetController.deleteById)
router.get('/type/:type',packetController.findPacketByType)

module.exports = router