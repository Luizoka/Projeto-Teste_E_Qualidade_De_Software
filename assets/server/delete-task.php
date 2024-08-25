<?php
header('Content-Type: application/json');

include 'db_connect.php';

$tarefaId = $_POST['tarefaId'] ?? null;

if ($tarefaId) {
    $stmt = $pdo->prepare('DELETE FROM lista WHERE id = :tarefaId');
    $stmt->execute(['tarefaId' => $tarefaId]);
    
    echo json_encode(['success' => 'Tarefa excluída com sucesso']);
} else {
    echo json_encode(['error' => 'ID da tarefa não fornecido']);
}
?>
