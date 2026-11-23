
import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class FuncionarioDAO {

    // CADASTRAR
    public void cadastrar(Funcionario funcionario) throws SQLException {
        String sql = """
            INSERT INTO funcionario
            (nome, email, telefone, cargo, departamento, data_admissao)
            VALUES (?, ?, ?, ?, ?, ?)
        """;

        try (Connection conn = Conexao.conectar();
             PreparedStatement stmt = conn.prepareStatement(sql)) {

            stmt.setString(1, funcionario.getNome());
            stmt.setString(2, funcionario.getEmail());
            stmt.setString(3, funcionario.getTelefone());
            stmt.setString(4, funcionario.getCargo());
            stmt.setString(5, funcionario.getDepartamento());

            if (funcionario.getDataAdmissao() != null) {
                stmt.setDate(6, Date.valueOf(funcionario.getDataAdmissao()));
            } else {
                stmt.setNull(6, Types.DATE);
            }

            stmt.executeUpdate();
        }
    }

    // LISTAR
    public List<Funcionario> listar() throws SQLException {
        List<Funcionario> funcionarios = new ArrayList<>();
        String sql = "SELECT * FROM funcionario";

        try (Connection conn = Conexao.conectar();
             PreparedStatement stmt = conn.prepareStatement(sql);
             ResultSet rs = stmt.executeQuery()) {

            while (rs.next()) {

                Date data = rs.getDate("data_admissao");

                Funcionario f = new Funcionario(
                    rs.getInt("id"),
                    rs.getString("nome"),
                    rs.getString("email"),
                    rs.getString("telefone"),
                    rs.getString("cargo"),
                    rs.getString("departamento"),
                    data != null ? data.toLocalDate() : null
                );

                funcionarios.add(f);
            }
        }

        return funcionarios;
    }

    // EXCLUIR
    public void excluir(int id) throws SQLException {
        String sql = "DELETE FROM funcionario WHERE id = ?";

        try (Connection conn = Conexao.conectar();
             PreparedStatement stmt = conn.prepareStatement(sql)) {

            stmt.setInt(1, id);
            stmt.executeUpdate();
        }
    }

    // ATUALIZAR
    public void atualizar(Funcionario funcionario) throws SQLException {
        String sql = """
            UPDATE funcionario SET
            nome = ?, email = ?, telefone = ?, cargo = ?,
            departamento = ?, data_admissao = ?
            WHERE id = ?
        """;

        try (Connection conn = Conexao.conectar();
             PreparedStatement stmt = conn.prepareStatement(sql)) {

            stmt.setString(1, funcionario.getNome());
            stmt.setString(2, funcionario.getEmail());
            stmt.setString(3, funcionario.getTelefone());
            stmt.setString(4, funcionario.getCargo());
            stmt.setString(5, funcionario.getDepartamento());

            if (funcionario.getDataAdmissao() != null) {
                stmt.setDate(6, Date.valueOf(funcionario.getDataAdmissao()));
            } else {
                stmt.setNull(6, Types.DATE);
            }

            stmt.setInt(7, funcionario.getId());

            stmt.executeUpdate();
        }
    }
}
