import { db } from "./firebase.js";
import { collection, doc, setDoc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";


// Recuperar o nome do usuário do sessionStorage
const nomeUsuario = sessionStorage.getItem("nomeUsuario");

// Se não houver nome salvo, redireciona para a página inicial
if (!nomeUsuario) {
    alert("Você precisa inserir seu nome antes de participar.");
    window.location.href = "index.html";
}


// Lista de categorias e opções disponíveis
const categorias = {
    "Melhor Filme": [
        "Anora", "O Brutalista", "Um Completo Desconhecido", "Conclave", "Duna: Parte 2",
        "Emilia Pérez", "Ainda Estou Aqui", "Nickel Boys", "A Substância", "Wicked"
    ],
    "Melhor Direção": [
        "Sean Baker – Anora", "Brady Corbet – O Brutalista", "James Mangold – Um Completo Desconhecido",
        "Jacques Audiard – Emilia Pérez", "Coralie Fargeat – A Substância"
    ],
    "Melhor Ator": [
        "Adrien Brody – O Brutalista", "Timothée Chalamet – Um Completo Desconhecido",
        "Colman Domingo – Sing Sing", "Ralph Fiennes – Conclave", "Sebastian Stan – O Aprendiz"
    ],
    "Melhor Atriz": [
        "Cynthia Erivo – Wicked", "Karla Sofía Gascón – Emilia Pérez", "Mikey Madison – Anora",
        "Demi Moore – A Substância", "Fernanda Torres – Ainda Estou Aqui"
    ],
    "Melhor Ator Coadjuvante": [
        "Yura Borisov – Anora", "Kieran Culkin – A Verdadeira Dor", "Edward Norton – Um Completo Desconhecido",
        "Guy Pearce – O Brutalista", "Jeremy Strong – O Aprendiz"
    ],
    "Melhor Atriz Coadjuvante": [
        "Monica Barbaro – Um Completo Desconhecido", "Ariana Grande – Wicked",
        "Felicity Jones – O Brutalista", "Isabella Rossellini – Conclave", "Zoe Saldaña – Emilia Pérez"
    ],
    "Melhor Roteiro Original": [
        "Anora", "O Brutalista", "A Verdadeira Dor", "Setembro 5", "A Substância"
    ],
    "Melhor Roteiro Adaptado": [
        "Um Completo Desconhecido", "Conclave", "Emilia Pérez", "Nickel Boys", "Sing Sing"
    ],
    "Melhor Animação": [
        "Flow", "Divertida Mente 2", "Memórias de Um Caracol", "Wallace & Gromit: Avengança", "Robô Selvagem"
    ],
    "Melhor Filme Internacional": [
        "Ainda Estou Aqui – Brasil", "A Garota da Agulha – Dinamarca",
        "Emilia Pérez – França", "A Semente do Fruto Sagrado – Alemanha", "Flow – Letônia"
    ],
    "Melhor Filme Documentário": [
        "Black Box Diaries", "No Other Land", "Porcelain War", "Soundtrack to a Coup d’etat", "Sugarcane"
    ],
    "Melhor Documentário em Curta-Metragem": [
        "Death by Numbers", "I am Ready, Warden", "Incident", "Instruments of a Beating Heart",
        "The Only Girl in the Orchestra"
    ],
    "Melhor Curta-Metragem": [
        "A Lien", "Anuja", "I’m not a Robot", "The Last Ranger", "The Man Who Could Not Remain Silent"
    ],
    "Melhor Curta-Metragem de Animação": [
        "Beautiful Men", "In the Shadow of the Cypress", "Magic Candies", "Wander to Wonder", "Yuck!"
    ],
    "Melhor Trilha Sonora": [
        "O Brutalista", "Emilia Pérez", "Conclave", "Robô Selvagem", "Wicked"
    ],
    "Melhor Canção Original": [
        "El Mal – Emilia Pérez", "The Journey – The Six Triple Eight", "Like a Bird – Sing Sing",
        "Mi Camino – Emilia Pérez", "Never Too Late – Elton John: Never Too Late"
    ],
    "Melhor Som": [
        "Um Completo Desconhecido", "Duna: Parte 2", "Emilia Pérez", "Wicked", "Robô Selvagem"
    ],
    "Melhor Design de Produção": [
        "O Brutalista", "Conclave", "Duna: Parte 2", "Nosferatu", "Wicked"
    ],
    "Melhor Fotografia": [
        "O Brutalista", "Duna: Parte 2", "Emilia Pérez", "Maria Callas", "Nosferatu"
    ],
    "Melhor Cabelo e Maquiagem": [
        "Um Homem Diferente", "Emilia Pérez", "Nosferatu", "A Substância", "Wicked"
    ],
    "Melhor Figurino": [
        "Um Completo Desconhecido", "Conclave", "Gladiador 2", "Nosferatu", "Wicked"
    ],
    "Melhor Montagem": [
        "Anora", "O Brutalista", "Conclave", "Emilia Pérez", "Wicked"
    ],
    "Melhores Efeitos Visuais": [
        "Alien: Romulus", "Better Man: A História de Robbie Williams", "Duna: Parte 2",
        "Planeta dos Macacos: O Reinado", "Wicked"
    ]
};

// Criando o formulário dinamicamente
const container = document.getElementById("categorias-container");

for (const categoria in categorias) {
    const div = document.createElement("div");
    div.classList.add("categoria-box");
    div.innerHTML = `<h3>${categoria}</h3>`;

    categorias[categoria].forEach(opcao => {
        const label = document.createElement("label");
        label.classList.add("opcao-label");

        const radio = document.createElement("input");
        radio.type = "radio";
        radio.name = categoria;
        radio.value = opcao;
        radio.required = true;

        label.appendChild(radio);
        label.innerHTML += `<span>${opcao}</span>`; // Adiciona o texto ao lado do botão

        div.appendChild(label);
    });

    container.appendChild(div);
}

// Evento para salvar os palpites no Firebase
document.getElementById("form-palpite").addEventListener("submit", async (e) => {
    e.preventDefault();

    const nomeUsuario = prompt("Digite seu nome para salvar seu palpite:");
    if (!nomeUsuario) return alert("Nome é obrigatório!");

    const palpites = {};
    for (const categoria in categorias) {
        const selecionado = document.querySelector(`input[name="${categoria}"]:checked`);
        if (selecionado) palpites[categoria] = selecionado.value;
    }

    try {
        await setDoc(doc(collection(db, "palpites"), nomeUsuario), palpites);
        alert("Palpite salvo com sucesso!");
        window.location.href = "confirmar.html";
    } catch (error) {
        console.error("Erro ao salvar:", error);
    }
});