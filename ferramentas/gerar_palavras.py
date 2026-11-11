#!/usr/bin/env python3
"""
Gera ../palavras.js (listas de palavras de 5 letras em português) a partir de
uma lista-base em texto (uma palavra por linha, UTF-8).

Uso:
    python3 gerar_palavras.py LISTA_BASE.txt [--extras extras.txt] [--respostas respostas.txt]
                              [--bloqueio bloqueio.txt] [-o ../palavras.js]

O que o script faz:
  1. Lê a lista-base e mantém só palavras de 5 letras com alfabeto português.
  2. Remove estrangeirismos óbvios (inglês, siglas, nomes) com filtros de fonotática.
  3. Detecta verbos regulares na lista-base e gera suas formas conjugadas de 5 letras.
  4. Gera plurais simples de palavras de 4 letras.
  5. Soma o arquivo de extras (palavras escritas à mão) e remove o bloqueio.
  6. Escreve palavras.js com duas listas:
       alPalavrasValidas   -> todas as palavras aceitas como chute (com acento)
       alPalavrasResposta  -> subconjunto curado usado para sortear a palavra secreta
"""
import argparse, json, re, sys, unicodedata

VOGAIS = set("aeiouáàâãéêíóôõú")
ALFABETO = set("abcdefghijklmnopqrstuvwxyzáàâãéêíóôõúç")


def sem_acento(p):
    return "".join(c for c in unicodedata.normalize("NFD", p) if unicodedata.category(c) != "Mn")


def ler_lista(caminho):
    """Lê palavras separadas por espaço ou quebra de linha; linhas com # são comentários."""
    palavras = []
    with open(caminho, encoding="utf-8") as f:
        for linha in f:
            if linha.lstrip().startswith("#"):
                continue
            palavras.extend(linha.split())
    return palavras


# --------------------------------------------------------------------------
# Filtros de fonotática (rejeitam inglês, siglas, lixo de web)
# --------------------------------------------------------------------------
PROIBIDO = re.compile(
    r"(th|sh|ck|gh|wh|ph|kh|tt|ll|mm|pp|ff|dd|zz|bb|gg|vv|nn|hh|ii|uu|yy|jj|kk|ww|xx|"
    r"[bcdfghjklmnpqrstvwxz]{4}|[wky])"
)
INICIOS_RUINS = ("sk", "sw", "sh", "sn", "sl", "sm", "sp", "st", "sc", "tw", "wr", "kn", "dj", "fl", "fr" + "z")
FINAIS_OK = set("aeiouáàâãéêíóôõúrslmzxn")
# palavras curtas legítimas que contêm k/w/y (aceitas pela ortografia atual)
EXCECOES_KWY = {"kiwis", "karma", "kilos", "watts", "yoga", "yenes", "kebab", "kinds"}


def parece_portugues(p):
    n = sem_acento(p)
    if p in EXCECOES_KWY:
        return True
    if not set(p) <= ALFABETO:
        return False
    if not (set(p) & VOGAIS):
        return False
    if p[-1] not in FINAIS_OK:
        return False
    # plural inglês (girls, tests, goals...) e fragmentos de palavra cortada ("acess", "compl")
    if re.search(r"[bcdfghjklmpqrtvxz]s$|ss$", n):
        return False
    if PROIBIDO.search(n):
        return False
    if n.startswith(INICIOS_RUINS):
        return False
    # 3 vogais seguidas quase não existem em palavras de 5 letras (exceto ditongos/tritongos)
    if re.search(r"[aeiou]{4}", n):
        return False
    return True


