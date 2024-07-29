// facebook-pixel.js
!function (f, b, e, v, n, t, s) {
    if (f.fbq) return; 
    n = f.fbq = function () {
        n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments)
    };
    if (!f._fbq) f._fbq = n; 
    n.push = n; 
    n.loaded = !0; 
    n.version = '2.0';
    n.queue = []; 
    t = b.createElement(e); 
    t.async = !0;
    t.src = v; 
    s = b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t, s)
}(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', 'YOUR_PIXEL_ID'); // Substitua YOUR_PIXEL_ID pelo ID do seu Pixel
fbq('track', 'PageView');

// Função para monitorar a exibição da seção
function trackCheckoutView() {
    var checkoutSection = document.querySelector('.checkout');
    var hasTracked = false;

    // Criação de um observer para monitorar a visibilidade da seção
    var observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
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
document.addEventListener('DOMContentLoaded', function() {
    trackCheckoutView();
});
