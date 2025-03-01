// Importa os módulos necessários do Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";


// Configuração do Firebase (Substitua pelos seus dados)
const firebaseConfig = {
    apiKey: "AIzaSyCEPBEF4-A8_yLRPAMcPC4kc9Zuvcno94c",
    authDomain: "oscar-2025-3b7cb.firebaseapp.com",
    projectId: "oscar-2025-3b7cb",
    storageBucket: "oscar-2025-3b7cb.firebasestorage.app",
    messagingSenderId: "211271836738",
    appId: "1:211271836738:web:3f8d31d3453dc9e664f9db"
};

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);

// Obtém a instância do Firestore
const db = getFirestore(app);

// Exporta a instância do Firestore para ser utilizada nos outros arquivos
export { db };