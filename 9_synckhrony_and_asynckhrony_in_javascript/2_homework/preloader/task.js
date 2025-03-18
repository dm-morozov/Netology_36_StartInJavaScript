document.addEventListener('DOMContentLoaded', () => {
    const loader = document.querySelector('.loader');
    const itemsContainer = document.querySelector('#items');


    // Функция для отображения валют
    function renderValutes(valutes) {
        itemsContainer.innerHTML = '';
        for(let i = 0; i < valutes.length; i++) {
            const item = document.createElement('div');
            item.classList.add('item');
            
            const itemCode = document.createElement('div');
            itemCode.classList.add('item__code');
            itemCode.textContent = valutes[i].CharCode;

            const itemValue = document.createElement('div');
            itemValue.classList.add('item__value');
            itemValue.textContent = valutes[i].Value;

            const itemCurrency = document.createElement('div');
            itemCurrency.classList.add('item__currency');
            itemCurrency.textContent = 'руб.';

            item.appendChild(itemCode);
            item.appendChild(itemValue);
            item.appendChild(itemCurrency);
            itemsContainer.appendChild(item);
        }
    }


    // Получаем кэшированные данные и сразу отображаем, если они есть
    const cachedValutes = JSON.parse(localStorage.getItem('valutes')) || [];
    if (cachedValutes.length > 0) {
        renderValutes(cachedValutes);
    }


    // Функция для сохранения данных в localStorage
    function saveValutes(valutes) {
        localStorage.setItem('valutes', JSON.stringify(valutes));
    }
    
    
    const xhr = new XMLHttpRequest();
    xhr.addEventListener('readystatechange', () => {
        if (xhr.readyState === xhr.DONE) {
            if (xhr.status === 200) {
                const data = JSON.parse(xhr.responseText);
                const valutes = Object.values(data.response.Valute);
                console.log(valutes);

                // Функция для отображения валют
                renderValutes(valutes);

                // Сохраняем данные в localStorage
                saveValutes(valutes);

                // Убираем анимацию
                loader.classList.remove('loader_active');
            } else {
                console.log('Ошибка', xhr.status);
                loader.classList.remove('loader_active');
            }
        }
    });

    xhr.open('GET', 'https://students.netoservices.ru/nestjs-backend/slow-get-courses', true);
    xhr.send();
})