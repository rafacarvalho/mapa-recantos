import React, { Component } from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import { connect } from 'react-redux';
import Routes from './routes';

import './App.css';

// Layout
import Menu from '../layout/Menu';
import Footer from '../layout/Footer';

class App extends Component {
    
    //View
    render() {
        return (
            <main className="App" scroll={this.props.scrollStatus ? '' : 'disabled'}>
                <Router>
                    <div>
                        <Menu />
                        <Routes />
                    </div>
                </Router>
                <Footer />
            </main>
        );
    }

}

// Mapeando as variáveis controladas pelo Redux
const mapStateToProps = (state) => {
    return {
        scrollStatus: state.menu.isScrollEnable
    }
}

export default connect(mapStateToProps)(App);