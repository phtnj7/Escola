document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); 

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const message = document.getElementById('message');

    if (email === "admin@teste.com" && password === "123456") {
        message.style.color = "green";
        message.textContent = "Login realizado com sucesso! Redirecionando...";
        
        setTimeout(() => {
            alert("Você entrou!");
        }, 2000);
    } else {
        message.style.color = "red";
        message.textContent = "E-mail ou senha incorretos.";
    }
});