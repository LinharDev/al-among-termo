const alBancoPalavras = [
  "CASAS", "FESTA", "TERRA", "LIVRO", "PODER", "SAGAZ", "NOBRE", 
  "PORTA", "TEMPO", "CORPO", "PEDRA", "NUVEM", "PLANO", "FORTE", "MUNDO", 
  "GRUPO", "FORMA", "VALOR", "PONTO", "IDEIA", "CERTO", "JUSTO", "LINDA",
  "CARRO", "PRAIA", "VERDE", "SONHO", "CAMPO", "CHAVE", "FAVOR", "FOGO",
  "ARROZ", "AUDIO", "BAIXO", "BRAVO", "CAIXA", "CALMA", "CARTA", "CERTA",
  "CLARO", "COISA", "DADOS", "DISCO", "DUPLO", "EXATO", "FELIZ", "FILME",
  "FINAL", "FOLHA", "FROTA", "GLOBO", "GOSTO", "GRITO", "HORAS", "HOTEL",
  "IMPAR", "JOVEM", "LENTA", "LENTO", "LIMAO", "LINHA", "LOUCO", "MAGIA",
  "MARCA", "MELHOR", "MENTE", "METRO", "MISTO", "MOEDA", "MORTE", "MUITO",
  "NAVIO", "NOITE", "NORTE", "NOTAS", "NOVO", "OESTE", "OLHOS", "ONDA",
  "OUTRO", "PALCO", "PAPEL", "PARTE", "PEIXE", "PERTO", "PIANO", "PISTA",
  "POETA", "PORTO", "POUCO", "PRATO", "PRESO", "PRIMA", "PRIMO", "PROVA",
  "PULSO", "QUASE", "QUEDA", "RADIO", "RAMOS", "RAZAO", "REGRA", "REINO",
  "RITMO", "ROCHA", "RODA", "ROSA", "SABOR", "SAIDA", "SALTO", "SANTO",
  "SAUDE", "SINAL", "SITIO", "SUAVE", "SUSTO", "TARDE", "TEXTO", "TINTA",
  "TOCAR", "TORRE", "TRACO", "TROCA", "TURMA", "UNIAO", "USUAL", "VAZIO",
  "VELHO", "VENTO", "VERAO", "VERBO", "VISAO", "VISTA", "VITAL", "VOLTA"
];

let alPalavraSecreta = "";
const alMaxTentativas = 6;
let alLinhaAtual = 0;

const alInputPalavra = document.querySelector("#alInputPalavra");
const alBtnEnviar = document.querySelector("#alBtnEnviar");
const alNumeroTentativa = document.querySelector("#alNumeroTentativa");

const alBtnFecharVitoria = document.querySelector("#alBtnFecharVitoria");
const alBtnFecharDerrota = document.querySelector("#alBtnFecharDerrota");

function alSortearPalavra() {
  const alIndice = Math.floor(Math.random() * alBancoPalavras.length);
  alPalavraSecreta = alBancoPalavras[alIndice].toUpperCase();
}

function alCriarTabuleiro() {
  const alGrade = document.querySelector("#alGradeJogo");
  alGrade.innerHTML = "";

  for (let alL = 0; alL < alMaxTentativas; alL++) {
    let alLinha = document.createElement("div");
    alLinha.classList.add("alLinha");

    for (let alC = 0; alC < 5; alC++) {
      let alCelula = document.createElement("div");
      alCelula.classList.add("alCelula");
      alLinha.appendChild(alCelula);
    }

    alGrade.appendChild(alLinha);
  }
}

function alProcessarTentativa() {
  const alChute = alInputPalavra.value.toUpperCase();

  if (alChute.length !== 5) {
    alert("Digite uma palavra de 5 letras!");
    return;
  }

  const alLinhas = document.querySelectorAll(".alLinha");
  const alCelulas = alLinhas[alLinhaAtual].querySelectorAll(".alCelula");
  const alArraySecreta = alPalavraSecreta.split("");
  const alArrayChute = alChute.split("");

  for (let alI = 0; alI < 5; alI++) {
    alCelulas[alI].textContent = alArrayChute[alI];
  }

  for (let alI = 0; alI < 5; alI++) {
    if (alArrayChute[alI] === alArraySecreta[alI]) {
      alCelulas[alI].classList.add("alLetraCorreta");
      alArraySecreta[alI] = null;
    }
  }

  for (let alI = 0; alI < 5; alI++) {
    if (!alCelulas[alI].classList.contains("alLetraCorreta")) {
      let alLetra = alArrayChute[alI];
      let alPosicao = alArraySecreta.indexOf(alLetra);

      if (alPosicao !== -1) {
        alCelulas[alI].classList.add("alLetraPresente");
        alArraySecreta[alPosicao] = null;
      } else {
        alCelulas[alI].classList.add("alLetraAusente");
      }
    }
  }

  if (alChute === alPalavraSecreta) {
    alAbrirModal("alModalVitoria");
    alInputPalavra.disabled = true;
    alBtnEnviar.disabled = true;
    return;
  }

  alLinhaAtual++;
  alInputPalavra.value = "";

  if (alLinhaAtual < alMaxTentativas) {
    alNumeroTentativa.textContent = alLinhaAtual + 1;
  } else {
    alAbrirModal("alModalDerrota");
    alInputPalavra.disabled = true;
    alBtnEnviar.disabled = true;
  }
}

function alAbrirModal(alIdModal) {
  const alModal = document.querySelector("#" + alIdModal);
  alModal.classList.add("alMostrarModal");
}

function alFecharModal(alIdModal) {
  const alModal = document.querySelector("#" + alIdModal);
  alModal.classList.remove("alMostrarModal");
}

// Event Listeners em funções normais
alBtnEnviar.addEventListener("click", alProcessarTentativa);

alInputPalavra.addEventListener("keypress", function(alEvento) {
  if (alEvento.key === "Enter") {
    alProcessarTentativa();
  }
});

// Eventos de fechar modal de forma direta e simples
alBtnFecharVitoria.addEventListener("click", function() {
  alFecharModal("alModalVitoria");
});

alBtnFecharDerrota.addEventListener("click", function() {
  alFecharModal("alModalDerrota");
});

alSortearPalavra();
alCriarTabuleiro();