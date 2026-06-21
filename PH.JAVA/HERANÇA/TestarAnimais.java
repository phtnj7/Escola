public class TestarAnimais {
    public static void main(String[] args) {
        Mamifero camelo = new Mamifero("Camelo", 1.5f, 4, "Amarelo", "Terrestre", 2.0f, "Herbívoro");
        Peixe tubarao = new Peixe("Tubarão", 3.0f, 0, "Cinzento", "Aquático", 40.0f, "Barbatanas e Cauda");
        Mamifero ursocanada = new Mamifero("Urso-do-canadá",180.0f,4,"Vermelho","Terra",0.5f,"Mel");
        camelo.dadosMamifero();
        tubarao.dadosPeixe();
        ursocanada.dadosMamifero();
    }
}
