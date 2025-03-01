document.addEventListener("DOMContentLoaded", () => {
    const nomeUsuario = localStorage.getItem("nomeUsuario");
    const palpitesConfirmacao = JSON.parse(localStorage.getItem("palpitesConfirmacao"));

    if (!nomeUsuario || !palpitesConfirmacao) {
        alert("Erro: Nenhum palpite encontrado! Retornando para a página inicial.");
        window.location.href = "index.html";
        return;
    }

    const listaConfirmacao = document.getElementById("lista-confirmacao");
    listaConfirmacao.innerHTML = "";

    for (const [categoria, escolha] of Object.entries(palpitesConfirmacao)) {
        const item = document.createElement("div");
        item.classList.add("confirmacao-item");
        item.innerHTML = `<strong>${categoria}:</strong> ${escolha}`;
        listaConfirmacao.appendChild(item);
    }

    document.getElementById("confirmarBtn").addEventListener("click", () => {
        alert("Palpites confirmados com sucesso! Obrigado por participar.");
        localStorage.removeItem("palpitesConfirmacao"); // Limpa os palpites do cache
        window.location.href = "index.html"; // Redireciona para a página inicial
    });
});
