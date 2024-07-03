const express = require("express");

const router = express.Router();

const tematicaController = require('../controllers/tematicaControllers.js');

router.get('/', tematicaController.getAllTematicas);
router.get('/:id', tematicaController.getTematicaById);
router.post('/', tematicaController.createTematica);
router.put('/:id', tematicaController.updateTematica);
router.delete('/:id', tematicaController.deleteTematica);

module.exports = router;