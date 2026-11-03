
CREATE DATABASE sistema_rh;
USE sistema_rh;

-- Tabela de usuários
CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    login VARCHAR(50) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL
);

-- Tabela de departamentos
CREATE TABLE departamentos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    localizacao VARCHAR(100)
);

-- Tabela de funcionários
CREATE TABLE funcionarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    funcao VARCHAR(100),
    salario DECIMAL(10,2),
    email VARCHAR(150),
    data_admissao DATE,
    status ENUM('Ativo', 'Inativo') DEFAULT 'Ativo',
    departamento_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (departamento_id)
    REFERENCES departamentos(id)
    ON DELETE SET NULL
);

-- Departamentos iniciais
INSERT INTO departamentos (nome, localizacao)
VALUES
('Recursos Humanos', 'Bloco A'),
('Financeiro', 'Bloco B'),
('Tecnologia', 'Bloco C');
