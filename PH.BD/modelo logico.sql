DROP DATABASE IF EXISTS chamusca;
CREATE DATABASE chamusca;
USE chamusca;

CREATE TABLE cliente (
    id_cliente INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE,
    endereco VARCHAR(100),
    idade TINYINT
);

CREATE TABLE empresa (
    id_empresa INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    endereco VARCHAR(100),
    email VARCHAR(100),
    telefone VARCHAR(20)
);

CREATE TABLE veiculo (
    id_veiculo INT AUTO_INCREMENT PRIMARY KEY,
    id_empresa INT,
    valor_fipe DECIMAL(10, 2),
    quilometragem DECIMAL(10, 2),
    FOREIGN KEY (id_empresa) REFERENCES empresa(id_empresa)
);

CREATE TABLE contrato (
    id_contrato INT AUTO_INCREMENT PRIMARY KEY,
    id_cliente INT,
    id_veiculo INT,
    data_devolucao DATE,
    valor_aluguel DECIMAL(10, 2),
    km_inicial DECIMAL(10, 2),
    FOREIGN KEY (id_cliente) REFERENCES cliente(id_cliente),
    FOREIGN KEY (id_veiculo) REFERENCES veiculo(id_veiculo)
);

CREATE TABLE manutencao (
    id_manutencao INT AUTO_INCREMENT PRIMARY KEY,
    id_contrato INT,
    valor_manutencao DECIMAL(10, 2),
    tipo_manutencao VARCHAR(50),
    FOREIGN KEY (id_contrato) REFERENCES contrato(id_contrato)
);

INSERT INTO cliente (nome, email, endereco, idade) VALUES
('Ana Pereira', 'ana@gmail.com', 'Rua D', 28),
('Bruno Costa', 'bruno@gmail.com', 'Rua E', 35),
('Fernanda Alves', 'fernanda@gmail.com', 'Rua F', 22),
('Ricardo Gomes', 'ricardo@gmail.com', 'Rua G', 45),
('Juliana Rocha', 'juliana@gmail.com', 'Rua H', 31);

INSERT INTO empresa (nome, endereco, email, telefone) VALUES
('FastCar', 'Av Paulista', 'fastcar@gmail.com', '11777777777'),
('MoveAuto', 'Rua Azul', 'moveauto@gmail.com', '11666666666');

INSERT INTO veiculo (id_empresa, valor_fipe, quilometragem) VALUES
(1, 45000.00, 20000.00),
(2, 90000.00, 5000.00),
(1, 55000.00, 18000.00),
(2, 70000.00, 10000.00),
(1, 65000.00, 22000.00);

INSERT INTO contrato (id_cliente, id_veiculo, data_devolucao, valor_aluguel, km_inicial) VALUES
(1, 2, '2026-04-15', 2200.00, 5000.00),
(2, 3, '2026-04-20', 1700.00, 18000.00),
(3, 4, '2026-04-22', 2100.00, 10000.00),
(4, 5, '2026-04-25', 1900.00, 22000.00),
(5, 1, '2026-04-30', 1600.00, 20000.00);

INSERT INTO manutencao (id_contrato, valor_manutencao, tipo_manutencao) VALUES
(1, 400.00, 'Troca de pneus'),
(2, 350.00, 'Troca de óleo'),
(3, 600.00, 'Revisão completa'),
(4, 450.00, 'Freios'),
(5, 300.00, 'Alinhamento');

SELECT c.nome AS cliente, e.nome AS locadora, con.valor_aluguel
FROM contrato con
JOIN cliente c ON con.id_cliente = c.id_cliente
JOIN veiculo v ON con.id_veiculo = v.id_veiculo
JOIN empresa e ON v.id_empresa = e.id_empresa;

SELECT e.nome, SUM(m.valor_manutencao) AS total_gasto_manutencao
FROM manutencao m
JOIN contrato con ON m.id_contrato = con.id_contrato
JOIN veiculo v ON con.id_veiculo = v.id_veiculo
JOIN empresa e ON v.id_empresa = e.id_empresa
GROUP BY e.nome;

SELECT AVG(idade) AS media_idade
FROM cliente
WHERE id_cliente IN (SELECT id_cliente FROM contrato WHERE valor_aluguel > 1500);
