import React, { Component } from 'react';
import Logo from '../temp/logo';

import './home.css';

class App extends Component {
    render() {
        return (
            <>
                <div className="menu">
                    <ul>
                        <li><a href="#">Home </a></li>
                        <li><a href="#">Serviços</a></li>
                        <li><a href="/login">Entrar</a></li>
                    </ul>
                </div>
                <div className="app-container">
                    <Logo className="logo" />
                    <div className="body">
                        <h1 className="main-heading">Reservar serviços</h1>
                        <div className="button-container">
                            <a className="custom-button" href='/formCliente'>
                                Agendar serviço
                            </a>                            
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default App;
