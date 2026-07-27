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

// GET /hemocomponentes/categoria/:categoria
const obtenerPorCategoria = async (req, res) => {
  try {
    const hemocomponentes = await Hemocomponente.find({
      tipo: req.params.categoria
    });
    res.json(hemocomponentes);
  } catch (error) {
    res.status(500).json({ mensaje: error.message });
  }
};

// GET /hemocomponentes/bajo-stock/:cantidad
const obtenerBajoStock = async (req, res) => {
  try {
    const limite = Number(req.params.cantidad);

    if (isNaN(limite)) {
      return res.status(400).json({ mensaje: 'La cantidad debe ser un número' });
    }

    const hemocomponentes = await Hemocomponente.find({
      cantidad: { $lt: limite }
    });

    res.json(hemocomponentes);
  } catch (error) {
    res.status(500).json({ mensaje: error.message });
  }
};

// PUT /hemocomponentes/actualizar-stock
const actualizarStockMasivo = async (req, res) => {
  try {
    const { hemocomponentes } = req.body;

    if (!Array.isArray(hemocomponentes) || hemocomponentes.length === 0) {
      return res.status(400).json({
        mensaje: 'Se espera un array de hemocomponentes con id y cantidad'
      });
    }

    const resultados = [];
    const errores = [];

    for (const item of hemocomponentes) {
      try {
        const actualizado = await Hemocomponente.findByIdAndUpdate(
          item.id,
          { cantidad: item.cantidad },
          { new: true, runValidators: true }
        );

        if (actualizado) {
          resultados.push(actualizado);
        } else {
          errores.push({ id: item.id, mensaje: 'No encontrado' });
        }
      } catch (error) {
        errores.push({ id: item.id, mensaje: error.message });
      }
    }

    res.json({
      actualizados: resultados.length,
      fallidos: errores.length,
      resultados,
      errores
    });
  } catch (error) {
    res.status(500).json({ mensaje: error.message });
  }
};
module.exports = {
  crearHemocomponente,
  obtenerHemocomponentes,
  obtenerHemocomponentePorId,
  actualizarHemocomponente,
  eliminarHemocomponente,
  obtenerPorCategoria,
  obtenerBajoStock,
  actualizarStockMasivo
};