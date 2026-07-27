const express = require('express');
const cors = require('cors');
const hemocomponenteRoutes = require('./routes/hemocomponenteRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ mensaje: 'API de hemostock funcionando' });
});

app.use('/hemocomponentes', hemocomponenteRoutes);

module.exports = app;