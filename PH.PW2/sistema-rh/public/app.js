
const mensagem = document.getElementById('mensagemSistema');

let funcionarios = [];
let departamentos = [];

async function requisicao(url, opcoes = {}) {
    const resposta = await fetch(url, {
        ...opcoes,
        headers: {
            'Content-Type': 'application/json',
            ...opcoes.headers
        }
    });

    if (resposta.status === 401) {
        window.location.href = '/login.html';
        throw new Error('Sessão encerrada.');
    }

    const dados = await resposta.json();

    if (!resposta.ok) {
        throw new Error(dados.erro || 'Erro na operação.');
    }

    return dados;
}

function avisar(texto) {
    mensagem.textContent = texto;
}

function criarCelula(valor) {
    const td = document.createElement('td');
    td.textContent = valor ?? '';
    return td;
}

// VERIFICAR USUÁRIO
async function verificarUsuario() {
    const dados = await requisicao('/api/auth/me');

    document.getElementById('usuarioLogado').textContent =
        dados.usuario.login;
}

// CARREGAR DEPARTAMENTOS
async function carregarDepartamentos() {
    departamentos = await requisicao('/api/departamentos');

    const lista = document.getElementById('listaDepartamentos');
    const select = document.getElementById('departamentoId');

    lista.replaceChildren();

    select.replaceChildren();

    const opcaoInicial = document.createElement('option');
    opcaoInicial.value = '';
    opcaoInicial.textContent = 'Selecione o departamento';
    select.appendChild(opcaoInicial);

    departamentos.forEach(dep => {
        const linha = document.createElement('tr');

        linha.append(
            criarCelula(dep.id),
            criarCelula(dep.nome),
            criarCelula(dep.localizacao)
        );

        const acoes = document.createElement('td');
        const excluir = document.createElement('button');

        excluir.textContent = 'Excluir';
        excluir.className = 'btn-excluir';

        excluir.addEventListener('click', () => excluirDepartamento(dep.id));

        acoes.appendChild(excluir);
        linha.appendChild(acoes);
        lista.appendChild(linha);

        const opcao = document.createElement('option');
        opcao.value = dep.id;
        opcao.textContent = dep.nome;
        select.appendChild(opcao);
    });

    document.getElementById('totalDepartamentos').textContent =
        departamentos.length;
}

// CADASTRAR DEPARTAMENTO
document.getElementById('formDepartamento')
.addEventListener('submit', async (event) => {
    event.preventDefault();

    try {
        const dados = {
            nome: document.getElementById('nomeDepartamento').value,
            localizacao: document.getElementById('localizacaoDepartamento').value
        };

        const resultado = await requisicao('/api/departamentos', {
            method: 'POST',
            body: JSON.stringify(dados)
        });

        avisar(resultado.mensagem);

        event.target.reset();
        await carregarDepartamentos();

    } catch (erro) {
        avisar(erro.message);
    }
});

// EXCLUIR DEPARTAMENTO
async function excluirDepartamento(id) {
    if (!confirm('Deseja realmente excluir este departamento?')) return;

    try {
        const resultado = await requisicao(`/api/departamentos/${id}`, {
            method: 'DELETE'
        });

        avisar(resultado.mensagem);
        await carregarDepartamentos();
        await carregarFuncionarios();

    } catch (erro) {
        avisar(erro.message);
    }
}

