function calcular() {
    let figura = document.getElementById("figura").value;
    let v1 = Number(document.getElementById("valor1").value);
    let v2 = Number(document.getElementById("valor2").value);
    let res;

    if (figura === "soma") {
        res = v1 + v2;
    }
    else if (figura === "subtracao") {
        res = v1 - v2;
    }
    else if (figura === "multiplicacao") {
        res = v1 * v2;
    }
    else if (figura === "divisao") {
        if (v2 !== 0) {
            res = v1 / v2;
        } else {
            res = "Erro: Divisão por zero";
        }
    }
    let display = document.getElementById("resultado");
    display.innerText = "Resultado = " + res.toFixed(2);
}