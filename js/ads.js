/**
 * Sistema de Anúncios Educacionais - X-Portal (v1.0)
 * Roda os banners educativos no topo do site.
 */

document.addEventListener('DOMContentLoaded', () => {

    // 1. DADOS DOS ANÚNCIOS (Banners)
    const educationalAds = [
        {
            title: 'HTML v4.01',
            desc: 'A ESTRUTURA da web!',
            color: '#E44D26', // Laranja HTML
            textColor: '#fff'
        },
        {
            title: 'CSS v2.1',
            desc: 'O ESTILO do portal!',
            color: '#1572B6', // Azul CSS
            textColor: '#fff'
        },
        {
            title: 'JavaScript [ES3]',
            desc: 'O PODER da interação!',
            color: '#F7DF1E', // Amarelo JS
            textColor: '#000'
        },
        {
            title: 'XAMPP Server',
            desc: 'PHP/MySQL: O CÉREBRO do ranking!',
            color: '#777BB4', // Roxo PHP
            textColor: '#fff'
        }
    ];

    // 2. REFERÊNCIA DO ELEMENTO
    const adContainer = document.getElementById('ad-rotator');
    if (!adContainer) {
        // Se não estiver na página (ex: jogo.php), apenas para o script
        return;
    }

    let currentAdIndex = 0;

    // 3. FUNÇÃO PARA MUDAR O ANÚNCIO
    function changeAd() {
        const ad = educationalAds[currentAdIndex];

        // Cria o HTML do banner
        const adHTML = `
            <a href="#" class="ad-banner" style="background-color: ${ad.color}; color: ${ad.textColor};">
                <h3>${ad.title}</h3>
                <p>${ad.desc}</p>
            </a>
        `;
        
        adContainer.innerHTML = adHTML;

        // Prepara o próximo índice
        currentAdIndex++;
        if (currentAdIndex >= educationalAds.length) {
            currentAdIndex = 0;
        }
    }

    // 4. INICIAR O ROTATOR
    // Muda o anúncio a cada 5 segundos
    setInterval(changeAd, 5000);

    // Carrega o primeiro anúncio
    changeAd();
});