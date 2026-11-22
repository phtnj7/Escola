let funcionarios = [];
let proximoId = 1;


// CADASTRAR
document
    .getElementById("formFuncionario")
    .addEventListener("submit", function (event) {

        event.preventDefault();

        const nome = document.getElementById("nome").value;
        const email = document.getElementById("email").value;

        const funcionario = {
            id: proximoId++,
            nome: nome,
            email: email
        };

        funcionarios.push(funcionario);

        atualizarTabela();

        document.getElementById("formFuncionario").reset();
    });


// MOSTRAR FUNCIONÁRIOS
function atualizarTabela() {

    const tabela = document.getElementById("listaFuncionarios");

    tabela.innerHTML = "";

    funcionarios.forEach(function (funcionario) {

        const linha = document.createElement("tr");

        linha.innerHTML = `
            <td>${funcionario.id}</td>

            <td>${funcionario.nome}</td>

            <td>${funcionario.email}</td>

            <td>

                <button
                    class="btn-editar"
                    onclick="editarFuncionario(${funcionario.id})">
                    Editar
                </button>

                <button
                    class="btn-excluir"
                    onclick="excluirFuncionario(${funcionario.id})">
                    Excluir
                </button>

            </td>
        `;

        tabela.appendChild(linha);
    });

    document.getElementById("contador").textContent =
        `${funcionarios.length} funcionário${funcionarios.length !== 1 ? "s" : ""}`;
}


// EDITAR
function editarFuncionario(id) {

    const funcionario = funcionarios.find(f => f.id === id);

    const novoNome = prompt(
        "Digite o novo nome:",
        funcionario.nome
    );

    if (novoNome === null) {
        return;
    }

    const novoEmail = prompt(
        "Digite o novo e-mail:",
        funcionario.email
    );

    if (novoEmail === null) {
        return;
    }

    funcionario.nome = novoNome;
    funcionario.email = novoEmail;

    atualizarTabela();
}


// EXCLUIR
function excluirFuncionario(id) {

    const confirmar = confirm(
        "Deseja realmente excluir este funcionário?"
    );

    if (!confirmar) {
        return;
    }

    funcionarios = funcionarios.filter(
        funcionario => funcionario.id !== id
    );

    atualizarTabela();
}


// BUSCAR
document
    .getElementById("buscar")
    .addEventListener("input", function () {

        const pesquisa = this.value.toLowerCase();

        const linhas = document.querySelectorAll(
            "#listaFuncionarios tr"
        );

        linhas.forEach(function (linha) {

            const texto = linha.textContent.toLowerCase();

            if (texto.includes(pesquisa)) {
                linha.style.display = "";
            } else {
                linha.style.display = "none";
            }
        });
    });