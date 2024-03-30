import React, { Component } from 'react';
import axios from 'axios';
import Clientes from './dataCliente';
import Servicos from './dataServico';
import './logado.css';

export default class Logado extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 'clientes',
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
        <div className="container">
          <div className="header">
            <h1>Bem-vindo ao Sistema de Reservas</h1>
            <button className="btn-logout" onClick={this.handleLogout}>
              Sair
            </button>
          </div>
          <div className="menu">
            <ul className="tab-list">
              <li>
                <button className="btn-logout">
                  <a href='/cadastro'>
                    Criar Conta
                  </a>
                </button>
              </li>
              <li>
                <button className="btn-logout">
                  <a href='/formServico'>
                    Cadastrar Serviços
                  </a>
                </button>

              </li>
              <li className={activeTab === 'clientes' ? 'active' : ''}>
                <button onClick={this.fetchClientesData}>
                  Serviços Agendados
                </button>
              </li>
              <li className={activeTab === 'servicos' ? 'active' : ''}>
                <button onClick={this.fetchServicosData}>
                  Serviços Cadastrados
                </button>
              </li>
            </ul>
          </div>
          <div className="content">
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
