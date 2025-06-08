// Seleciona o elemento que mostra qual jogador tem a vez
const currentPlayer = document.querySelector(".currentPlayer");

// Variáveis globais
let selected; // Armazena as jogadas feitas
let player = "X"; // Começa com o jogador "X"

// Todas as combinações possíveis para vencer no jogo da velha
let positions = [
  [1, 2, 3], // Linha 1
  [4, 5, 6], // Linha 2
  [7, 8, 9], // Linha 3
  [1, 4, 7], // Coluna 1
  [2, 5, 8], // Coluna 2
  [3, 6, 9], // Coluna 3
  [1, 5, 9], // Diagonal \
  [3, 5, 7], // Diagonal /
];

// Função que inicializa o jogo
function init() {
  selected = []; // Reseta as jogadas
  
  // Atualiza o texto mostrando o jogador atual
  currentPlayer.innerHTML = `JOGADOR DA VEZ: ${player}`;
  
  // Para cada botão do jogo:
  document.querySelectorAll(".game button").forEach((item) => {
    item.innerHTML = ""; // Limpa o conteúdo
    item.addEventListener("click", newMove); // Adiciona o evento de clique
  });
}

// Inicia o jogo quando a página carrega
init();

// Função chamada quando um jogador faz uma jogada
function newMove(e) {
  // Obtém o índice do botão clicado (de 1 a 9)
  const index = e.target.getAttribute("data-i");
  
  // Marca o botão com o símbolo do jogador atual (X ou O)
  e.target.innerHTML = player;
  
  // Remove o evento de clique para não ser clicado novamente
  e.target.removeEventListener("click", newMove);
  
  // Armazena a jogada no array selected
  selected[index] = player;
  
  // Espera 100ms antes de verificar se alguém ganhou
  setTimeout(() => {
    check();
  }, [100]);
  
  // Alterna o jogador (X vira O, O vira X)
  player = player === "X" ? "O" : "X";
  
  // Atualiza o texto mostrando o novo jogador
  currentPlayer.innerHTML = `JOGADOR DA VEZ: ${player}`;
}

// Função que verifica se alguém ganhou
function check() {
  // Pega o jogador que fez a última jogada
  let playerLastMove = player === "X" ? "O" : "X";
  
  // Cria um array com todas as posições marcadas pelo último jogador
  const items = selected
    .map((item, i) => [item, i]) // Transforma em pares [valor, índice]
    .filter((item) => item[0] === playerLastMove) // Filtra só as do último jogador
    .map((item) => item[1]); // Pega só os índices
  
  // Verifica todas as combinações vencedoras
  for (pos of positions) {
    // Se todos os itens de uma combinação estiverem no array do jogador
    if (pos.every((item) => items.includes(item))) {
      alert("O JOGADOR '" + playerLastMove + "' GANHOU!");
      init(); // Reinicia o jogo
      return;
    }
  }
  
  // Verifica empate (todas as posições preenchidas)
  if (selected.filter((item) => item).length === 9) {
    alert("DEU EMPATE!");
    init(); // Reinicia o jogo
    return;
  }
}