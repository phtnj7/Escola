import java.util.Scanner;
import java.util.ArrayList;
public class Lista
{
    public static void main(String[] args) {
        int opcao;
        int num;
        int indice;
        double soma = 0;
        Scanner scanner = new Scanner(System.in);
        ArrayList<Double> notas = new ArrayList<>();
        while (true){
            System.out.print("Selecione uma opção \n[0] Adicionar nota \n" +
                    "[1] Remover Nota \n" +
                    "[2] Listar Notas \n" +
                    "[3] Calcular Media \n" +
                    "[4] Sair: ");
            opcao = scanner.nextInt();
            if (opcao == 0){
                System.out.print("Digite uma nota: ");
                double nota = scanner.nextDouble();
                notas.add(nota);
            }
            if (opcao == 1){
                System.out.print(notas+ " Escolha uma nota para remover (digite o indice): ");
                num = scanner.nextInt();
                notas.remove(num);
            }
            if (opcao == 2){
                System.out.println(notas);
            }
            if (opcao == 3){
                indice = notas.size();
                for (double nota : notas){
                    soma += nota;
                }
                System.out.println(soma);
            }
            if (opcao == 4){
                break;
            }

        }
        System.out.println(notas);
    }
}