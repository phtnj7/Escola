package javaapplication2;

public class CadastroUsuario {
    private String nome;
    private int idade;

    public void cadastrar(String nome, int idade) {
        if (idade >= 120) {
            throw new SemIdadeGrande("Idade inválida!");
        }
        
        this.nome = nome;
        this.idade = idade;
            
        System.out.println("Usuário " + nome + " cadastrado com sucesso!");
    }
}
