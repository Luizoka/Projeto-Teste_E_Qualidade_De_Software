function displayErrorMessage(message) {
    var errorMessageElement = document.getElementById('error-message');
    errorMessageElement.textContent = message;
    errorMessageElement.style.color = 'red';
    errorMessageElement.style.display = 'block';
}

function displaySuccessMessage(message) {
    var successMessageElement = document.getElementById('error-message');
    successMessageElement.textContent = message;
    successMessageElement.style.color = 'green';
    successMessageElement.style.display = 'block';
}

function clearErrorMessage() {
    var errorMessageElement = document.getElementById('error-message');
    errorMessageElement.textContent = '';
    errorMessageElement.style.display = 'none';
}
