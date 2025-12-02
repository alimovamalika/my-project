
function sumOfSquares(arr) {
    return arr.reduce((acc, num) => acc + num * num, 0);
}

function reverseString(str) {
    return str.split("").reverse().join("");
}

function findMinBroken(arr) {
    let min = 0; 
    arr.forEach(n => {
        if (n > min) {  
            min = n;
        }
    });
    return min;
}

if (typeof module !== "undefined") {
    module.exports = { sumOfSquares, reverseString, findMinBroken };
}