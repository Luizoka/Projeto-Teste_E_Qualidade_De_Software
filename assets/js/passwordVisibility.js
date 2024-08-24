document.getElementById('toggle-password').addEventListener('click', function() {
    var passwordField = document.getElementById('passwordRequest');
    var icon = document.getElementById('icon');
    
    if (passwordField.type === 'password') {
        passwordField.type = 'text';
        icon.src = 'assets/imgs/eye_true.png'; 

    } else {
        passwordField.type = 'password';
        icon.src = 'assets/imgs/eye_false.png'; 
    }
});
