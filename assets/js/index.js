document.getElementById('login-form').addEventListener('submit', function (event) {
    event.preventDefault();
    catchText();
});

function catchText() {
    var userEmail = document.getElementById("emailRequest").value;
    var userPassword = document.getElementById("passwordRequest").value;

    // Envia as credenciais de login para o PHP
    fetch('http://localhost/Teste_Qualidade_Software/assets/server/login.php', {
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
            console.log(data.userId);

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
