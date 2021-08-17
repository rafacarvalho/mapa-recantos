import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from "react-router-dom";
import { withGoogleMap, GoogleMap, Marker, InfoWindow } from "react-google-maps";
import { MarkerClusterer } from "react-google-maps/lib/components/addons/MarkerClusterer";
import { fetchMap, showInfowindowAtIndex, setInfowindowStatus, setMapLatLng, submitSearch, setPlaceSearch } from '../../actions/mapAction';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

// CSS
import './Mapa.css';

// Imagens
import SearchIcon from '../../images/search_white.svg';
import MarkerIcon from '../../images/marcador.png';

import SeachButtonIcon from '../../images/search.svg';

// Google
const google = window.google;

// Default map
const defaultMap = {
    lat: -12.8993599,
    lng: -38.40792729999998,
    zoom: 12
}

// Map options
const MapOptions = {
    streetViewControl: false,
    //scaleControl: false,
    mapTypeControl: false,
    //panControl: false,
    //zoomControl: false,
    //rotateControl: false,
    //fullscreenControl: false
}

// Função de filtragem
function selectedFilter(term) {
    return function (s) {
        return s.id === term;
    }
}

// Função de filtragem
function searchFilter(term) {
    return function (s) {
        return s.escola.toLowerCase().includes(term.toLowerCase())
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
class Mapa extends Component {

    constructor(props) {
        super(props);
        this.searchInput = React.createRef();
        var selected = this.props.selected;
        if (selected !== null && selected !== undefined && selected !== "") {
            this.props.setInfowindowStatus(true);
            this.showInfoForIndex(selected.id, selected.latitude + 0.0013, selected.longitude);
        }
    }

    // Buscando as localizações do json e pondo no mapa.
    componentWillMount() {
        this.props.submitSearch(false);
        this.props.fetchMap();
    }

    componentDidMount() {
        const { match: { params } } = this.props;
        console.log(params)
        if (params.id != "" && params.id != null) {
            this.props.setInfowindowStatus(true);
            this.props.showInfowindowAtIndex(params.id);
            this.props.setMapLatLng({ lat: parseFloat(params.lat) + 0.001, lng: parseFloat(params.lng), zoom: 18 });
        }
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.setPlaceSearch(this.searchInput.current.value);
    }

    // Fechar o menu ao navegar pelo menu
    showHideMenu() {
        var ms = !this.props.menuState;
        var ss = !this.props.scrollStatus;
        this.props.toggleMenu({ menuStatus: ms, scrollStatus: ss });
    }

    showInfoForIndex(i, lat, lng) {
        if (this.props.InfowindowToShow === i) {
            this.props.setInfowindowStatus(!this.props.isOpen);
        } else {
            this.props.setInfowindowStatus(true);
            this.props.showInfowindowAtIndex(i);
        }
        this.props.setMapLatLng({ lat: lat + 0.001, lng: lng, zoom: 18 });
    }

    onToggleOpen() {
        this.props.setInfowindowStatus(false);
        this.props.setMapLatLng(defaultMap);
        const { match: { params } } = this.props;
        if (params.id != "" && params.id != null) {
            this.props.history.push('/mapa')
        }
    }

    render() {

        // Componente do mapa
        const MapComponent = withGoogleMap((props) =>
            <section id="map">
                <form className="search-map" onSubmit={this.handleSubmit.bind(this)}>
                    <div className="container">
                        <div className="px-3 px-md-0">
                            <div className="search-container row">
                                <div className="col-10 col-md-8 offset-md-2 col-lg-11 offset-lg-0">
                                    <div className="row">
                                        <input type="text" ref={this.searchInput} className="search-input" placeholder={this.props.searchTerm === "" ? "Buscar..." : "Resultados para: " + this.props.searchTerm} />
                                    </div>
                                </div>
                                <div className="col-2 col-md-2 col-lg-1">
                                    <div className="row h-100">
                                        <button type="submit" className="btn btn-link">
                                            <img src={SeachButtonIcon} className="img-responsive search-icon" alt="Buscar" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
                <GoogleMap id="google-map" defaultZoom={this.props.zoom} defaultCenter={{ lat: props.centerLat, lng: props.centerLng }} defaultOptions={MapOptions}>
                    <MarkerClusterer averageCenter enableRetinaIcons gridSize={30}>
                        {this.props.places.filter(searchFilter(this.props.searchTerm)).map((marker, index) => (
                            <Marker key={marker.id} position={{ lat: marker.latitude, lng: marker.longitude }} icon={MarkerIcon} onClick={this.showInfoForIndex.bind(this, marker.id, marker.latitude, marker.longitude)}>
                                {(this.props.isOpen && this.props.InfowindowToShow) === marker.id && <InfoWindow onCloseClick={this.onToggleOpen.bind(this)} options={{ maxWidth: 320 }}>
                                    <div className="marker">
                                        <Carousel showArrows={false} showThumbs={false} showStatus={false}>
                                            {marker.galeria.map((photo, i) => (
                                                <div key={i}>
                                                    <img src={photo} alt="" className="img-fluid" />
                                                    <div className="mask"></div>
                                                </div>
                                            ))}
                                        </Carousel>
                                        <h2>{marker.escola}</h2>
                                        <p>{marker.endereco}</p>
                                        <NavLink to={"/recantos/" + marker.id + "/" + slugify(marker.escola)}>Ver mais</NavLink>
                                    </div>
                                </InfoWindow>}
                            </Marker>
                        ))}
                    </MarkerClusterer>
                </GoogleMap>
            </section>
        );

        return (
            <section id="mapa">
                <MapComponent centerLat={this.props.latitude} centerLng={this.props.longitude} loadingElement={<div style={{ height: `100%` }} />} containerElement={<div className="map-container" />} mapElement={<div id="map" />} markers={this.props.places} />
                <NavLink id="search-button" to="/"><img src={SearchIcon} className="img-fluid" alt="" /></NavLink>
            </section>
        );
    }
}

// Mapeando as variáveis controladas pelo Redux
const mapStateToProps = (state) => {
    return {
        latitude: state.map.latitude,
        longitude: state.map.longitude,
        zoom: state.map.zoom,
        places: state.map.places,
        submit: state.map.searchSubmit,
        InfowindowToShow: state.map.infowindowIndex,
        isOpen: state.map.isOpen,
        searchTerm: state.map.search
    }
}

export default connect(mapStateToProps, { fetchMap, showInfowindowAtIndex, setInfowindowStatus, setMapLatLng, submitSearch, setPlaceSearch })(Mapa);
