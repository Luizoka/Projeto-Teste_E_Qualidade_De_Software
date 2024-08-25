<?php
header('Content-Type: application/json');
require 'db_connect.php';

$userId = $_GET['userId'] ?? null;
$filtro = $_GET['filtro'] ?? 'todos';

if ($userId) {
    $sql = 'SELECT * FROM lista WHERE UsuarioID = :userId';

    if ($filtro === 'hoje') {
        $sql .= ' AND Date = CURDATE()';
    } elseif ($filtro === 'concluido') {
        $sql .= ' AND IsFinished = 1';
    }

    $stmt = $pdo->prepare($sql);
    $stmt->execute(['userId' => $userId]);
    $tarefas = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($tarefas);
} else {
    echo json_encode(['error' => 'User ID not provided.']);
}
?>
