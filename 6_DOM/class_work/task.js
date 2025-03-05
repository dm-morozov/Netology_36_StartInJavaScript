const div = document.querySelector('div');

console.log(div);

console.log(div.getAttribute('class'));
div.setAttribute('class', 'white');
console.log(div.dataset.text);
div.dataset.color = 'green';
div.dataset.next = 'start';
console.log(div.setAttribute('data-next', 'finish')); // undefined
console.log(div.getAttribute('data-next'));

div.classList.add('font');
div.classList.add('border');
setTimeout(() => {
    div.classList.remove('font');
    div.classList.remove('border');
    const interval = setInterval(() => {
        div.classList.toggle('font');
        div.classList.toggle('border');
    }, 3000)
    setTimeout(() => {
        clearInterval(interval);
        div.classList.replace('white', 'green');
    }, 15000);
}, 2000);

div.addEventListener('click', () => {
    if (div.style.backgroundColor) {
        div.style.backgroundColor = '';
        return;
    }
    div.style.backgroundColor = 'rgb(88, 139, 235)';
    console.log(getComputedStyle(div).border);
});

console.log(div.offsetHeight);
console.log(div.offsetWidth);

console.log(div.clientHeight);
console.log(div.clientWidth);

console.log(div.scrollHeight);
console.log(div.scrollWidth);

function isVisible(el) {
    const {top, bottom} = el.getBoundingClientRect();
    if (bottom < 0) return false;
    if (top > window.innerHeight) return false;
    return true;
}

setInterval(() => {
    console.log(isVisible(div));
}, 1000);


