<?php
include 'db_connect.php';

// Verifica se os dados foram enviados via POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email = $_POST['email'];
    $password = $_POST['password'];

    // Consulta para verificar se o usuário existe
    $stmt = $pdo->prepare('SELECT * FROM user WHERE email = :email');
    $stmt->execute(['email' => $email]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    // Verifica se o usuário foi encontrado e se a senha está correta
    if ($user && $password === $user['password']) {
        // Retorna o status de sucesso e o ID do usuário
        echo json_encode(['status' => 'success', 'userId' => $user['id']]);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Email ou Senha incorretos.']);
    }
}
?>
