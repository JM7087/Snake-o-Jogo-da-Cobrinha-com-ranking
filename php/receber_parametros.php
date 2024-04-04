<?php

require_once 'conexao.php';

// adicione uma senha
$senha = $_GET['senha'];

// Verificar se foram passados os parâmetros
if (isset($_GET['nome']) && isset($_GET['pontos']) && $senha === ' uma senha para evitar inserir na url') {
    $nome = $_GET['nome'];
    $pontos = $_GET['pontos'];

    // Verificar se o jogador já existe no banco
    $stmt = $pdo->prepare("SELECT * FROM jogadores WHERE nome = :nome");
    $stmt->execute(['nome' => $nome]);
    $jogador = $stmt->fetch();

    if ($jogador) {
        // Se o jogador já existe, atualizar os pontos se a nova pontuação for maior
        if ($pontos > $jogador['pontos']) {
            $stmt = $pdo->prepare("UPDATE jogadores SET pontos = :pontos WHERE id = :id");
            $stmt->execute(['pontos' => $pontos, 'id' => $jogador['id']]);
            echo json_encode(["message" => "Pontuação atualizada com sucesso!"]);
        } else {
            echo json_encode(["message" => "A pontuação informada não é maior do que a pontuação atual."]);
        }
    } else {
        // Se o jogador não existe, inserir no banco
        $stmt = $pdo->prepare("INSERT INTO jogadores (nome, pontos) VALUES (:nome, :pontos)");
        $stmt->execute(['nome' => $nome, 'pontos' => $pontos]);
        echo json_encode(["message" => "Jogador cadastrado com sucesso!"]);
    }
}
