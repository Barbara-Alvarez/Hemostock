const express = require('express');
const router = express.Router();
const {
  crearHemocomponente,
  obtenerHemocomponentes,
  obtenerHemocomponentePorId,
  actualizarHemocomponente,
  eliminarHemocomponente
} = require('../controllers/hemocomponenteController');

router.post('/', crearHemocomponente);
router.get('/', obtenerHemocomponentes);
router.get('/:id', obtenerHemocomponentePorId);
router.put('/:id', actualizarHemocomponente);
router.delete('/:id', eliminarHemocomponente);

module.exports = router;