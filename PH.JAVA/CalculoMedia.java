import java.util.Scanner;

public class CalculoMedia {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        String nome;
        double n, r=0,mediafinal;
        System.out.print("Escreva seu nome: ");
        nome = scanner.nextLine();
        for(int i=1;i<7;i++){
            System.out.printf("Escreva a nota %s: ",i);
            n = scanner.nextDouble();
            r+=n;
        }
        mediafinal= r/6;
        System.out.printf("Aluno: %s \nMedia: %.1f",nome,mediafinal);
        scanner.close();
    }
}
