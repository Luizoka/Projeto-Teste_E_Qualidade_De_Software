document.getElementById('register-form').addEventListener('submit', function (event) {
    event.preventDefault();
    catchText();
});

function catchText() {
    const name = document.getElementById('nameRequest').value;
    const email = document.getElementById('emailRequest').value;
    const password = document.getElementById('passwordRequest').value;
    const passwordConfirm = document.getElementById('passwordConfirmationRequest').value;

    clearErrorMessage();

    if (validateForm(email, password, passwordConfirm)) {
        saveUser(name, email, password, passwordConfirm); // Enviar passwordConfirm
    }
}

function validateForm(email, password, passwordConfirm) {
    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);
    const isPasswordConfirmValid = validatePasswordConfirm(password, passwordConfirm);

    if (!isEmailValid) {
        displayErrorMessage("Seu email está incorreto");
        return false;
    }

    if (!isPasswordValid) {
        displayErrorMessage("Sua senha deve ter pelo menos 8 caracteres e incluir pelo menos uma letra maiúscula.");
        return false;
    }

    if (!isPasswordConfirmValid) {
        displayErrorMessage("As senhas não coincidem");
        return false;
    }

    return true;
}

function saveUser(name, email, password, passwordConfirm) { // Adicionar passwordConfirm
    fetch('http://localhost/Projeto-Teste_E_Qualidade_De_Software/assets/server/register.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
            'name': name,
            'email': email,
            'password': password,
            'passwordConfirm': passwordConfirm // Enviar passwordConfirm para o PHP
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === 'success') {
            displaySuccessMessage("Registro concluído com sucesso!");
            document.getElementById('register-form').reset();
        } else {
            displayErrorMessage(data.message || "Não foi possível realizar o cadastro");
        }
    })
    .catch(error => {
        displayErrorMessage("Erro ao tentar registrar. Por favor, tente novamente.");
        console.error('Erro:', error);
    });
}

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validatePassword(password) {
    const passwordRegex = /^(?=.*[A-Z]).{8,}$/;
    return passwordRegex.test(password);
}

function validatePasswordConfirm(password, confirmpassword) {
    return password === confirmpassword;
}