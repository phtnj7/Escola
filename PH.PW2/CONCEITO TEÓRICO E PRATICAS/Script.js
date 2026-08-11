class No {
  constructor(valor) {
    this.valor = valor;
    this.proximo = null;
  }
}

class NoDuplo {
  constructor(valor) {
    this.valor = valor;
    this.anterior = null;
    this.proximo = null;
  }
}

class Lista {
  constructor() { this.head = null; }

  adicionar(valor) {
    const novo = new No(valor);
    novo.proximo = this.head;
    this.head = novo;
  }

  mostrar(log) {
    let atual = this.head;
    while (atual) {
      log(atual.valor);
      atual = atual.proximo;
    }
  }
}

class NoArvore {
  constructor(valor) {
    this.valor = valor;
    this.esq = null;
    this.dir = null;
  }
}

function emOrdem(no, log) {
  if (no == null) return;
  emOrdem(no.esq, log);
  log(no.valor);
  emOrdem(no.dir, log);
}

function bubbleSort(arr) {
  for (let i = 0; i < arr.length; i++)
    for (let j = 0; j < arr.length - 1; j++)
      if (arr[j] > arr[j + 1]) {
        let temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
  return arr;
}

function buscaLinear(arr, alvo) {
  for (let i = 0; i < arr.length; i++)
    if (arr[i] == alvo) return i;
  return -1;
}

function buscaBinaria(arr, alvo) {
  let inicio = 0, fim = arr.length - 1;
  while (inicio <= fim) {
    let meio = Math.floor((inicio + fim) / 2);
    if (arr[meio] == alvo) return meio;
    else if (arr[meio] < alvo) inicio = meio + 1;
    else fim = meio - 1;
  }
  return -1;
}

// ---- Função principal de execução ----

function rodar(id) {
  const logs = [];
  const log = (...args) => logs.push(args.map(a => JSON.stringify(a)).join(' '));

  if (id == 'array') {
    const frutas = ["maçã", "banana", "laranja"];
    frutas.push("uva");
    log(frutas);
    log("Primeira:", frutas[0]);
  }

  if (id == 'listaSimples') {
    const a = new No(1), b = new No(2), c = new No(3);
    a.proximo = b; b.proximo = c;
    let atual = a;
    while (atual) { log(atual.valor); atual = atual.proximo; }
  }

  if (id == 'listaDupla') {
    const n1 = new NoDuplo(10), n2 = new NoDuplo(20), n3 = new NoDuplo(30);
    n1.proximo = n2; n2.anterior = n1;
    n2.proximo = n3; n3.anterior = n2;
    let c = n1; while (c) { log("→", c.valor); c = c.proximo; }
    c = n3;     while (c) { log("←", c.valor); c = c.anterior; }
  }

  if (id == 'listaCircular') {
    const x = new No(1), y = new No(2), z = new No(3);
    x.proximo = y; y.proximo = z; z.proximo = x;
    let n = x;
    for (let i = 0; i < 6; i++) { log(n.valor); n = n.proximo; }
  }

  if (id == 'pilha') {
    const pilha = [];
    pilha.push(10); pilha.push(20); pilha.push(30);
    log("Pilha:", pilha);
    log("Removido:", pilha.pop());
    log("Pilha agora:", pilha);
  }

  if (id == 'fila') {
    const fila = [];
    fila.push("A"); fila.push("B"); fila.push("C");
    log("Fila:", fila);
    log("Removido:", fila.shift());
    log("Fila agora:", fila);
  }

  if (id == 'alocacao') {
    let pessoa = { nome: "João", idade: 20 };
    log(pessoa);
    pessoa = null;
    log("Após liberar:", pessoa);
  }

  if (id == 'recursividade') {
    function fatorial(n) { return n == 0 ? 1 : n * fatorial(n - 1); }
    log("4! =", fatorial(4));
    log("5! =", fatorial(5));
  }

  if (id == 'encadeada') {
    const lista = new Lista();
    lista.adicionar(1); lista.adicionar(2); lista.adicionar(3);
    lista.mostrar(log);
  }

  if (id == 'hash') {
    const tabela = {};
    tabela["nome"] = "Maria"; tabela["idade"] = 22; tabela["curso"] = "TI";
    log(tabela["nome"]);
    log(tabela["idade"]);
    log(tabela["curso"]);
  }

  if (id == 'arvore') {
    const raiz = new NoArvore(5);
    raiz.esq = new NoArvore(3); raiz.dir = new NoArvore(8);
    raiz.esq.esq = new NoArvore(1); raiz.esq.dir = new NoArvore(4);
    emOrdem(raiz, log);
  }

  if (id == 'ordenacao') {
    log("Antes:", [5, 3, 8, 1, 4]);
    log("Depois:", bubbleSort([5, 3, 8, 1, 4]));
  }

  if (id == 'busca') {
    const numeros = [10, 20, 30, 40, 50];
    log("Linear — buscar 30:", buscaLinear(numeros, 30));
    log("Binária — buscar 40:", buscaBinaria(numeros, 40));
    log("Binária — buscar 99:", buscaBinaria(numeros, 99));
  }

  const saida = document.getElementById(id);
  saida.textContent = logs.join('\n');
  saida.style.display = 'block';
}