import React, { Component } from 'react';
import axios from 'axios';
import Clientes from './dataCliente';
import './login.css';

export default class Logado extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: null,
      ClientesData: [],
      
    };
  }

  fetchClientesData = () => {
    axios
      .get('http://localhost:3007/api/v1/clientes/')
      .then((response) => {
        this.setState({
          activeTab: 'clientes',
          clientesData: response.data,
          //fotografiasData: [], // Reset the other data
        });
      })
      .catch((error) => {
        console.error('Erro ao obter os dados de Clientes:', error);
      });
  };

  handleLogout = () => {
    localStorage.removeItem('@guarda-local/token');
    window.location.reload();
  };

  render() {
    const { activeTab, clientesData } = this.state;
    const token = localStorage.getItem('@guarda-local/token');

    if (token !== null) {
      return (
        <div>
          <div className="menu">
            <ul>
              <li>
                <a href="#" onClick={this.fetchClientesData}>
                  Serviços agendados
                </a>
              </li>
              <li>
                <a href='/formServico'>
                  Cadastrar Serviços
                </a>
              </li>
              <li>
                <a href='/cadastro'>
                  Criar Conta
                </a>
              </li>
              <li> <button className="btn btn-primary mb-2" onClick={this.handleLogout}>
                Sair
              </button></li>
            </ul>
          </div>
          <div className="text-center">
            {activeTab === 'clientes' && (
              <Clientes data={clientesData} />
            )}

          </div>
        </div>
      );
    } else {
      return null;
    }
  }
}
