<?php
// ranking.php
include 'config.php'; // Inclui a conexão com o banco
?>
<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>:: HALL DA FAMA - PROGRAMAÇÃO WEB ::</title>
    <meta http-equiv="refresh" content="10">
    <link rel="stylesheet" href="css/style.css">
</head>
<body>

    <canvas id="starfield-canvas"></canvas>

    <div class="container">

        <header class="main-header">
            <div class="logo">
                <h1>PROGRAMAÇÃO WEB</h1>
            </div>
            <p class="subtitle">Os maiores pontuadores da Feira!</p>
        </header>

        <nav class="main-nav">
            <a href="index.html">:: Home ::</a>
            <a href="quiz.php">Iniciar Quiz!</a>
            <a href="ranking.php" class="nav-active">Hall da Fama</a>
        </nav>

        <main>
            <div class="content-box">
                <h2>[ Ranking Oficial - Quiz Turbo ]</h2>
                <p>Veja quem são os mestres da Programação Web na nossa feira! O ranking é ordenado pela maior pontuação no menor tempo.</p>

                <table class="ranking-table">
                    <thead>
                        <tr>
                            <th class="col-pos">Pos.</th>
                            <th class="col-nome">Nome / Série</th>
                            <th class="col-pontos">Pontos</th>
                            <th class="col-tempo">Tempo</th>
                            <th class="col-msg">Mensagem</th>
                        </tr>
                    </thead>
                    <tbody>
                        <?php
                        
                        $sql = "SELECT nome, serie, pontuacao, tempo_gasto, mensagem 
                                FROM pontuacoes 
                                ORDER BY pontuacao DESC, tempo_gasto ASC 
                                LIMIT 10"; 
                        
                        if ($result = $conn->query($sql)) {
                            if ($result->num_rows > 0) {
                                $posicao = 1;
                                
                                while ($row = $result->fetch_assoc()) {
                                    
                                    $tempo_gasto = intval($row['tempo_gasto']);
                                    $minutos = floor($tempo_gasto / 60);
                                    $segundos = $tempo_gasto % 60;
                                    $tempo_formatado = sprintf('%02d:%02d', $minutos, $segundos);

                                    $row_class = ''; 
                                    $icon = '';      
                                    
                                    if ($posicao == 1) {
                                        $row_class = ' class="rank-first-place"'; 
                                        $icon = '👑 '; 
                                    }

                                    echo "<tr{$row_class}>";
                                    
                                    echo "<td class='col-pos'>" . $posicao++ . "º</td>";
                                    
                                    echo "<td class='col-nome'>";
                                    echo "<strong class='rank-name-text'>" . $icon . htmlspecialchars($row['nome']) . "</strong>"; 
                                    echo "<small class='rank-series-text'>" . htmlspecialchars($row['serie']) . "</small>"; 
                                    echo "</td>";
                                    
                                    echo "<td class='col-pontos'>" . htmlspecialchars($row['pontuacao']) . "</td>";
                                    echo "<td class='col-tempo'>" . $tempo_formatado . "</td>";
                                    echo "<td class='col-msg'>" . htmlspecialchars($row['mensagem']) . "</td>";
                                    
                                    echo "</tr>";
                                }
                            } else {
                                echo '<tr><td colspan="5" class="no-data">Nenhuma pontuação registrada ainda. Seja o primeiro!</td></tr>';
                            }
                        } else {
                            echo '<tr><td colspan="5" class="no-data">Erro ao carregar o ranking: ' . $conn->error . '</td></tr>';
                        }

                        $conn->close();
                        ?>
                    </tbody>
                </table>
            </div>
        </main>

        <footer class="main-footer">
            <p>© 2025 - Projeto Feira de Informática "Programação Web".</p>
            <p>Este site é um projeto educacional. Logotipos e marcas são usados para fins de demonstração.</p>
        </footer>

    </div>
    
    <script src="js/starfield.js"></script> 
</body>
</html>