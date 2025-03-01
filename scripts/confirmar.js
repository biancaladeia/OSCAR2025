document.addEventListener("DOMContentLoaded", () => {
    const nomeUsuario = localStorage.getItem("nomeUsuario");
    const palpitesConfirmacao = JSON.parse(localStorage.getItem("palpitesConfirmacao"));

    console.log("Nome do usuário:", nomeUsuario);
    console.log("Palpites para confirmação:", palpitesConfirmacao);

    if (!nomeUsuario || !palpitesConfirmacao) {
        alert("Erro: Nenhum palpite encontrado! Retornando para a página inicial.");
        window.location.href = "index.html";
        return;
    }

    const listaConfirmacao = document.getElementById("lista-confirmacao");
    if (!listaConfirmacao) {
        console.error("Erro: Elemento 'lista-confirmacao' não encontrado no HTML.");
        return;
    }
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