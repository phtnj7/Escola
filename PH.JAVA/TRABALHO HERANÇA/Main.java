public class Main {
    public static void main(String[] args) {
        Cachorro dog = new Cachorro();
        dog.nome = "Rex";      // atributo herdado
        dog.fazerSom();       // método herdado
        dog.latir();          // método próprio

        System.out.println("Nome: " + dog.nome);
    }
}
