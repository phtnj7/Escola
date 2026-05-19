drop database if exists atividade;
create database atividades;
use atividades;

create table Clientes ( 
	id_cliente INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(40) NOT NULL,
    cidade VARCHAR(40)
    idade int
);

	INSERT INTO clientes(nome, cidade, idade) VALUES
	('Ana Pereira', 'Espirito Santo', '19'),
    ('João Vitor', 'Rio de Janeiro', '21'),
    ('Fernanda Santos', 'São Paulo', '18'),
    ('Neymar Junior', 'Ceara','31'),
    ('Lucas Henrique','Ribeirao Preto','15');
    

Select * from clientes where id_clientes in (1,2,3,4,5);
Select * from clientes where idade > 18;
Select * from clientes where cidade = 'São Paulo';
Select * from clientes where id_clientes + 1;

