import java.util.Scanner;
public class CalculadoraArray {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        int[] numbers;
        int size,first,second;
        //System.out.print("What # of numbers do you want?: "); | size = scanner.nextInt();
        size = 10;
        scanner.nextLine();
        numbers = new int[size];
        for(int i = 0;i<numbers.length;i++){
            System.out.print("Enter the 1st number: ");
            first = scanner.nextInt();
            System.out.print("Enter the 2nd number: ");
            second = scanner.nextInt();
            numbers[i] = first+second;
            System.out.println("----------------------");    
        }
        for(int n: numbers){
            System.out.print(n+" ");
        }
        scanner.close();
    }
}