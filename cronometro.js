// cronometro.js
function startCountdown(duration, display) {
    let timer = duration, minutes, seconds;
    const promoModal = document.getElementById('promo-modal');
    const closeButton = document.querySelector('.modal-content .close');

    // Limpa o intervalo anterior, se houver
    if (typeof window.timerInterval !== 'undefined') {
        clearInterval(window.timerInterval);
    }

    window.timerInterval = setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds;

        if (--timer < 0) {
            clearInterval(window.timerInterval); // Para o intervalo
            promoModal.style.display = 'block'; // Mostra o modal quando o tempo acabar
        }
    }, 1000);

    // Adiciona o evento de fechar ao botão de fechar do modal
    closeButton.onclick = function() {
        promoModal.style.display = 'none';
    }

    // Adiciona o evento de fechar ao clicar fora da caixa de conteúdo
    window.onclick = function(event) {
        if (event.target === promoModal) {
            promoModal.style.display = 'none';
        }
    }
}

window.onload = function () {
    let countdownDuration = 9, // Duração do cronômetro em segundos
        display = document.querySelector('#countdown');
    startCountdown(countdownDuration, display);
};
