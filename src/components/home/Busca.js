import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from "react-router-dom";
import { Redirect } from 'react-router'
import { toggleMenu } from '../../actions/menuAction';
import { fetchMap, setSearchLabel, setPlaceSearch, submitSearch } from '../../actions/mapAction';

import './Busca.css';
import Imagem_1 from '../../images/background-busca.jpg';
import Imagem_2 from '../../images/background-mulheres.jpg';
import SeachButtonIcon from '../../images/search.svg';
                                            
class Busca extends Component {    

    constructor(props){
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.setSearch = this.setSearch.bind(this);
        
        var imagens = [Imagem_1, Imagem_2];
        this.backgroundImage = imagens[Math.round((Math.random()))];
    }

    setSearch(event){
        this.props.setPlaceSearch(event.target.value);
    }

    handleSubmit(e){
        e.preventDefault();
        this.props.submitSearch(true);
    }   

    render() {
        if (this.props.submit === true) {
            return <Redirect to="/busca" />;
        }        
        return (
            <section className="busca" ref="search" style={{backgroundImage: "url(" + this.backgroundImage + ")"}}>
                <div className="container">
                    <div className="row">
                        <div className="mask"></div>
                        <form className="principal" onSubmit={this.handleSubmit}>
                            <div className="form-group col col-md-8 offset-md-2 col-lg-6 offset-lg-3">
                                <div className="row">
                                    <h1>Mapa de Recantos Negros de Salvador 2018</h1>
                                </div>
                            </div>
                            <div className="col-12 col-md-8 offset-md-2 col-lg-6 offset-lg-3">
                                <div className="search-container row">
                                    <div className="col-10 col-sm-10 col-lg-11">
                                        <div className="row">
                                            <input type="text" className="search-input form-control-plaintext" onChange={this.setSearch} value={this.props.searchTerm} placeholder="Buscar..." />
                                        </div>
                                    </div>
                                    <div className="col-2 col-sm-2 col-lg-1">
                                        <div className="row h-100">
                                            <button type="submit" className="btn btn-link w-100 text-right">
                                                <img src={SeachButtonIcon} className="img-responsive search-icon" alt="Buscar" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                        <NavLink id="map-button" to="/mapa"><i className="fas fa-map-marked-alt"></i></NavLink>
                    </div>                   
                </div>
            </section>
        );
    }

}

// Mapeando as variáveis controladas pelo Redux
const mapStateToProps = (state) => {
    return {
        menuState: state.menu.isMenuOpen,
        places: state.map.places,
        submit: state.map.searchSubmit,
        itemSelected: state.map.selectedPlace,
        searchTerm: state.map.search
    }
}

export default connect(mapStateToProps, {toggleMenu, fetchMap, setSearchLabel, setPlaceSearch, submitSearch})(Busca);
