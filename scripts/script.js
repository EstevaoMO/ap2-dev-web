const senha_correta = "466914e2398850c2f2545cf1df4e08b395e54c21ea481ee7bef85f5b40883480"; // FLAMENGO com criptografia hash
const corpo_pagina = document.body;
const pagina_atletas  = document.getElementById("cartoes-atletas");
const caixa_busca = document.getElementById("busca-por-nome");
const elenco_select = document.getElementById("filtro-telas-menores");

const filtro_todos = document.getElementById("filtro-todos-os-elencos");
const filtro_masculino = document.getElementById("filtro-masculino");
const filtro_feminino = document.getElementById("filtro-feminino");
let botaoAtivo;

let atletas;

// FUNÇÃO PARA VERIFICAR EFETUAR LOGIN CHAMADA NO onClick DO BOTÃO "ENTRAR"
function efetuarLogin(){
    const senha_inserida = document.getElementById("escrever-senha").value;
    
    if (hex_sha256(senha_inserida) === senha_correta){
        sessionStorage.setItem('login?', true);
        window.location.replace("atletas.html");
    }
    else{
        alert('A senha inserida está incorreta!');
    }
}

// LER O INPUT E VERIFICAR A SENHA AO TECLAR "ENTER" DO TECLADO
document.addEventListener('DOMContentLoaded', function() {
    const inputSenha = document.getElementById("escrever-senha");

    if (inputSenha) {
        inputSenha.addEventListener('keydown', function(event) {
            if (event.key === 'Enter'){
                efetuarLogin();
            }
        });
    }
});

// FAZER LOGOUT POR MEIO DO CLIQUE NO BOTÃO "SAIR"
document.getElementById("logout").onclick = () => {
    sessionStorage.setItem("login?", false);
    window.location.replace("index.html");
}

// Consulta a API e pega os dados
const pega_json = async (caminho) => {
    const resposta = await fetch(caminho);
    const dados = await resposta.json();
    return dados;
}

// Constrói o cartão
const constroiCartao = (atleta) => {
    const cartao = document.createElement("div");
    cartao.classList.add("cartao");
    const nome = document.createElement("h1");
    const imagem = document.createElement("img");
    const caminho = document.createElement("a");
    
    nome.innerHTML = atleta.nome;
    cartao.appendChild(nome);
    
    imagem.src = atleta.imagem;
    cartao.appendChild(imagem);

    caminho.innerHTML = "SAIBA MAIS";
    caminho.href = `descricao.html?id=${atleta.id}`;
    cartao.appendChild(caminho);
    
    pagina_atletas.appendChild(cartao);
}

const mostrarCards = (atletas) => {
    atletas.forEach((atleta) => {
        if (caixa_busca.value === "") { 
            constroiCartao(atleta); 
        }
        if (caixa_busca.value !== "") {
            if (atleta.nome.toLowerCase().includes(caixa_busca.value.toLowerCase())) {
                constroiCartao(atleta);
            }
        }
    })
}

// Verifica se o usuário está logado antes de exibir a página de atletas
document.addEventListener('DOMContentLoaded', () => {
    if (!sessionStorage.getItem("login?")){
        corpo_pagina.innerHTML = "";
        const mensagem = document.createElement("h1");
        mensagem.innerText = "Você não pode ver sem estar logado!";

        corpo_pagina.appendChild(mensagem);
        
        return;
    }}
)

// Por padrão, espera a entrada de elenco
const renderizarTudo = () => {
    filtro_masculino.classList.remove('filtro-ativo');
    filtro_feminino.classList.remove('filtro-ativo');
    
    botaoAtivo = filtro_todos;
    botaoAtivo.classList.add('filtro-ativo');

    pagina_atletas.innerHTML = "";
    pega_json("https://botafogo-atletas.mange.li/2024-1/all").then(
        (retorno) => {
            atletas = retorno;
            mostrarCards(atletas);
        })
}
    
const renderizarMasculino = () => {
    filtro_todos.classList.remove('filtro-ativo');
    filtro_feminino.classList.remove('filtro-ativo');
    
    botaoAtivo = filtro_masculino;
    botaoAtivo.classList.add('filtro-ativo');


    pagina_atletas.innerHTML = "";
    pega_json("https://botafogo-atletas.mange.li/2024-1/masculino").then(
        (retorno) => {
            atletas = retorno;
            mostrarCards(atletas);
        })
}
    
const renderizarFeminino = () => {
    filtro_todos.classList.remove('filtro-ativo');
    filtro_masculino.classList.remove('filtro-ativo');
    
    botaoAtivo = filtro_feminino;
    botaoAtivo.classList.add('filtro-ativo');
    
    pagina_atletas.innerHTML = "";  
    pega_json("https://botafogo-atletas.mange.li/2024-1/feminino").then(
        (retorno) => {
            atletas = retorno;
            mostrarCards(atletas);
        })
}
    
// Verifica o select
elenco_select.addEventListener('change', () => {
    if (elenco_select.value === "nada"){
        pagina_atletas.innerHTML = "";
    }
    if (elenco_select.value === "todos-os-elencos"){
        renderizarTudo();
    }
    if (elenco_select.value === "elenco-masculino"){
        renderizarMasculino();
    }
    if (elenco_select.value === "elenco-feminino"){
        renderizarFeminino();      
    }
})

// De olho na busca
caixa_busca.addEventListener('keyup', () => {
    pagina_atletas.innerHTML = "";

    mostrarCards(atletas);
})