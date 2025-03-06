# Домашнее задание к занятию «DOM»

В рамках домашнего задания к занятию «DOM» были реализованы следующие задачи:

## [1. Появление элементов при прокрутке](./reveal/)
**Что сделали:**  
Реализовали эффект появления элементов с классом `.reveal` при прокрутке страницы. Использовали событие `scroll` для проверки видимости элементов. С помощью метода `getBoundingClientRect()` определяли положение каждого блока относительно окна браузера, добавляя класс `reveal_active`, если элемент находится в видимой области, и убирая его, если выходит за пределы. Код:  
```javascript
document.addEventListener('DOMContentLoaded', () => {
    const revealBlocks = document.querySelectorAll('.reveal');
    
    function checkVisibility() {
        revealBlocks.forEach(revealBlock => {
            const {top, bottom} = revealBlock.getBoundingClientRect();
            if (bottom < 0 || top > window.innerHeight) return revealBlock.classList.remove('reveal_active');
            revealBlock.classList.add('reveal_active');
        });
    }

    window.addEventListener('scroll', checkVisibility);
    checkVisibility();
});
```

**Трудности:**  
Трудностей при реализации этой задачи не возникло. Логика проверки видимости была понятной, а метод `getBoundingClientRect()` оказался удобным инструментом для определения положения элементов. Задача была выполнена самостоятельно, поэтому она не обсуждалась дополнительно.

## [2. Ротатор рекламы](./ads/)
**Что сделали:**  
Реализовали ротатор рекламы, который переключает активные элементы (`.rotator__case`) внутри контейнера `.rotator` с заданной скоростью. Использовали `setTimeout` вместо `setInterval`, чтобы динамически обновлять интервал переключения на основе атрибута `data-speed`. Добавили смену цвета текста через `data-color` и обработку циклического перехода от последнего элемента к первому. Код:  
```javascript
document.addEventListener('DOMContentLoaded', () => {
    const rotators = document.querySelectorAll('.rotator');
    let speed = 1000;

    function checkVisivility() {

        rotators.forEach(rotator => {
            const rotatorCase = document.querySelector('.rotator__case.rotator__case_active');
            rotatorCase.classList.remove('rotator__case_active');
            
            let nextElement;
            if (rotatorCase.nextElementSibling) {
                nextElement = rotatorCase.nextElementSibling;
            } else {
                nextElement = rotator.firstElementChild;
            }

            nextElement.classList.add('rotator__case_active');
            nextElement.style.color = nextElement.dataset.color;
            speed = parseInt(nextElement.dataset.speed, 10) || 1000;
            console.log('Элемент на странице: ', nextElement);
            setTimeout(checkVisivility, speed);
        });
    }
    checkVisivility()
});
```

**Трудности:**  
- Изначально использовался `setInterval`, но он не обновлял интервал при смене `speed`, что приводило к фиксированной задержке. Переход на `setTimeout` решил проблему, хотя потребовал переосмысления логики.
- Возникла сложность с типом данных: `dataset.speed` возвращал строку, а `setTimeout` ожидал число. Использование `parseInt` с явным указанием основания 10 устранило эту проблему.
- Было не сразу очевидно, как правильно обрабатывать переход от последнего элемента к первому — решили через условный оператор с `nextElementSibling || firstElementChild`.

## [3. Онлайн-читалка](./book-reader/)
**Что сделали:**  
Разработали интерфейс онлайн-читалки с управлением размером шрифта, цветом текста и фона. Использовали единый цикл для обработки всех блоков управления (`.book__control`), переключая классы у элемента `.book` на основе `data-*` атрибутов. Реализовали как базовую задачу (размер шрифта), так и повышенный уровень сложности (цвет текста и фона). Код:  
```javascript
document.addEventListener('DOMContentLoaded', () => {
    const book = document.getElementById('book');
    const bookControls = document.querySelectorAll('.book__control');

    bookControls.forEach(control => {
        // Нашли все кнопки
        const buttons = control.querySelectorAll('a');

        buttons.forEach(button => {
            button.addEventListener('click', (event) => {

                event.preventDefault();
                // Убираем активный класс
                buttons.forEach(btn => btn.classList.remove('font-size_active', 'color_active'));

                // Добавляем класс активной кнопке
                if (control.classList.contains('book__control_font-size')) {
                    button.classList.add('font-size_active');
                } else {
                    button.classList.add('color_active');
                }

                // Убираем классы size у книги, если есть
                if (control.classList.contains('book__control_font-size')){
                    book.classList.remove('book_fs-small', 'book_fs-big');

                    // Добавляем класс книге в зависимости от data-size нажатой кнопке
                    const size = button.dataset.size;
                    if (size === 'small') {
                        book.classList.add('book_fs-small')
                    } else if (size === 'big') {
                        book.classList.add('book_fs-big');
                    }
                    
                } else if (control.classList.contains('book__control_color')) {
                    book.classList.remove('book_color-black', 'book_color-gray', 'book_color-whitesmoke');

                    const textColor = button.dataset.textColor;
                    if (textColor) book.classList.add(`book_color-${textColor}`);

                } else if (control.classList.contains('book__control_background')) {
                    book.classList.remove('book_bg-black', 'book_bg-gray', 'book_bg-white');

                    const bgColor = button.dataset.bgColor;
                    if (bgColor) book.classList.add(`book_bg-${bgColor}`);
                }
            });
        });
    });
});
```

