import React, { Component } from 'react';
import { fetchMap, showInfowindowAtIndex, setInfowindowStatus, setMapLatLng, submitSearch, setPlaceSearch } from '../../actions/mapAction';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import { connect } from 'react-redux';
import { NavLink } from "react-router-dom";
import './Interna.css';

// Função de filtragem
function singleFilter(term){
    return function(s){
        return s.id === term;
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

class Interna extends Component {

    // Buscando as localizações do json e pondo no mapa.
    componentWillMount(){
        this.props.submitSearch(false);
        this.props.fetchMap();
    }

    render() {
        
        const { match: { params } } = this.props;
        const singleResult = this.props.places.filter(singleFilter(params.id));

        return (
            <section id="generic">
                {singleResult.map((place, index) => (
                    <div key={place.id}>
                        <div className="container">
                            <div className="row">
                                <div className="carrossel relative">
                                    <Carousel showArrows={false} showThumbs={false} showStatus={false}>
                                        {place.galeria.map((photo, i) => (
                                            <div key={i}>
                                                <img src={photo} className="img-fluid" alt={place.escola} />
                                            </div>
                                        ))}
                                    </Carousel>
                                </div>
                            </div>
                        </div>
                        <div className="container">
                            <div className="row">
                                <div className="px-3 px-md-0 pt-3">
                                    <NavLink to={"/mapa/"+place.id+"/"+place.latitude+"/"+place.longitude} className="ver-mapa btn btn-warning">Ver no mapa</NavLink>
                                    <h1>{place.escola}</h1>
                                    <address className="address">{place.endereco}</address>                                    
                                    <hr className="line" />
                                    <p>{place.resumo}</p>
                                    <p><strong>Localidade indicada por {place.aluno}, {place.escola}</strong></p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
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

export default connect(mapStateToProps, { fetchMap, showInfowindowAtIndex, setInfowindowStatus, setMapLatLng, submitSearch, setPlaceSearch })(Interna);
