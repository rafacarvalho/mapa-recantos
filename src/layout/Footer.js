import React, { Component } from 'react';
import './Footer.css';

class Footer extends Component {

    socialClickAction(e){
        e.preventDefault();
        var url = e.target.getAttribute("data-href") == null ? e.target.parentNode.getAttribute("data-href") : e.target.getAttribute("data-href");
        window.open(url);
    }

    render() {
        return (
            <footer>
                <section id="social" className="py-2">
                    <div className="container">
                        <div className="row">
                            <div className="w-100">
                                <button type="button" className="btn btn-link" data-href="http://facebook.com" onClick={this.socialClickAction.bind(this)}><i className="fab fa-facebook"></i></button>
                                <button type="button" className="btn btn-link" data-href="http://www.twitter.com" onClick={this.socialClickAction.bind(this)}><i className="fab fa-twitter"></i></button>
                                <button type="button" className="btn btn-link" data-href="http://instagram.com" onClick={this.socialClickAction.bind(this)}><i className="fab fa-instagram"></i></button>
                                <div className="clearfix"></div>
                            </div>
                        </div>
                    </div>
                </section>
                <section id="footer">
                    <div className="container">
                        <div className="row">
                            <div className="px-2 py-4 w-100">
                                <h3>Mapa de Recantos Negros de Salvador</h3>
                                <address className="px-3 text-center">Secretaria Municipal da Educação - Salvador Av. Anita Garibaldi, Nº 2981, Rio Vermelho | Salvador - BA | Brasil | CEP: 40.170-130 | Tel: (71) 3202-3160 | CNPJ: 13.927.801/0006-53</address>
                            </div>
                        </div>
                    </div>
                </section>
            </footer>
        );
    }
}

export default Footer;
