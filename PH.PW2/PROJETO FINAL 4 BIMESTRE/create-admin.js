const bcrypt = require('bcryptjs');
const db = require('./db');

async function main() {
  const login = 'admin';
  const plainPassword = '123456';

  const hash = await bcrypt.hash(plainPassword, 10);

  await db.query('INSERT INTO usuarios (login, senha) VALUES (?, ?)', [login, hash]);
  console.log('Admin created!');
  process.exit();
}

main();
