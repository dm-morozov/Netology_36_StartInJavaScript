document.addEventListener('DOMContentLoaded', () => {
    const book = document.getElementById('book');
    // const fontSizeControl = document.querySelector('.book__control_font-size');
    // const fontSizeButtons = fontSizeControl.querySelectorAll('.font-size')

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