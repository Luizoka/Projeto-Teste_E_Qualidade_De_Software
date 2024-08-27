<?php
include 'db_connect.php'; 

header('Content-Type: application/json');

try {
    if (isset($_GET['userId'])) {
        $userId = $_GET['userId'];

        $stmt = $pdo->prepare("SELECT name FROM usuario WHERE id = :id");
        $stmt->bindParam(':id', $userId, PDO::PARAM_INT);

        if ($stmt->execute()) {
            $userName = $stmt->fetchColumn();

            if ($userName) {
                echo json_encode(['success' => true, 'userName' => $userName]);
            } else {
                echo json_encode(['success' => false, 'message' => 'Usuário não encontrado']);
            }
        } else {
            echo json_encode(['success' => false, 'message' => 'Erro ao executar a consulta']);
        }
    } else {
        echo json_encode(['success' => false, 'message' => 'Parâmetro userId não fornecido']);
    }
} catch (Exception $e) {
    echo json_encode(['success' => false, 'message' => 'Erro no servidor: ' . $e->getMessage()]);
}
?>
