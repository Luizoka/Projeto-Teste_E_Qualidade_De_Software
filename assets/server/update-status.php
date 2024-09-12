<?php
header('Content-Type: application/json');

include 'db_connect.php';

// Recebe o input JSON e decodifica para um array associativo
$data = json_decode(file_get_contents('php://input'), true);

$tarefaId = $data['id'] ?? null; // Alterado de 'ID' para 'id'
$concluido = $data['isfinished'] ?? null; // Alterado de 'IsFinished' para 'isfinished'

if ($tarefaId !== null && $concluido !== null) {
    $stmt = $pdo->prepare('UPDATE list SET isfinished = :concluido WHERE id = :tarefaId');
    $stmt->execute([
        'tarefaId' => $tarefaId,
        'concluido' => $concluido
    ]);

    if ($stmt->rowCount() > 0) {
        echo json_encode(['success' => true, 'message' => 'Status da tarefa atualizado com sucesso.']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Nenhuma tarefa foi atualizada.']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Dados insuficientes para atualizar a tarefa.']);
}
?>
