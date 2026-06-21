public class Main {
    public static void main(String[] args) {
        Carro carro = new Carro("Toyota", "Corolla", 2000);
        Moto moto = new Moto("Honda", "CB 600", 600);
        Caminhao caminhao = new Caminhao("Volvo", "FH 540", 3000);

        carro.exibirInformacoes();
        moto.exibirInformacoes();
        caminhao.exibirInformacoes();
    }
}