import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from "react-router-dom";
import { toggleMenu } from '../actions/menuAction';
import './Menu.css';

// Imagens
import Logo from '../images/mapa_negro_logo.svg';

class Menu extends Component {
    
    // Fechar o menu ao navegar pelo menu
    showHideMenu(){
        var ms = !this.props.menuState;
        var ss = !this.props.scrollStatus;
        this.props.toggleMenu({menuStatus: ms, scrollStatus: ss});
    }

    render() {
        return (
            <nav id="menu" className={(this.props.menuState) ? "open" : ""}>
                <div className="container relative">
                    <div className="row">
                        <img src={Logo} alt="Mapa Negro" className="img-fluid logo"/>
                    </div>
                    <div className="row">
                        <button type="button" className="btn btn-link close" onClick={this.showHideMenu.bind(this)}><i className="far fa-times-circle"></i></button>
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <NavLink to="/" className="nav-link" onClick={this.showHideMenu.bind(this)}>Início</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/mapa" className="nav-link home" onClick={this.showHideMenu.bind(this)}>Mapa</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/sobre" className="nav-link" onClick={this.showHideMenu.bind(this)}>Sobre</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/ajuda" className="nav-link" onClick={this.showHideMenu.bind(this)}>Ajuda</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/fale-conosco" className="nav-link" onClick={this.showHideMenu.bind(this)}>Fale Conosco</NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }

}

// Mapeando as variáveis controladas pelo Redux
const mapStateToProps = (state) => {
    return {
        menuState: state.menu.isMenuOpen,
        scrollStatus: state.menu.isScrollEnable
    }
}

// Disparando a mudança de status do menu para aberto/fechado
const mapDispatchToProps = (dispatch) => {
    return {
        toggleMenu: ({menuStatus, scrollStatus}) =>{
            dispatch(toggleMenu({menuStatus: menuStatus, scrollStatus: scrollStatus}));
        }        
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
