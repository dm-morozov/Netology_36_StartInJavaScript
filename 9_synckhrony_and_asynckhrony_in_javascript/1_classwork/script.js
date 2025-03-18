console.log('start')
setTimeout(() => {
    console.log('setTimeout')
}, 1000)

console.log('end')

const xhr = new XMLHttpRequest();
xhr.addEventListener('readystatechange', () => {
    if (xhr.readyState === xhr.DONE) {
        console.log(xhr.responseText);
    }
});

xhr.open('GET', 'data.txt');
xhr.send();