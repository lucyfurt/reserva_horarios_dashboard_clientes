import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import './forms.css';

const FormCliente = () => {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    servico_id: '',
  });
  const [servicos, setServicos] = useState([]); // Lista de serviços disponíveis
  const [submissionMessage, setSubmissionMessage] = useState('');
  const [servicoSelecionado, setServicoSelecionado] = useState(null); // Estado para armazenar o serviço selecionado
  const [error, setError] = useState('');

  useEffect(() => {
    // Carregar lista de serviços disponíveis ao montar o componente
    const fetchServicos = async () => {
      try {
        const response = await axios.get('http://localhost:3007/api/v1/servicos');
        setServicos(response.data); // Assumindo que o endpoint retorna a lista de serviços disponíveis
      } catch (error) {
        console.error('Error fetching services:', error);
      }
    };
    fetchServicos();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));

    setError(''); // Limpar mensagem de erro ao modificar o formulário
  };

  const handleChangeServico = (e) => {
    const servicoId = e.target.value;
    const servico = servicos.find((s) => s._id === servicoId);
    setServicoSelecionado(servico);
    handleChange(e); // Atualizar o estado do formulário também
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!servicoSelecionado || !servicoSelecionado.disponivel) {
        setError('O serviço selecionado não está disponível.');
        return;
      }

      const response = await axios.post('http://localhost:3007/api/v1/clientes/', formData);
      setSubmissionMessage('Formulário enviado com sucesso!');
      console.log(response.data);

      // Marcar o serviço como indisponível após cadastrar o cliente
      const updatedServico = { ...servicoSelecionado, disponivel: false };
      await axios.put(`http://localhost:3007/api/v1/servicos/${servicoSelecionado._id}`, updatedServico);
      console.log('Serviço marcado como indisponível.');
    } catch (error) {
      if (error.response) {
        console.error('Error response:', error.response.data); // Aqui você acessa a mensagem de erro do servidor
        setSubmissionMessage('Erro ao submeter o formulário. Por favor, tente novamente mais tarde!');
      } else if (error.request) {
        console.error('Error request:', error.request);
        setSubmissionMessage('Erro ao submeter o formulário. Por favor, verifique sua conexão e tente novamente.');
      } else {
        console.error('Error:', error.message);
        setSubmissionMessage('Erro ao submeter o formulário. Por favor, tente novamente mais tarde.');
      }
    }
  };

  const formatData = (servico) => {
    const parsedDate = parseISO(servico.data); // Parse da data ISO
    return format(parsedDate, "dd/MM/yyyy", { locale: ptBR }); // Formatação da data para o padrão brasileiro
  };

  return (
    <div className="form-container">
      <h2 className="form-heading">Cadastro de clientes</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="nome" className="form-label">Nome:</label>
          <input
            type="text"
            id="nome"
            name="nome"
            value={formData.nome}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="email" className="form-label">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="whatsapp" className="form-label">Telefone:</label>
          <input
            type="text"
            id="telefone"
            name="telefone"
            value={formData.telefone}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="servico_id" className="form-label">Tipo de Serviço:</label>
          <select
            id="servico_id"
            name="servico_id"
            value={formData.servico_id}
            onChange={handleChangeServico}
          >
            <option value="">Selecione um serviço</option>
            {servicos.map(servico => (
              <option key={servico._id} value={servico._id}>
                {servico.nome} - {formatData(servico)} - {servico.horario}
              </option>
            ))}
          </select>
          {error && <p className="error-message">{error}</p>}
        </div>
        <button type="submit" className="form-submit">Enviar</button>
      </form>
      {submissionMessage && <p>{submissionMessage}</p>}
    </div>
  );
};

export default FormCliente;
