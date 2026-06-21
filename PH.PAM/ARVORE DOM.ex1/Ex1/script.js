const livros = [
  { titulo: "A Bússola de Ouro",  paginas: 365 },
  { titulo: "A Faca Sutil",       paginas: 300 },
  { titulo: "A Luneta Âmbar",     paginas: 526 },
  { titulo: "A Pedra Filosofal",  paginas: 266 },
  { titulo: "A Câmara Secreta",   paginas: 232 },
];

// Cria as linhas da tabela
const tbody = document.getElementById("tbody");
livros.forEach(function(livro) {
  const tr = document.createElement("tr");
  tr.innerHTML = `<td class="col-livro">${livro.titulo}</td><td class="col-paginas">${livro.paginas}</td>`;
  tbody.appendChild(tr);
});

// Clique na coluna Livro: pinta de azul, remove verde
document.getElementById("thLivro").addEventListener("click", function() {
  const livros  = document.getElementsByClassName("col-livro");
  const paginas = document.getElementsByClassName("col-paginas");

  for (let i = 0; i < paginas.length; i++) paginas[i].classList.remove("verde");
  for (let i = 0; i < livros.length; i++)  livros[i].classList.toggle("azul");
});

// Clique na coluna Páginas: pinta de verde, remove azul
document.getElementById("thPaginas").addEventListener("click", function() {
  const livros  = document.getElementsByClassName("col-livro");
  const paginas = document.getElementsByClassName("col-paginas");

  for (let i = 0; i < livros.length; i++)  livros[i].classList.remove("azul");
  for (let i = 0; i < paginas.length; i++) paginas[i].classList.toggle("verde");
});
