// Mostrar popup após 30 segundos
setTimeout(function() {
    document.getElementById("popup").style.display = "block";
}, 15000);

// Copiar o cupom ao clicar no botão
document.getElementById("copyButton").addEventListener("click", function() {
    // Texto do cupom
    var cupom = "ATACAMA10";

    // Criar um campo temporário para copiar o texto
    var tempInput = document.createElement("input");
    document.body.appendChild(tempInput);
    tempInput.value = cupom;
    tempInput.select();
    document.execCommand("copy");
    document.body.removeChild(tempInput);

    // Mostrar mensagem de sucesso
    document.getElementById("copySuccess").style.display = "block";
});

// Fechar popup ao clicar no ícone X
document.getElementById("closePopup").addEventListener("click", function() {
    document.getElementById("popup").style.display = "none";
});
