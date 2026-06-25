function enviarForm() {
  // Limpa erros anteriores
  document.getElementById("erroNome").textContent = "";
  document.getElementById("erroEmail").textContent = "";
  document.getElementById("erroIdade").textContent = "";
  document.getElementById("erroSenha").textContent = "";
  document.getElementById("sucesso").textContent = "";

  var nome  = document.getElementById("nome").value;
  var email = document.getElementById("email").value;
  var idade = document.getElementById("idade").value;
  var senha = document.getElementById("senha").value;

  try {
    // Valida nome
    if (nome.length < 3) {
      throw "Nome é obrigatório e deve ter pelo menos 3 caracteres.";
    }

    // Valida email
    if (!email.includes("@")) {
      throw "E-mail inválido. Deve conter @.";
    }

    // Valida idade
    if (isNaN(idade) || idade === "") {
      throw "Idade deve ser um número.";
    }
    if (Number(idade) < 18) {
      throw "Você deve ter pelo menos 18 anos.";
    }

    // Valida senha
    if (senha.length < 6) {
      throw "Senha deve ter pelo menos 6 caracteres.";
    }

    // Se passou por tudo, deu certo!
    document.getElementById("sucesso").textContent = "Cadastro realizado com sucesso!";

  } catch (erro) {
    // Descobre em qual campo mostrar o erro
    if (erro.includes("Nome")) {
      document.getElementById("erroNome").textContent = erro;
    } else if (erro.includes("E-mail")) {
      document.getElementById("erroEmail").textContent = erro;
    } else if (erro.includes("Idade") || erro.includes("número") || erro.includes("anos")) {
      document.getElementById("erroIdade").textContent = erro;
    } else if (erro.includes("Senha")) {
      document.getElementById("erroSenha").textContent = erro;
    }
  }
}