// CARREGAR FUNCIONÁRIOS
async function carregarFuncionarios() {
    funcionarios = await requisicao('/api/funcionarios');

    const lista = document.getElementById('listaFuncionarios');
    lista.replaceChildren();

    funcionarios.forEach(func => {
        const linha = document.createElement('tr');

        const salario = func.salario == null
            ? ''
            : Number(func.salario).toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL'
            });

        const data = func.data_admissao
            ? new Date(func.data_admissao).toLocaleDateString('pt-BR')
            : '';

        [
            func.id,
            func.nome,
            func.funcao,
            salario,
            func.email,
            data,
            func.status,
            func.departamento || 'Sem departamento'
        ].forEach(valor => linha.appendChild(criarCelula(valor)));

        const acoes = document.createElement('td');

        const editar = document.createElement('button');
        editar.textContent = 'Editar';
        editar.className = 'btn-editar';
        editar.addEventListener('click', () => editarFuncionario(func.id));

        const excluir = document.createElement('button');
        excluir.textContent = 'Excluir';
        excluir.className = 'btn-excluir';
        excluir.addEventListener('click', () => excluirFuncionario(func.id));

        acoes.append(editar, excluir);
        linha.appendChild(acoes);

        lista.appendChild(linha);
    });

    document.getElementById('totalFuncionarios').textContent =
        funcionarios.length;

    document.getElementById('totalAtivos').textContent =
        funcionarios.filter(f => f.status === 'Ativo').length;
}

// CADASTRAR OU EDITAR FUNCIONÁRIO
document.getElementById('formFuncionario')
.addEventListener('submit', async (event) => {
    event.preventDefault();

    const id = document.getElementById('funcionarioId').value;

    const dados = {
        nome: document.getElementById('nome').value,
        funcao: document.getElementById('funcao').value,
        salario: document.getElementById('salario').value,
        email: document.getElementById('email').value,
        data_admissao: document.getElementById('dataAdmissao').value,
        status: document.getElementById('status').value,
        departamento_id: document.getElementById('departamentoId').value || null
    };

    try {
        const resultado = await requisicao(
            id ? `/api/funcionarios/${id}` : '/api/funcionarios',
            {
                method: id ? 'PUT' : 'POST',
                body: JSON.stringify(dados)
            }
        );

        avisar(resultado.mensagem);

        event.target.reset();
        limparEdicao();

        await carregarFuncionarios();

    } catch (erro) {
        avisar(erro.message);
    }
});

// EDITAR FUNCIONÁRIO
function editarFuncionario(id) {
    const func = funcionarios.find(f => f.id === id);

    if (!func) return;

    document.getElementById('funcionarioId').value = func.id;
    document.getElementById('nome').value = func.nome || '';
    document.getElementById('funcao').value = func.funcao || '';
    document.getElementById('salario').value = func.salario ?? '';
    document.getElementById('email').value = func.email || '';

    document.getElementById('dataAdmissao').value =
        func.data_admissao
            ? new Date(func.data_admissao).toISOString().slice(0, 10)
            : '';

    document.getElementById('status').value = func.status;
    document.getElementById('departamentoId').value =
        func.departamento_id || '';

    document.getElementById('btnSalvar').textContent =
        'Salvar alterações';

    document.getElementById('btnCancelar').hidden = false;

    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// LIMPAR EDIÇÃO
function limparEdicao() {
    document.getElementById('funcionarioId').value = '';
    document.getElementById('btnSalvar').textContent =
        'Cadastrar funcionário';

    document.getElementById('btnCancelar').hidden = true;
}

document.getElementById('btnCancelar').addEventListener('click', () => {
    document.getElementById('formFuncionario').reset();
    limparEdicao();
});

// EXCLUIR FUNCIONÁRIO
async function excluirFuncionario(id) {
    if (!confirm('Deseja excluir este funcionário?')) return;

    try {
        const resultado = await requisicao(`/api/funcionarios/${id}`, {
            method: 'DELETE'
        });

        avisar(resultado.mensagem);
        await carregarFuncionarios();

    } catch (erro) {
        avisar(erro.message);
    }
}

// SAIR DO SISTEMA
document.getElementById('btnSair').addEventListener('click', async () => {
    try {
        await requisicao('/api/logout', {
            method: 'POST'
        });

        window.location.replace('/login.html');

    } catch (erro) {
        avisar(erro.message);
    }
});

// INICIALIZAÇÃO
async function iniciarSistema() {
    try {
        await verificarUsuario();
        await carregarDepartamentos();
        await carregarFuncionarios();
    } catch (erro) {
        console.error(erro);
    }
}

iniciarSistema();
