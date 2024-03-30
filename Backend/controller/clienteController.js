const Cliente = require('../model/modelCliente');
const Servico = require('../model/modelServico');

exports.createClientes = async (req, res) => {
  try {
    const { nome, email, telefone, servico_id } = req.body;

    // Verificar se o serviço está disponível
    const servico = await Servico.findById(servico_id);
    if (!servico || !servico.disponivel) {
      return res.status(400).json({ error: 'O serviço selecionado não está disponível.' });
    }

    // Se o serviço estiver disponível, criar e salvar o novo cliente
    const cliente = new Cliente({ nome, email, telefone, servico_id });
    await cliente.save();

    // Marcar o serviço como indisponível após cadastrar o cliente
    servico.disponivel = false;
    await servico.save();

    res.status(201).json(cliente);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getClientes = async (req, res) => {
  try {
    const clientes = await Cliente.find();
    res.status(200).json(clientes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteCliente = async (req, res) => {
  try {
    const clienteId = req.params.id;
    await Cliente.findByIdAndDelete(clienteId);
    res.status(200).json({ message: 'Cliente excluído com sucesso' });
  } catch (error) {
    console.error('Erro ao excluir cliente:', error);
    res.status(500).json({ message: 'Erro ao excluir cliente' });
  }
};

