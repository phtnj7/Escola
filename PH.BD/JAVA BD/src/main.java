import java.util.List;

public class Main {

    public static void main(String[] args) {

        FuncionarioDAO dao = new FuncionarioDAO();

        // INSERIR
        Funcionario funcionario =
                new Funcionario("João Silva", "joao@email.com");

        dao.inserir(funcionario);

        // BUSCAR TODOS
        List<Funcionario> funcionarios = dao.buscarTodos();

        for (Funcionario f : funcionarios) {
            System.out.println(
                    f.getId() + " - " +
                    f.getNome() + " - " +
                    f.getEmail()
            );
        }

        // BUSCAR POR ID
        Funcionario f = dao.buscarPorId(1);

        if (f != null) {
            System.out.println("Encontrado: " + f.getNome());
        }

        // ATUALIZAR
        if (f != null) {
            f.setNome("João Santos");
            f.setEmail("joao.santos@email.com");

            dao.atualizar(f);
        }

        // DELETAR
        // dao.deletar(1);
    }
}