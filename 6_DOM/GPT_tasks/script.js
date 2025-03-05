// Твоя задача — написать JavaScript-код, который:

// Найдёт и выведет в консоль:

// Родительский элемент для всех абзацев (т.е. для p.text).
// Все дочерние элементы с классом text.
// Все элементы li в списке с классом list.
// Сделает следующее:

// Добавит класс .active для второго абзаца.
// Удалит класс .text для всех абзацев.
// Поменяет текст первого элемента списка на "Обновленный элемент 1".
// Реализует функцию getNextElement, которая принимает элемент и возвращает следующий элемент этого же родителя. Например, если передан элемент p.text, то функция должна вернуть следующий абзац, если он есть.

// Дополнительные требования:
// Используй методы DOM для поиска элементов, такие как querySelector, querySelectorAll, parentNode, children, и т.д.
// Постарайся поработать с классами элементов, а также манипулировать их содержимым.

document.addEventListener('DOMContentLoaded', () => {
    const paragraphs = document.querySelectorAll('p.text');
    const seenParents = new Set();
    const listItems = document.querySelectorAll('.list li');

    paragraphs.forEach((paragraph, index) => {
        const parent = paragraph.parentElement;
        if (!seenParents.has(parent)) {
            console.log("Родительский элемент абзаца:", parent);
            seenParents.add(parent);
        }
        // Добавит класс .active для второго абзаца.
        if (index === 1) paragraph.classList.add('active');
    });

    console.log(`Все дочерние элементы с классом text:`);
    paragraphs.forEach(paragraph => console.log(paragraph));

    console.log(`Все элементы li в списке с классом list:`);
    listItems.forEach(li => console.log(li));

    // Реализует функцию getNextElement, которая принимает элемент и возвращает следующий элемент
    function getNextElement(element) {
        if (!element) return null;
        return element.nextElementSibling;
    }

    const nextElement = getNextElement(listItems[0])
    console.log('Следующий элемент:', nextElement);

    // Удалит класс .text для всех абзацев.
    paragraphs.forEach(paragraph => {
        paragraph.classList.remove('text');
    });

    // Поменяет текст первого элемента списка на "Обновленный элемент 1".
    if (listItems.length > 0) listItems[0].textContent = 'Обновленный элемент 1';


});