# --------------------------------------------------------------------------
# Conjugação regular
# --------------------------------------------------------------------------
TERMINACOES = {
    "ar": {
        "pres": ["o", "as", "a", "amos", "ais", "am"],
        "pret": ["ei", "aste", "ou", "ámos", "astes", "aram"],
        "imperf": ["ava", "avas", "ava", "ávamos", "áveis", "avam"],
        "mqp": ["ara", "aras", "ara", "áramos", "áreis", "aram"],
        "subj": ["e", "es", "e", "emos", "eis", "em"],
        "isubj": ["asse", "asses", "asse", "ássemos", "ásseis", "assem"],
        "imp": ["a", "e", "emos", "ai", "em"],
        "ger": ["ando"],
        "part": ["ado", "ada", "ados", "adas"],
    },
    "er": {
        "pres": ["o", "es", "e", "emos", "eis", "em"],
        "pret": ["i", "este", "eu", "emos", "estes", "eram"],
        "imperf": ["ia", "ias", "ia", "íamos", "íeis", "iam"],
        "mqp": ["era", "eras", "era", "êramos", "êreis", "eram"],
        "subj": ["a", "as", "a", "amos", "ais", "am"],
        "isubj": ["esse", "esses", "esse", "êssemos", "êsseis", "essem"],
        "imp": ["e", "a", "amos", "ei", "am"],
        "ger": ["endo"],
        "part": ["ido", "ida", "idos", "idas"],
    },
    "ir": {
        "pres": ["o", "es", "e", "imos", "is", "em"],
        "pret": ["i", "iste", "iu", "imos", "istes", "iram"],
        "imperf": ["ia", "ias", "ia", "íamos", "íeis", "iam"],
        "mqp": ["ira", "iras", "ira", "íramos", "íreis", "iram"],
        "subj": ["a", "as", "a", "amos", "ais", "am"],
        "isubj": ["isse", "isses", "isse", "íssemos", "ísseis", "issem"],
        "imp": ["e", "a", "amos", "i", "am"],
        "ger": ["indo"],
        "part": ["ido", "ida", "idos", "idas"],
    },
}
FUT_COND = {
    "fut": ["ei", "ás", "á", "emos", "eis", "ão"],
    "cond": ["ia", "ias", "ia", "íamos", "íeis", "iam"],
    "fpes": ["", "es", "", "mos", "des", "em"],  # infinitivo pessoal / futuro do subjuntivo
}
# sufixos de evidência de que o infinitivo é mesmo um verbo
EVIDENCIA = {
    "ar": ["ou", "ando", "ado", "ava", "aram", "amos", "avam"],
    "er": ["eu", "endo", "ido", "ia", "eram", "emos", "iam"],
    "ir": ["iu", "indo", "ido", "ia", "iram", "imos", "iam"],
}


def ajusta_ortografia(radical, term, grupo):
    """Mudanças ortográficas para manter o som (car->que, gar->gue, cer->ço...)."""
    inicio = term[:1].replace("á", "a").replace("é", "e").replace("ê", "e")
    if grupo == "ar":
        if radical.endswith("c") and inicio in ("e",):
            return radical[:-1] + "qu"
        if radical.endswith("g") and inicio in ("e",):
            return radical + "u"
        if radical.endswith("ç") and inicio in ("e",):
            return radical[:-1] + "c"
    else:
        if radical.endswith("c") and inicio in ("o", "a"):
            return radical[:-1] + "ç"
        if radical.endswith("g") and inicio in ("o", "a"):
            return radical[:-1] + "j"
        if radical.endswith("gu") and inicio in ("o", "a"):
            return radical[:-2] + "g"
    return radical


# Verbos irregulares (ou com alternância vocálica) que NÃO podem ser conjugados
# pelo modelo regular. As formas deles entram pela lista-base ou por extras.txt.
IRREGULARES_EXATOS = {
    "estar", "perder", "ouvir", "odiar", "ansiar", "incendiar", "mediar", "remediar",
    "intermediar", "ler", "reler", "crer", "descrer", "tresler", "valer", "equivaler",
    "prevalecer", "poder", "querer", "requerer", "saber", "caber", "prever", "rever",
    "prover", "antever", "entrever", "obter", "manter", "conter", "deter", "reter",
    "entreter", "abster", "sustar", "pedir", "medir", "despedir", "impedir", "expedir",
    "seguir", "perseguir", "conseguir", "proseguir", "dormir", "sentir", "ferir",
    "vestir", "servir", "repetir", "preferir", "mentir", "sugerir", "divertir",
    "competir", "cobrir", "descobrir", "encobrir", "recobrir", "fugir", "subir",
    "sumir", "tossir", "engolir", "cuspir", "bulir", "acudir", "sacudir", "consumir",
    "assumir", "presumir", "reunir", "proibir", "coibir", "abolir", "demolir",
    "construir", "destruir", "possuir", "influir", "incluir", "excluir", "concluir",
    "contribuir", "distribuir", "atribuir", "substituir", "constituir", "diminuir",
    "retribuir", "fluir", "usufruir", "ruir", "afluir", "refluir", "conduzir",
    "produzir", "reduzir", "traduzir", "introduzir", "seduzir", "induzir", "deduzir",
}
IRREGULARES_FINAIS = ("zer", "air", "oer", "uir", "vir", "ter")  # fazer, cair, doer, ... (ter: ver exceção abaixo)
# verbos terminados em "ter" que são regulares (meter, cometer, prometer, ...)
TER_REGULARES = ("meter", "peter", "ceter", "seter", "veter", "eter")


def verbo_regular(inf):
    if inf in IRREGULARES_EXATOS:
        return False
    if inf.endswith("ter"):
        return inf.endswith(TER_REGULARES) and not inf.endswith(("ater", "oter"))
    if inf.endswith(IRREGULARES_FINAIS):
        return False
    return True


