const Hemocomponente = require('../models/Hemocomponente');

// POST /hemocomponentes
const crearHemocomponente = async (req, res) => {
  try {
    const nuevo = new Hemocomponente(req.body);
    const guardado = await nuevo.save();
    res.status(201).json(guardado);
  } catch (error) {
    res.status(400).json({ mensaje: error.message });
  }
};

// GET /hemocomponentes
const obtenerHemocomponentes = async (req, res) => {
  try {
    const hemocomponentes = await Hemocomponente.find();
    res.json(hemocomponentes);
  } catch (error) {
    res.status(500).json({ mensaje: error.message });
  }
};

// GET /hemocomponentes/:id
const obtenerHemocomponentePorId = async (req, res) => {
  try {
    const hemocomponente = await Hemocomponente.findById(req.params.id);
    if (!hemocomponente) {
      return res.status(404).json({ mensaje: 'Hemocomponente no encontrado' });
    }
    res.json(hemocomponente);
  } catch (error) {
    res.status(500).json({ mensaje: error.message });
  }
};

// PUT /hemocomponentes/:id
const actualizarHemocomponente = async (req, res) => {
  try {
    const actualizado = await Hemocomponente.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!actualizado) {
      return res.status(404).json({ mensaje: 'Hemocomponente no encontrado' });
    }
    res.json(actualizado);
  } catch (error) {
    res.status(400).json({ mensaje: error.message });
  }
};

// DELETE /hemocomponentes/:id
const eliminarHemocomponente = async (req, res) => {
  try {
    const eliminado = await Hemocomponente.findByIdAndDelete(req.params.id);
    if (!eliminado) {
      return res.status(404).json({ mensaje: 'Hemocomponente no encontrado' });
    }
    res.json({ mensaje: 'Hemocomponente eliminado', hemocomponente: eliminado });
  } catch (error) {
    res.status(500).json({ mensaje: error.message });
  }
};

module.exports = {
  crearHemocomponente,
  obtenerHemocomponentes,
  obtenerHemocomponentePorId,
  actualizarHemocomponente,
  eliminarHemocomponente
};