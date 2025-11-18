/*
 * QUIZ TURBO v1.4
 * Cérebro do Quiz (com Randomização de Respostas)
 */

document.addEventListener('DOMContentLoaded', () => {

    // --- 1. ELEMENTOS DO DOM ---
    
    const introScreen = document.getElementById('quiz-intro-screen');
    const startButton = document.getElementById('start-quiz-button');
    const mainQuizContent = document.getElementById('quiz-main-content');
    const scoreDisplay = document.getElementById('score-display');
    const timeDisplay = document.getElementById('time-display');
    const questionNumberDisplay = document.getElementById('question-number');
    const questionText = document.getElementById('question-text');
    const answerOptions = document.getElementById('answer-options');
    const hintButton = document.getElementById('hint-button');
    const hintText = document.getElementById('hint-text');
    const finalFormScreen = document.getElementById('final-form-screen');
    const scoreForm = document.getElementById('score-form');
    const finalScoreDisplay = document.getElementById('final-score');
    const finalTimeDisplay = document.getElementById('final-time');
    const hiddenScoreInput = document.getElementById('hidden-score');
    const hiddenTimeInput = document.getElementById('hidden-time');


    // --- NOVO: FUNÇÃO PARA EMBARALHAR ARRAY (Fisher-Yates) ---
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }


    // --- 2. BANCO DE PERGUNTAS ---
    const questions = [
        {
            text: "O que é o Front-End?",
            type: 'mcq', // Múltipla Escolha
            hint: "É a parte que você vê e interage em um site, como os botões e o design.",
            points: 20,
            options: [
                { text: 'A parte visual e interativa do site (o que o usuário vê).', correct: true },
                { text: 'O banco de dados que salva as informações.', correct: false },
                { text: 'O servidor onde o site fica guardado.', correct: false },
                { text: 'A velocidade da sua internet.', correct: false },
                { text: 'O cabo de rede.', correct: false }
            ]
        },
        {
            text: "O que é o Back-End?",
            type: 'mcq',
            hint: "É o 'cérebro' do site, que fica no servidor e salva os dados (como o seu score!).",
            points: 20,
            options: [
                { text: 'O design, as cores e as fontes do site.', correct: false },
                { text: 'O servidor e o banco de dados (o que o usuário não vê).', correct: true },
                { text: 'O cabo de energia do computador.', correct: false },
                { text: 'A tela do celular.', correct: false },
                { text: 'O botão de "Like".', correct: false }
            ]
        },
        {
            text: "O que significa um profissional Full-Stack?",
            type: 'mcq',
            hint: "'Full' significa 'Completo'. Ele(a) mexe nas duas partes.",
            points: 20,
            options: [
                { text: 'Um especialista que só mexe com o visual (Front-End).', correct: false },
                { text: 'Um especialista que só mexe com servidores (Back-End).', correct: false },
                { text: 'Um profissional que entende TANTO de Front-End QUANTO de Back-End.', correct: true },
                { text: 'Um profissional que só conserta computadores.', correct: false },
                { text: 'Um profissional que desenha o logo do site.', correct: false }
            ]
        },
        {
            text: "Quem propôs, em 1989, um sistema para que cientistas compartilhassem documentos, dando origem à web?",
            type: 'mcq',
            hint: "O nome dele está nos slides da nossa apresentação!",
            points: 20,
            options: [
                { text: 'Bill Gates', correct: false },
                { text: 'Steve Jobs', correct: false },
                { text: 'Alan Turing', correct: false },
                { text: 'Mark Zuckerberg', correct: false },
                { text: 'Tim Berners-Lee', correct: true }
            ]
        },
        {
            text: "Qual termo é usado para um site que se ajusta automaticamente em celulares e computadores?",
            type: 'text', // Pergunta de Texto
            hint: "Começa com a letra 'R'. É a capacidade de 'responder' ao tamanho da tela.",
            points: 40, // Vale mais pontos
            answer: 'responsivo' 
        }
    ];

    // --- 3. ESTADO DO JOGO ---
    let currentQuestionIndex = 0;
    let score = 0;
    let timeLeft = 60; 
    let timerId;
    let gameIsOver = false;
    let hintUsed = false;
    let timeSpent = 0;

    // --- 4. FUNÇÕES PRINCIPAIS DO QUIZ ---

    function startTimer() {
        timeDisplay.innerText = `01:00`;
        timerId = setInterval(() => {
            timeLeft--;
            timeSpent++;
            
            const minutes = Math.floor(timeLeft / 60).toString().padStart(2, '0');
            const seconds = (timeLeft % 60).toString().padStart(2, '0');
            timeDisplay.innerText = `${minutes}:${seconds}`;

            if (timeLeft <= 10) {
                timeDisplay.parentElement.classList.add('timer-warning');
            }

            if (timeLeft <= 0) {
                endQuiz();
            }
        }, 1000);
    }

    function showQuestion(index) {
        if (index >= questions.length) {
            endQuiz(); // Acabou as perguntas
            return;
        }

        hintUsed = false;
        hintText.style.display = 'none';
        hintButton.disabled = false;
        
        const question = questions[index];
        questionText.innerText = question.text;
        questionNumberDisplay.innerText = `${index + 1} / ${questions.length}`;
        answerOptions.innerHTML = ''; 

        if (question.type === 'mcq') {
            // --- APLICAÇÃO DA RANDOMIZAÇÃO AQUI ---
            const shuffledOptions = shuffleArray([...question.options]); // Clona e embaralha o array de opções
            
            shuffledOptions.forEach(option => {
                const button = document.createElement('button');
                button.innerText = option.text;
                button.classList.add('cta-button', 'answer-button');
                button.onclick = () => selectAnswer(option.correct, question.points);
                answerOptions.appendChild(button);
            });
        } 
        else if (question.type === 'text') {
            const input = document.createElement('input');
            input.type = 'text';
            input.id = 'text-answer';
            input.placeholder = 'Digite sua resposta aqui'; 
            
            const submitButton = document.createElement('button');
            submitButton.innerText = 'Enviar Resposta';
            submitButton.classList.add('cta-button');
            
            submitButton.onclick = () => {
                const userAnswer = input.value.trim().toLowerCase();
                
                // 1. CHECA O EASTER EGG (XBOX)
                if (userAnswer === 'xbox') {
                    alert('CONQUISTA SECRETA DESBLOQUEADA! +1000 PONTOS BÔNUS!');
                    selectAnswer(true, 1000); 
                    return; 
                }
                
                // 2. CHECAGEM NORMAL (Responsivo)
                const isCorrect = (userAnswer === 'responsivo' || userAnswer === 'design responsivo');
                selectAnswer(isCorrect, question.points);
            };
            
            answerOptions.appendChild(input);
            answerOptions.appendChild(submitButton);
        }
    }

    function selectAnswer(isCorrect, points) {
        if (gameIsOver) return;

        if (isCorrect) {
            updateScore(points);
        }

        currentQuestionIndex++;
        showQuestion(currentQuestionIndex);
    }

    function updateScore(points) {
        score += points;
        scoreDisplay.innerText = score;
    }

    function showHint() {
        if (hintUsed) return;
        
        hintUsed = true;
        hintButton.disabled = true;
        updateScore(-10); // Penalidade da dica
        
        hintText.innerText = questions[currentQuestionIndex].hint;
        hintText.style.display = 'block';
    }

    function endQuiz() {
        if (gameIsOver) return;
        
        gameIsOver = true;
        clearInterval(timerId); 

        // Prepara o formulário final
        finalScoreDisplay.innerText = score;
        hiddenScoreInput.value = score;
        
        const minutesSpent = Math.floor(timeSpent / 60).toString().padStart(2, '0');
        const secondsSpent = (timeSpent % 60).toString().padStart(2, '0');
        const timeString = `${minutesSpent}:${secondsSpent}`;
        
        finalTimeDisplay.innerText = timeString;
        hiddenTimeInput.value = timeSpent;

        // Esconde o quiz principal e mostra a tela final
        mainQuizContent.style.display = 'none'; 
        finalFormScreen.style.display = 'flex';
    }

    // --- 5. ENVIO DO FORMULÁRIO (Fetch) ---
    scoreForm.addEventListener('submit', (e) => {
        e.preventDefault(); 
        const formData = new FormData(scoreForm);
        
        scoreForm.querySelector('button').disabled = true;
        scoreForm.querySelector('button').innerText = 'Salvando...';

        fetch('salvar_pontos.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.text())
        .then(data => {
            if (data === "Sucesso") {
                window.location.href = 'ranking.php';
            } else {
                alert('Erro ao salvar: ' + data);
                scoreForm.querySelector('button').disabled = false;
                scoreForm.querySelector('button').innerText = 'Salvar no Ranking';
            }
        })
        .catch(error => {
            console.error('Erro no Fetch:', error);
            alert('Não foi possível conectar ao servidor. Verifique o XAMPP.');
            scoreForm.querySelector('button').disabled = false;
            scoreForm.querySelector('button').innerText = 'Salvar no Ranking';
        });
    });

    // --- 6. FUNÇÃO DE INICIALIZAÇÃO ---
    function startQuiz() {
        introScreen.style.display = 'none';
        mainQuizContent.style.display = 'block';
        hintButton.addEventListener('click', showHint);
        showQuestion(currentQuestionIndex);
        startTimer();
    }

    // --- 7. "OUVINTE" DE EVENTO INICIAL ---
    startButton.addEventListener('click', startQuiz);

});