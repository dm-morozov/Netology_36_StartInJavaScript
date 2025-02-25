const array = Array.from(document.querySelectorAll('li > span'));

array.forEach(item => {
    console.log(item.textContent);
});