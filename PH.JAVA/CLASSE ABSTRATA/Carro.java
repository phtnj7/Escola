public class Carro extends Veiculo{
    private double cilindrada;

    public Carro(String marca, String modelo, double cilindrada) {
        super(marca, modelo);
        this.cilindrada = cilindrada;
    }

    @Override
    public double calcularConsumo() {
        return 15.0 - (cilindrada / 200);
    }

    public double getCilindrada() { return cilindrada; }
}