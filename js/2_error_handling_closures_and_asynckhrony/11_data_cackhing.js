// Условие задачи
// Современные JavaScript-приложения часто зависят от внешних источников данных, 
// которые запрашиваются по сети. Это может привести к проблемам с оптимизацией 
// времени исполнения и ресурсов для получения таких данных. Для решения таких 
// проблем широко используется подход кеширования данных на время работы приложения. 
// Например, когда пользователь перемещается по страницам сайта, лучше получить 
// необходимые данные из внешних источников только один раз и переиспользовать 
// их при каждом последующем обращении.

// Реализуйте логику, которая, при необходимости, получит запрашиваемые данные 
// только один раз и затем будет работать с ними, храня их в своем внутреннем хранилище. 
// При каждом последующем обращении за теми же данными, приложение будет использовать 
// данные из своего хранилища, что позволит сократить повторные запросы к внешним 
// источникам данных и уменьшить нагрузку на сеть и ресурсы.


const createDataProvider = function () {
    /*
     * Необходимо реализовать функцию которая "оборачивает"
     * стандартную вункцию fetch для того, чтобы кэшировать
     * результаты выполнения запроса. Реализуемая функция
     * должна возвращать другую функцию, в которой необходимо
     * реализовать хранилище результатов запросов и возвращение
     * запрашиваемых результатов. Логика должна работать довольно
     * просто. Вызывая возвращенную функцию с url, по которому можно
     * получить данные, сначала необходимо проверить наличие данных
     * в хранилище. Если такие данные есть, то их стоит вернуть. В
     * случае, когда в хранилище ещё нет запрашиваемых данных, то
     * необходимо:
     *  1) получить данные, используя fetch
     *  2) преобразовать результат в json
     *  3) сохранить результат в хранилище под ключём, используя url
     *  4) вернуть результат
     */

    const cache = {}; // Объект для хранения кэша

    return async function (url) {
        try {
            // console.log(url);

            // Проверяем есть ли данные в кэше.
            if (cache[url]) {
                console.log("Данные взятые из кэша:", url);
                return cache[url];
            }

            console.log("Отправляем запрос на сервер:", url);

            // Делаем запрос и сохраняем в формате JSON
            const response = await fetch(url);
            const data = await response.json();
            
            // Сохраняем данные в кэше
            cache[url] = data;

            console.log("Данные сохранены в кэше", url);
            return data;

        } catch (error) {
            console.log("Произошла ошибка:", error);
        }
    }


};


// const dataProvider = createDataProvider();
// (async function () {
//     await dataProvider("https://dummyjson.com/products");
//     await dataProvider("https://dummyjson.com/products"); // Должен показать "Данные взяты из кэша"
//     console.log(await dataProvider("https://dummyjson.com/products/3"));
//     console.log(await dataProvider("https://fakestoreapi.com/users/"));
// })();



(async function () {
  const dataProvider = createDataProvider();
  let result = await Promise.all([
    dataProvider("https://dummyjson.com/products"),
    dataProvider("https://dummyjson.com/products/3"),
    dataProvider("https://fakestoreapi.com/users/"),
  ]);
  console.log(result);


  result = await Promise.all([
    dataProvider("https://dummyjson.com/products"),
    dataProvider("https://dummyjson.com/products/1"),
    dataProvider("https://fakestoreapi.com/users/"),
  ]);
  console.log(result);
})();
