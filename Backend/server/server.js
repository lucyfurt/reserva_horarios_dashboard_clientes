const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const clienteController = require('../controller/clienteController');
const servicoController = require('../controller/servicoController');

const mongoURI = process.env.MONGO_URI; 

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const port = process.env.PORT || 3007;
const router = express.Router();

app.use('/api/v1', router);

/* Rotas Login e User */
const rotas = require('../route/rotas');
router.route('/usuarios').get(require('../JWT'), rotas.getUsuarios).post(rotas.postUsuarios);
router.route('/login').post(rotas.login);

/* Rotas clienteController */
router.post('/clientes', clienteController.createClientes);
router.get('/clientes', clienteController.getClientes);
router.delete('/clientes/:id', clienteController.deleteCliente);

/* Rotas servicoController */
router.post('/servicos', servicoController.createServicos);
router.get('/servicos', servicoController.getServicos);
router.delete('/servicos/:id', servicoController.deleteServicos);

mongoose.connect(mongoURI, { useUnifiedTopology: true, useNewUrlParser: true });
app.listen(port, () => {
  console.log('Conectado à porta ' + port);
});
