import React, { Component } from 'react';
import Logo from '../temp/logo';

import './home.css';

class App extends Component {
    render() {
        return (
            <div className="container">
                <div className="menu">
                    <ul>
                        <li><Logo className="logo" /></li>
                        <li><a href="#">Home</a></li>
                        <li><a href="#">Serviços</a></li>
                        <li><a href="/login">Entrar</a></li>
                    </ul>
                </div>
                <div className="app-container">
                    <div className="body">
                        <h1 className="main-heading">Reservar serviços</h1>
                        <div className="button-container">
                            <a className="custom-button" href='/formCliente'>
                                Agendar serviço
                            </a>                            
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