def conjugar(inf):
    grupo = inf[-2:]
    radical = inf[:-2]
    formas = set()
    # em verbos -ir regulares, o presente costuma ter alternância vocálica (sentir→sinto):
    # só usamos os tempos "seguros". Verbos em -ear/-iar/-oar mudam o presente também.
    inseguros = set()
    if grupo == "ir" or inf.endswith(("ear", "iar", "uar")):
        inseguros = {"pres", "subj", "imp"}
    for nome, terms in TERMINACOES[grupo].items():
        if nome in inseguros:
            continue
        for t in terms:
            formas.add(ajusta_ortografia(radical, t, grupo) + t)
    for terms in FUT_COND.values():
        for t in terms:
            formas.add(inf + t)
    return formas


def detectar_verbos(base_minusc):
    """Infinitivos regulares da lista-base com evidência de uso verbal (>=3 formas conjugadas)."""
    verbos = []
    for p in base_minusc:
        if len(p) < 4 or p[-2:] not in ("ar", "er", "ir") or not verbo_regular(p):
            continue
        grupo, radical = p[-2:], p[:-2]
        if sum(1 for e in EVIDENCIA[grupo] if radical + e in base_minusc) >= 3:
            verbos.append(p)
    return verbos


# --------------------------------------------------------------------------
def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("base")
    ap.add_argument("--extras", help="palavras extras (uma por linha) a aceitar")
    ap.add_argument("--respostas", help="lista curada de palavras para sorteio (uma por linha)")
    ap.add_argument("--bloqueio", help="palavras a remover de tudo (uma por linha)")
    ap.add_argument("--plurais", help="substantivos/adjetivos de 4 letras cujo plural (+s) deve ser aceito")
    ap.add_argument("--permitidas", help="palavras que passam por cima dos filtros automáticos")
    ap.add_argument("-o", "--saida", default="../palavras.js")
    a = ap.parse_args()

    bruto = ler_lista(a.base)
    base_minusc = {p for p in bruto if p == p.lower()}

    # 1-2) base filtrada
    permitidas = set(ler_lista(a.permitidas)) if a.permitidas else set()
    validas = {p for p in base_minusc if len(p) == 5 and (parece_portugues(p) or p in permitidas)}
    n_base = len(validas)

    # 3) conjugações de verbos regulares
    verbos = detectar_verbos(base_minusc)
    geradas = set()
    for v in verbos:
        for f in conjugar(v):
            if len(f) == 5 and parece_portugues(f):
                geradas.add(f)

    # 4) plurais de substantivos/adjetivos de 4 letras (lista curada à mão)
    plurais = set()
    if a.plurais:
        for p in ler_lista(a.plurais):
            if len(p) == 4 and p[-1] in "aeoiu":
                plurais.add(p + "s")

    extras = set()
    if a.extras:
        for p in ler_lista(a.extras):
            if len(p) == 5 and set(p) <= ALFABETO:
                extras.add(p)
            else:
                print("aviso: extra ignorado (não tem 5 letras do alfabeto pt):", p, file=sys.stderr)
    bloqueio = {sem_acento(p) for p in ler_lista(a.bloqueio)} if a.bloqueio else set()

    todas = validas | geradas | plurais | extras
    # uma entrada por palavra sem acento: prefere a forma acentuada
    por_chave = {}
    for p in sorted(todas):
        k = sem_acento(p)
        if k in bloqueio:
            continue
        if k not in por_chave or (por_chave[k] == k and p != k):  # prefere a forma acentuada
            por_chave[k] = p
    finais = sorted(por_chave.values(), key=lambda s: sem_acento(s))

    # respostas curadas: toda resposta também é um chute válido
    respostas = []
    if a.respostas:
        for p in ler_lista(a.respostas):
            if len(p) != 5 or not set(p.lower()) <= ALFABETO:
                print("aviso: resposta ignorada (não tem 5 letras do alfabeto pt):", p, file=sys.stderr)
                continue
            k = sem_acento(p)
            if k in bloqueio:
                continue
            if k not in por_chave or (por_chave[k] == k and p != k):
                por_chave[k] = p
            respostas.append(por_chave[k])
        finais = sorted(por_chave.values(), key=lambda s: sem_acento(s))
    respostas = sorted(set(respostas), key=lambda s: sem_acento(s))

    with open(a.saida, "w", encoding="utf-8") as f:
        f.write("// Arquivo gerado por ferramentas/gerar_palavras.py — não edite à mão.\n")
        f.write("const alPalavrasValidas = " + json.dumps(finais, ensure_ascii=False, separators=(",", ":")) + ";\n")
        f.write("const alPalavrasResposta = " + json.dumps(respostas, ensure_ascii=False, separators=(",", ":")) + ";\n")
    print(f"base filtrada: {n_base} | verbos regulares: {len(verbos)} | formas verbais: {len(geradas)} "
          f"| plurais: {len(plurais)} | extras: {len(extras)}")
    print(f"válidas: {len(finais)} | respostas: {len(respostas)} -> {a.saida}")


if __name__ == "__main__":
    main()
