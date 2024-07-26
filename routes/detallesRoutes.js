const express = require("express");

const router = express.Router();

const detalleController = require('../controllers/detalleController.js');

router.get('/', detalleController.getAllDetalles);
router.get('/:id', detalleController.getDetalleById);
router.post('/', detalleController.createDetalle);
router.put('/:id', detalleController.updateDetalle);
router.delete('/:id', detalleController.deleteDetalle);

module.exports = router;