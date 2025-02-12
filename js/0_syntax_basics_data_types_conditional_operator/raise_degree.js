/*
 * Необходимо внести изменения в уже реализованный алгоритм так чтобы:
 * - возведение в степень осуществлялось быстрее чем это реализовано сейчас
 * - по возможности избавиться от рекурсии
 */
const pow = function (num, exp) {
    if (exp <= 0) {
      return 1;
    }
  
    const negative = num < 0 && exp % 2 > 0 ? -1 : 1;
    
    num *= negative;
    
    return negative * num * pow(num, exp - 1);
};


const pow2 = function (num, exp) {
    if (exp <= 0) {
        return 1;
      }

    const negative = num < 0 && exp % 2 > 0 ? -1 : 1;
    let result = num;
    for (let i=1; i < exp; i++) {
        result *= num;
    }

    return result;

}


let result = pow(2, 3);

console.log(result);

result = pow(-10, 5);
console.log(result);

result = pow(-3, 4);
console.log(result);

result = pow2(2, 3);
console.log(result);

result = pow2(-10, 5);
console.log(result);

result = pow2(-3, 4);
console.log(result);