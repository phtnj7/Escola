
import java.time.LocalDate;

public class Funcionario {
    private int id;
    private String nome;
    private String email;
    private String telefone;
    private String cargo;
    private String departamento;
    private LocalDate dataAdmissao;

    public Funcionario() {
    }

    public Funcionario(int id, String nome, String email,
                       String telefone, String cargo,
                       String departamento, LocalDate dataAdmissao) {
        this.id = id;
        this.nome = nome;
        this.email = email;
        this.telefone = telefone;
        this.cargo = cargo;
        this.departamento = departamento;
        this.dataAdmissao = dataAdmissao;
    }

    public Funcionario(String nome, String email,
                       String telefone, String cargo,
                       String departamento, LocalDate dataAdmissao) {
        this(0, nome, email, telefone, cargo, departamento, dataAdmissao);
    }

    public int getId() { return id; }
    public void setId(int id) { this.id = id; }

    public String getNome() { return nome; }
    public void setNome(String nome) { this.nome = nome; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getTelefone() { return telefone; }
    public void setTelefone(String telefone) { this.telefone = telefone; }

    public String getCargo() { return cargo; }
    public void setCargo(String cargo) { this.cargo = cargo; }

    public String getDepartamento() { return departamento; }
    public void setDepartamento(String departamento) {
        this.departamento = departamento;
    }

    public LocalDate getDataAdmissao() { return dataAdmissao; }
    public void setDataAdmissao(LocalDate dataAdmissao) {
        this.dataAdmissao = dataAdmissao;
    }
}
