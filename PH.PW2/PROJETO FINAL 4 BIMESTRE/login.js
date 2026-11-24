const form = document.getElementById('loginForm');
const errorMessage = document.getElementById('errorMessage');

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  errorMessage.textContent = '';

  const login = document.getElementById('login').value;
  const senha = document.getElementById('senha').value;

  try {
    const response = await fetch('http://localhost:3000/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ login, senha })
    });

    const data = await response.json();

    if (response.ok) {
      localStorage.setItem('logado', 'true');
      localStorage.setItem('token', data.token);
      window.location.href = 'index.html';
    } else {
      errorMessage.textContent = data.message;
    }
  } catch (error) {
    errorMessage.textContent = 'Could not connect to the server.';
  }
});
