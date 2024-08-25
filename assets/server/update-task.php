<?php
header('Content-Type: application/json');

include 'db_connect.php';

$tarefaId = $_POST['tarefaId'] ?? null;
$titulo = $_POST['titulo'] ?? null;
$data = $_POST['data'] ?? null;
$descricao = $_POST['descricao'] ?? null;
$concluido = $_POST['concluido'] ?? null;

if ($tarefaId && $titulo && $data && $descricao !== null) {
    $stmt = $pdo->prepare('UPDATE lista SET Title = :titulo, Date = :data, Description = :descricao, IsFinished = :concluido WHERE id = :tarefaId');
    $stmt->execute([
        'tarefaId' => $tarefaId,
        'titulo' => $titulo,
        'data' => $data,
        'descricao' => $descricao,
        'concluido' => $concluido
    ]);
    
    echo json_encode(['success' => 'Tarefa atualizada com sucesso']);
} else {
    echo json_encode(['error' => 'Dados insuficientes para atualizar a tarefa']);
}
?>
