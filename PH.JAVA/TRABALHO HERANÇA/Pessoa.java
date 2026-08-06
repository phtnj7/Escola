public class Pessoa {
    // Atributos
    String nome;
    int idade;

    // Método
    void apresentar() {
        System.out.println("Olá, meu nome é " + nome + " e tenho " + idade + " anos.");
    }

    public static void main(String[] args) {
        // Criando um objeto da classe Pessoa
        Pessoa p1 = new Pessoa();
        
        // Atribuindo valores aos atributos
        p1.nome = "João";
        p1.idade = 20;

        // Chamando o método
        p1.apresentar();
    }
}
