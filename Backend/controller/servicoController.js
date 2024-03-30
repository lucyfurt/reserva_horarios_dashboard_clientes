const Servico = require('../model/modelServico');


exports.atualizarServico = async (req, res) => {
  const servicoId = req.params.id;
  const { disponivel } = req.body;

  try {
    const servico = await Servico.findByIdAndUpdate(
      servicoId,
      { disponivel },
      { new: true }
    );

    if (!servico) {
      return res.status(404).json({ message: 'Serviço não encontrado.' });
    }

    res.status(200).json({ message: 'Serviço atualizado com sucesso.', servico });
  } catch (error) {
    console.error('Erro ao atualizar serviço:', error);
    res.status(500).json({ error: 'Erro ao atualizar serviço.' });
  }
};


exports.createServicos = async (req, res) => {
  try {
    const { data, horario } = req.body;

    // Verificar se já existe um serviço agendado para a mesma data e horário
    const servicoExistente = await Servico.findOne({ data, horario });
    if (servicoExistente) {
      return res.status(400).json({ error: 'Já existe um serviço agendado para este dia e horário' });
    }

    // Se não houver serviço agendado, criar e salvar o novo serviço
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