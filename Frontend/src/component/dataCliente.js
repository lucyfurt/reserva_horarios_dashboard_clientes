import React, { useState, useEffect } from 'react';
import axios from 'axios';

import '../component/dataTables.css';

function DataCliente() {
  const [clientes, setClientes] = useState([]);
  const [servicos, setServicos] = useState([]);

  const fetchClientes = async () => {
    try {
      const response = await axios.get('http://localhost:3007/api/v1/clientes/');
      setClientes(response.data);
    } catch (error) {
      console.error('Error fetching clientes:', error);
    }
  };

  const fetchServicos = async () => {
    try {
      const response = await axios.get('http://localhost:3007/api/v1/servicos/');
      setServicos(response.data);
    } catch (error) {
      console.error('Error fetching serviços:', error);
    }
  };

  useEffect(() => {
    fetchClientes();
    fetchServicos();
  }, []);

  const deleteCliente = async (clienteId) => {
    try {
      console.log('Deleting cliente with ID:', clienteId);
      const response = await axios.delete(`http://localhost:3007/api/v1/clientes/${clienteId}`);
      console.log('Response:', response);
      if (response.status === 200) {
        fetchClientes();
      }
    } catch (error) {
      console.error('Error deleting cliente:', error);
    }
  };

  const getNomeServicoById = (servicoId) => {
    const servico = servicos.find((s) => s._id === servicoId);
    return servico ? servico.nome : 'Nome do Serviço Não Encontrado';
    
  };
  const getDataServicoById = (servicoId) => {
    const servico = servicos.find((s) => s._id === servicoId);
    if (!servico || !servico.data) return 'Nome do Serviço Não Encontrado';
  
    // Convertendo a data para o formato adequado antes de formatá-la
    const dataFormatada = new Date(servico.data).toLocaleDateString('pt-BR');
  
    return dataFormatada;
  };
  const getHorarioServicoById = (servicoId) => {
    const servico = servicos.find((s) => s._id === servicoId);
    return servico ? servico.horario : 'Nome do Serviço Não Encontrado';
    
  };


  return (
    <div className="App">
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Email</th>
            <th>Telefone</th>
            <th>Serviço</th>
            
            <th>Data servico</th>
            
            <th>horario</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {clientes.map((cliente) => (
            <tr key={cliente._id}>
              <td>{cliente.nome}</td>
              <td>{cliente.email}</td>
              <td>{cliente.telefone}</td>
              <td>{getNomeServicoById(cliente.servico_id)}</td>
              <td>{getDataServicoById(cliente.servico_id)}</td>
              <td>{getHorarioServicoById(cliente.servico_id)}</td>
              <td>
                <button className="btn btn-primary mb-2" onClick={() => deleteCliente(cliente._id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DataCliente;
