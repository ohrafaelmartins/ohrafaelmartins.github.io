let cronometro;
let segundos = 0, minutos = 0, horas = 0;

function iniciarCronometro() {
    cronometro = setInterval(() => {
        segundos++;
        if (segundos === 60) {
            segundos = 0;
            minutos++;
            if (minutos === 60) {
                minutos = 0;
                horas++;
            }
        }
        atualizarCronometro();
    }, 1000);
}

function pausarCronometro() {
    clearInterval(cronometro);
}

function zerarCronometro() {
    clearInterval(cronometro);
    segundos = 0;
    minutos = 0;
    horas = 0;
    atualizarCronometro();
}

function atualizarCronometro() {
    const display = document.getElementById('cronometro');
    display.textContent = 
        (horas < 10 ? '0' + horas : horas) + ':' +
        (minutos < 10 ? '0' + minutos : minutos) + ':' +
        (segundos < 10 ? '0' + segundos : segundos);
}
