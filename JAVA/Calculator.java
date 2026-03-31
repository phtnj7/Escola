import java.util.Scanner;
public class Calculator {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        double firstNumber, secondNumber, result = 0;
        char operator;
        boolean validOperation = true;
        System.out.print("Enter the first number: ");
        firstNumber = scanner.nextDouble();
        System.out.print("Enter the second number: ");
        secondNumber = scanner.nextDouble();
        System.out.print("Enter an operator (+, -, *, /, ^): ");
        operator = scanner.next().charAt(0);
        switch (operator) {
            case '+' -> result = firstNumber + secondNumber;
            case '-' -> result = firstNumber - secondNumber;
            case '*' -> result = firstNumber * secondNumber;
            case '/' ->{ 
                if(secondNumber == 0){
                    System.out.println("Cannot divide by zero!");
                    validOperation = false;
                }
                else{
                    result = firstNumber / secondNumber;
                }
                }
            case '^' -> result = Math.pow(firstNumber, secondNumber);
            default -> {
                System.out.println("Invalid Operator");
                validOperation = false;
            }
        }
        if(validOperation){
            System.out.print(result);
        }
        scanner.close();
    }
    
}