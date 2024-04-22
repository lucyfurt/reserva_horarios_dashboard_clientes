import React from 'react';
import './footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-column">
        <h3>Endereço e Email</h3>
        <p>Endereço: Rua Exemplo, 123</p>
        <p>Email: exemplo@example.com</p>
      </div>
      <div className="footer-column">
        <h3>Redes Sociais</h3>
        <ul>
          <li><a href="#">Facebook</a></li>
          <li><a href="#">Twitter</a></li>
          <li><a href="#">Instagram</a></li>
        </ul>
      </div>
      <div className="footer-column">
        <h3>Mapa do Site</h3>
        <ul>
          <li><a href="#">Página Inicial</a></li>
          <li><a href="#">Sobre Nós</a></li>
          <li><a href="#">Contato</a></li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
