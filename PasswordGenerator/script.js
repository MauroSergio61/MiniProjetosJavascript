// Elementos do DOM
const passwordOutput = document.getElementById('passwordOutput');
const lengthSlider = document.getElementById('lengthSlider');
const lengthValue = document.getElementById('lengthValue');
const generateBtn = document.getElementById('generateBtn');
const copyBtn = document.getElementById('copyBtn');

// Conjuntos de caracteres
const charSets = {
    uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    lowercase: 'abcdefghijklmnopqrstuvwxyz',
    numbers: '0123456789',
    symbols: '!@#$%^&*()_+-=[]{}|;:,.<>?'
};

// Atualiza o valor exibido do slider
lengthSlider.addEventListener('input', () => {
    lengthValue.textContent = lengthSlider.value;
});

// Gera a senha
function generatePassword() {
    let availableChars = '';
    let password = '';
    
    // Adiciona conjuntos selecionados
    if (document.getElementById('uppercase').checked) {
        availableChars += charSets.uppercase;
    }
    if (document.getElementById('lowercase').checked) {
        availableChars += charSets.lowercase;
    }
    if (document.getElementById('numbers').checked) {
        availableChars += charSets.numbers;
    }
    if (document.getElementById('symbols').checked) {
        availableChars += charSets.symbols;
    }
    
    // Verifica se pelo menos um conjunto foi selecionado
    if (availableChars.length === 0) {
        alert('Selecione pelo menos um tipo de caractere!');
        return;
    }
    
    // Gera senha aleatória
    for (let i = 0; i < lengthSlider.value; i++) {
        const randomIndex = Math.floor(Math.random() * availableChars.length);
        password += availableChars[randomIndex];
    }
    
    passwordOutput.textContent = password;
}

// Copia para a área de transferência
function copyToClipboard() {
    if (!passwordOutput.textContent) return;
    
    navigator.clipboard.writeText(passwordOutput.textContent)
        .then(() => {
            copyBtn.textContent = 'Copiado!';
            setTimeout(() => {
                copyBtn.textContent = 'Copiar';
            }, 2000);
        });
}

// Event Listeners
generateBtn.addEventListener('click', generatePassword);
copyBtn.addEventListener('click', copyToClipboard);

// Gera uma senha ao carregar a página
window.addEventListener('load', generatePassword);

function checkPasswordStrength(password) {
    // Implemente uma lógica para avaliar a força
}


const darkModeToggle = document.getElementById('darkModeToggle');
const body = document.body;

// Verifica preferência do sistema/salva no localStorage
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
const savedMode = localStorage.getItem('darkMode');

// Aplica o modo salvo ou do sistema
if (savedMode === 'dark' || (!savedMode && prefersDark)) {
    body.classList.add('dark-mode');
    darkModeToggle.textContent = '🌞 Modo Claro';
}

// Evento do botão
darkModeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    
    // Atualiza texto do botão
    const isDark = body.classList.contains('dark-mode');
    darkModeToggle.textContent = isDark ? '🌞 Modo Claro' : '🌓 Modo Escuro';
    
    // Salva preferência
    localStorage.setItem('darkMode', isDark ? 'dark' : 'light');
});