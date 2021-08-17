import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from "react-router-dom";
import { fetchMap } from '../../actions/mapAction';
import './Content.css';

// Imagens
import ThumbHistorico1 from '../../images/thumb-01.jpg';
import ThumbHistorico2 from '../../images/thumb-02.jpg';
import ThumbHistorico3 from '../../images/thumb-03.jpg';
import ImagemProjeto from '../../images/conheca-projeto.jpg';
import Terreiro from '../../images/terreiro.jpg';

function slugify(content) {
    return content.toLowerCase()
    .replace(/[á]/g, 'a')
    .replace(/[é]/g, 'e')
    .replace(/[í]/g, 'i')
    .replace(/[ó]/g, 'o')
    .replace(/[ú]/g, 'u')
    .replace(/[â]/g, 'a')
    .replace(/[ê]/g, 'e')
    .replace(/[î]/g, 'i')
    .replace(/[ô]/g, 'o')
    .replace(/[û]/g, 'u')
    .replace(/[ã]/g, 'a')
    .replace(/[õ]/g, 'o')
    .replace(/[ç]/g, 'c')
    .replace(/\s+/g, '-');
}

class Content extends Component {

    // Buscando as localizações do json e pondo no mapa.
    componentWillMount(){
        this.props.fetchMap();
    }

    render() {
        return (
            <section id="content">
                <div className="container">
                    <div className="row">
                        <h2 className="heading mb-4">Quais tipos de Recantos você esta Buscando?</h2>
                    </div>
                    <div className="row">
                        <div className="col-12 col-md-4">
                            <div className="card bg-dark text-white mb-3">
                                <NavLink to="/busca/historico">
                                    <img className="card-img" src={ThumbHistorico1} alt="Histórico" />
                                    <div className="mask"></div>
                                    <div className="card-img-overlay">
                                        <div className="align-middle">
                                            <h3 className="card-title">Histórico</h3>
                                        </div>
                                    </div>
                                </NavLink>
                            </div>
                        </div>
                        <div className="col-12 col-md-4">
                            <div className="card bg-dark text-white mb-3">
                                <NavLink to="/busca/festivo">
                                    <img className="card-img" src={ThumbHistorico2} alt="Festivos" />
                                    <div className="mask"></div>
                                    <div className="card-img-overlay">
                                        <div className="align-middle">
                                            <h3 className="card-title">Festivos</h3>
                                        </div>
                                    </div>
                                </NavLink>
                            </div>
                        </div>
                        <div className="col-12 col-md-4">
                            <div className="card bg-dark text-white mb-3">
                                <NavLink to="/busca/culinario">
                                    <img className="card-img" src={ThumbHistorico3} alt="Culinários" />
                                    <div className="mask"></div>
                                    <div className="card-img-overlay">
                                        <div className="align-middle">
                                            <h3 className="card-title">Culinários</h3>
                                        </div>
                                    </div>
                                </NavLink>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <h2 className="heading mt-4 mb-4">Conheça o Projeto Recantos Negros de Salvador</h2>
                    </div>
                    <div className="row">
                        <div className="col">
                            <div className="conheca mb-3">
                                <div className="fixed-image">
                                    <img className="card-img-top" src={ImagemProjeto} alt="Histórico" />
                                </div>                                
                                <div className="float-box text-left px-4 px-md-5 pt-md-4">
                                    <p className="card-text mt-5">Os alunos das escolas municipais de Salvador apresentando um novo olhar sobre a Cidade</p>
                                    <NavLink to="/sobre">
                                        <button type="button" className="btn btn-link btn-about">Saiba Mais</button>
                                    </NavLink>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <h2 className="heading mt-4 mb-4">Cantos, Recantos e Encantos de Salvador</h2>
                    </div>
                    <div className="row">
                        {this.props.places.map((p, index) => (
                        <div className="col-12 col-md-6 col-lg-4" key={index}>
                            <NavLink to={"/recantos/"+p.id+"/"+slugify(p.escola)} className="single-link">
                                <div className="card card-transparent border-none mb-3">
                                    <img className="card-img-top" src={p.imagem} alt="Histórico" />
                                    <span className="mt-1">{p.bairro}</span>
                                    <h3 className="card-title mt-1 mb-1">{p.escola}</h3>
                                    <small>{p.endereco}</small>
                                </div>
                            </NavLink>
                        </div>
                        ))}
                    </div>
                </div>
            </section>
        );
    }
}

// Mapeando as variáveis controladas pelo Redux
const mapStateToProps = (state) => {
    return {
        places: state.map.places
    }
}

export default connect(mapStateToProps, { fetchMap })(Content);
