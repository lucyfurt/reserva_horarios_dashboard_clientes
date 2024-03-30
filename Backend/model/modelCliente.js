const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const clienteSchema = new Schema({
  nome: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  telefone: {
    type: String,
    required: true
  },
  servico_id: {
    type: Schema.Types.ObjectId,
    ref: 'Servico' 
  }
});

// Modelo do cliente
const Cliente = mongoose.model('Cliente', clienteSchema);

module.exports = Cliente;
