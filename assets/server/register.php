<?php
include 'db_connect.php';

// Verifica se os dados foram enviados via POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = $_POST['name'];
    $email = $_POST['email'];
    $password = $_POST['password'];
    $passwordConfirm = $_POST['passwordConfirm'];

    // Valida os dados
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo json_encode(['status' => 'error', 'message' => 'O email fornecido é inválido.']);
        exit();
    }

    if ($password !== $passwordConfirm) {
        echo json_encode(['status' => 'error', 'message' => 'A senha está incorreta']);
        exit();
    }

    // Verifica se o email já está registrado
    $stmt = $pdo->prepare('SELECT * FROM Usuario WHERE Email = :email');
    $stmt->execute(['email' => $email]);
    if ($stmt->fetch(PDO::FETCH_ASSOC)) {
        echo json_encode(['status' => 'error', 'message' => 'Este e-mail já está cadastrado.']);
        exit();
    }

    // Insere o novo usuário no banco de dados
    $stmt = $pdo->prepare('INSERT INTO Usuario (Name, Email, Password) VALUES (:name, :email, :password)');
    $stmt->execute([
        'name' => $name,
        'email' => $email,
        'password' => $password // Em produção, usar password_hash($password, PASSWORD_DEFAULT)
    ]);

    echo json_encode(['status' => 'success', 'message' => 'Seu registro foi concluído.']);
}
