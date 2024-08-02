// form-handler.js

document.getElementById('signup-form').addEventListener('submit', function (event) {
    event.preventDefault(); // Evita o envio padrão do formulário

    // Mostra o indicador de carregamento
    document.getElementById('loading-overlay').style.display = 'flex';

    // Coleta os dados do formulário
    var formData = new FormData(this);

    // Envia os dados para o servidor
    fetch('https://script.google.com/macros/s/AKfycbyaMY5_ZKSmOPNMn8mc_Lpg50bdR9iAoFMdL8qlh7pO9bTWBlG3MWtU9FSannUYwb6O-g/exec', {
        method: 'POST',
        body: formData
    }).then(response => {
        if (response.ok) {
            // Exibe o modal de agradecimento
            document.getElementById('thank-you-modal').style.display = 'block';
        } else {
            alert('Houve um problema ao enviar o formulário. Por favor, tente novamente.');
        }
    }).catch(error => {
        console.error('Erro ao enviar o formulário:', error);
        alert('Houve um problema ao enviar o formulário. Por favor, tente novamente.');
    }).finally(() => {
        // Esconde o indicador de carregamento
        document.getElementById('loading-overlay').style.display = 'none';
    });
});


