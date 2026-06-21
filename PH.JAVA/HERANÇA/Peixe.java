public class Peixe extends Animal {
    private String caracteristica;

    // Construtor
    public Peixe(String nome, float comprimento, int numeroDePatas,
                 String cor, String ambiente, float velocidadeMedia,
                 String caracteristica) {
        super(nome, comprimento, numeroDePatas, cor, ambiente, velocidadeMedia);
        this.caracteristica = caracteristica;
    }

    // Getter e Setter
    public String getCaracteristica() { return caracteristica; }
    public void setCaracteristica(String caracteristica) { this.caracteristica = caracteristica; }

    // Método dadosPeixe
    public void dadosPeixe() {
        dados(); // chama o método da classe Animal
        System.out.println("Característica:  " + caracteristica);
        System.out.println("===========================");
    }
}

