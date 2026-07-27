const express = require('express');
const router = express.Router();
const {
  crearHemocomponente,
  obtenerHemocomponentes,
  obtenerHemocomponentePorId,
  actualizarHemocomponente,
  eliminarHemocomponente,
  obtenerPorCategoria,
  obtenerBajoStock
} = require('../controllers/hemocomponenteController');

router.post('/', crearHemocomponente);
router.get('/', obtenerHemocomponentes);
router.get('/categoria/:categoria', obtenerPorCategoria);
router.get('/bajo-stock/:cantidad', obtenerBajoStock);
router.get('/:id', obtenerHemocomponentePorId);
router.put('/:id', actualizarHemocomponente);
router.delete('/:id', eliminarHemocomponente);

module.exports = router;