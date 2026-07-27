const app = require('./app');
const conectarDB = require('./config/db');

const PORT = process.env.PORT || 3000;

const iniciar = async () => {
  await conectarDB();
  app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
  });
};

iniciar();