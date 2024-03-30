const Servico = require('../model/modelServico');

exports.createServicos = async (req, res) => {
  try {
    const servico = new Servico(req.body);
    await servico.save();
    res.status(201).json(servico);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getServicos = async (req, res) => {
  try {
    const servicos = await Servico.find();
    res.status(200).json(servicos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteServicos = async (req, res) => {
  try {
    const servicoId = req.params.id;
    await Servico.findByIdAndDelete(servicoId);
    res.status(200).json({ message: 'Serviço excluído com sucesso' });
  } catch (error) {
    console.error('Erro ao excluir serviço:', error);
    res.status(500).json({ message: 'Erro ao excluir serviço' });
  }
};