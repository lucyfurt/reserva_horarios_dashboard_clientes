import React, { useState } from 'react';
import axios from 'axios';
import './forms.css'

const FormServico = () => {
  const [formData, setFormData] = useState({
    nome: '',
    data: '',
    horario: '',
    disponivel: '',
    tipo: '',
    descricao: '',

  });
  const [submissionMessage, setSubmissionMessage] = useState('');

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
      const response = await axios.post('http://localhost:3007/api/v1/servicos/', formData);
      setSubmissionMessage('Formulário enviado com sucesso!');
      console.log(response.data);
    } catch (error) {
      setSubmissionMessage('Erro ao submeter o formulário. Por favor, Tente novamente mais tarde!');
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div className="form-container">
      <h2 className="form-heading">Serviços</h2>
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
          <label htmlFor="data" className="form-label">Data:</label>
          <input
            type="date"
            id="data"
            name="data"
            value={formData.data}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="horario" className="form-label">Horário:</label>
          <input
            type="text"
            id="horario"
            name="horario"
            value={formData.horario}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="disponivel" className="form-label">Disponível:</label>
          <input
            type="text"
            id="disponivel"
            name="disponivel"
            value={formData.disponivel}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="tipo" className="form-label">Tipo:</label>
          <input
            type="text"
            id="tipo"
            name="tipo"
            value={formData.tipo}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="descricao" className="form-label">Descrição:</label>
          <input
            type="text"
            id="descricao"
            name="descricao"
            value={formData.descricao}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="form-submit">Enviar</button>
      </form>
      {submissionMessage && <p>{submissionMessage}</p>}
    </div>
  );
};

export default FormServico;
