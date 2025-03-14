// Выбор жанра фильма
// Условие задачи
// Создайте функционал формы с выбором жанра для фильма, которая содержит обязательное для заполнения поле ввода «Название фильма», селект «Жанр» и кнопку действия «Отправить». Селект с жанрами нужно предсоздать.

// Если поле ввода заполнено, то при нажатии на кнопку происходит эмуляция отправки формы. В разметке существует блок div с классом content, данные должны быть записаны в этот тег.

// Пример разметки:

// <div class="content">
//     <p>Название фильма: Аватар</p>
//     <p>Жанр: Фантастика</p>
// </div>

// Процесс реализации

// Найти нужные элементы.
// Добавить элементы options в селект. Жанры:


// {label: 'Драма', value: 'drama'}
// {label: 'Комедия', value: 'comedy'}
// {label: 'Фантастика', value: 'sci-fi'}
// Добавить обработчик.
// Написать логику в обработчике.
'use strict'
document.addEventListener('DOMContentLoaded', function() {
    const forms = document.querySelectorAll('form');
    const genreContent = [
        {label: 'Драма', value: 'drama'},
        {label: 'Комедия', value: 'comedy'},
        {label: 'Фантастика', value: 'sci-fi'},
    ];
    
    forms.forEach(form => {
        const select = form.querySelector('select');
        const input = form.querySelector('#name');
        const btn = form.querySelector('button[type="submit"]');
        const content = document.querySelector('.content');
        
        select.add(new Option('Выберите жанр', '', true, true));
        select.options[0].disabled = true;

        genreContent.forEach(({label, value}) => {
            select.add(new Option(label, value));
        });

        form.addEventListener('submit', function(event) {
            event.preventDefault();

            const movieName = input.value.trim();
            const selectedGenre = select.options[select.selectedIndex].text;

            if (!movieName || !select.value) {
                content.innerHTML = "Введите название фильма и выберите жанр"
                return;
            }

            // Создаем абзацы и добавляем их в content

            const NameParagraph = document.createElement('p');
            NameParagraph.textContent = `Название фильма: ${movieName}`;

            const GenreParagraph = document.createElement('p');
            GenreParagraph.textContent = `Жанр: ${selectedGenre}`;
            
            // Очищаем контейнер
            if (content.textContent) content.innerHTML = '';

            // Добавляем Имя и ЖАнр
            content.appendChild(NameParagraph);
            content.appendChild(GenreParagraph);

            // Очищаем поля
            input.value = '';
            select.selectedIndex = 0;

        });
    });
});
