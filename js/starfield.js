/*
 * STARFIELD EFFECT v1.0
 * Pure JavaScript background animation (no external images)
 */

document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('starfield-canvas');
    if (!canvas) return; // Se não houver canvas (ex: em quiz.php), o script para

    const ctx = canvas.getContext('2d');

    // Define o tamanho inicial do canvas para o tamanho total da janela
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Atualiza o tamanho se a janela for redimensionada
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });

    const numStars = 200; // Número de estrelas
    const starColor = '#444444'; // Cor sutil (cinza escuro)

    // --- Classe Star ---
    class Star {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.z = Math.random() * 10; // Profundidade (para variar velocidade e tamanho)
            this.size = 1 + (this.z / 3); 
            this.speed = 1 + (this.z / 2); // Estrelas mais 'próximas' (z alto) são mais rápidas
        }

        draw() {
            ctx.fillStyle = starColor;
            ctx.fillRect(this.x, this.y, this.size, this.size);
        }

        update() {
            this.y += this.speed;

            // Se a estrela sair da tela, ela volta ao topo
            if (this.y > canvas.height) {
                this.y = 0;
                this.x = Math.random() * canvas.width;
            }
        }
    }

    // --- Inicialização ---
    let stars = [];
    for (let i = 0; i < numStars; i++) {
        stars.push(new Star());
    }

    // --- Loop de Animação (requestAnimationFrame) ---
    function animate() {
        // Limpa o frame anterior (fundo preto)
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Atualiza e desenha todas as estrelas
        stars.forEach(star => {
            star.update();
            star.draw();
        });

        // Pede para o navegador desenhar o próximo frame
        requestAnimationFrame(animate);
    }

    // Inicia o loop
    animate();
});