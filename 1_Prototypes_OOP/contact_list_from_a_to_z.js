// Задание «Список контактов от А до Я»
// Условие задачи
// Продолжим работать над функциями для приложения «Контакты» («Телефонная книга»). В таких приложениях список контактов автоматически сортируется по именам от А до Я для удобства поиска нужного контакта путём перелистывания (прокручивания).

// Необходимо отсортировать список контактов по именам в порядке возрастания (от А до Я). Функция sortContacts в качестве параметров принимает список контактов. В качестве результата необходимо вернуть ссылку на отсортированный список контактов.


const phoneBook = [
    { name: "Сантехник", phone: 71234567890 },
    { name: "Бассейн для детей", phone: 74567890123 },
    { name: "Оля", phone: 77890123456 },
    { name: "Саня", phone: 71111002030 },
    { name: "Брат", phone: 73211020304 },
    { name: "Мама", phone: 75555050102 },
    { name: "Танцы", phone: 73752224896 },
    { name: "Доставка", phone: 74786263190 },
    { name: "Служба спасения", phone: 78183754321 },
    { name: "Школа Арта", phone: 78171000001 },
    { name: "Классный руководитель", phone: 75559095737 },
    { name: "Анастасия", phone: 75555050103 },
    { name: "Санта (Дед Мороз)", phone: 76549876543 },
    { name: "Володя", phone: 75555050110 },
    { name: "Английский", phone: 73752456513 },
    { name: "СТОшка", phone: 71231234567 },
    { name: "Работа", phone: 72223334455 },
    { name: "Заказ тортов", phone: 75158087060 },
    { name: "Санаторий", phone: 74241598426 },
];


const sortContacts = function (contacts) {
    /*
     * Необходимо реализовать логику сортировки телефонной
     * книги по именам контактов. В качестве параметра данная
     * функция принимает список контактов, который следует
     * отсортировать. В качестве результата необходимо вернуть
     * отсортированный список.
     */

    return contacts.sort((a, b) => a.name.localeCompare(b.name, 'ru', {sensitivity:'base'}));
};


const deleteContact = function (phoneBook=[], phoneDelete=null) {
    if (!phoneBook || !phoneDelete) return;
    /*
    * Необходимо реализовать удаление контакта из переданного списка.
    * В качестве результата ничего возвращать не надо.
    */
    index = phoneBook.findIndex(contact => contact.phone == phoneDelete);
    if (index !== -1) phoneBook.splice(index, 1);
}


// import { phoneBook } from "./phoneBook.js";
// import { sortContacts } from "./sortContacts.js";

console.log("Телефонная книга до сортировки:");
console.log(phoneBook); // Ожидаем, что список контактов представлен в том же порядке как и в файле phoneBook.js

sortContacts(phoneBook);

console.log("Телефонная книга отсортирована:");
console.log(phoneBook); // Ожидаем, что список контактов отсортирован (Анастасия, Английский...Танцы, Школа Арта)

deleteContact(phoneBook, 75555050103);
console.log(phoneBook);