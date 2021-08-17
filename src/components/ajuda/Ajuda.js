import React, { Component } from 'react';
import './Ajuda.css';

class Ajuda extends Component {
    render() {
        return (
            <section id="generic">
                <div className="container">
                    <div className="row">
                        <div className="relative">
                            <img src="https://picsum.photos/1920/1080" alt="Mapa Negro" className="img-fluid"/>
                            <div className="mask"></div>
                        </div>
                    </div>
                    <div className="row">
                        <section className="px-3 px-md-0 pt-3">
                            <h1>Ajuda</h1>
                            <hr className="line" />
                            <p>Ao contrário do que se acredita, Lorem Ipsum não é simplesmente um texto randômico. Com mais de 2000 anos, suas raízes podem ser encontradas em uma obra de literatura latina clássica datada de 45 AC. Richard McClintock, um professor de latim do Hampden-Sydney College na Virginia, pesquisou uma das mais obscuras palavras em latim, consectetur, oriunda de uma passagem de Lorem Ipsum, e, procurando por entre citações da palavra na literatura clássica, descobriu a sua indubitável origem. Lorem Ipsum vem das seções 1.10.32 e 1.10.33 do "de Finibus Bonorum et Malorum" (Os Extremos do Bem e do Mal), de Cícero, escrito em 45 AC. Este livro é um tratado de teoria da ética muito popular na época da Renascença. A primeira linha de Lorem Ipsum, "Lorem Ipsum dolor sit amet..." vem de uma linha na seção 1.10.32.</p>
                            <p>O trecho padrão original de Lorem Ipsum, usado desde o século XVI, está reproduzido abaixo para os interessados. Seções 1.10.32 e 1.10.33 de "de Finibus Bonorum et Malorum" de Cicero também foram reproduzidas abaixo em sua forma exata original, acompanhada das versões para o inglês da tradução feita por H. Rackham em 1914.</p>
                        </section>
                    </div>
                </div>
            </section>
        );
    }
}

export default Ajuda;
