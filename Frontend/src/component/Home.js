import React, { Component } from 'react';
import './home.css';
import Carousel from './Carousel';
import Card from './card';
import Footer from './Footer.js';

class App extends Component {
    render() {
        return (
            <>

                <div className="menu">
                    <ul>
                        <li><a href="#">Serviços</a></li>
                        <li><a href="/login">Entrar</a></li>
                        <li><a className="custom-button" href='/formCliente'>Agendar serviço</a></li>
                    </ul>
                </div>
                <div className="container">

                    <Carousel />

                    <h1 >Serviços</h1>
                    <div className="card-container">

                        <Card title="Escova" description="Os melhores produtos você encontra aqui" />
                        <Card title="Pigmentação" description="As melhores técnicas você recebe aqui" />
                        <Card title="Chapinha" description="As linhas mais aclamadas do mercado" />
                    </div>
                    <Footer />
                </div>

               
            </>

        );
    }
}

export default App;
