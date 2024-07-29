

// Função para monitorar a exibição da seção
function trackCheckoutView() {
    var checkoutSection = document.querySelector('.checkout');
    var hasTracked = false;

    // Criação de um observer para monitorar a visibilidade da seção
    var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting && !hasTracked) {
                fbq('track', 'ViewContent', {
                    content_name: 'Checkout Section',
                    content_category: 'Checkout',
                    value: 0.00
                });
                hasTracked = true; // Para garantir que o evento seja disparado apenas uma vez
            }
        });
    }, { threshold: [0.1] }); // Ajuste o threshold conforme necessário

    // Começar a observar a seção
    if (checkoutSection) {
        observer.observe(checkoutSection);
    }
}

// Chamar a função para iniciar o rastreamento quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', function () {
    trackCheckoutView();
});