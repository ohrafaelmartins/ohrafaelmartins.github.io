document.addEventListener('DOMContentLoaded', () => {
    const productList = document.getElementById('product-list');

    fetch('products.json')
        .then(response => response.json())
        .then(data => {
            data.products.sort((a, b) => b.code - a.code);

            data.products.forEach(product => {
                // Cria o elemento <a> em vez do <button>
                const link = document.createElement('a');
                link.href = product.link; // Define o href do link com base na chave "link"
                link.className = 'product-button';
                link.innerHTML = `
                    <span class="product-code">${product.code}</span> | 
                    <span class="product-title">${product.title}</span> | 
                    <span class="product-origin">${product.origin}</span>
                `;

                // Opcional: Adiciona um estilo para que o link se pareça com um botão
                link.style.textDecoration = 'none'; // Remove o sublinhado padrão do link
                link.style.display = 'block'; // Faz com que o link ocupe o espaço do bloco como um botão

                productList.appendChild(link);
            });
        })
        .catch(error => {
            console.error('Erro ao carregar os produtos:', error);
        });
});
