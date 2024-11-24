const pagina = document.getElementById("descricao-atleta");

const parametros = new URLSearchParams(window.location.search);
const id = parseInt(parametros.get("id"));

// Consulta a API e pega os dados
const pega_json = async (caminho) => {
    const resposta = await fetch(caminho);
    const dados = await resposta.json();
    return dados;
}

const constroiDescricao = (atleta) => {   
    const container = document.createElement("div");
    container.classList.add(".container");
    const img_atleta = document.createElement("img");
    const nome = document.createElement("h1");
    const descricao = document.createElement("p");
    
    img_atleta.src = atleta.imagem;
    nome.innerText = atleta.nome;
    descricao.innerText = atleta.detalhes;
    
    container.appendChild(img_atleta);
    container.appendChild(nome);
    container.appendChild(descricao);

    const detalhamentos = document.createElement("div");
    const n_jogos = document.createElement("p");
    const nascimento = document.createElement("p");
    const altura = document.createElement("p");
    const naturalidade = document.createElement("p");
    const retornar = document.createElement("a");

    n_jogos.innerHTML = `<strong>Nº Jogos:</strong> ${atleta.n_jogos}`;
    nascimento.innerHTML = `<strong>Nascimento:</strong> ${atleta.nascimento}`;
    altura.innerHTML = `<strong>Altura:</strong> ${atleta.altura}`;
    naturalidade.innerHTML = `<strong>Naturalidade:</strong> ${atleta.naturalidade}`;
    retornar.innerText = "VOLTAR";
    retornar.href = "atletas.html";

    detalhamentos.appendChild(n_jogos);
    detalhamentos.appendChild(nascimento);
    detalhamentos.appendChild(altura);
    detalhamentos.appendChild(naturalidade);
    detalhamentos.appendChild(retornar);
    
    pagina.appendChild(container);
    pagina.appendChild(detalhamentos);
}

// Constrói na tela as informações baseado no id e apenas com login
if (sessionStorage.getItem("login?") === "true"){
    pega_json(`https://botafogo-atletas.mange.li/2024-1/${id}`).then(
        (atleta) => {
            constroiDescricao(atleta);
        })
} else {
    document.body.innerHTML = `<h1>Você não está logado queridinha!</h1>`;
}