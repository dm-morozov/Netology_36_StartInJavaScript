'use strict';
document.addEventListener('DOMContentLoaded', () => {
    const select = document.getElementById('country');
    const btn = document.getElementById('next-element');
    
    select.addEventListener('change', function () {
        console.log(this.value);
        console.log(this.selectedIndex);
    })

    btn.addEventListener('click', function (event) {
        event.preventDefault();
        select.selectedIndex = (select.selectedIndex + 1) % select.options.length;
        console.log(select.selectedIndex);
    })

    const inputs = document.querySelectorAll('input[name="type"]');
    const btnRadio = document.getElementById('radio__next-element');

    for (const radio of inputs) {
        radio.addEventListener('change', (event) => {
            console.log(event.currentTarget.value);
            console.log(radio.value);
        });
    }
    btnRadio.addEventListener('click', function(event) {
        event.preventDefault();
        const correntIndex = Array.from(inputs).findIndex(item => item.checked)
        const nextIndex = (correntIndex + 1) % inputs.length;
        inputs[nextIndex].checked = true;
        console.log(nextIndex);

        document.getElementById('output').textContent = inputs[nextIndex].value;
    })


    const checkbox = document.querySelector('#check-private');
    checkbox.addEventListener('change', function (){
        console.log(checkbox.checked)
    })

    document.querySelector('#toggle-disabled').addEventListener('click', function(event) {
        event.preventDefault();
        checkbox.disabled = !checkbox.disabled;
        this.textContent = checkbox.disabled ? 'Разблокировть' : 'Заблокировать';
    })
});