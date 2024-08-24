<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
require 'db_connect.php';  // Certifique-se de que o caminho está correto

$titulo = $_POST['titulo'] ?? '';
$data = $_POST['data'] ?? '';
$descricao = $_POST['descricao'] ?? '';
$concluido = isset($_POST['concluido']) ? (int)$_POST['concluido'] : 0;
$usuarioId = $_POST['userId'] ?? '';

if (!$titulo || !$data || !$descricao || !$usuarioId) {
    echo json_encode(['error' => 'Dados incompletos']);
    exit;
}

$sql = "INSERT INTO lista (Title, Description, Date, IsFinished, UsuarioID) VALUES (?, ?, ?, ?, ?)";
$stmt = $pdo->prepare($sql);

if ($stmt->execute([$titulo, $descricao, $data, $concluido, $usuarioId])) {
    echo json_encode(['success' => 'Tarefa adicionada com sucesso']);
} else {
    echo json_encode(['error' => 'Erro ao adicionar tarefa']);
}
?>
