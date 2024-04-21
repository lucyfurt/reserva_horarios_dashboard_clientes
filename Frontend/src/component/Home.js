import React, { Component } from 'react';
import './home.css';
import Carousel from './Carousel';

class App extends Component {
    render() {
        return (
            <>           
            <div className="container">
                <div className="menu">
                    <ul>                   
                        <li><a href="#">Serviços</a></li>
                        <li><a href="/login">Entrar</a></li>
                    </ul>
                </div>
                <Carousel/>
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
            </>
            
        );
    }
}

export default App;
