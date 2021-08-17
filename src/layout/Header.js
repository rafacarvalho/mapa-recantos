import React, { Component } from 'react';
import { connect } from 'react-redux';
import { toggleMenu } from '../actions/menuAction';
import { withRouter } from 'react-router-dom';
import './Header.css';

// Imagens
import Icone from '../images/mapa_negro_simbolo_branco.svg';
import LogoMap from '../images/mapa_negro_branco.svg';

class Header extends Component {
    
    // Ação de abrir o botão
    buttonAction(){
        var ms = !this.props.menuState;
        var ss = !this.props.scrollStatus;
        this.props.toggleMenu({menuStatus: ms, scrollStatus: ss});
    }  

    render() {

        // Modificando o topo de acordo a página que está sendo exibida
        if(this.props.location.pathname.indexOf("/mapa") < 0 && this.props.location.pathname.indexOf("/busca") < 0){
            this.headerType = "default";
            this.ImageSrc = Icone;
        }else{
            this.headerType = "map";
            this.ImageSrc = LogoMap
        }

        // Renderização
        return (            
            <header id="topo" className={this.headerType}>
                <div className="container-fluid">
                    <div className="row">
                        <button type="button" className="btn btn-link logo" onClick={this.buttonAction.bind(this)}>
                            <img src={this.ImageSrc} alt="Mapa Negro" className="img-fluid"/>
                            <i className="fas fa-caret-down"></i>
                        </button>
                    </div>
                </div>
            </header>
        );
    }
    
}

// Mapeando as variáveis controladas pelo Redux
const mapStateToProps = (state) => {
    return {
        menuState: state.menu.isMenuOpen,
        scrollStatus: state.menu.isScrollEnable,
        mapDisplay : state.map.display
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        toggleMenu: ({menuStatus, scrollStatus}) =>{
            dispatch(
                toggleMenu({menuStatus: menuStatus, scrollStatus: scrollStatus})
            );
        }
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));
