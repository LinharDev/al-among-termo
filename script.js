const alBancoPalavras = [


    "ABADE", "ABAFO", "ABALO", "ABANO", "ABATE", "ABETO", "ABONO",
    "ABRIL", "ABRIR", "ABUSO", "ACASO", "ACATO", "ACENO", "ACESO",
    "ACHAR", "ACIMA", "ACUAR", "ACUSA", "ADEGA", "ADEUS", "ADIAR",
    "AFETO", "AFIAR", "AFORA", "AGAVE", "AGORA", "AGUDO", "AJUDA",
    "ALADO", "ALARM", "ALCUN", "ALDEA",  "ALFIN", "ALGUM",
    "ALIAS", "ALIEN", "ALMAO", "ALTAR", "AMADO", "AMIGO", "AMORA",
    "AMPLO", "ANDAR", "ANEXO", "ANIMA", "ANIMO", "ANTES", "APOIO",
    "APONT", "ARADO", "ARAME", "AREIA", "ARENA", "ARGIL", "ARIDO",
    "AROMA", "ARROZ", "ARTES", "ASSIM", "ATIVO", "ATLAS", "ATRAS",
    "ATUAR",  "AUDIO", "AUTOR", "AVISO", "AZEDO",

    "BACIA", "BACON", "BAFIO", "BAILE", "BAIXA", "BAIXO", "BALAO",
    "BALSA", "BANAL", "BANCO", "BANDA", "BARCO", "BARRO", "BATAL",
    "BEBER", "BEIJO", "BELOU", "BICHO", "BILHA", "BLOCO", "BOATO",
    "BOLSA", "BOLSO", "BONDE", "BORDA", "BORRA", "BRACO", "BRAVO",
    "BREVE", "BRIGA", "BRISA", "BROTO", "BRUMA", "BURRO",

    "CABER", "CABRA", "CACAU", "CACHO", "CAIXA", "CALMA", "CALDO",
    "CALHA", "CAMPO", "CANAL", "CANCA", "CANTO", "CAPAZ", "CAPIM",
    "CARNE", "CARRO", "CARTA", "CASAL", "CASAS", "CASCO", "CASTA",
    "CATAR", "CAUSA", "CEDER", "CERCA", "CERTO", "CHAVE", "CHATO",
    "CHEFE", "CHEIO", "CHUVA", "CINCO", "CINZA", "CISCO", "CLARO",
    "CLIMA", "COISA", "COLAR", "COMER", "COMUM", "CONTA", "COPIA",
    "CORPO", "CORRE", "CORTE", "COSER", "COZER", "CRAVO", "CRIAR",
    "CRIME", "CRISE", "CUBRO", "CULPA", "CURSO",

    "DADOS", "DANCA", "DARDO", "DEDOS", "DEITA", "DEIXA", "DELTA",
    "DENTE", "DESDE", "DEVER", "DICHO", "DIGNO", "DISCO", "DIZER",
    "DOBRA", "DOIDO", "DOLAR", "DONOS", "DORMA", "DORME", "DOSES",
    "DUPLO",

    "ECOAR", "EIXOS", "ELEVA", "EMAIL", "ENFIM", "ENTRE",
    "ENVIA", "ERGUI", "ERROS", "ESTAR", "ESTOU", "ETAPA", "EXATO",
    "EXIBE", "EXITO", "EXPOR",

    "FALAR", "FALHA", "FALSO", "FARDO", "FAROL", "FAVOR", "FAZER",
    "FEIRA", "FEITO", "FELIZ", "FERRO", "FESTA", "FICAR", "FILHO",
    "FILME", "FINAL", "FINDA", "FIRME", "FLORA", "FOGOS", "FOLHA",
    "FORCA", "FORMA", "FORTE", "FOSSA", "FRASE", "FREIO", "FROTA",
    "FRUTA", "FUGIR", "FUMAR", "FUNDO", "FUROR",

    "GADOS", "GANHA", "GARFO", "GARRA", "GASTO", "GELAR", "GENTE",
    "GERAL", "GERAR", "GIRAR", "GLOBO", "GOSTO", "GRADE", "GRAMA",
    "GRATO", "GRAVE", "GRITO", "GRUPO", "GUIAR",

    "HABIT", "HASTE", "HAVER", "HERDA", "HERDE", "HONRA", "HORAS",
    "HOTEL",

    "IDEAL", "IDEIA", "IGUAL", "IMPAR", "IMUNE", "INDIO", 
    "INOVA", "IRADO", "IRMÃO", "IRMAO",

    "JANTA", "JANTO", "JEITO", "JOVEM", "JUIZO", "JUNTA", "JUSTO",

    "LARGO", "LASER", "LEIGO", "LEITE", "LENTO", "LETRA", "LEVES",
    "LIMAO", "LINDA", "LINHA", "LIVRO", "LOCAL", "LOUCO", "LUGAR",
    "LUTAR",

    "MAÇAS", "MAGIA", "MAIOR", "MALHA", "MALTA", "MANGA", "MANHA",
    "MARCA", "MARCO", "MARTE", "MASSA", "MATAR", "MATIZ", "MELAO",
     "MENTE", "MESMO", "METRO", "MILHO", "MINHA", "MISTO",
    "MOEDA", "MOLHO", "MONTE", "MORRO", "MORTE", "MOTOR", "MUNDO",
    "MUITO",

    "NACAO", "NATAL", "NAVIO", "NEGRO", "NENEM", "NIVEL", "NOITE",
    "NOBRE", "NORTE", "NOTAS", "NOVAS", "NOVOS", "NUVEM",

    "OBTER", "OESTE", "OLHAR", "OLHOS", "ONDAS", "ONTEM", "OPERA",
    "ORDEM", "OUVIR", "OUTRO",

    "PADRA", "PAGAR", "PALCO", "PALHA", "PAPEL", "PARAR", "PARTE",
    "PASSA", "PASSO", "PASTA", "PEDRA", "PEDIR", "PEIXE", "PENSA",
    "PERTO", "PIANO", "PILHA", "PISTA", "PLANO", "PLENA", "POETA",
    "PODER", "POEMA", "PONTO", "PORTA", "PORTO", "POUCO", "PRATO",
    "PRESA", "PRESO", "PRIMA", "PRIMO", "PROVA", "PULSO",

    "QUASE", "QUEDA", "QUERO", 

    "RADIO", "RAMOS", "RAZAO", "REGRA", "REINO", "RENDA", "RESTA",
    "RETRO", "RITMO", "ROCHA", "RODAR", "ROSAS", "ROSTO", "ROUPA",
    "RUINA",

    "SABER", "SABOR", "SAIDA", "SALTO", "SANTO", "SAUDE", "SECAR",
    "SEGUE", "SEGUI", "SENHA", "SENSO", "SERIO", "SINAL", "SITIO",
    "SOBRE", "SONHO", "SORTE", "SUAVE", "SUBIR", "SUSTO",

    "TARDE", "TERRA", "TEXTO", "TIGRE", "TINTA", "TOCAR", "TODOS",
    "TORRE", "TRACO", "TRAMA", "TREVO", "TROCA", "TURMA",

    "UNIAO", "UNICO", "USADO", "USUAL",

    "VALOR", "VAZIO", "VELHO", "VENTO", "VERAO", "VERDE", "VERBO",
    "VERDA", "VESTE", "VIGOR", "VISTA", "VITAL", "VIVER", "VOLTA",

    "ZEBRA", "ZERAR", 

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

function alVerificarPalavra(alPalavra) {
    return alBancoPalavras.includes(alPalavra);

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

    if (!alVerificarPalavra(alChute)) {
        alert("Essa palavra não existe!");
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


alBtnEnviar.addEventListener("click", alProcessarTentativa);

alInputPalavra.addEventListener("keypress", function(alEvento) {

    if (alEvento.key === "Enter") {
        alProcessarTentativa();

    }

});

alBtnFecharVitoria.addEventListener("click", function() {
    alFecharModal("alModalVitoria");

});

alBtnFecharDerrota.addEventListener("click", function() {
    alFecharModal("alModalDerrota");

});


alSortearPalavra();
alCriarTabuleiro();