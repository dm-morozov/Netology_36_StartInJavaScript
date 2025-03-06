document.addEventListener('DOMContentLoaded', () => {
    const book = document.getElementById('book');
    const fontSizeControl = document.querySelector('.book__control_font-size');
    const fontSizeButtons = fontSizeControl.querySelectorAll('.font-size')
    
    fontSizeButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            event.preventDefault();
            // Убираем активный класс
            fontSizeButtons.forEach(btn => btn.classList.remove('font-size_active'));

            // Добавляем класс активной кнопке
            button.classList.add('font-size_active');

            // Убираем классы size у книги, если есть
            book.classList.remove('book_fs-small', 'book_fs-big');

            // Добавляем класс книге в зависимости от data-size нажатой кнопке
            const size = button.dataset.size;
            if (size === 'small') {
                book.classList.add('book_fs-small')
            } else if (size === 'big') {
                book.classList.add('book_fs-big');
            }

        });
    });
});