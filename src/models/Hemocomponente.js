const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const hemocomponenteSchema = new Schema({
  tipo: {
    type: String,
    required: true,
    enum: ['Sangre entera', 'Glóbulos rojos', 'Plaquetas']
  },
  grupoSanguineo: {
    type: String,
    required: true,
    enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']
  },
  cantidad: { type: Number, required: true, min: 0 },
  descripcion: { type: String },
  fechaIngreso: { type: Date, default: Date.now },
  fechaVencimiento: { type: Date, required: true }
});

module.exports = mongoose.model('Hemocomponente', hemocomponenteSchema);