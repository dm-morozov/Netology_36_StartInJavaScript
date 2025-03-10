// Задание «А по возрасту проходит?»
// Условие задачи
// В JavaScript доступен для использования ещё один вид функций – стрелочные функции. Такие функции имеют свой ряд особенностей по сравнению с обычными функциями.

// В этом задании рассмотрим синтаксис стрелочных функций на примере функции, которая возвращает булево значение в зависимости от переданного в неё возраста.

// Гражданин может считаться совершеннолетним по достижении 18-ти лет. Начиная с этого возраста, ему (ей) доступен полный перечень прав, возможностей и обязанностей.

// Необходимо заменить классическую функцию на стрелочную, которая определяет имеет ли человек полный перечень разрешений, или нет?


/*
 * Необходимо заменить функцию на стрелочную функцию.
 */
// export const permit = function (age) {
//   if (age >= 18) {
//     return true;
//   }

//   return false;
// };

const permit = age => age >= 18;

// import { permit } from "./permit.js";

let permission = permit(13);

console.log(permission); // ожидается false

permission = permit(18);
console.log(permission); // ожидается true

permission = permit(27);
console.log(permission); // ожидается true