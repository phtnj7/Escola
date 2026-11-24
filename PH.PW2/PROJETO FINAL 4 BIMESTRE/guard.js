if (localStorage.getItem('logado') !== 'true') {
  window.location.href = 'login.html';
}

function logout() {
  localStorage.removeItem('logado');
  localStorage.removeItem('token');
  window.location.href = 'login.html';
}
