import React, { useState, useEffect } from 'react';
import axios from 'axios';

import '../component/dataTables.css';

function DataServico() {
  const [servicos, setServicos] = useState([]);

  const fetchServicos = async () => {
    try {
      const response = await axios.get('http://localhost:3007/api/v1/servicos/');
      setServicos(response.data);
    } catch (error) {
      console.error('Error fetching serviços:', error);
    }
  };

  useEffect(() => {
    fetchServicos();
  }, []);

  const deleteServico = async (servicoId) => {
    try {
      console.log('Deleting serviço with ID:', servicoId);
      const response = await axios.delete(`http://localhost:3007/api/v1/servicos/${servicoId}`);
      console.log('Response:', response);
      if (response.status 
        === 200) {
        fetchServicos();
      }
    } catch (error) {
      console.error('Error deleting serviço:', error);
    }
  };

  return (
    <div className="App">
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Data</th>
            <th>Horario</th>
            <th>Disponivel</th>            
            <th>Tipo</th>            
            <th>descricao</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {servicos.map((servico) => (
            <tr key={servico._id}>
              <td>{servico.nome}</td>
              <td>{servico.data}</td>
              <td>{servico.horario}</td>
              <td>{servico.disponivel}</td>
              <td>{servico.tipo}</td>
              <td>{servico.descricao}</td>
              <td>
                <button className="btn btn-primary mb-2" onClick={() => deleteServico(servico._id)}>
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

export default DataServico;
