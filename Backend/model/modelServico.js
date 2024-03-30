const mongoose = require('mongoose');

const servicoSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  data: { type: Date, required: true },
  horario: { type: String, required: true },
  disponivel: { type: Boolean, required: true },
  tipo: { type: String, required: true },
  descricao: { type: String, required: true },
});

const Servico = mongoose.model('Servico', servicoSchema);

module.exports = Servico;
