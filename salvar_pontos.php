<?php
// salvar_pontos.php

// Inclui a configuração do banco de dados
include 'config.php';

// Verifica se os dados do formulário foram enviados via POST
if ($_SERVER["REQUEST_METHOD"] == "POST") {

    // --- 1. Coleta Segura dos Dados ---
    $nome_jogador = '';
    $pontuacao = 0;
    $serie = '';
    $mensagem = '';
    $tempo_gasto = 0;

    if (isset($_POST['nome_jogador'])) {
        $nome_jogador = $conn->real_escape_string($_POST['nome_jogador']);
    }
    if (isset($_POST['pontuacao'])) {
        $pontuacao = intval($_POST['pontuacao']); 
    }
    if (isset($_POST['serie_jogador'])) {
        $serie = $conn->real_escape_string($_POST['serie_jogador']);
    }
    if (isset($_POST['mensagem_jogador'])) {
        $mensagem = $conn->real_escape_string($_POST['mensagem_jogador']);
    }
    if (isset($_POST['tempo_gasto'])) {
        $tempo_gasto = intval($_POST['tempo_gasto']);
    }

    // --- 2. Validação ---
    if (empty($nome_jogador)) {
        echo "Erro: Nome do jogador não pode estar vazio.";
        exit(); 
    }
    
    // --- 3. Preparação do SQL (A ORDEM DAS COLUNAS ESTÁ AQUI) ---
    $sql = "INSERT INTO pontuacoes (nome, pontuacao, serie, mensagem, tempo_gasto) VALUES (?, ?, ?, ?, ?)";

    if ($stmt = $conn->prepare($sql)) {
        
        // --- A CORREÇÃO DO BUG ESTÁ AQUI ---
        // A ordem das variáveis DEVE bater com a ordem do SQL acima:
        // 1. nome (s)
        // 2. pontuacao (i)
        // 3. serie (s)
        // 4. mensagem (s)
        // 5. tempo_gasto (i)
        // O código de tipos correto é: "sissi"
        
        $stmt->bind_param("sissi", $nome_jogador, $pontuacao, $serie, $mensagem, $tempo_gasto);
        // (A versão anterior estava "ssisi", o que causou o bug)

        // --- 4. Execução ---
        if ($stmt->execute()) {
            echo "Sucesso"; // O JavaScript (quiz.js) vai ler esta resposta
            exit();
        } else {
            echo "Erro SQL: " . $stmt->error;
            exit();
        }
        $stmt->close();
    } else {
        echo "Erro de Preparação: " . $conn->error;
        exit();
    }

    $conn->close();

} else {
    header("location: index.html");
    exit();
}
?>