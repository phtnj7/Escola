
const formLogin = document.getElementById('formLogin');
const mensagem = document.getElementById('mensagem');

formLogin.addEventListener('submit', async (event) => {
    event.preventDefault();

    const login = document.getElementById('login').value.trim();
    const senha = document.getElementById('senha').value;

    mensagem.textContent = 'Verificando credenciais...';

    try {
        const resposta = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ login, senha })
        });

        const dados = await resposta.json();

        if (!resposta.ok) {
            mensagem.textContent = dados.erro || 'Falha no login.';
            return;
        }

        window.location.href = '/index.html';

    } catch (erro) {
        mensagem.textContent = 'Erro de conexão com o servidor.';
    }
});
