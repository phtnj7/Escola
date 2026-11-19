import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

public class Controle {
    public static void main(String[] args) {
        try (Scanner scanner = new Scanner(System.in)) {
            List<Aluno> listaAlunos = new ArrayList<>();
            
            while (true) {
                System.out.print("Digite o nome do aluno (ou 'fim' para encerrar): ");
                String nome = scanner.nextLine();
                
           
                if (nome.equalsIgnoreCase("fim")) {
                    break;
                }
                
                System.out.print("Digite a primeira nota (0 a 100): ");
                int nota1 = Integer.parseInt(scanner.nextLine());
                
                System.out.print("Digite a segunda nota (0 a 100): ");
                int nota2 = Integer.parseInt(scanner.nextLine());
                
             
                Aluno aluno = new Aluno(nome, nota1, nota2);
                listaAlunos.add(aluno);
                System.out.println("Aluno cadastrado com sucesso!\n");
            }
            
        
            if (listaAlunos.isEmpty()) {
                System.out.println("Nenhum aluno foi cadastrado.");
                scanner.close();
                return;
            }
            
           
            double somaMediasTurma = 0;
            int aprovados = 0;
            int naFinal = 0;
            int reprovados = 0;
            
            for (Aluno a : listaAlunos) {
                double mediaAluno = a.getMedia();
                somaMediasTurma += mediaAluno;
                
              
                if (mediaAluno >= 70.0) {
                    aprovados++;
                } else if (mediaAluno >= 40.0) {
                    naFinal++;
                } else {
                    reprovados++;
                }
            }
            
            double mediaTurma = somaMediasTurma / listaAlunos.size();
            
     
            System.out.println("\n--- ESTATÍSTICAS DA TURMA ---");
            System.out.printf("Média da turma: %.2f\n", mediaTurma);
            System.out.println("Alunos aprovados: " + aprovados);
            System.out.println("Alunos na final: " + naFinal);
            System.out.println("Alunos reprovados: " + reprovados);
            
            System.out.println("\n--- ALUNOS ABAIXO DA MÉDIA DA TURMA ---");
            boolean encontrouAbaixoDaMedia = false;
            
            for (int i = 0; i < listaAlunos.size(); i++) {
                Aluno a = listaAlunos.get(i);
                if (a.getMedia() < mediaTurma) {
                   
                    System.out.println("Código (Índice): " + i + " | Nome: " + a.getNome() + " | Média: " + a.getMedia());
                    encontrouAbaixoDaMedia = true;
                }
            }
            
            if (!encontrouAbaixoDaMedia) {
                System.out.println("Nenhum aluno ficou abaixo da média da turma.");
            }
        }
    }
}