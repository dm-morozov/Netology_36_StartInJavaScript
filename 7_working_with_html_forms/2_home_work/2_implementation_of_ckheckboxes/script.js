// Реализация чекбоксов


// Условие задачи
// Реализуйте инструмент с чекбоксами для кухни пиццерии. Принцип работы:

// когда выбраны все три чекбокса с ингредиентами пиццы «Маргарита», пицца считается сделанной и автоматически проставляется галка в чекбоксе Pizza;
// если хотя бы один из чекбоксов с ингредиентом не выбран, то чекбокс Pizza не активен;
// если поставить галку в чекбоксе Pizza, то во всех трёх её ингридиентах автоматически должны поставиться галки;
// и наоборот: если снять галку с Pizza, то со всех её ингридиентов галки должны сняться.
// Процесс реализации

// Найти элементы с чекбоксами.
// Добавить обработчики.
// Написать реализацию в обработчиках. 

'use strict';
document.addEventListener('DOMContentLoaded', () => {
    const mainCheckbox = document.getElementById('main-checkbox');
    const subCheckboxes = document.querySelectorAll('.sub-checkbox');
    // let count = 0;

    mainCheckbox.addEventListener('change', function() {
        subCheckboxes.forEach(subCheckbox => subCheckbox.checked = this.checked);
        // if (this.checked) count = subCheckboxes.length;
        // if(!this.checked) count = 0;
    });
    subCheckboxes.forEach(sub => {
        sub.addEventListener('change', function() {
            // if (this.checked) count++;
            // if(!this.checked) count--;
            // console.log(count);
            // if (count === subCheckboxes.length) return mainCheckbox.checked = true;
            // return mainCheckbox.checked = false;
            mainCheckbox.checked = [...subCheckboxes].every(item => item.checked);
        })
    })
})