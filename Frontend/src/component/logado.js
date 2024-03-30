import React, { Component } from 'react';
import axios from 'axios';
import Clientes from './dataCliente';
import Servicos from './dataServico';
import './login.css';

export default class Logado extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: null,
      clientesData: [],
      servicosData: [],
    };
  }

  fetchClientesData = () => {
    axios
      .get('http://localhost:3007/api/v1/clientes/')
      .then((response) => {
        this.setState({
          activeTab: 'clientes',
          clientesData: response.data,
          servicosData: [],
        });
      })
      .catch((error) => {
        console.error('Erro ao obter os dados de Clientes:', error);
      });
  };
  fetchServicosData = () => {
    axios
      .get('http://localhost:3007/api/v1/servicos/')
      .then((response) => {
        this.setState({
          activeTab: 'servicos',
          servicosData: response.data,
          clientesData: [],
        });
      })
      .catch((error) => {
        console.error('Erro ao obter os dados de Serviços:', error);
      });
  };

  handleLogout = () => {
    localStorage.removeItem('@guarda-local/token');
    window.location.reload();
  };

  render() {
    const { activeTab, clientesData, servicosData } = this.state;
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
                <a href="#" onClick={this.fetchServicosData}>
                  Serviços cadastrados
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
              <li>
                <button className="btn btn-primary mb-2" onClick={this.handleLogout}>
                  Sair
                </button>
              </li>
            </ul>
          </div>
          <div className="text-center">
            {activeTab === 'clientes' && (
              <Clientes data={clientesData} />
            )}

            {activeTab === 'servicos' && (
              <Servicos data={servicosData} />
            )}
          </div>
        </div>
      );
    } else {
      return null;
    }
  }
}
