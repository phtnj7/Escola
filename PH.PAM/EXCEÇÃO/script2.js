function enviarForm() {
  // Limpa erros anteriores
  document.getElementById("erroNome").textContent = "";
  document.getElementById("erroCpf").textContent = "";
  document.getElementById("erroNascimento").textContent = "";
  document.getElementById("erroSenha").textContent = "";
  document.getElementById("erroConfirma").textContent = "";
  document.getElementById("sucesso").textContent = "";

  var listaErros = document.getElementById("listaErros");
  listaErros.innerHTML = "";
  listaErros.style.display = "none";

  var nome       = document.getElementById("nome").value;
  var cpf        = document.getElementById("cpf").value;
  var nascimento = document.getElementById("nascimento").value;
  var senha      = document.getElementById("senha").value;
  var confirma   = document.getElementById("confirma").value;

  // Array para guardar todos os erros encontrados
  var erros = [];

  // Valida nome
  if (nome === "") {
    erros.push({ mensagem: "Nome é obrigatório.", campo: "erroNome" });
  }

  // Valida CPF (remove tudo que não for número e verifica se tem 11 dígitos)
  var cpfSoNumeros = cpf.replace(/\D/g, "");
  if (cpfSoNumeros.length !== 11) {
    erros.push({ mensagem: "CPF deve ter 11 dígitos numéricos.", campo: "erroCpf" });
  }

  // Valida data de nascimento
  if (nascimento === "") {
    erros.push({ mensagem: "Data de nascimento é obrigatória.", campo: "erroNascimento" });
  } else {
    var hoje = new Date();
    var dataNasc = new Date(nascimento);
    if (dataNasc > hoje) {
      erros.push({ mensagem: "Data de nascimento não pode ser futura.", campo: "erroNascimento" });
    }
  }

  // Valida senha
  if (senha.length < 6) {
    erros.push({ mensagem: "Senha deve ter pelo menos 6 caracteres.", campo: "erroSenha" });
  }

  // Valida confirmação de senha
  if (senha !== confirma) {
    erros.push({ mensagem: "As senhas não são iguais.", campo: "erroConfirma" });
  }

  // Lança todos os erros de uma vez e trata no catch
  try {
    if (erros.length > 0) {
      throw erros;
    }

    document.getElementById("sucesso").textContent = "Cadastro realizado com sucesso!";

  } catch (listaDeErros) {
    // Mostra a lista de erros no topo
    listaErros.style.display = "block";

    for (var i = 0; i < listaDeErros.length; i++) {
      // Adiciona o erro na lista geral
      var item = document.createElement("li");
      item.textContent = listaDeErros[i].mensagem;
      listaErros.appendChild(item);

      // Mostra o erro abaixo do campo correspondente
      document.getElementById(listaDeErros[i].campo).textContent = listaDeErros[i].mensagem;
    }
  }
}
