// 📝 Задача:
// Напиши функцию createPassword(password), 
// которая принимает строку password и возвращает другую функцию. 
// Эта вложенная функция должна проверять введённый пароль:

// const checkPassword = createPassword("secret123");

// console.log(checkPassword("secret123")); // true
// console.log(checkPassword("wrongpass")); // false
// Попробуй решить сам, а потом сверимся с моим вариантом! 🚀

function createPassword(password) {
    let pass = password;
    return (itpass) => {
        return pass === itpass;
    }
}

const checkPassword = createPassword("secret123");

console.log(checkPassword("secret123")); // true
console.log(checkPassword("wrongpass")); // false


// Задача:
// Создай функцию counter, которая будет возвращать другую функцию. 
// Эта вложенная функция при каждом вызове должна увеличивать счетчик 
// на 1 и возвращать его текущее значение.

// Пример работы:

// const count = counter();

// console.log(count()); // 1
// console.log(count()); // 2
// console.log(count()); // 3
// Попробуй решить сам! Если что, подскажу 😃


function counter(startNumber = 1) {
    let count = startNumber;
    return () => count++;
}

const count = counter(10);

console.log(count()); // 1
console.log(count()); // 2
console.log(count()); // 3