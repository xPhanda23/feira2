<?php
// config.php

// Variáveis de conexão com o banco de dados
define('DB_SERVER', 'localhost'); // Geralmente é 'localhost' no XAMPP
define('DB_USERNAME', 'root');    // Usuário padrão do MySQL no XAMPP
define('DB_PASSWORD', '');        // Senha padrão do MySQL no XAMPP (geralmente vazio)
define('DB_NAME', 'feira_web_db'); // Nome do banco de dados que você criou

// Tenta fazer a conexão
$conn = new mysqli(DB_SERVER, DB_USERNAME, DB_PASSWORD, DB_NAME);

// Checa a conexão
if ($conn->connect_error) {
    die("Erro na conexão com o banco de dados: " . $conn->connect_error);
}

// Define o conjunto de caracteres para evitar problemas com acentos
$conn->set_charset("utf8mb4");
?>