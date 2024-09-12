<?php
header('Content-Type: application/json');

include 'db_connect.php';

$tarefaId = $_POST['tarefaId'] ?? null;
$titulo = $_POST['titulo'] ?? null;
$data = $_POST['data'] ?? null;
$descricao = $_POST['descricao'] ?? null;
$concluido = $_POST['concluido'] ?? null;

// Atualização geral da tarefa (título, data, descrição e status)
if ($tarefaId && $titulo && $data && $descricao !== null) {
    $stmt = $pdo->prepare('UPDATE list SET title = :titulo, date = :data, description = :descricao, isfinished = :concluido WHERE id = :tarefaId');
    $stmt->execute([
        'tarefaId' => $tarefaId,
        'titulo' => $titulo,
        'data' => $data,
        'descricao' => $descricao,
        'concluido' => $concluido
    ]);

    echo json_encode(['success' => 'Tarefa atualizada com sucesso']);
}

// Atualização apenas do status da tarefa
elseif ($tarefaId !== null && $concluido !== null) {
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
    echo json_encode(['error' => 'Dados insuficientes para atualizar a tarefa']);
}
?>
