document.addEventListener('DOMContentLoaded', function () {
    // Manipula o evento de exibição do modal
    document.addEventListener('show-modal', function () {
        document.getElementById('thank-you-modal').style.display = 'block';
    });

    // Fecha o modal quando o usuário clica fora da área do modal
    window.onclick = function(event) {
        if (event.target === document.getElementById('thank-you-modal')) {
            document.getElementById('thank-you-modal').style.display = 'none';
        }
    };
});
