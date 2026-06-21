public class Mamifero extends Animal {
    private String alimento;

    // Construtor
    public Mamifero(String nome, float comprimento, int numeroDePatas,
                    String cor, String ambiente, float velocidadeMedia,
                    String alimento) {
        super(nome, comprimento, numeroDePatas, cor, ambiente, velocidadeMedia);
        this.alimento = alimento;
    }

    // Getter e Setter
    public String getAlimento() { return alimento; }
    public void setAlimento(String alimento) { this.alimento = alimento; }

    // Método dadosMamifero
    public void dadosMamifero() {
        dados();
        System.out.println("Alimento:        " + alimento);
        System.out.println("===========================");
    }
}