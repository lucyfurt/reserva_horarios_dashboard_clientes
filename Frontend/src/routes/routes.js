import React from 'react';
import { isAuthenticated } from '../services/serverApi';
import { Switch, Route, Redirect, BrowserRouter } from 'react-router-dom';

import Login from '../component/login';
import Cadastrar from '../component/cadastrar';
import Logado from '../component/logado';
import FormCliente from '../component/formCLiente';
import FormServico from '../component/formServico';
import Home from '../component/Home'


const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest}
    render={props =>
      isAuthenticated('@guarda-local/token') != null ? (
        <Component {...props} />
      ) : (
          <Redirect to={{ pathname: "/home", state: { from: props.location } }} />
        )
    }
  />
)
const RouteLogin = () => (
  <BrowserRouter>
    <Switch>
    <Route exact path="/home" component={Home}/>
      <Route exact path="/login" component={Login} />
      <Route exact path="/cadastro" component={Cadastrar} />
      <Route exact path="/formCliente" component={FormCliente}/>   
      <Route exact path="/formServico" component={FormServico}/>     
      <PrivateRoute exact path="/" component={Logado} />
    </Switch>
  </ BrowserRouter>
)

export default RouteLogin;

