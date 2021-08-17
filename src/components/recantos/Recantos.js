import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from "react-router-dom";
import { fetchMap, submitSearch, setPlaceSearch, setTopButtonClass } from '../../actions/mapAction';

// CSS
import './Recantos.css';

// Imagens
import Terreiro from '../../images/terreiro.jpg';
import SeachButtonIcon from '../../images/search.svg';

// Função de filtragem
function searchFilter(term){
    return function(s){
        return (s.escola.toLowerCase().includes(term.toLowerCase()) || s.resumo.toLowerCase().includes(term.toLowerCase()) || s.aluno.toLowerCase().includes(term.toLowerCase()) || s.endereco.toLowerCase().includes(term.toLowerCase())  || !term);
    }
}

// Função de filtragem por categoria
function categoryFilter(term){
    return function(s){
        return (s.categorias.indexOf(term.toLowerCase()) !== -1);
    }
}

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

// Render
class Recantos extends Component {
    
    constructor(props){
        super(props);        
        this.searchInput = React.createRef();
        window.scrollTo(0, 0);
    }

    // Buscando as localizações do json e pondo no mapa.
    componentWillMount(){
        this.props.submitSearch(false);
        this.props.fetchMap();
        this.setSearch = this.setSearch.bind(this);
        this.handleScroll = this.handleScroll.bind(this);
        window.removeEventListener('scroll', this.handleScroll);
    }

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll);
    }
    
    handleScroll(event) {
        let h = window.innerHeight;
        let supportPageOffset = window.pageXOffset !== undefined;
        let isCSS1Compat = ((document.compatMode || '') === 'CSS1Compat');
        let scroll = {
            x: supportPageOffset ? window.pageXOffset : isCSS1Compat ? document.documentElement.scrollLeft : document.body.scrollLeft,
            y: supportPageOffset ? window.pageYOffset : isCSS1Compat ? document.documentElement.scrollTop : document.body.scrollTop
         };
         if(scroll.y > h){
            this.props.setTopButtonClass("btn btn-link");
        }else{
            this.props.setTopButtonClass("btn btn-link hide");
        }
    }

    // Setando o termo da busca
    setSearch(event){
        this.props.setPlaceSearch(event.target.value);
    }

    // Função de ir para o topo
    goToTop(){
        window.scrollTo(0, 0);
    }

    handleSubmit(event){
        event.preventDefault();
        this.props.setPlaceSearch(this.searchInput.current.value);
    }

    render() {

        const { match: { params } } = this.props;
        const searchResult = params.categoria === undefined ? this.props.places.filter(searchFilter(this.props.searchTerm)) : this.props.places.filter(categoryFilter(params.categoria));

        return (
            <section id="content">
                <div className="container">
                    <form className="search-form" onSubmit={this.handleSubmit.bind(this)}>
                        <div className="col-12">
                            <div className="search-container row">
                                <div className="col-10 col-sm-10 col-lg-11">
                                    <div className="row">
                                        <input type="text" ref={this.searchInput} className="search-input" placeholder={this.props.searchTerm === "" ? "Buscar..." : "Resultados para: "+this.props.searchTerm} />
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
                </div>
                <div className="recantos">
                    <div className="container">
                        <div className="row">
                            <div className="result-label"><p>{searchResult.length > 0 ? (searchResult.length > 1 ? searchResult.length+" resultados encontrados" : searchResult.length+" resultado encontrado.") : "Nenhum resultado encontrado."}</p></div>
                        </div>
                        <div className="row">
                            {searchResult.map((marker, index) => (
                                <div className="col-12 col-md-6 col-lg-4" key={marker.id}>
                                    <div className="card card-transparent border-none mb-3">
                                        <NavLink to={"/recantos/"+marker.id+"/"+slugify(marker.escola)} className="single-link">
                                            <img className="card-img-top" src={marker.imagem} alt="Histórico" />
                                            <span className="mt-1">{marker.bairro}</span>
                                            <h3 className="card-title mt-1 mb-1">{marker.escola}</h3>
                                            <small>{marker.endereco}</small>
                                        </NavLink>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <button id="top" type="button" className={this.props.topButtonClassName}><i className="fas fa-angle-up" onClick={this.goToTop}></i></button>          
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
        searchTerm: state.map.search,
        places: state.map.places,
        topButtonClassName: state.map.topButtonClass
    }
}

export default connect(mapStateToProps, { fetchMap, submitSearch, setPlaceSearch, setTopButtonClass })(Recantos);
