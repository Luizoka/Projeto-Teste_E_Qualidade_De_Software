document.getElementById('register-form').addEventListener('submit', function (event) {
    event.preventDefault();
    catchText();
});

function catchText() {
    var name = document.getElementById('nameRequest').value;
    var email = document.getElementById('emailRequest').value;
    var password = document.getElementById('passwordRequest').value;
    var passwordConfirm = document.getElementById('passwordConfirmationRequest').value;

    clearErrorMessage();

    if (validateForm(email, password, passwordConfirm)) {
        saveUser(name, email, password, passwordConfirm);
    }
}

function validateForm(email, password, confirmpassword) {
    var isEmailValid = validateEmail(email);
    var isPasswordValid = validatePassword(password);
    var isPasswordConfirmValid = validatePasswordConfirm(password, confirmpassword);

    if (!isEmailValid) {
        displayErrorMessage("Seu email está incorreto");
        return false;
    }

    if (!isPasswordValid) {
        displayErrorMessage("Sua senha está incorreta. A senha deve ter pelo menos 8 caracteres e incluir pelo menos uma letra maiúscula.");
        return false;
    }

    if (!isPasswordConfirmValid) {
        displayErrorMessage("As senhas não coincidem");
        return false;
    }

    return true;
}

function saveUser(name, email, password, passwordConfirm) {
    fetch('http://localhost/Teste_Qualidade_Software/assets/server/register.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
            'name': name,
            'email': email,
            'password': password,
            'passwordConfirm': passwordConfirm
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === 'success') {
            displaySuccessMessage("Registro concluído com sucesso!");
            document.getElementById('register-form').reset();
        } else {
            displayErrorMessage("Não foi possivel realizar o cadastro")
        }
    })
    .catch(error => {
        displayErrorMessage("Erro ao tentar registrar. Por favor, tente novamente.");
        console.error('Erro:', error);
    });
}

function validateEmail(email) {
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
    return emailRegex.test(email);
}

function validatePassword(password) {
    var passwordRegex = /^(?=.*[A-Z]).{8,}$/;
    return passwordRegex.test(password);
}

function validatePasswordConfirm(password, confirmpassword) {
    return password === confirmpassword;
}