# Snake o Jogo da Cobrinha com Ranking

<h2 align="center">Capturas de Tela</h2>

<img src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjI9YELZ6nT1Y3byZGxk9L_XwPN4GfhRbmlDoUeXhchRY0ZlYVdRgokXMRY9p6FQMqS5jcENwYz2wQMphMCmwvy1V803rnmoVbRzKLH6B4omIRpvBikSqmGQyWRSz09XZBNGPbUTjPCYYwIw0iwWIO9tJLYgmBmuUj6aHDrDlLY2HpQGXA3PSvPjPcWu_jE" width="800">

<img src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjeT0m3vfg884LJbviNFyT9ELJhOLpw90pqtfc3y_1XDsASlKaOVQage9h9AIvqTKbVDaNiAxBT8NI_GF6rCxhSpxVqVwL9lqKWOs4LXJPjWS7fKeTMdqMYdHAkr5Vs_wOtcBznW88k7RtrPmqyQ0h1EJDfOjwbreL2SkNGKnvLNpDhZLvTjfEOjmJYkRss" width="800">

<img src="https://blogger.googleusercontent.com/img/a/AVvXsEhB9N_6YoURUiRvk5dhRqZbZB_e9ydFdlkhdNR2cVwLJNwb4jzLQHdttsSLDRMv0k1ijp9HZuVcoVYJZVaIIqmIlcXGH7C4xkcXE5b9HvUHMdfwrPVlP-fDQbi8VRsyEM3pd9m7Wkag1KHqjJW3Qg79HFnh32HFOnd2Ly0icMCHTfUdK7MhePBPc90rUoL3" width="800">

## Configuração

1. **Clonando o repositório:**
- Coloque a pasta em um servidor PHP local como o XAMPP

2. **Importando o banco de dados:**
- Execute o script SQL fornecido (`script.sql`) para criar o banco de dados e a tabela necessária no MySQL.

```
  -- Criação do banco de dados
CREATE DATABASE IF NOT EXISTS snake_ranking;

-- Selecionar o banco de dados
USE snake_ranking;

-- Criação da tabela de jogadores
CREATE TABLE IF NOT EXISTS jogadores (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    pontos INT NOT NULL
);

-- Criação de usuários 
CREATE USER 'nome_do_usuario'@'localhost' IDENTIFIED VIA mysql_native_password USING 'sua_senha';
GRANT SELECT, INSERT, UPDATE, DELETE ON snake_ranking * TO 'nome_do_usuario'@'localhost';
```

3. **Configurando a conexão com o banco de dados:**
- Edite o arquivo `conexao.php` e atualize as informações de conexão com o seu banco de dados MySQL.

```
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
```

# Como Jogar
- No navegar vai em localhost/o nome da pasta
- Insira seu nome no campo indicado e clique no botão "Iniciar Jogo".
- Para jogar basta usar as setas do teclado ⬅️ ⬆️ ➡️ ⬇️ ou Clicar com o 🖱 e controlar a 🐍

## Contribuição

Contribuições são bem-vindas! Se você encontrar algum problema ou tiver alguma sugestão de melhoria, por favor, abra uma issue ou envie um pull request.

## Créditos

- Desenvolvido por [João Marcos](https://grupo.jm7087.com)

  
