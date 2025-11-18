<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>:: QUIZ - PROGRAMAÇÃO WEB ::</title>
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
    
    <canvas id="starfield-canvas"></canvas>

    <div class="container">
        <header class="main-header">
            <div class="logo">
                <h1>PROGRAMAÇÃO WEB</h1>
            </div>
            <p class="subtitle">2° EMTI - Feira de Informática</p>
        </header>

        <nav class="main-nav">
            <a href="index.html">:: Home ::</a>
            <a href="quiz.php" class="nav-active">Iniciar Quiz!</a>
            <a href="ranking.php">Hall da Fama</a>
        </nav>

        <main>
            <div class="content-box quiz-container">
                
                <div id="quiz-intro-screen">
                    <h2>[ PREPARE-SE! ]</h2>
                    <p>O Quiz Turbo começa assim que você clicar em "Começar".</p>
                    <ul>
                        <li>Você tem <strong>60 segundos</strong> para responder 5 perguntas.</li>
                        <li>Usar a dica custa <strong>10 pontos</strong>.</li>
                        <li>A pergunta final (de texto) vale mais!</li>
                    </ul>
                    <button id="start-quiz-button" class="cta-button large">COMEÇAR AGORA!</button>
                </div>

                <div id="quiz-main-content" style="display: none;">

                    <div class="quiz-ui">
                        <div class="ui-box">
                            <span>PONTOS</span>
                            <span id="score-display">0</span>
                        </div>
                        <div class="ui-box">
                            <span>QUESTÃO</span>
                            <span id="question-number">1 / 5</span>
                        </div>
                        <div class="ui-box timer">
                            <span>TEMPO</span>
                            <span id="time-display">01:00</span>
                        </div>
                    </div>
                    <div class="question-area">
                        <h2 id="question-text">Carregando pergunta...</h2>
                    </div>
                    <div class="hint-container">
                        <button id="hint-button" class="cta-button small">💡 Pedir Dica (-10 Pontos)</button>
                        <p id="hint-text" style="display: none;"></p>
                    </div>
                    <div id="answer-options">
                        </div>

                </div> <div id="final-form-screen" class="game-overlay" style="display: none;">
                    
                    <h2>[ QUIZ FINALIZADO! ]</h2>
                    
                    <h3 class="form-thank-you">Obrigado por jogar!</h3>
                    
                    <form id="score-form" method="POST">
                        <p>Sua pontuação final: <strong id="final-score">0</strong></p>
                        <p>Seu tempo: <strong id="final-time">00:00</strong></p>
                        
                        <hr>
                        
                        <input type="text" id="nome-jogador" name="nome_jogador" placeholder="Seu nome completo" required>
                        <input type="text" id="serie-jogador" name="serie_jogador" placeholder="Sua série (ex: 2º reg 1)" required>
                        
                        <label>Deixe uma mensagem para os próximos visitantes:</label>
                        <textarea id="mensagem-jogador" name="mensagem_jogador" rows="3" placeholder="Sua dica ou comentário..."></textarea>
                        
                        <input type="hidden" id="hidden-score" name="pontuacao">
                        <input type="hidden" id="hidden-time" name="tempo_gasto">
                        
                        <button type="submit" class="cta-button">Salvar no Ranking</button>
                    </form>
                </div>

            </div>
        </main>

        <footer class="main-footer">
            <p>© 2025 - Projeto Feira de Informática "Programação Web".</p>
            <p>Este site é um projeto educacional. Logotipos e marcas são usados para fins de demonstração.</p>
        </footer>

    </div> 
    
    <script src="js/quiz.js"></script>
    
    <script src="js/starfield.js"></script> 
</body>
</html>