
require('dotenv').config();

const express = require('express');
const mysql = require('mysql2/promise');
const bcrypt = require('bcrypt');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const path = require('path');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const dbConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
};

const db = mysql.createPool(dbConfig);

const sessionStore = new MySQLStore(dbConfig);

app.use(session({
    name: 'rh.sid',
    secret: process.env.SESSION_SECRET,
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 1000 * 60 * 60 * 2
    }
}));

// Middleware de autenticação
function proteger(req, res, next) {
    if (!req.session.usuario) {
        return res.status(401).json({
            erro: 'Acesso não autorizado.'
        });
    }

    next();
}

// Páginas públicas
app.use(express.static(path.join(__dirname, 'public'), {
    index: false
}));

app.get('/', (req, res) => {
    res.redirect('/login.html');
});

app.get('/index.html', (req, res) => {
    if (!req.session.usuario) {
        return res.redirect('/login.html');
    }

    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// LOGIN
app.post('/api/login', async (req, res) => {
    try {
        const { login, senha } = req.body;

        if (!login || !senha) {
            return res.status(400).json({
                erro: 'Preencha usuário e senha.'
            });
        }

        const [usuarios] = await db.execute(
            'SELECT * FROM usuarios WHERE login = ?',
            [login]
        );

        if (usuarios.length === 0) {
            return res.status(401).json({
                erro: 'Usuário ou senha inválidos.'
            });
        }

        const usuario = usuarios[0];

        const senhaCorreta = await bcrypt.compare(
            senha,
            usuario.senha
        );

        if (!senhaCorreta) {
            return res.status(401).json({
                erro: 'Usuário ou senha inválidos.'
            });
        }

        req.session.regenerate((erro) => {
            if (erro) {
                return res.status(500).json({
                    erro: 'Erro ao iniciar sessão.'
                });
            }

            req.session.usuario = {
                id: usuario.id,
                login: usuario.login
            };

            req.session.save((erro) => {
                if (erro) {
                    return res.status(500).json({
                        erro: 'Erro ao salvar sessão.'
                    });
                }

                res.json({
                    mensagem: 'Login realizado com sucesso!'
                });
            });
        });

    } catch (erro) {
        console.error(erro);
        res.status(500).json({ erro: 'Erro interno.' });
    }
});

// Verificar sessão
app.get('/api/auth/me', proteger, (req, res) => {
    res.json({ usuario: req.session.usuario });
});

// LOGOUT
app.post('/api/logout', proteger, (req, res) => {
    req.session.destroy((erro) => {
        if (erro) {
            return res.status(500).json({
                erro: 'Não foi possível sair.'
            });
        }

        res.clearCookie('rh.sid');
        res.json({ mensagem: 'Logout realizado.' });
    });
});

// DEPARTAMENTOS - LISTAR
app.get('/api/departamentos', proteger, async (req, res) => {
    try {
        const [dados] = await db.execute(
            'SELECT * FROM departamentos ORDER BY nome'
        );
        res.json(dados);
    } catch (erro) {
        res.status(500).json({ erro: 'Erro ao consultar departamentos.' });
    }
});

// DEPARTAMENTOS - CADASTRAR
app.post('/api/departamentos', proteger, async (req, res) => {
    try {
        const { nome, localizacao } = req.body;

        if (!nome || !nome.trim()) {
            return res.status(400).json({ erro: 'Informe o nome.' });
        }

        const [resultado] = await db.execute(
            'INSERT INTO departamentos (nome, localizacao) VALUES (?, ?)',
            [nome.trim(), localizacao || null]
        );

        res.status(201).json({
            id: resultado.insertId,
            mensagem: 'Departamento cadastrado!'
        });
    } catch (erro) {
        res.status(500).json({ erro: 'Erro ao cadastrar departamento.' });
    }
});

// DEPARTAMENTOS - EXCLUIR
app.delete('/api/departamentos/:id', proteger, async (req, res) => {
    try {
        await db.execute(
            'DELETE FROM departamentos WHERE id = ?',
            [req.params.id]
        );

        res.json({ mensagem: 'Departamento excluído!' });
    } catch (erro) {
        res.status(500).json({ erro: 'Erro ao excluir departamento.' });
    }
});

// FUNCIONÁRIOS - LISTAR
app.get('/api/funcionarios', proteger, async (req, res) => {
    try {
        const [dados] = await db.execute(`
            SELECT f.*, d.nome AS departamento
            FROM funcionarios f
            LEFT JOIN departamentos d
            ON f.departamento_id = d.id
            ORDER BY f.id DESC
        `);

        res.json(dados);
    } catch (erro) {
        res.status(500).json({ erro: 'Erro ao consultar funcionários.' });
    }
});

// FUNCIONÁRIOS - CADASTRAR
app.post('/api/funcionarios', proteger, async (req, res) => {
    try {
        const {
            nome, funcao, salario, email,
            data_admissao, status, departamento_id
        } = req.body;

        if (!nome || !nome.trim()) {
            return res.status(400).json({ erro: 'Informe o nome.' });
        }

        const [resultado] = await db.execute(`
            INSERT INTO funcionarios
            (nome, funcao, salario, email, data_admissao,
             status, departamento_id)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `, [
            nome.trim(),
            funcao || null,
            salario || null,
            email || null,
            data_admissao || null,
            status || 'Ativo',
            departamento_id || null
        ]);

        res.status(201).json({
            id: resultado.insertId,
            mensagem: 'Funcionário cadastrado!'
        });

    } catch (erro) {
        console.error(erro);
        res.status(500).json({ erro: 'Erro ao cadastrar funcionário.' });
    }
});

// FUNCIONÁRIOS - EDITAR
app.put('/api/funcionarios/:id', proteger, async (req, res) => {
    try {
        const {
            nome, funcao, salario, email,
            data_admissao, status, departamento_id
        } = req.body;

        if (!nome || !nome.trim()) {
            return res.status(400).json({ erro: 'Informe o nome.' });
        }

        const [resultado] = await db.execute(`
            UPDATE funcionarios SET
            nome = ?, funcao = ?, salario = ?, email = ?,
            data_admissao = ?, status = ?, departamento_id = ?
            WHERE id = ?
        `, [
            nome.trim(),
            funcao || null,
            salario || null,
            email || null,
            data_admissao || null,
            status || 'Ativo',
            departamento_id || null,
            req.params.id
        ]);

        if (!resultado.affectedRows) {
            return res.status(404).json({ erro: 'Funcionário não encontrado.' });
        }

        res.json({ mensagem: 'Funcionário atualizado!' });

    } catch (erro) {
        res.status(500).json({ erro: 'Erro ao atualizar funcionário.' });
    }
});

// FUNCIONÁRIOS - EXCLUIR
app.delete('/api/funcionarios/:id', proteger, async (req, res) => {
    try {
        const [resultado] = await db.execute(
            'DELETE FROM funcionarios WHERE id = ?',
            [req.params.id]
        );

        if (!resultado.affectedRows) {
            return res.status(404).json({ erro: 'Funcionário não encontrado.' });
        }

        res.json({ mensagem: 'Funcionário excluído!' });

    } catch (erro) {
        res.status(500).json({ erro: 'Erro ao excluir funcionário.' });
    }
});

// CRIAR ADMINISTRADOR INICIAL
async function criarAdmin() {
    const login = process.env.ADMIN_LOGIN;
    const senha = process.env.ADMIN_PASSWORD;

    if (!login || !senha) {
        throw new Error('Configure ADMIN_LOGIN e ADMIN_PASSWORD no .env');
    }

    const [usuarios] = await db.execute(
        'SELECT id FROM usuarios WHERE login = ?',
        [login]
    );

    if (usuarios.length === 0) {
        const hash = await bcrypt.hash(senha, 12);

        await db.execute(
            'INSERT INTO usuarios (login, senha) VALUES (?, ?)',
            [login, hash]
        );

        console.log('Administrador inicial criado.');
    }
}

// INICIAR SERVIDOR
async function iniciar() {
    try {
        await db.query('SELECT 1');
        await criarAdmin();

        app.listen(process.env.PORT || 3000, () => {
            console.log('Sistema RH rodando em http://localhost:3000');
        });

    } catch (erro) {
        console.error('Erro ao iniciar sistema:', erro);
        process.exit(1);
    }
}

iniciar();
