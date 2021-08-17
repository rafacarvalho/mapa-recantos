import React, { Component } from 'react';
import { Route, Switch } from "react-router-dom";

// Layout
import Header from '../layout/Header';

// Components
import Home from '../components/home/Home';
import Sobre from '../components/sobre/Sobre';
import Ajuda from '../components/ajuda/Ajuda';
import Pagina404 from '../components/404/404';
import Mapa from '../components/mapa/Mapa';
import FaleConosco from '../components/fale-conosco/FaleConosco';
import Recantos from '../components/recantos/Recantos';
import Interna from '../components/interna/Interna';

class Routes extends Component {

    render(){
        return(
            <div>
                <Header />
                <Switch>
                    <Route path="/" component={Home} exact />
                    <Route path="/sobre" component={Sobre} />
                    <Route path="/ajuda" component={Ajuda} />
                    <Route path="/mapa/:id?/:lat?/:lng?" component={Mapa} />
                    <Route path="/fale-conosco" component={FaleConosco} />
                    <Route path="/busca/:categoria?" component={Recantos} />
                    <Route path="/recantos/:id/:slug" component={Interna} />
                    <Route component={Pagina404} />
                </Switch>
            </div>
        );
    }

}

export default Routes;