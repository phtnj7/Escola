package javaapplication2;
public class JavaApplication2 {
    public static void main(String[] args) {
        CadastroUsuario sistema = new CadastroUsuario();
        
        try{
            sistema.cadastrar("Felipe Bueno", 17);
        }catch (SemIdadeGrande e){
            System.err.println(e.getMessage());
        }
        try{
            sistema.cadastrar("Bruna", 150);
        }catch (SemIdadeGrande e){
            System.err.println(e.getMessage());
        }
    }
    
}