**Трудности:**  
- Изначально обработчик клика был привязан к контейнеру `.book__control_font-size`, а не к кнопкам `.font-size`, из-за чего клики не срабатывали. Перенос слушателя на кнопки решил проблему.
- Было сложно понять, как масштабировать код с одного блока управления до трех. Переход к перебору всех `.book__control` и проверке их типа через `classList.contains` сделал код универсальным.
- Возник вопрос с выбором классов (`book_color-*`, `book_bg-*`) — они были взяты из явного списка в задании, но пришлось сопоставить их с `data-*` атрибутами, что потребовало внимательного чтения условий.
- Добавление `event.preventDefault()` было необходимо, чтобы ссылки `<a>` не вызывали нежелательного поведения страницы.

---

Все три задачи успешно решены с учетом требований. Код соответствует [стилю оформления Netology](https://github.com/netology-code/codestyle), включая отступы, именование переменных и структурирование. Работы готовы к отправке на проверку.

### Если возникнут вопросы по задачам, пишите или в чат учебной группы:
- [LinkedIn](https://www.linkedin.com/in/dm-morozov/)
- [Telegram](https://t.me/dem2014)
- [GitHub](https://github.com/dm-morozov/)

## Бонус

### Загрузка страницы

Давайте поговорим о критическом CSS и блокирующем JavaScript.

Статьи о критическом CSS:

1. [Разбираемся с критичным CSS.](http://prgssr.ru/development/razbiraemsya-s-kritichnym-css.html)
2. [Критический CSS + прогрессивный CSS = ?](https://medium.com/web-standards/critical-and-progressive-css-d6611f034d7d)

Для ускорения страниц в теге *link*
применяется дополнительный атрибут *rel* со значением *preload*.

Узнать об этом подробнее вы можете в статье:
[Предварительная загрузка контента при помощи rel="preload".](https://developer.mozilla.org/ru/docs/Web/HTML/Preloading_content)

JavaScript-файл без атрибута async может замедлить загрузку страницы. Подробнее
читайте в статьях: 

1. [Remove Render-Blocking JavaScript.](https://developers.google.com/speed/docs/insights/BlockingJS)
2. [Оптимизация JavaScript для быстрой визуализации страницы.](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/adding-interactivity-with-javascript?hl=ru)
3. [The Cost Of JavaScript In 2018.](https://medium.com/@addyosmani/the-cost-of-javascript-in-2018-7d8950fbb5d4) 

Также рекомендуем изучить презентацию [Critical JavaScript Path.](https://speakerdeck.com/jonthanfielding/critical-javascript-path) 

### Узлы

Вы уже знаете, что наиболее важные узлы в DOM — текстовые и HTML-элементы.
Все узлы реализуются в интерфейсе [Node.](https://developer.mozilla.org/ru/docs/Web/API/Node)
Реализация HTML-элементов (наследуют свойства и методы от *Node*)
представлена интерфейсом [Element](https://developer.mozilla.org/ru/docs/Web/API/Element).

Мы говорим преимущественно о 2 типах узлов, но в DOM их [12 типов](https://developer.mozilla.org/ru/docs/Web/API/Node/nodeType),
почти половина из которых порицается.

### Подробнее о DOM

Часть из этих статей вы также можете найти в конце презентации к лекции.

1. [Атрибуты и DOM-свойства.](https://learn.javascript.ru/attributes-and-custom-properties)
2. [Использование data-* атрибутов.](https://developer.mozilla.org/ru/docs/Web/Guide/HTML/Using_data_attributes)
3. [Координаты в окне.](https://learn.javascript.ru/coordinates)
4. [Element.getBoundingClientRect().](https://developer.mozilla.org/ru/docs/Web/API/Element/getBoundingClientRect)
5. [Translating Viewport Coordinates Into Element-Local Coordinates Using Element.getBoundingClientRect().](https://www.bennadel.com/blog/3441-translating-viewport-coordinates-into-element-local-coordinates-using-element-getboundingclientrect.htm)
