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
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3007/api/v1/clientes/', formData);
      setSubmissionMessage('Formulário enviado com sucesso!');
      console.log(response.data);
    } catch (error) {
      setSubmissionMessage('Erro ao submeter o formulário. Por favor, Tente novamente mais tarde!');
      console.error('Error submitting form:', error);
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
            onChange={handleChange}
          >
            <option value="">Selecione um serviço</option>
            {servicos.map(servico => (
               <option key={servico._id} value={servico._id}>
               {servico.nome} - {formatData(servico)} - {servico.horario}
             </option>
            ))}
          </select>
        </div>
        <button type="submit" className="form-submit">Enviar</button>
      </form>
      {submissionMessage && <p>{submissionMessage}</p>}
    </div>
  );
};

export default FormCliente;
