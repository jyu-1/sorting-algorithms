// let num1 = 0;
// let num2 = 1;
// let c = 0;
// let array = [];

// for (i = 0; i < 8; i++) {
//     if (array.length === 0) {
//         array.push(num1);
//     } else if (array.length === 1) {
//         array.push(num2);
//     } else {
//         c = num1 + num2;
//         array.push(c);
//         num1 = num2;
//         num2 = c;
//     }
// }

function fib(n, array = [0, 1]) {
    if (array.length >= n) return array;

    return fib(n, [
        ...array,
        array[array.length - 2] + array[array.length - 1],
    ]);
}

console.log(fib(8));
