const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('./db');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

const SECRET = 'change-this-secret';

app.post('/api/login', async (req, res) => {
  const { login, senha } = req.body;

  if (!login || !senha) {
    return res.status(400).json({ message: 'Login and password are required.' });
  }

  try {
    const [rows] = await db.query('SELECT * FROM usuarios WHERE login = ?', [login]);

    if (rows.length === 0) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }

    const user = rows[0];
    const passwordMatches = await bcrypt.compare(senha, user.senha);

    if (!passwordMatches) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }

    const token = jwt.sign({ id: user.id, login: user.login }, SECRET, { expiresIn: '1h' });

    res.json({ message: 'Login successful!', token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error.' });
  }
});

app.listen(3000, () => console.log('Server running at http://localhost:3000'));
