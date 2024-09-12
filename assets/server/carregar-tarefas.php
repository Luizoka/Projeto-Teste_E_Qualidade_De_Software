<?php
header('Content-Type: application/json');
require 'db_connect.php';

$userId = $_GET['userId'] ?? null;
$filtro = $_GET['filtro'] ?? 'todos';

if ($userId) {
    $sql = 'SELECT * FROM list WHERE userid = :userId';

    if ($filtro === 'hoje') {
        $sql .= ' AND date = CURDATE()';
    } elseif ($filtro === 'concluido') {
        $sql .= ' AND isfinished = 1';
    }

    $stmt = $pdo->prepare($sql);
    $stmt->execute(['userId' => $userId]);
    $tarefas = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($tarefas);
} else {
    echo json_encode(['error' => 'User ID not provided.']);
}
?>
