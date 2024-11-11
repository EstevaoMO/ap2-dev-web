const senha_correta = 'FLAMENGO'; // Adicionar a criptografia hash

// Através do ENTER no input
document.addEventListener('DOMContentLoaded', function() {
    const inputSenha = document.getElementById("escrever-senha");

    if (inputSenha) {
        inputSenha.addEventListener('keydown', function(event) {
            if (event.key === 'Enter') {
                event.preventDefault();

                const senha_inserida_enter = inputSenha.value;

                if (senha_inserida_enter === senha_correta) {
                    sessionStorage.setItem('login?', true);
                    window.location.replace("atletas.html");
                } else {
                    alert('A senha inserida está incorreta!');
                }
            }
        });

    }
});

function verificarSenha(){
    const senha_inserida = document.getElementById("escrever-senha").value;
    
    if (senha_inserida === senha_correta){
        sessionStorage.setItem('login?', true);
        window.location.replace("atletas.html");
    }
    else{
        alert('A senha inserida está incorreta!');
    }
}

// Logout
document.getElementById("logout").onclick = () => {
    sessionStorage.removeItem("login?");
    window.location.replace("index.html");
    alert("Saiu!");
}