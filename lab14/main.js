function runDemo() {
    const output = [];

    output.push("=== Демонстрация функций ===");
    output.push("sumOfSquares([1,2,3]) = " + sumOfSquares([1, 2, 3]));
    output.push('reverseString("HELLO") = ' + reverseString("HELLO"));

    const broken = findMinBroken([5, 1, -3, 7]);
    output.push("findMinBroken([5,1,-3,7]) → " + broken + " (ошибка)")

    document.getElementById("output").textContent = output.join("\n");
}