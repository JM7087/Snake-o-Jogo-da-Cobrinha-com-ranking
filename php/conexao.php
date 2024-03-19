<?php

// Configurações do banco de dados
$host = 'localhost';
$dbname = 'snake_ranking';
$username = 'seu usuario';
$password = 'sua senha';

// Tentar estabelecer a conexão com o banco de dados
try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die("Erro ao conectar: " . $e->getMessage());
}
