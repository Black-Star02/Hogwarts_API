function carregar() {
    fetch('https://hp-api.herokuapp.com/api/characters')
        .then(response => response.json())
        .then(series => {
            const container = document.querySelector("#series-container");
            const maxImages = 22; // Limite de imagens
            let count = 0;

            series.forEach(serie => {
                if (count >= maxImages) return; // Verifica se o limite foi atingido

                const card = document.createElement("div");
                card.classList.add("card");

                const card2 = document.createElement("div");
                card2.classList.add("card2");

                const geral = document.createElement("div");
                geral.classList.add("geral");

                const botoes = document.createElement("div");
                botoes.classList.add("botoes");

                const img = document.createElement("img");
                img.src = serie.image;
                img.alt = serie.name;

                const titulo = document.createElement("h1");
                titulo.textContent = serie.name;

                const house = document.createElement("h4");
                house.textContent = serie.house;

                const btn = document.createElement("button");
                btn.classList.add("botao2");
                btn.textContent = "Mais";
                btn.addEventListener('click', () => {
                    toggleAtor(card2, serie.actor, serie.yearOfBirth, serie.dateOfBirth);
                    geral.classList.toggle("outra-classe"); // Adiciona ou remove a classe adicional
                });

                const enviar = document.createElement("button");
                enviar.classList.add("botao");
                enviar.textContent = "☆";
                enviar.addEventListener('click', () => favoritos(geral));

                card.appendChild(img);
                card2.appendChild(titulo);
                card2.appendChild(house);
                
                geral.appendChild(card);
                botoes.appendChild(card2);
                botoes.appendChild(enviar);
                geral.appendChild(btn); // Adiciona o botão dentro do geral
                geral.appendChild(botoes);
                

                container.appendChild(geral);

                switch (serie.house.toLowerCase()) {
                    case 'gryffindor':
                        geral.classList.add('grifinoria');
                        break;
                    case 'hufflepuff':
                        geral.classList.add('lufalufa');
                        break;
                    case 'ravenclaw':
                        geral.classList.add('corvinal');
                        break;
                    case 'slytherin':
                        geral.classList.add('sonserina');
                        break;
                    case '':
                        geral.classList.add('nenhum');
                        break;
                    default:
                        break;
                }

                count++; // Incrementa o contador
            });

            // Carregar favoritos do localStorage
            carregarFavoritos();
        });
}

function toggleAtor(card2, atorNome, yearOfBirth, dateOfDeath) {
    const atorElement = card2.querySelector('.ator');
    const nomeElement = card2.querySelector('.nome-ator');
    const dataMortetxt = card2.querySelector('.morte');
    const dataNacsimentotxt = card2.querySelector('.vida');
    if (atorElement && nomeElement && dataMortetxt && dataNacsimentotxt) {
        atorElement.remove();
        nomeElement.remove();
        dataMortetxt.remove();
        dataNacsimentotxt.remove();
    } else {
        const ator = document.createElement("p");
        ator.classList.add("ator");
        ator.textContent = atorNome;

        const nome = document.createElement("p");
        nome.classList.add("nome-ator");
        nome.textContent = "Ator:";

        const dataNascimento = document.createElement("p");
        dataNascimento.classList.add("vida");
        dataNascimento.textContent = `Data de Nascimento: ${ yearOfBirth}`;

        const dataMorte = document.createElement("p");
        dataMorte.classList.add("morte");
        dataMorte.textContent = `Data de Morte: ${dateOfDeath}`;

        card2.appendChild(dataNascimento);
        card2.appendChild(dataMorte);
        card2.appendChild(nome);
        card2.appendChild(ator);
        
    }
}

document.addEventListener('click', function(event) {
    if (event.target.classList.contains('botao2')) {
        var card3 = event.target.closest('.geral');
        card3.classList.toggle("active");

        if (card3.classList.contains('active')) {
            event.target.textContent = 'Menos';
        } else {
            event.target.textContent = 'Mais';
        }
    }
});



// Favorito retirada e confirmação de se ja esta nos favoritos
function favoritos(card) {
    const box2 = document.getElementById('favoritos');
    const titulo = card.querySelector('h1').textContent;
    const favoritosExistentes = box2.querySelectorAll('.geral h1 ');

    // Confirmação se a série já está nos favoritos
    for (let i = 0; i < favoritosExistentes.length; i++) {
        if (favoritosExistentes[i].textContent === titulo) {
            return;
        }
    }

    const cardClone = card.cloneNode(true);
    const botao = cardClone.querySelector('.botao');
    botao.textContent = "★";
    botao.addEventListener('click', () => removerFavorito(cardClone));
    box2.appendChild(cardClone);


}

function removerFavorito(card) {
    card.remove();


}



// Filtro
const filterElement = document.querySelector('#filter');
filterElement.addEventListener('input', filterConteudos);

function filterConteudos() {
    const filtroText = filterElement.value.toLowerCase();
    const conteudos = document.querySelectorAll('#series-container .geral');

    conteudos.forEach(conteudo => {
        const titulo = conteudo.querySelector('h1').textContent.toLowerCase();
        const plataforma = conteudo.querySelector('h4').textContent.toLowerCase();

        if (titulo.includes(filtroText) || plataforma.includes(filtroText)) {
            conteudo.style.display = "flex";
        } else {
            conteudo.style.display = "none";
        }
    });
}

carregar();