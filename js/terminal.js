document.addEventListener('DOMContentLoaded', () => {

    // --- 1. REFERÊNCIAS DOS ELEMENTOS ---

    const terminalText = document.getElementById('terminal-text');
    const commandButtons = document.querySelectorAll('.command'); 

    // Se não houver terminal nesta página, para o script

    if (!terminalText || commandButtons.length === 0) {
        return;
    }

    // --- 2. CONTEÚDO DO TERMINAL (ATUALIZADO) ---

    const commandResponses = {
        'html': {
            prompt: 'C:\\> HTML.exe',
            text: 'É a estrutura (esboço) de todo o site. Define onde ficam os títulos, parágrafos e imagens.'
        },
        'css': {
            prompt: 'C:\\> CSS.exe',
            text: 'É o estilo (pintura) que dá essa "cara" de Xbox. Define as cores, fontes e o layout da página.'
        },
        'javascript': {
            prompt: 'C:\\> JAVASCRIPT.exe',
            text: 'É a interatividade (o motor) que faz este terminal funcionar! Ele controla o quiz, o timer e os anúncios.'
        },
        'xampp': {
            prompt: 'C:\\> XAMPP.bat',
            text: "É o nosso \"cérebro\" (servidor) local. O PHP e o MySQL do XAMPP são a dupla de Back-End que salva sua pontuação no ranking."
        }
    };
    
    let isTyping = false; // Trava para impedir cliques duplos
    let currentTypingTimeout; // Armazena o timer da digitação

    // --- 3. FUNÇÃO DO EFEITO DE DIGITAÇÃO ---

    function typeEffect(element, text, prompt) {
        // Se já estiver digitando, para a animação anterior
        if (isTyping) {
            clearTimeout(currentTypingTimeout);
            isTyping = false;
        }

        // Começa a nova animação
    
        isTyping = true;
        let i = 0;
        const speed = 25; // Velocidade da digitação (em milissegundos)
        
        // Limpa o terminal e mostra o "prompt" (ex: C:\>)

        element.innerHTML = `<span class="terminal-prompt">${prompt}</span> `;
        
        const textToType = text;

        function type() {
            if (i < textToType.length) {
                element.innerHTML += textToType.charAt(i);
                i++;
                currentTypingTimeout = setTimeout(type, speed);
            } else {
                // Adiciona o cursor piscando no final
                element.innerHTML += '<span class="terminal-cursor">_</span>';
                isTyping = false;
            }
        }
        type();
    }

    // --- 4. OUVIR OS CLIQUES NOS BOTÕES ---

    commandButtons.forEach(button => {
        button.addEventListener('click', () => {

            // Pega o 'data-command' do botão (ex: "html")

            const command = button.dataset.command;
            
            // Pega a resposta correspondente

            const response = commandResponses[command];
            
            // Inicia o efeito (se houver uma resposta e não estiver digitando)

            if (response && !isTyping) {
                typeEffect(terminalText, response.text, response.prompt);
            }
        });
    });

    // Inicia o terminal com uma mensagem de boas-vindas
    
    typeEffect(terminalText, 'Clique em um comando acima para executar...', 'C:\\>');
});