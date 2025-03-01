import { db } from "./firebase.js";
import { collection, getDocs, query, orderBy } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

async function carregarRanking() {
  const tbody = document.getElementById("ranking-body");
  const dataAtual = new Date();
  const dataDivulgacao = new Date("2025-03-03");

  if (dataAtual < dataDivulgacao) {
    tbody.innerHTML = `<tr><td colspan="3">Ranking disponível em 03/03/2025.</td></tr>`;
    return;
  }

  const snapshot = await getDocs(query(collection(db, "ranking"), orderBy("acertos", "desc")));
  snapshot.forEach((doc, index) => {
    tbody.innerHTML += `<tr><td>${index + 1}</td><td>${doc.data().nome}</td><td>${doc.data().acertos}</td></tr>`;
  });
}

carregarRanking();
