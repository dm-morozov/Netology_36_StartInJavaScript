// function filterEvenNumbers (numbers) {
//     let new_array = [];
//     for (const element of numbers) {
//         if (element % 2 === 0) {
//             new_array.push(element);
//         }
//     }
//     return new_array;
// }


const filterEvenNumbers = numbers => numbers.filter(num => num % 2 === 0);

console.log(filterEvenNumbers([1, 2, 3, 4, 5, 6])); // [2, 4, 6]
console.log(filterEvenNumbers([10, 15, 20, 25, 30])); // [10, 20, 30]
console.log(filterEvenNumbers([7, 13, 19])); // []
console.log(filterEvenNumbers([])); // []