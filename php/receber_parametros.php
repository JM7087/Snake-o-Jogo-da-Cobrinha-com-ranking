<?php

require_once 'conexao.php';

// Verificar se foram passados os parâmetros
if (isset($_GET['nome']) && isset($_GET['pontos'])) {
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
            echo "Pontuação atualizada com sucesso!";
        } else {
            echo "A pontuação informada não é maior do que a pontuação atual.";
        }
    } else {
        // Se o jogador não existe, inserir no banco
        $stmt = $pdo->prepare("INSERT INTO jogadores (nome, pontos) VALUES (:nome, :pontos)");
        $stmt->execute(['nome' => $nome, 'pontos' => $pontos]);
        echo "Jogador cadastrado com sucesso!";
    }
} else {
    echo "Por favor, forneça os parâmetros 'nome' e 'pontos'.  exemplo receber_parametros.php?nome=NomeDoJogador&pontos=100";
}
