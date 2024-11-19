const senha_correta = 'FLAMENGO'; // Adicionar a criptografia hash

// FUNÇÃO PARA VERIFICAR EFETUAR LOGIN CHAMADA NO onClick DO BOTÃO "ENTRAR"
function efetuarLogin(){
    const senha_inserida = document.getElementById("escrever-senha").value;
    
    if (senha_inserida === senha_correta){
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
    alert("Saiu!");
}