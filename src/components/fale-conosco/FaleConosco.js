import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setContactName, setContactEmail, setContactMessage } from '../../actions/contactAction';

// CSS
import './FaleConosco.css';

// Render
class FaleConosco extends Component {

    setName(e){
        this.props.setContactName(e.target.value);
    }

    setEmail(e){
        this.props.setContactEmail(e.target.value);
    }

    setMessage(e){
        this.props.setContactMessage(e.target.value);
    }

    formSubmit(e){
        e.preventDefault();
        if(this.props.name.match(/^\s*$/g) || this.props.email.match(/^\s*$/g) || this.props.message.match(/^\s*$/g)){
            alert("Preencha todos os campos")
        }else{
            if(this.props.email.match(/\S+@\S+\.\S+/)){
                
            }else{
                alert("Digite um e-mail válido");
            }
        }
    }

    render() {
        return (
            <section id="generic" className="pb-3 fale-conosco">
                <div className="container">                    
                    <div className="row">
                        <div className="relative">
                            <img src="https://picsum.photos/1920/1080" alt="Mapa Negro" className="img-fluid"/>
                            <div className="mask"></div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12 col-md-8 offset-md-2">
                            <div className="row">
                                <section className="px-3 pt-3 w-100">
                                    <h1>Fale Conosco</h1>
                                    <hr className="line" />
                                    <form onSubmit={this.formSubmit.bind(this)}>
                                        <div className="form-group row">
                                            <label htmlFor="nome" className="col-12 col-form-label">Nome:</label>
                                            <div className="col-12">
                                                <input type="text" className="form-control" id="nome" name="nome" value={this.props.name} onChange={this.setName.bind(this)} />
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label htmlFor="email" className="col-12 col-form-label">E-mail:</label>
                                            <div className="col-12">
                                                <input type="email" className="form-control" id="email" name="email" value={this.props.email} onChange={this.setEmail.bind(this)} />
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label htmlFor="mensagem" className="col-12 col-form-label">Mensagem:</label>
                                            <div className="col-12">
                                                <textarea className="form-control" id="mensagem" name="mensagem" rows="3" value={this.props.message} onChange={this.setMessage.bind(this)}></textarea>
                                            </div>
                                        </div>
                                        <button type="submit" className="btn btn-primary">Enviar</button>
                                    </form>
                                </section>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

// Mapeando as variáveis controladas pelo Redux
const mapStateToProps = (state) => {
    return {
        name: state.contact.name,
        email: state.contact.email,
        message: state.contact.message
    }
}

export default connect(mapStateToProps, { setContactName, setContactEmail, setContactMessage })(FaleConosco);
