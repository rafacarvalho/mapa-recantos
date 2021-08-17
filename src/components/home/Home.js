import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setPlaceSearch } from '../../actions/mapAction';
import './Home.css';

// Componentes
import Busca from './Busca';
import Content from './Content';

class Home extends Component {
    
    componentDidMount(){
        this.props.setPlaceSearch("");
    }

    render() {
        return (
            <section id="home">
                <Busca />
                <Content />
            </section>
        );
    }
}

// Mapeando as variáveis controladas pelo Redux
const mapStateToProps = (state) => {
    return {
        searchTerm: state.map.search
    }
}

export default connect(mapStateToProps, { setPlaceSearch })(Home);

