document.getElementById('login-form').addEventListener('submit', function (event) {
    event.preventDefault();
    catchText();
});

function catchText() {
    var userEmail = document.getElementById("emailRequest").value.trim();
    var userPassword = document.getElementById("passwordRequest").value.trim();

    // Valida os campos do formulário
    if (!userEmail || !userPassword) {
        displayErrorMessage("Por favor, preencha todos os campos.");
        return;
    }

    // Envia as credenciais de login para o PHP
    fetch('http://localhost/Projeto-Teste_E_Qualidade_De_Software/assets/server/login.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
            email: userEmail,
            password: userPassword
        })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro na requisição: ' + response.status);
        }
        return response.json();
    })
    .then(data => {
        if (data.status === 'success') {
            // Armazena o userId no localStorage
            localStorage.setItem('userId', data.userId);
            displaySuccessMessage("Bem vindo!");
            setTimeout(function () {
                window.location.href = "assets/html/main-page.html";
            }, 1500);
        }
        else if (data.status === 'error') {
            displayErrorMessage("Email ou Senha incorretos");
        }
    })
    .catch(error => {
        displayErrorMessage("Erro ao tentar fazer login. Por favor, tente novamente.");
    });
}

function displaySuccessMessage(message) {
    // Implemente a exibição da mensagem de sucesso
    console.log(message); // Substitua com a lógica de exibição desejada
}

function displayErrorMessage(message) {
    // Implemente a exibição da mensagem de erro
    console.error(message); // Substitua com a lógica de exibição desejada
}
