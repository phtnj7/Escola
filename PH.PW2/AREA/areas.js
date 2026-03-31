function calcularArea() {
    let figura = document.getElementById("figura").value;
    let v1 = Number(document.getElementById("valor1").value);
    let v2 = Number(document.getElementById("valor2").value);
    let area;

    if (figura === "quadrado") {
        area = v1 * v1;
    } 
    else if (figura === "retangulo") {
        area = v1 * v2;
    } 
    else if (figura === "triangulo") {
        area = (v1 * v2) / 2;
    } 
    else if (figura === "circulo") {
        area = Math.PI * v1 * v1;
    }

    document.getElementById("resultado").innerText = "Área = " + area.toFixed(2);
}