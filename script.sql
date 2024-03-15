-- Criação do banco de dados
CREATE DATABASE IF NOT EXISTS snake_ranking;

-- Selecionar o banco de dados
USE nome_do_seu_banco;

-- Criação da tabela de jogadores
CREATE TABLE IF NOT EXISTS jogadores (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    pontos INT NOT NULL
);

CREATE USER 'nome_do_usuario'@'localhost' IDENTIFIED VIA mysql_native_password USING 'sua_senha';
GRANT SELECT, INSERT, UPDATE, DELETE ON snake_ranking * TO 'nome_do_usuario'@'localhost';