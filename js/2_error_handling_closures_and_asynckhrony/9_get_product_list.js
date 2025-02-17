// Задание «Получить список товаров»
// Условие задачи
// В ряде случаев можно увлечься и реализовать логику с использованием 
// Promise, then, catch так, что запутаешься. Такой код будет трудно читать и понимать, 
// несмотря на то, что он будет работать.

// Как можно переписать и улучшить такой код на примере получения списка товаров из внешнего источника?


const getAllProducts = async function () {
    /*
     * Необходимо изменить код так, чтобы result был не
     * пустым. Необходимо дождаться, пока данные о товарах
     * будут получены и преобразованы в json.
     */
    let result = [];
    // await fetch("https://dummyjson.com/products")
    //   .then((res) => res.json())
    //   .then((data) => {
    //     result = data;
    //   });
    try {
        let response = await fetch("https://dummyjson.com/product");
        let data = await response.json();
        result = data;
    } catch (error) {
        console.error("Ошибка запроса:", error.message);
    }

      

    return result;
};


getAllProducts().then((products) => {
  console.log("Получен список товаров");
  console.log(products); // Ожидаем что список товаров не пустой
});
