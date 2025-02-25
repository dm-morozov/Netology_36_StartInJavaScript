const toogle = (function () {
    let state = false;
    return () => state = !state;
  })();



let enabled = toogle();

console.log(enabled); // Ожидаем true

enabled = toogle();

console.log(enabled); // Ожидаем false

enabled = toogle();

console.log(enabled); // Ожидаем true