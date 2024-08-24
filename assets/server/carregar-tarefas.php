<?php
header('Content-Type: application/json');

include 'db_connect.php';

$userId = $_GET['userId'] ?? null;

if ($userId) {
    $stmt = $pdo->prepare('SELECT * FROM lista WHERE UsuarioID = :userId');
    $stmt->execute(['userId' => $userId]);
    $tarefas = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($tarefas);
} else {
    echo json_encode(['error' => 'User ID not provided.']);
}
?>
